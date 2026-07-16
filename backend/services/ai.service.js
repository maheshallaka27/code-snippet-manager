import { GoogleGenAI } from "@google/genai";

export const getAIClient = () => {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};
