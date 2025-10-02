// FOLHA DE ESTILOS PARA O COMPONENTE DE SELEÇÃO DE DURAÇÃO DA JAM
import { StyleSheet } from "react-native";

export const selectStyles = StyleSheet.create({
  select: {
    flex: 2,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-between" as const,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 50,
  },
  selectText: {
    fontSize: 16,
    fontWeight: "500" as const,
  },
  dropdownIcon: {
    fontSize: 12,
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
    padding: 20,
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    maxHeight: 300,
    paddingVertical: 0,
    overflow: "hidden",
  },
  option: {
    padding: 16,
    borderBottomWidth: 0,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  optionText: {
    fontSize: 16,
    textAlign: "center" as const,
  },
});

export default selectStyles;
