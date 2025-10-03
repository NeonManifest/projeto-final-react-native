// SERVIÇO USADO PARA GERENCIAR O ARMAZENAMENTO LOCAL DAS IDEIAS GERADAS PELA IA
// EU ATÉ PODERIA TER JUNTADO ESSA FUNÇÃO COM A DE STORAGE DAS TECNOLOGIAS, MAS PREFERI DEIXAR SEPARADO PARA FICAR MAIS ORGANIZADO
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_IDEAS_KEY = "saved_ideas";

export interface SavedIdea {
  id: string;
  theme: string;
  duration: string;
  tech: string;
  aiResponse: string;
  timestamp: string;
}

export const ideaStorage = {
  // Save a new idea
  async saveIdea(idea: Omit<SavedIdea, "id">): Promise<void> {
    try {
      const existingIdeas = await this.getIdeas();
      const newIdea: SavedIdea = {
        ...idea,
        id: Date.now().toString(), // Simple ID generation
      };

      const updatedIdeas = [newIdea, ...existingIdeas];
      await AsyncStorage.setItem(SAVED_IDEAS_KEY, JSON.stringify(updatedIdeas));
    } catch (error) {
      console.error("Failed to save idea:", error);
      throw error;
    }
  },

  // Get all saved ideas
  async getIdeas(): Promise<SavedIdea[]> {
    try {
      const ideasJson = await AsyncStorage.getItem(SAVED_IDEAS_KEY);
      return ideasJson ? JSON.parse(ideasJson) : [];
    } catch (error) {
      console.error("Failed to load ideas:", error);
      return [];
    }
  },

  // Delete an idea by ID
  async deleteIdea(id: string): Promise<void> {
    try {
      const ideas = await this.getIdeas();
      const filteredIdeas = ideas.filter((idea) => idea.id !== id);
      await AsyncStorage.setItem(
        SAVED_IDEAS_KEY,
        JSON.stringify(filteredIdeas)
      );
    } catch (error) {
      console.error("Failed to delete idea:", error);
      throw error;
    }
  },

  // Clear all ideas
  async clearAllIdeas(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SAVED_IDEAS_KEY);
    } catch (error) {
      console.error("Failed to clear ideas:", error);
      throw error;
    }
  },
};
