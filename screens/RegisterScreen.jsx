import { useState } from "react";
import {
    Image,
    StyleSheet,
    View,
    Text,
    TextInput,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import ScrollWrapper from "../components/ScrollWrapper"; // adjust path if needed

export default function RegisterScreen({ navigation }) {
    const { register, authErrorMsg } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ScrollWrapper style={styles.scrollContent}>
            <View style={styles.mainContent}>
                <Image
                    style={styles.notebook}
                    source={require("../assets/notebook-green.png")}
                />
                <Text style={styles.title}>Jot</Text>
                <Text style={styles.subtitle}>Field notes</Text>

                <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    returnKeyType="done"
                />

                <Text style={styles.errorMsg}>{authErrorMsg}</Text>

                <CustomButton
                    title="Register"
                    onPress={() => register(username, password)}
                    colorOverride={"#768d73ff"}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.redirectLabel}>Already have an account?</Text>
                <CustomButton
                    title="Login"
                    onPress={() => navigation.navigate("Login")}
                    outline
                    colorOverride={"#768d73ff"}
                />
            </View>
        </ScrollWrapper>
    );
}

// #768d73ff - green

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "#ffffffff",
    },
    mainContent: {
        alignItems: "center",
    },
    notebook: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 50,
        color: "#768d73ff",
    },
    subtitle: {
        fontSize: 20,
        color: "#768d73ff",
        marginTop: 5,
        marginBottom: 15,
        opacity: 0.6,
    },
    textInput: {
        borderColor: "#768d73ff",
        borderWidth: 1,
        backgroundColor: "#e1f3dfff",
        width: 275,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        fontSize: 16,
    },
    errorMsg: {
        color: "#db7a7aff",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    footer: {
        alignItems: "center",
    },
    redirectLabel: {
        color: "#768d73ff",
        opacity: 0.8,
        textAlign: "center",
        marginBottom: 10,
    },
});
