import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNoteScreen from "../screens/AddNoteScreen";

const Stack = createNativeStackNavigator();

export default function AddNoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ title: "New Observation", headerShown: true }}
      />
    </Stack.Navigator>
  );
}
