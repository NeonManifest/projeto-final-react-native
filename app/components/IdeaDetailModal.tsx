// components/IdeaDetailModal.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useSystemTheme } from "../contexts/SystemThemeContext";

export interface IdeaDetailModalProps {
  visible: boolean;
  idea: any;
  onClose: () => void;
  onDelete: (id: string) => void;
  onShare: (idea: any) => void;
}

export default function IdeaDetailModal({
  visible,
  idea,
  onClose,
  onDelete,
  onShare,
}: IdeaDetailModalProps) {
  const theme = useSystemTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(idea.id);
    setShowDeleteConfirm(false);
    onClose();
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatContent = (text: string) => {
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
              fontSize: 20,
              fontWeight: "700",
              marginTop: 16,
              marginBottom: 8,
              lineHeight: 26,
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
              fontSize: 16,
              marginLeft: 16,
              marginBottom: 4,
              lineHeight: 22,
            }}
          >
            {trimmedLine}
          </Text>
        );
      } else if (trimmedLine === "") {
        return <View key={index} style={{ height: 6 }} />;
      } else {
        return (
          <Text
            key={index}
            style={{
              color: theme.colors.text,
              fontSize: 16,
              lineHeight: 22,
              marginBottom: 6,
            }}
          >
            {trimmedLine}
          </Text>
        );
      }
    });
  };

  if (!idea) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        {/* Header */}
        <View
          style={{
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary + "20",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "EnterCommand",
              color: theme.colors.primary,
            }}
          >
            IDEA DETAILS
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ fontSize: 24, color: theme.colors.text }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1, padding: 20 }}>
          {formatContent(idea.aiResponse)}

          {/* Original Inputs */}
          <View
            style={{
              marginTop: 30,
              padding: 16,
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.primary,
                marginBottom: 12,
              }}
            >
              Original Inputs
            </Text>
            <View style={{ gap: 12 }}>
              <View style={{ gap: 2 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.colors.textLight,
                    fontWeight: "600",
                  }}
                >
                  THEME
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {idea.theme}
                </Text>
              </View>
              <View style={{ gap: 2 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.colors.textLight,
                    fontWeight: "600",
                  }}
                >
                  DURATION
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {idea.duration}
                </Text>
              </View>
              <View style={{ gap: 2 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.colors.textLight,
                    fontWeight: "600",
                  }}
                >
                  TECH STACK
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {idea.tech}
                </Text>
              </View>
              <View style={{ gap: 2 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.colors.textLight,
                    fontWeight: "600",
                  }}
                >
                  CREATED
                </Text>
                <Text style={{ fontSize: 14, color: theme.colors.text }}>
                  {new Date(idea.timestamp).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View
          style={{
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: theme.colors.primary + "20",
            gap: 12,
          }}
        >
          {showDeleteConfirm ? (
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color: theme.colors.text,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Are you sure you want to delete this idea?
              </Text>
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.textLight + "40",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={cancelDelete}
                >
                  <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: "#FF3B30",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={confirmDelete}
                >
                  <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.accent,
                  padding: 16,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={() => onShare(idea)}
              >
                <Text
                  style={{ color: theme.colors.background, fontWeight: "600" }}
                >
                  📤 Share
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#FF3B30",
                  padding: 16,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={handleDelete}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                  🗑️ Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
