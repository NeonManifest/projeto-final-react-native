// app/(tabs)/index.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useSystemTheme } from "./../contexts/SystemThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { welcomeScreenStyles as styles } from "../styles/startScreenStyles";
import DurationSelect from "../components/DurationSelect";

export default function NewIdeaScreen() {
  const theme = useSystemTheme();
  const insets = useSafeAreaInsets();
  const [saveTech, setSaveTech] = React.useState(false);
  const [durationUnit, setDurationUnit] = React.useState("hours");

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
            />
          </View>

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
              />
              <DurationSelect
                value={durationUnit}
                onValueChange={setDurationUnit}
              />
            </View>
          </View>

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
              placeholder="Unity, JavaScript, Python, etc."
              placeholderTextColor={theme.colors.textLight + "80"}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

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
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => console.log("Generate idea!")}
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
              GENERATE IDEA
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
