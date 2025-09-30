// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SystemThemeProvider } from "./contexts/SystemThemeContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          EnterCommand: require("../assets/fonts/EnterCommand-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SystemThemeProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
          headerTintColor: "#8B5CF6",
          headerTitleStyle: {
            fontFamily: "EnterCommand",
            fontSize: 20,
          },
          contentStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "JamHelp",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "Game Ideas",
            headerShown: true,
          }}
        />
      </Stack>
    </SystemThemeProvider>
  );
}
