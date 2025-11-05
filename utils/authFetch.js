import * as SecureStore from "expo-secure-store";

export async function authFetch(url, options = {}) {
  try {
    // Retrieve stored token
    const token = await SecureStore.getItemAsync("authToken");

    // Merge existing headers with Authorization
    const headers = {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const finalOptions = { ...options, headers };

    // Make the request
    const response = await fetch(url, finalOptions);

    return response;
  } catch (err) {
    console.error("authFetch error:", err);
    throw err;
  }
}
