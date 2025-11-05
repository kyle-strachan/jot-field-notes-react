import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

  // Used a wrapper to prevent repetition of get token.
  const authFetch = async (url, options = {}) => {
    try {
      const token = await SecureStore.getItemAsync("authToken");
      const headers = {
        ...(options.headers || {}),
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
      const finalOptions = { ...options, headers };
      const response = await fetch(url, finalOptions);
      return response;
    } catch (err) {
      console.error("authFetch error:", err);
      throw err;
    }
  };

  useEffect(() => {
    // Added to allow access with valid secure token instead of logging in each time.
    const checkLogin = async () => {
      try {
        const res = await authFetch(`${API_BASE}/verify`, { method: "GET" });

        if (res.ok) {
          const data = await res.json();
          setUser({
            id: data.user?.id || null,
            username: data.user?.username || null,
          });
        } else {
          await SecureStore.deleteItemAsync("authToken");
          setUser(null);
        }
      } catch (err) {
        console.log("Token check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const login = async (username, password) => {
    setAuthSubmitting(true);
    setAuthErrorMsg("");
    try {
      const res = await authFetch(`${API_BASE}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      // await new Promise((resolve) => setTimeout(resolve, 1000)); // testing only

      if (!res.ok) {
        setAuthErrorMsg("Invalid credentials, please try again.");
        setAuthSubmitting(false);
        await SecureStore.deleteItemAsync("authToken"); // Force delete the token if login was not successful.
        return;
      }

      const data = await res.json();

      if (data.token) await SecureStore.setItemAsync("authToken", data.token);

      setUser({
        id: data.user?.id || null,
        username: data.user?.username || username,
      });
    } catch (err) {
      setAuthErrorMsg("Network error. Please try again.");
      // console.log("Network error:", err.message);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const register = async (username, password) => {
    setAuthSubmitting(true);
    try {
      const res = await authFetch(`${API_BASE}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const errorMsg =
          errorData?.message || "Registration failed. Please try again.";
        setAuthErrorMsg(errorMsg);
        setAuthSubmitting(false);
        return;
      }

      const data = await res.json();
      setUser({ id: data.user?.id, username: data.user?.username });
      setAuthErrorMsg("");
    } catch (err) {
      setAuthErrorMsg(`Registration failed: unknown error.`);
    } finally {
      setAuthSubmitting(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await authFetch(`${API_BASE}/logout`, { method: "POST" });
      await SecureStore.deleteItemAsync("authToken");
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        register,
        logout,
        login,
        authFetch,
        loading,
        authErrorMsg,
        authSubmitting,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
