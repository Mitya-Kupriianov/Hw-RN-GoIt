import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  selectIsAuth,
  selectIsTabBar,
} from "../../../redux/auth/authSelectors";
import { View, Text, StyleSheet } from "react-native";
import useRoute from "../../../Routes/Routes";

const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const isTabBar = useSelector(selectIsTabBar);
  const routing = useRoute(isAuth, isTabBar);
  return <NavigationContainer>{routing}</NavigationContainer>;
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
