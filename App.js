import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { AuthProvider } from "./context/AuthContext";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "#768d73ff" }}
            edges={["top", "bottom"]}
          >
            <StatusBar barStyle="light-content" backgroundColor="#768d73ff" />
            <RootNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
