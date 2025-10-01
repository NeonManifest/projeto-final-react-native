// app/(tabs)/my-ideas.tsx
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useSystemTheme } from "./../contexts/SystemThemeContext";
import { ideasScreenStyles as styles } from "../styles/myIdeasScreenStyles";
import { ideaStorage, SavedIdea } from "../../services/storageService";
import IdeaCard from "./../components/IdeaCard";
import IdeaDetailModal from "./../components/IdeaDetailModal";

export default function MyIdeasScreen() {
  const theme = useSystemTheme();
  const [ideas, setIdeas] = useState<SavedIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<SavedIdea | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    const savedIdeas = await ideaStorage.getIdeas();
    setIdeas(savedIdeas);
  };

  const handleIdeaPress = (idea: SavedIdea) => {
    setSelectedIdea(idea);
    setModalVisible(true);
  };

  const handleDeleteIdea = async (id: string) => {
    await ideaStorage.deleteIdea(id);
    await loadIdeas(); // Reload the list
  };

  const handleShareIdea = (idea: SavedIdea) => {
    // For now, just log the share action
    console.log("Sharing idea:", idea);
    // You can implement actual sharing later (React Native Share API)
    alert(`Share functionality would open for: ${idea.theme}`);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedIdea(null);
  };

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
        {ideas.length === 0 ? (
          <View
            style={[
              styles.emptyState,
              { backgroundColor: theme.colors.surface },
            ]}
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
        ) : (
          ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} onPress={handleIdeaPress} />
          ))
        )}
      </ScrollView>

      <IdeaDetailModal
        visible={modalVisible}
        idea={selectedIdea}
        onClose={handleCloseModal}
        onDelete={handleDeleteIdea}
        onShare={handleShareIdea}
      />
    </View>
  );
}
