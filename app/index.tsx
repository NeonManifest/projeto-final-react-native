// app/index.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useSystemTheme } from "./contexts/SystemThemeContext";
import { welcomeScreenStyles as styles } from "./styles/startScreenStyles";

export default function WelcomeScreen() {
  const theme = useSystemTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Main Title */}
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.primary,
            fontFamily: "EnterCommand",
          },
        ]}
      >
        JAMHELP
      </Text>

      {/* Subtitle */}
      <Text
        style={[
          styles.subtitle,
          {
            color: theme.colors.text,
          },
        ]}
      >
        Your personal idea guy for game jams
      </Text>

      {/* Description */}
      <Text
        style={[
          styles.description,
          {
            color: theme.colors.textLight,
          },
        ]}
      >
        Set your duration, theme, and tech stack{"\n"}
        Get instant game ideas tailored to your skills
      </Text>

      {/* Get Started Button */}
      <Link href="/home" asChild>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[styles.buttonText, { color: theme.colors.background }]}>
            GET STARTED
          </Text>
        </TouchableOpacity>
      </Link>

      {/* Features List */}
      <View style={styles.features}>
        <View style={styles.featureItem}>
          <Text style={[styles.featureEmoji, { color: theme.colors.primary }]}>
            🎮
          </Text>
          <Text style={[styles.featureText, { color: theme.colors.text }]}>
            Game Ideas
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={[styles.featureEmoji, { color: theme.colors.primary }]}>
            ⏱️
          </Text>
          <Text style={[styles.featureText, { color: theme.colors.text }]}>
            Time Management
          </Text>
        </View>

        <View style={styles.featureItem}>
          <Text style={[styles.featureEmoji, { color: theme.colors.primary }]}>
            🛠️
          </Text>
          <Text style={[styles.featureText, { color: theme.colors.text }]}>
            Your Tech Stack
          </Text>
        </View>
      </View>
    </View>
  );
}
