// TEMA PRINCIPAL DO APLICATIVO, DEFININDO CORES, TIPOGRAFIA, ESPAÇAMENTOS E RAIOS DE BORDA PARA MODO CLARO E ESCURO
export const JamTheme = {
  colors: {
    // Light theme
    primary: "#8B5CF6",
    primaryLight: "#A78BFA",
    primaryDark: "#7C3AED",
    accent: "#06B6D4",
    background: "#FFFFFF",
    surface: "#F8FAFC",
    text: "#1F2937",
    textLight: "#6B7280",
    border: "#E5E7EB",

    // Dark theme colors
    dark: {
      background: "#0F0F23",
      surface: "#1A1A2E",
      text: "#FFFFFF",
      textLight: "#A0A0A0",
      primary: "#9F7AEA",
      accent: "#0EA5E9",
      border: "#374151",
    },
  },
  typography: {
    header: {
      fontFamily: "EnterCommand",
      fontSize: 32,
      lineHeight: 40,
    },
    title: {
      fontFamily: "EnterCommand",
      fontSize: 24,
      lineHeight: 32,
    },
    body: {
      fontFamily: "System",
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      fontFamily: "System",
      fontSize: 14,
      lineHeight: 20,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
};

export default JamTheme;
