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
        headerShown: false, // Disabled at this level to keep consistent header height, see README.
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Dashboard: "grid-outline",
            NewNote: "eye-outline",
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
          backgroundColor: "#f9f9f9ff",
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{ tabBarLabel: "All Notes" }}
      />
      <Tab.Screen
        name="NewNote"
        component={AddNoteStack}
        options={{ tabBarLabel: "New Observation" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ tabBarLabel: "Account" }}
      />
    </Tab.Navigator>
  );
}
