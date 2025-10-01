// components/IdeaCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSystemTheme } from "../contexts/SystemThemeContext";

export interface IdeaCardProps {
  idea: {
    id: string;
    theme: string;
    duration: string;
    tech: string;
    aiResponse: string;
    timestamp: string;
  };
  onPress: (idea: any) => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  const theme = useSystemTheme();

  // Extract the first line (usually the title) from the AI response
  const getTitle = () => {
    const firstLine = idea.aiResponse.split("\n")[0];
    return firstLine.replace("🎮", "").trim() || `Game: ${idea.theme}`;
  };

  // Extract a short preview
  const getPreview = () => {
    const lines = idea.aiResponse.split("\n");
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (
        line &&
        !line.startsWith("🎮") &&
        !line.startsWith("📖") &&
        !line.startsWith("🎯") &&
        !line.startsWith("🛠️") &&
        !line.startsWith("💡")
      ) {
        return line.length > 80 ? line.substring(0, 80) + "..." : line;
      }
    }
    return `A ${idea.theme} game using ${idea.tech}`;
  };

  // Format date
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      onPress={() => onPress(idea)}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.colors.primary,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 4,
            }}
            numberOfLines={1}
          >
            {getTitle()}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 8,
            }}
            numberOfLines={2}
          >
            {getPreview()}
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Text
              style={{
                color: theme.colors.textLight,
                fontSize: 12,
                backgroundColor: theme.colors.primary + "20",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              {idea.theme}
            </Text>
            <Text
              style={{
                color: theme.colors.textLight,
                fontSize: 12,
              }}
            >
              {formatDate(idea.timestamp)}
            </Text>
          </View>
        </View>
        <View style={{ paddingLeft: 8 }}>
          <Text style={{ fontSize: 24 }}>🎮</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
