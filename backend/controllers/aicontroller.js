import { getAIClient } from "../services/ai.service.js";
import {
  explainPrompt,
  optimizePrompt,
  bugPrompt,
  complexityPrompt,
  testCasePrompt,
  convertPrompt,
} from "../utils/prompts.js";

const MODEL = "gemini-2.5-flash";

const generateResponse = async (prompt) => {
  const ai = getAIClient();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return response.text;
};

export const explainCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const explanation = await generateResponse(explainPrompt(language, code));

    res.json({
      success: true,
      explanation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const optimizeCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    const result = await generateResponse(optimizePrompt(language, code));

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const findBugs = async (req, res) => {
  try {
    const { language, code } = req.body;

    const result = await generateResponse(bugPrompt(language, code));

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const analyzeComplexity = async (req, res) => {
  try {
    const { language, code } = req.body;

    const result = await generateResponse(complexityPrompt(language, code));

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const generateTestCases = async (req, res) => {
  try {
    const { language, code } = req.body;

    const result = await generateResponse(testCasePrompt(language, code));

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const convertLanguage = async (req, res) => {
  try {
    const { sourceLanguage, targetLanguage, code } = req.body;

    const result = await generateResponse(
      convertPrompt(sourceLanguage, targetLanguage, code),
    );

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
