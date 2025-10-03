// MODAL DE DETALHES DA IDEIA, EXIBE A IDEIA GERADA PELA IA, BEM COMO OS INPUTS ORIGINAIS E OPÇÕES PARA COMPARTILHAR OU DELETAR A IDEIA
import React, { use, useState } from "react";
import {
  View,
  Image,
  Share,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useSystemTheme } from "../contexts/SystemThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";

export interface IdeaDetailModalProps {
  visible: boolean;
  idea: any;
  onClose: () => void;
  onDelete: (id: string) => void;
  onShare: (idea: any) => void;
}

// PEÇO DESCULPAS POR ESSA FUNÇÃO QUE PODERIA MUITO BEM SER UM COMPONENTE SEPARADO COMO O MODAL DE RESULTADOS
export default function IdeaDetailModal({
  visible,
  idea,
  onClose,
  onDelete,
  onShare,
}: IdeaDetailModalProps) {
  const theme = useSystemTheme();
  const insets = useSafeAreaInsets();
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

  const handleShare = async (idea: any) => {
    try {
      const shareContent = `
🎮 Game Jam Idea - ${idea.theme}

${idea.aiResponse}

---
*Generated with JamHelp*
🎯 Theme: ${idea.theme}
⏱️ Duration: ${idea.duration}
🛠️ Tech: ${idea.tech}
📅 Created: ${new Date(idea.timestamp).toLocaleDateString()}
    `.trim();

      const result = await Share.share({
        message: shareContent,
      });

      if (result.action === Share.sharedAction) {
        console.log("Idea shared successfully!");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dialog dismissed");
      }
    } catch (error) {
      console.error("Share failed:", error);
      Alert.alert(
        "Share Unavailable",
        "Sharing is not available on this device. You can copy the text manually."
      );
    }
  };

  if (!idea) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        {/* Header with actions */}
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
          {/* Left side - Title */}
          <Text
            style={{
              fontSize: 32,
              fontFamily: "EnterCommand",
              color: theme.colors.primary,
            }}
          >
            IDEA DETAILS
          </Text>

          {/* Right side - Action buttons */}
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <TouchableOpacity
              onPress={handleShare.bind(null, idea)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: theme.colors.accent + "20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="share-2" size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: "#FF3B30" + "20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="trash-2" size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                backgroundColor: theme.colors.textLight + "20",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: theme.colors.text }}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <View
            style={{
              padding: 16,
              backgroundColor: theme.colors.surface,
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.primary + "20",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: theme.colors.text, flex: 1 }}>
              Delete this idea?
            </Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <TouchableOpacity
                onPress={cancelDelete}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: theme.colors.textLight + "20",
                }}
              >
                <Text style={{ color: theme.colors.text, fontSize: 14 }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                  backgroundColor: "#FF3B30",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 14 }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

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
              marginBottom: insets.bottom + 20,
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
      </View>
    </Modal>
  );
}
