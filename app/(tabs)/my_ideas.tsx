// app/(tabs)/my-ideas.tsx
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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

  // Reload ideas every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadIdeas();
    }, [])
  );

  const loadIdeas = async () => {
    const savedIdeas = await ideaStorage.getIdeas();
    setIdeas(savedIdeas);
  };

  // Rest of your component remains the same...
  const handleIdeaPress = (idea: SavedIdea) => {
    setSelectedIdea(idea);
    setModalVisible(true);
  };

  const handleDeleteIdea = async (id: string) => {
    await ideaStorage.deleteIdea(id);
    await loadIdeas(); // Reload after deletion
  };

  const handleShareIdea = (idea: SavedIdea) => {
    console.log("Sharing idea:", idea);
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
