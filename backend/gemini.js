import axios from "axios";

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}. 
You are not Google. You are now acting as a smart voice-enabled assistant.

Your job is to read the user input and respond with a clean JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<cleaned query or original command>",
  "response": "<short spoken response to user>"
}

Instructions:

1. "type":
   - google-search: when user says "search X on Google" or "Google X"
   - youtube-search: when user says "search X on YouTube"
   - youtube-play: when user says "play X on YouTube"
   - general: for facts, questions, or things you can answer
   - calculator-open, instagram-open, facebook-open: if user wants to open those

2. "userInput":
   - Remove assistant name like "${assistantName}"
   - For search/play commands, extract only the core search terms
     - Example: "Jarvis search operating systems on YouTube" becomes "operating systems"
     - Example: "Jarvis play Hanuman Chalisa on YouTube" becomes "Hanuman Chalisa"

3. "response":
   - Should be short and voice-friendly, like:
     - "Sure, searching YouTube"
     - "Here’s what I found"
     - "Opening Instagram now"
     - "Today is Monday"
     - "You were created by ${userName}"

Important:
- Only return valid JSON. No markdown, no explanation, no extra text.

Now, process this userInput: ${command}
`;

    const result = await axios.post(apiUrl, {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    });

    return result.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
  }
};

export default geminiResponse;
