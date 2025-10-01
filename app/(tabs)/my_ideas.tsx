// app/(tabs)/my-ideas.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSystemTheme } from "./../contexts/SystemThemeContext";
import { ideasScreenStyles as styles } from "../styles/myIdeasScreenStyles";

export default function MyIdeasScreen() {
  const theme = useSystemTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.primary,
            fontFamily: "EnterCommand",
          },
        ]}
      >
        MY IDEAS
      </Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <View
          style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}
        >
          <Image
            source={require("../../assets/images/jam_empty.png")}
            style={styles.emptyImage}
          />
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>
            No ideas yet!
          </Text>
          <Text
            style={[styles.emptySubtext, { color: theme.colors.textLight }]}
          >
            Generate your first idea in the "New Idea" tab
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
