import { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Alert,
} from "react-native";
import * as Location from "expo-location";
import ScrollWrapper from "../components/ScrollWrapper";
import CustomButton from "../components/CustomButton";

export default function EditNoteScreen({ route, navigation }) {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const [lat, setLat] = useState(note.lat || null);
    const [lon, setLon] = useState(note.lon || null);
    const [saving, setSaving] = useState(false);
    const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

    const handleSave = () => {
        Alert.alert(
            "Update Location",
            "Do you wish to update the note's location to your current location?",
            [
                {
                    text: "Keep Original",
                    style: "cancel",
                    onPress: () => saveNote(lat, lon),
                },
                {
                    text: "Update",
                    style: "default",
                    onPress: async () => {
                        const updated = await getCurrentLocation();
                        if (updated) {
                            setLat(updated.lat);
                            setLon(updated.lon);
                            saveNote(updated.lat, updated.lon);
                        } else {
                            saveNote(lat, lon); // fallback
                        }
                    },
                },
            ]
        );
    };

    async function getCurrentLocation() {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission denied", "Cannot retrieve location.");
                return null;
            }
            const loc = await Location.getCurrentPositionAsync({});
            return {
                lat: loc.coords.latitude,
                lon: loc.coords.longitude,
            };
        } catch (err) {
            console.log("Location error:", err.message);
            return null;
        }
    }

    async function saveNote(finalLat, finalLon) {
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE}/notes/${note._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title,
                    body,
                    lat: finalLat,
                    lon: finalLon,
                }),
            });
            if (!res.ok) throw new Error("Failed to save note");
            await res.json();
            navigation.goBack();
        } catch (err) {
            Alert.alert("Save failed", "Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <ScrollWrapper style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter note title"
                returnKeyType="next"
            />

            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Recorded: {new Date(note.date).toLocaleString()}</Text>
                {lat && lon && (
                    <Text style={styles.infoText}>
                        Lat: {note.lat} Lon: {note.lon}
                    </Text>
                )}
            </View>
            <Text style={styles.label}>Content</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={body}
                onChangeText={setBody}
                placeholder="Write your note..."
                multiline
                returnKeyType="done"
            />
            <CustomButton
                title={saving ? "Saving..." : "Update Note"}
                onPress={handleSave}
                baseColor="#eaaa00"
            />
        </ScrollWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
    },
    label: {
        fontWeight: "600",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#fff",
    },
    textarea: {
        height: 200,
        textAlignVertical: "top",
    },
    infoBox: {
        marginBottom: 15,
    },
    infoText: {
        fontSize: 13,
        color: "gray",
    }
});
