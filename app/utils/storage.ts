//UTIL USADA PARA SALVAR PREFERÊNCIAS DE USUÁRIO NO FORMULÁRIO DE NOVA IDEIA, OU SEJA, AS TECNOLOGIAS SELECIONADAS
import AsyncStorage from "@react-native-async-storage/async-storage";

const SAVED_TECH_KEY = "saved_tech";

export const storage = {
  // Save tech to storage
  async saveTech(tech: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SAVED_TECH_KEY, tech);
    } catch (error) {
      console.error("Failed to save tech:", error);
    }
  },

  // Get saved tech from storage
  async getSavedTech(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(SAVED_TECH_KEY);
    } catch (error) {
      console.error("Failed to load saved tech:", error);
      return null;
    }
  },

  // Clear saved tech
  async clearSavedTech(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SAVED_TECH_KEY);
    } catch (error) {
      console.error("Failed to clear saved tech:", error);
    }
  },
};

export default storage;
