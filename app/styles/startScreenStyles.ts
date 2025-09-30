import { StyleSheet } from "react-native";

export const welcomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  features: {
    width: "100%",
    maxWidth: 300,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 16,
    width: 32,
    textAlign: "center",
  },
  featureText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});

export default welcomeScreenStyles;
