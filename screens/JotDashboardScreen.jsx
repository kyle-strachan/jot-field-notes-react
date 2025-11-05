import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import useJot from "../hooks/useJot";
import NoteCard from "../components/NoteCard";

export default function JotDashboardScreen() {
    const { notes, loading, error, refreshing, onRefresh, fetchJots } = useJot();
    const navigation = useNavigation();

    // Added to update screen when returning following a note are updated. Chose to refetch from database to avoid a local state which could get out of sync with DB.
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            fetchJots(); // Forcing a refresh to reflect edits and deleted notes
        });
        return unsubscribe;
    }, [navigation]);

    if (loading && !refreshing) {
        return <ActivityIndicator size="large" color="#eaaa00" />;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={(item) => item._id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (
                    <NoteCard item={item} />
                )}
                ListEmptyComponent={
                    !loading && (
                        <View style={styles.emptyNotesContainer}>
                            <Text style={styles.emptyNotes}>Use <Text style={styles.emptyNotesBold}>New Observation</Text> to start recording observations.</Text>
                        </View>
                    )
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0ecff",
        flex: 1,
        padding: 20,
    },
    emptyNotesContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyNotes: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
    emptyNotesBold: {
        fontWeight: "bold",
    }
})