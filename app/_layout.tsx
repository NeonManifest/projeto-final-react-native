// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { SystemThemeProvider } from "./contexts/SystemThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Add this

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          EnterCommand: require("../assets/fonts/EnterCommand-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
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
    <SafeAreaProvider>
      <SystemThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SystemThemeProvider>
    </SafeAreaProvider>
  );
}
