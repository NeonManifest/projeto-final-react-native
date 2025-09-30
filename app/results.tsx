// app/results.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSystemTheme } from "./contexts/SystemThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ResultsScreen() {
  const theme = useSystemTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Parse the idea data from params
  const ideaData = {
    theme: params.theme as string,
    duration: params.duration as string,
    tech: params.tech as string,
    timestamp: params.timestamp as string,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      {/* Header */}
      <View
        style={{
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.primary + "20",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontFamily: "EnterCommand",
            color: theme.colors.primary,
            textAlign: "center",
          }}
        >
          IDEA GENERATED!
        </Text>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Theme
            </Text>
            <Text
              style={{ fontSize: 16, color: theme.colors.text, lineHeight: 24 }}
            >
              {ideaData.theme}
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Duration
            </Text>
            <Text
              style={{ fontSize: 16, color: theme.colors.text, lineHeight: 24 }}
            >
              {ideaData.duration}
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Tech Stack
            </Text>
            <Text
              style={{ fontSize: 16, color: theme.colors.text, lineHeight: 24 }}
            >
              {ideaData.tech}
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Generated At
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.textLight,
                lineHeight: 20,
              }}
            >
              {new Date(ideaData.timestamp).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: theme.colors.primary + "20",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              color: theme.colors.background,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            BACK TO GENERATOR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
