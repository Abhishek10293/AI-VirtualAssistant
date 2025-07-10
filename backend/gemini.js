import axios from "axios"

const geminiResponse = async (command, assistantName, userName) => {
  try {
    const apiUrl = process.env.GEMINI_API_URL;

    const prompt = `You are a virtual assistant named ${assistantName} created by ${userName}.
You are not Google. You will now behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond with a JSON object like this:

{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month"|"calculator-open" | "instagram-open" |"facebook-open" |"weather-show",
  "userInput": "<original user input>",
  "response": "<a short spoken response to read out loud to the user>"
}

Important:
- Only respond with the JSON object, nothing else.
- Do NOT include triple backticks or markdown formatting.

Now userInput: ${command}`;

    const result = await axios.post(apiUrl, {
      "contents": [{
        "parts": [{ "text": prompt }]
      }]
    });

    let responseText = result.data.candidates[0].content.parts[0].text;

    // ✅ Strip markdown formatting if present
    responseText = responseText.replace(/```json|```/g, "").trim();

    // ✅ Parse the cleaned JSON string
    const parsed = JSON.parse(responseText);

    return parsed;

  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    return null;
  }
};

export default geminiResponse;
