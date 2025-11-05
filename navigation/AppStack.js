import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    // Single screen stack that opens a tab navigator upon login
    <Stack.Navigator>
      <Stack.Screen
        name="JotFieldNotes"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
