import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({
    title,
    onPress,
    loading = false,
    outline = false,
    baseColor = "#768d73ff",
    textColor = "#ffffff",
}) {
    const backgroundColor = outline ? "transparent" : baseColor;
    const borderColor = baseColor;
    const labelColor = outline ? baseColor : textColor;

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor,
                    borderColor,
                    borderWidth: 2,
                    opacity: loading ? 0.6 : 1,
                },
            ]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            <Text style={[styles.buttonText, { color: labelColor }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginVertical: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});
