// SERVIÇO USADO PARA INTERAGIR COM A API GEMINI DA GOOGLE PARA GERAR IDEIAS DE JOGOS
const getApiKey = (): string => {
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
};

export const generateContent = async (prompt: string): Promise<string> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("Gemini API key not configured");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};

// Usage in your app:
export const generateGameIdea = async (
  theme: string,
  duration: string,
  tech: string
): Promise<string> => {
  const prompt = `Create an exciting but simple game idea for a game jam with these constraints:

🎮 THEME: ${theme}
⏱️ DURATION: ${duration}
🛠️ TECH: ${tech}

Please provide:
🎮 GAME TITLE: [Creative title]

📖 CONCEPT: [1 sentence pitch]

🎯 MECHANICS:
• A single main game mechanic which is fun and engaging
• Another 2-3 supporting mechanics

🛠️ TECHNICAL APPROACH:
• How to implement with ${tech}
• Architecture suggestions
• Potential challenges

⏱️ DASHBOARD:
• How to scope for ${duration}
• Prioritize features

Keep it practical and inspiring! Do not provide anything other than the idea details organized in the sections marked by emoji. Do not use any markdown formatting (emojis are fine). Do not use asterisks in the response. Begin a new line after each heading`;
  return await generateContent(prompt);
};

export default generateGameIdea;
