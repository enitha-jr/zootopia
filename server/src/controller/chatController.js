const axios = require("axios");
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

class chatController {

    getAIResponse = async (req, res) => {
        try {
            const prompt = req.body.prompt;
            if (!prompt) {
                return res.status(400).json({ error: "prompt is required" });
            }

            const response = await axios.post(url,
                {
                    "contents": [
                        {
                            "role": "user",
                            "parts": [{
                                "text": `
                                    You are Simba — a friendly chatbot for animals and pets. 
                                    Rules:
                                    - ONLY answer questions related to animals, pets, or pet care.  
                                    - If a user asks about ANYTHING unrelated (math, coding, politics, etc.), politely refuse by saying:  
                                    "Sorry, I can only help with pets :)"  
                                    - Always provide warm, supportive, and safe advice for pet owners.  
                                    - For health/medical issues, suggest consulting a veterinarian.  
                                    - Do not break character. You are ONLY a pet assistant.  
                                    Your personality:
                                    - Speak warmly and kindly, as if you’re talking to pet owners.  
                                    - Give practical pet care advice (food, training, health, names, toys). 
                                    - Use simple, clear language (avoid technical jargon unless asked).  
                                    - Be positive and supportive, like a pet-loving friend.  
                                    - If you don’t know something, say so, and suggest consulting a vet.  
                                    `
                            }]
                        },
                        {
                            "role": "user",
                            "parts": [{ "text": prompt }]
                        }
                    ]
                }
            );

            const reply =
                response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sorry, I couldn’t generate a response.";

            res.json({ reply: reply });
        }
        catch (error) {
            console.error("Error fetching AI response:", error.response?.data || error.message);
            res.status(500).json({ error: "AI API request failed" });
        }
    }
}

module.exports = new chatController();
