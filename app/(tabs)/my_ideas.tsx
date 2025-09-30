// app/(tabs)/my-ideas.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
        {/* Example saved ideas - you'll replace this with real data later */}
        <View
          style={[styles.ideaCard, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.ideaTitle, { color: theme.colors.text }]}>
            Space Platformer
          </Text>
          <Text
            style={[styles.ideaDescription, { color: theme.colors.textLight }]}
          >
            48-hour jam • Unity • Platformer
          </Text>
        </View>

        <View
          style={[styles.ideaCard, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.ideaTitle, { color: theme.colors.text }]}>
            Puzzle Adventure
          </Text>
          <Text
            style={[styles.ideaDescription, { color: theme.colors.textLight }]}
          >
            72-hour jam • JavaScript • Puzzle
          </Text>
        </View>

        <View
          style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.emptyEmoji, { color: theme.colors.primary }]}>
            💡
          </Text>
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
