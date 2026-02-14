import * as geminiService from "../services/gemini.service.js";

export const askQuestion = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const answer = await geminiService.getGeminiResponse(prompt);
    
    res.status(200).json({ answer });
  } catch (error) {
    // This helps you see why it failed in the terminal
    console.error("Controller Error:", error.message);
    
    res.status(500).json({ 
      error: "Failed to fetch AI response",
      details: error.message // Temporarily send the error message to Postman to debug
    });
  }
};