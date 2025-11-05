import { useAuth } from "../context/AuthContext";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { StyleSheet, View, ActivityIndicator } from "react-native";

export default function RootNavigator() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={styles.activityIcon}>
        <ActivityIndicator size="large" color={"#ffffff"} />
      </View>
    );
  }
  return user ? <AppStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
  activityIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
