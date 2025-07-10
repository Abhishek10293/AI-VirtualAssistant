import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  
  "userInput": "<original user input>" 
  {only remove your name from userInput if it exists}.
  Agar kisi ne Google ya YouTube pe kuch search karne ko bola hai 
  to userInput mein sirf wahi search wala part jaye,

  "response": "<a short spoken response to read out loud to the user>"
}

Instructions:
- "type": detect intent from user input.
- "userInput": cleaned-up version of what the user said.
- "response": Short and friendly voice response like "Sure, here it is", "Okay, doing that", etc.

Type meanings:
- "general": for factual questions or short answers (e.g., capital of France).
- "google-search": if user wants to search on Google.
- "youtube-search": if user wants to search something on YouTube.
- "youtube-play": if user wants to directly play music/video.
- "calculator-open": if user wants to open calculator.
- "instagram-open": if user wants to open Instagram.
- "facebook-open": if user wants to open Facebook.
- "weather-show": if user asks about weather.
- "get-time": if user asks for current time.
- "get-date": if user asks today's date.
- "get-day": if user asks what day it is.
- "get-month": if user asks current month.

Important:
- If the user asks "Who made you?", reply with "${userName}" in the response.
- Do NOT add any explanations. Just return the JSON object as described.

Now, user input: ${command}
`;

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    });

    // Return JSON-parsed response
    const raw = result.data.candidates[0].content.parts[0].text;

    // Clean and parse string if necessary
    return JSON.parse(raw); // Assumes Gemini returns valid JSON string

  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    return {
      type: "general",
      userInput: command,
      response: "Sorry, something went wrong.",
    };
  }
};

export default geminiResponse;
