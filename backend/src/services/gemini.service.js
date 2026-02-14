import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiResponse = async (userPrompt) => {
  try {
    // 1. Fetch models (Handling the Async Iterator)
    const modelsResponse = await client.models.list();
    const availableModels = [];
    
    // In 2026 SDK, we must iterate to get the items
    for await (const model of modelsResponse) {
      availableModels.push(model);
    }

    // 2. Find the best available Flash model
    const bestModel = availableModels.find(m => 
      m.name.includes('flash') && !m.name.includes('vision')
    );

    // 2026 Pro-Tip: 'gemini-2.5-flash-lite' is the current free-tier champion
    const modelName = bestModel ? bestModel.name : "gemini-2.5-flash-lite";
    
    console.log(`QA System active using: ${modelName}`);

    // 3. Generate Content using the NEW 2026 syntax
    const result = await client.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }]
    });

    // In the new SDK, the text is a direct property
    return result.text; 

  } catch (error) {
    console.error("2026 SDK ERROR:", error.message);
    throw error;
  }
};