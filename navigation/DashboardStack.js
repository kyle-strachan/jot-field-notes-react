import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JotDashboardScreen from "../screens/JotDashboardScreen";
import NoteDetailsScreen from "../screens/NoteDetailsScreen";
import EditNoteScreen from "../screens/EditNoteScreen";

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen
        name="JotDashboard"
        component={JotDashboardScreen}
        options={{ title: "Field Notes" }}
      />
      <Stack.Screen
        name="NoteDetails"
        component={NoteDetailsScreen}
        options={{ title: "Note Details" }}
      />
      <Stack.Screen
        name="EditNote"
        component={EditNoteScreen}
        options={{ title: "Edit Note" }}
      />
    </Stack.Navigator>
  );
}
