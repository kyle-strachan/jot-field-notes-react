import { useState, useEffect } from "react";
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

export default function AddNoteScreen({ navigation }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [saving, setSaving] = useState(false);
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const API_BASE = process.env.EXPO_PUBLIC_API_ENDPOINT;

    useEffect(() => {
        let subscription;

        const startWatching = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert(
                    "Permission denied",
                    "Longitude and latitude cannot be retrieved without location access"
                );
                return;
            }

            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 500,
                    distanceInterval: 1,
                },
                (loc) => {
                    setLat(loc.coords.latitude);
                    setLon(loc.coords.longitude);
                }
            );
        };

        startWatching();

        return () => {
            if (subscription) subscription.remove();
        };
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE}/notes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title, body, lat, lon }),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                const message = errorData?.error || "Please try again.";
                Alert.alert("Save failed", `${message} (${res.status})`);
                return;
            }

            await res.json();

            setTitle("");
            setBody("");

            navigation.goBack();
        } catch (err) {
            console.log("Save error:", err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleClear = () => {
        setTitle("");
        setBody("");
    };

    return (
        <ScrollWrapper style={styles.wrapper}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter note title"
                    />

                    <Text style={styles.label}>
                        Current location: {lat && lon ? `${lat}, ${lon}` : "Detecting..."}
                    </Text>

                    <Text style={styles.label}>Content</Text>
                    <TextInput
                        style={[styles.input, styles.textarea]}
                        value={body}
                        onChangeText={setBody}
                        placeholder="Write your note..."
                        multiline
                    />
                </View>

                <View style={styles.buttonGroup}>
                    <CustomButton
                        title={saving ? "Saving..." : "Save Note"}
                        onPress={handleSave}
                        disabled={saving}
                    />
                    <CustomButton
                        title="Clear"
                        onPress={handleClear}
                        outline
                        baseColor="#e75454ff"
                    />
                </View>
            </View>
        </ScrollWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        backgroundColor: "#ecf0ecff",
        padding: 20,
    },
    label: {
        fontWeight: "600",
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#768d73ff",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#fff",
    },
    textarea: {
        height: 200,
        textAlignVertical: "top",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginTop: 20,
    },
});
