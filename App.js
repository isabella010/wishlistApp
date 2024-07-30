import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

import WishlistScreen from "./screens/Wishlist";
import HomeScreen from "./screens/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name == "Products") {
              return (
                <Entypo name="documents" size={16} color="black" />
              );
            }
            if (route.name === "Wishlist") {
              return (
                <Feather name="list" size={24} color="black" />
              );
            }           
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "black",
        })}
      >
        <Tab.Screen name="Products" component={HomeScreen} />
        <Tab.Screen name="Wishlist" 
          component={WishlistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
