import { StyleSheet, Image, View, Text, Alert } from "react-native"
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            Alert.alert("Logout error", "An error occurred during logout");
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.profilePicture}
                    source={require("../assets/profile-placeholder.png")}
                />
                <Text style={styles.username}>{user?.username}</Text>
            </View>
            <View style={styles.footerButtons}>
                <CustomButton title="Logout" onPress={handleLogout} baseColor={"#e75454ff"} outline="true" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ecf0ecff",
    },
    profilePicture: {
        width: 200,
        height: 200,
        marginTop: 15,
        marginBottom: 15,
        alignSelf: "center",
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center"
    },
    footerButtons: {
        marginBottom: 20,
    }
})
