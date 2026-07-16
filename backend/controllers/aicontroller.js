import { getAIClient } from "../services/ai.service.js";
import { explainPrompt } from "../utils/prompts.js";

export const explainCode = async (req, res) => {
  try {
    const ai = getAIClient();

    const { language, code } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: explainPrompt(language, code),
    });

    return res.status(200).json({
      success: true,
      explanation: response.text,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
