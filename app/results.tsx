// app/results.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSystemTheme } from "./contexts/SystemThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import generateGameIdea from "../services/geminiService";
import { ideaStorage } from "../services/storageService";

export default function ResultsScreen() {
  const theme = useSystemTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();

  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Parse the idea data from params
  const ideaData = {
    theme: params.theme as string,
    duration: params.duration as string,
    tech: params.tech as string,
    timestamp: params.timestamp as string,
  };

  useEffect(() => {
    const generateWithAI = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Generating idea with:", ideaData);
        const idea = await generateGameIdea(
          ideaData.theme,
          ideaData.duration,
          ideaData.tech
        );

        setAiResponse(idea);

        // Auto-save the idea when generated
        await saveIdea(idea);
      } catch (err: any) {
        console.error("Generation error:", err);
        setError(err.message || "Failed to generate idea");
        Alert.alert(
          "Generation Failed",
          "Could not generate AI idea. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    generateWithAI();
  }, []);

  const saveIdea = async (response: string) => {
    try {
      await ideaStorage.saveIdea({
        theme: ideaData.theme,
        duration: ideaData.duration,
        tech: ideaData.tech,
        aiResponse: response,
        timestamp: new Date().toISOString(),
      });
      setSaved(true);
      console.log("Idea saved successfully!");
    } catch (error) {
      console.error("Failed to save idea:", error);
      Alert.alert("Save Failed", "Could not save your idea. Please try again.");
    }
  };

  const formatAIResponse = (text: string) => {
    return text.split("\n").map((line, index) => {
      const trimmedLine = line.trim();

      if (
        trimmedLine.startsWith("🎮") ||
        trimmedLine.startsWith("📖") ||
        trimmedLine.startsWith("🎯") ||
        trimmedLine.startsWith("🛠️") ||
        trimmedLine.startsWith("💡")
      ) {
        return (
          <Text
            key={index}
            style={{
              color: theme.colors.primary,
              fontSize: 24,
              fontWeight: "700",
              marginTop: 24,
              marginBottom: 12,
              lineHeight: 30,
            }}
          >
            {trimmedLine}
          </Text>
        );
      } else if (trimmedLine.startsWith("•") || trimmedLine.startsWith("-")) {
        return (
          <Text
            key={index}
            style={{
              color: theme.colors.text,
              fontSize: 20,
              marginLeft: 16,
              marginBottom: 6,
              lineHeight: 26,
            }}
          >
            {trimmedLine}
          </Text>
        );
      } else if (trimmedLine === "") {
        return <View key={index} style={{ height: 8 }} />;
      } else {
        return (
          <Text
            key={index}
            style={{
              color: theme.colors.text,
              fontSize: 20,
              lineHeight: 26,
              marginBottom: 8,
            }}
          >
            {trimmedLine}
          </Text>
        );
      }
    });
  };

  const handleBack = () => {
    router.back();
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
          {loading ? "GENERATING IDEA..." : "YOUR GAME IDEA"}
        </Text>
        {saved && (
          <Text
            style={{
              fontSize: 14,
              color: theme.colors.primary,
              textAlign: "center",
              marginTop: 8,
              fontWeight: "600",
            }}
          >
            ✅ saved to My Ideas!
          </Text>
        )}
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        {loading && (
          <View style={{ alignItems: "center", padding: 40 }}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text
              style={{
                marginTop: 16,
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              AI is crafting your game idea...{"\n"}
              This may take a few seconds
            </Text>
          </View>
        )}

        {error && (
          <View
            style={{
              padding: 20,
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                textAlign: "center",
              }}
            >
              ⚠️ {error}
            </Text>
          </View>
        )}

        {aiResponse && (
          <View style={{ gap: 8 }}>{formatAIResponse(aiResponse)}</View>
        )}

        {/* Original Inputs */}
        <View
          style={{
            marginTop: 30,
            marginBottom: 30,
            padding: 20,
            backgroundColor: theme.colors.surface,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: theme.colors.primary,
              marginBottom: 12,
            }}
          >
            Your Inputs
          </Text>

          <View style={{ gap: 16 }}>
            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.textLight,
                  fontWeight: "600",
                }}
              >
                THEME
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.text,
                  lineHeight: 22,
                }}
              >
                {ideaData.theme}
              </Text>
            </View>

            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.textLight,
                  fontWeight: "600",
                }}
              >
                DURATION
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.text,
                  lineHeight: 22,
                }}
              >
                {ideaData.duration}
              </Text>
            </View>

            <View style={{ gap: 4 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.textLight,
                  fontWeight: "600",
                }}
              >
                TECH STACK
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: theme.colors.text,
                  lineHeight: 22,
                }}
              >
                {ideaData.tech}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: theme.colors.primary + "20",
          gap: 12,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
          onPress={handleBack}
        >
          <Text
            style={{
              color: theme.colors.background,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {aiResponse ? "CREATE ANOTHER IDEA" : "BACK TO GENERATOR"}
          </Text>
        </TouchableOpacity>

        {aiResponse && !saved && (
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.accent,
              padding: 12,
              borderRadius: 12,
              alignItems: "center",
            }}
            onPress={() => saveIdea(aiResponse)}
          >
            <Text
              style={{
                color: theme.colors.background,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              SAVE IDEA
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
