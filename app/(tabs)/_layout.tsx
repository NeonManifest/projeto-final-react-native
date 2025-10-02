//LAYOUT DE ABAS PRINCIPAL DO APLICATIVO, DEFININDO AS TELAS "NEW IDEA" E "MY IDEAS" COM ESTILIZAÇÃO DINÂMICA BASEADA NO TEMA ATUAL
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useSystemTheme } from "./../contexts/SystemThemeContext";

export default function TabLayout() {
  const theme = useSystemTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.primary + "20",
          justifyContent: "center",
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textLight,
        tabBarLabelStyle: {
          fontFamily: "EnterCommand",
          fontSize: 32,
          marginTop: -16,
          marginBottom: 0,
          padding: 0,
          lineHeight: 32,
          textAlignVertical: "center",
        },
        headerShown: false,
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "New Idea",
        }}
      />
      <Tabs.Screen
        name="my_ideas"
        options={{
          title: "My Ideas",
        }}
      />
    </Tabs>
  );
}
