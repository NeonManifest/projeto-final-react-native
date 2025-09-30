// contexts/SystemThemeContext.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";
import JamTheme from "../constants/theme";

interface ThemeContextType {
  colors: typeof JamTheme.colors & (typeof JamTheme.colors.dark | {});
  typography: typeof JamTheme.typography;
  isDark: boolean;
}

const SystemThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const useSystemTheme = (): ThemeContextType => {
  const context = useContext(SystemThemeContext);
  if (!context) {
    throw new Error("useSystemTheme must be used within a SystemThemeProvider");
  }
  return context;
};

interface SystemThemeProviderProps {
  children: ReactNode;
}

export const SystemThemeProvider: React.FC<SystemThemeProviderProps> = ({
  children,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const theme: ThemeContextType = {
    ...JamTheme,
    colors: {
      ...JamTheme.colors,
      ...(isDark ? JamTheme.colors.dark : {}),
    },
    isDark,
  };

  return (
    <SystemThemeContext.Provider value={theme}>
      {children}
    </SystemThemeContext.Provider>
  );
};

export default SystemThemeProvider;
