// FOLHA DE ESTILOS PARA A TELA INICIAL ONDE O USUÁRIO INSERE AS PREFERÊNCIAS PARA GERAR IDEIAS DE JOGOS
import { StyleSheet } from "react-native";

export const welcomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 24,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  textInput: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 50,
  },
  durationRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  numberInput: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 50,
    textAlign: "center",
  },
  select: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 50,
  },
  selectText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownIcon: {
    fontSize: 12,
    opacity: 0.7,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  toggleLabel: {
    fontSize: 16,
    flex: 1,
    marginRight: 16,
  },
  generateButton: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default welcomeScreenStyles;
