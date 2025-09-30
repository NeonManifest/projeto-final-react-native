// App.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        EnterCommand: require("../assets/fonts/EnterCommand-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#8B5CF6",
        }}
      >
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ fontFamily: "EnterCommand", fontSize: 32, color: "#8B5CF6" }}
      >
        JAMHELP
      </Text>
    </View>
  );
}
