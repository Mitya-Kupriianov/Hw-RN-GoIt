import React from "react";
import { StyleSheet, View, Button } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../Screens/auth/LoginScreen";
import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import PostsScreen from "../Screens/page/PostsScreen";
import CreatePostsScreen from "../Screens/page/CreatePostsScreen";
import ProfileScreen from "../Screens/page/ProfileScreen";
import { logout } from "../redux/auth/authSlice";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  const dispatch = useDispatch();
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#FF6C00",
        tabBarStyle: {
          paddingHorizontal: 82,
        },
      }}
    >
      <Tab.Screen
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...s.container,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <AntDesign name="appstore-o" size={size} color={color} />
            </View>
          ),
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerRight: () => (
            <Feather
              style={{ marginRight: 16 }}
              name="log-out"
              size={24}
              color="#FF6C00"
              onPress={() => {
                dispatch(logout());
              }}
            />
          ),
        }}
        name="Публикации"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...s.container,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <AntDesign name="plus" size={size} color={color} />
            </View>
          ),
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
        name="Создать публикацию"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                ...s.container,
                backgroundColor: focused ? "#FF6C00" : "#fff",
              }}
            >
              <Feather name="user" size={size} color={color} />
            </View>
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default useRoute;

const s = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    // justifyContent: "flex-end"
  },
});
