import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import { store } from "./src/redux/store";

import Home from "./src/Screens/page/Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./src/assets/fonts/Roboto/Roboto-Medium.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <Provider store={store}>
      <View style={s.container} onLayout={onLayoutRootView}>
        <Home />
      </View>
    </Provider>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
