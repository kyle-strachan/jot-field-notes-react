import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { authFetch } from "../utils/authFetch";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authErrorMsg, setAuthErrorMsg] = useState("");
  const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

  // Check token on app start
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await authFetch(`${API_BASE}/verify`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

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

  // Login
  const login = async (username, password) => {
    setAuthSubmitting(true);
    setAuthErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Testing spinner

      if (!res.ok) {
        setAuthErrorMsg("Invalid credentials, please try again.");
        setAuthSubmitting(false);
        await SecureStore.deleteItemAsync("authToken"); // Clear token in case of invalid attempt
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
      console.log("Network error:", err.message);
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Register
  const register = async (username, password) => {
    setAuthSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setUser({ id: null, username });
      setAuthErrorMsg(""); // Clear any previous errors
    } catch (err) {
      setAuthErrorMsg(`Registration failed: unknown error.`);
    } finally {
      setAuthSubmitting(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Testing spinner
      await fetch(`${API_BASE}/logout`, { method: "POST" });
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
