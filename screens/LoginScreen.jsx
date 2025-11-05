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
import ScrollWrapper from "../components/ScrollWrapper";

export default function LoginScreen({ navigation }) {
    const { login, authErrorMsg, authSubmitting } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [frontEndErrorMsg, setFrontEndErrorMsg] = useState("");

    // Added light input validation - didn't want to provide exact rules on front-end, this is just to reduce call to back-end.
    const handleLogin = () => {
        if (username.length < 3 || password.length < 3) {
            setFrontEndErrorMsg("Username and password must be at least 3 characters.");
            return;
        }
        setFrontEndErrorMsg(""); // Clear error before login
        login(username, password);
    };

    return (
        <ScrollWrapper style={styles.scrollContent}>
            <View style={styles.mainContent}>
                <Image
                    style={styles.notebook}
                    source={require("../assets/notebook-white.png")}
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

                <Text style={styles.errorMsg}>
                    {frontEndErrorMsg || authErrorMsg}
                </Text>

                <CustomButton
                    title={authSubmitting ? "Loading..." : "Login"}
                    disabled={authSubmitting}
                    onPress={handleLogin}
                    baseColor="#fff"
                    textColor="#768d73ff"
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.redirectLabel}>New to Jot?</Text>
                <CustomButton
                    title="Register"
                    onPress={() => navigation.navigate("Register")}
                    outline
                    baseColor="#fff"
                />
            </View>
        </ScrollWrapper>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 40,
        backgroundColor: "#768d73ff",
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
        color: "#fff",
    },
    subtitle: {
        fontSize: 20,
        color: "#fff",
        marginTop: 5,
        marginBottom: 15,
        opacity: 0.6,
    },
    textInput: {
        borderColor: "#fff",
        borderWidth: 1,
        backgroundColor: "#cbe7c8ff",
        width: 275,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
        fontSize: 16,
    },
    errorMsg: {
        color: "#dfbfbfff",
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
    },
    footer: {
        alignItems: "center",
    },
    redirectLabel: {
        color: "#cbe7c8ff",
        opacity: 0.8,
        textAlign: "center",
        marginBottom: 10,
    },
});
