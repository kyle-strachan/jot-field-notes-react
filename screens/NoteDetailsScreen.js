import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import useJot from "../hooks/useJot";
import CustomButton from "../components/CustomButton";

export default function NoteDetailsScreen({ route, navigation }) {
  const noteId = route.params.note._id;
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { deleteNote } = useJot();
  const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

  const fetchNote = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/notes`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      const found = data.notes.find((n) => n._id === noteId);
      setNote(found);
    } catch (err) {
      console.log("Fetch note error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchNote);
    return unsubscribe;
  }, [navigation, noteId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#eaaa00" />
      </View>
    );
  }

  if (!note) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "gray" }}>Note not found.</Text>
      </View>
    );
  }

  function handleDelete(note) {
    Alert.alert(`Delete Note`, `Are you sure you want to delete this note?`, [
      { text: "Keep", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteNote(note._id);
            navigation.goBack();
          } catch (error) {
            console.log("Cannot delete note");
          }
        },
      },
    ]);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View>
        <Text style={styles.title}>{note.title}</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Recorded: {new Date(note.date).toLocaleString()}
          </Text>
          {note.lat && note.lon && (
            <Text style={styles.infoText}>
              Lat: {note.lat} Lon: {note.lon}
            </Text>
          )}
        </View>
        <Text style={styles.content}>{note.body}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <CustomButton
          title="Edit Note"
          onPress={() => navigation.navigate("EditNote", { note })}
          // baseColor="#eaaa00ff"
          outline
        />
        <CustomButton
          title="Delete Note"
          onPress={() => handleDelete(note)}
          baseColor="#e75454ff"
          outline
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0ecff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#768d73ff",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  date: {
    fontSize: 13,
    color: "gray",
    marginBottom: 15,
  },
  content: {
    fontSize: 18,
    lineHeight: 24,
    color: "#333",
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#768d73ff",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  infoBox: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 13,
    color: "gray",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});
