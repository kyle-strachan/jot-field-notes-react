import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NoteCard({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("NoteDetails", { note: item })}
        >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.noteExcerpt}>
                {item.body}
            </Text>
            <Text style={styles.location}>{!item?.lat || !item?.lon ? "" : `${item.lat}, ${item.lon}`}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: "#768d73ff",
        marginBottom: 12,
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
    },
    noteTitle: {
        fontWeight: "bold",
    },
    noteExcerpt: {
        color: "#555"
    },
    location:
    {
        color: "#eaaa00",
        fontSize: 10,
        textAlign: "right"
    }
})