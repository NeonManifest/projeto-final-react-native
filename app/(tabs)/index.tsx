// app/(tabs)/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useSystemTheme } from "./../contexts/SystemThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { welcomeScreenStyles as styles } from "../styles/startScreenStyles";
import DurationSelect from "./../components/DurationSelect";
import { storage } from "./../utils/storage"; // Import storage utility
import { useRouter } from "expo-router";

export default function NewIdeaScreen() {
  const theme = useSystemTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Form state
  const [themeInput, setThemeInput] = useState("");
  const [durationNumber, setDurationNumber] = useState("");
  const [durationUnit, setDurationUnit] = useState("hours");
  const [techInput, setTechInput] = useState("");
  const [saveTech, setSaveTech] = React.useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load saved tech on component mount
  useEffect(() => {
    const loadSavedTech = async () => {
      const savedTech = await storage.getSavedTech();
      if (savedTech) {
        setTechInput(savedTech);
        setSaveTech(true); // Auto-check the save option if we have saved tech
      }
    };

    loadSavedTech();
  }, []);

  // Generate idea handler
  const handleGenerateIdea = async () => {
    // Prevent multiple generations
    if (isGenerating) {
      return;
    }

    // Basic validation
    if (!themeInput.trim()) {
      Alert.alert("Missing Theme", "Please enter a theme for your game jam.");
      return;
    }

    if (!durationNumber.trim() || isNaN(Number(durationNumber))) {
      Alert.alert("Invalid Duration", "Please enter a valid duration number.");
      return;
    }

    if (!techInput.trim()) {
      Alert.alert("Missing Tech", "Please enter the technologies you know.");
      return;
    }

    try {
      setIsGenerating(true); // Set loading state

      // Save tech if user opted to save it
      if (saveTech && techInput.trim()) {
        await storage.saveTech(techInput.trim());
      }

      // Create the idea data object
      const ideaData = {
        theme: themeInput.trim(),
        duration: `${durationNumber} ${durationUnit}`,
        tech: techInput.trim(),
        timestamp: new Date().toISOString(),
      };

      console.log("Generated Idea Data:", ideaData);

      // Navigate to results screen with the data
      router.push({
        pathname: "/results",
        params: ideaData,
      });
    } catch (error) {
      console.error("Generation error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
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
          JAMHELP
        </Text>

        <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>
          Your personal game jam idea guy
        </Text>

        <View style={styles.form}>
          {/* Theme Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Theme of the jam
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.primary + "40",
                },
              ]}
              placeholder="Enter theme (e.g., Space, Time, Isolation)"
              placeholderTextColor={theme.colors.textLight + "80"}
              value={themeInput}
              onChangeText={setThemeInput}
            />
          </View>

          {/* Duration Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Jam duration
            </Text>
            <View style={styles.durationRow}>
              <TextInput
                style={[
                  styles.numberInput,
                  {
                    backgroundColor: theme.colors.surface,
                    color: theme.colors.text,
                    borderColor: theme.colors.primary + "40",
                  },
                ]}
                placeholder="48"
                placeholderTextColor={theme.colors.textLight + "80"}
                keyboardType="numeric"
                value={durationNumber}
                onChangeText={setDurationNumber}
              />
              <DurationSelect
                value={durationUnit}
                onValueChange={setDurationUnit}
              />
            </View>
          </View>

          {/* Tech Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Tech you know
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.text,
                  borderColor: theme.colors.primary + "40",
                },
              ]}
              placeholder="Unity, Godot, Pygame, etc."
              placeholderTextColor={theme.colors.textLight + "80"}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              value={techInput}
              onChangeText={setTechInput}
            />
          </View>

          {/* Save Tech Toggle */}
          <View style={styles.toggleRow}>
            <Text style={[styles.toggleLabel, { color: theme.colors.text }]}>
              Save tech I know for future jams
            </Text>
            <Switch
              value={saveTech}
              onValueChange={setSaveTech}
              trackColor={{
                false: theme.colors.textLight + "40",
                true: theme.colors.primary + "80",
              }}
              thumbColor={
                saveTech ? theme.colors.primary : theme.colors.textLight
              }
            />
          </View>

          <TouchableOpacity
            style={[
              styles.generateButton,
              {
                backgroundColor: isGenerating
                  ? theme.colors.textLight
                  : theme.colors.primary,
                opacity: isGenerating ? 0.7 : 1,
              },
            ]}
            onPress={handleGenerateIdea}
            disabled={isGenerating} // Disable button when generating
          >
            <Text
              style={[
                styles.generateButtonText,
                {
                  color: theme.colors.background,
                  fontFamily: theme.typography.title.fontFamily,
                },
              ]}
            >
              {isGenerating ? "GENERATING..." : "GENERATE IDEA"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
