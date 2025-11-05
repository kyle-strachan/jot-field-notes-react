import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardStack from "./DashboardStack";
import ProfileStack from "./ProfileStack";
import AddNoteStack from "./AddNoteStack";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide tab-level headers
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: "grid-outline",
            NewNote: "add-circle-outline",
            Profile: "person-outline",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "#eaaa00",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 70,
          padding: 6,
          backgroundColor: "#f9f9f9",
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="NewNote" component={AddNoteStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
