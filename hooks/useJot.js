import { useState, useEffect } from "react";
import { authFetch } from "../utils/authFetch"; // adjust path as needed

export default function useJot() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

  const fetchJots = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await authFetch(`${API_BASE}/notes`, {
        method: "GET",
      });

      if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);

      const data = await res.json();
      setNotes(data.notes || []);
    } catch (err) {
      setError("Failed to load notes.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJots();
  };

  useEffect(() => {
    fetchJots();
  }, []);

  async function deleteNote(noteId) {
    try {
      const res = await authFetch(`${API_BASE}/notes/${noteId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete note");
      await fetchJots(); // Force refresh on main screen
    } catch (error) {
      console.log(`Delete has an error`, error);
    }
  }

  return {
    notes,
    fetchJots,
    loading,
    refreshing,
    error,
    onRefresh,
    deleteNote,
  };
}
