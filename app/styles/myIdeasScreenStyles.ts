import { StyleSheet } from "react-native";

export const ideasScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 24,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 30,
  },
  list: {
    flex: 1,
  },
  ideaCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ideaTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  ideaDescription: {
    fontSize: 14,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ideasScreenStyles;
