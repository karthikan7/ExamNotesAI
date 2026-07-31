
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const Gemini_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export const generateGeminiResponse = async (prompt) => {
    try {
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("Enter your")) {
            throw new Error("GEMINI_API_KEY is missing or invalid in server/.env");
        }

        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Gemini API Error (${response.status}): ${err}`);
        }

        const data = await response.json();

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("No text returned from Gemini");
        }

        let cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const firstBrace = cleanText.indexOf('{');
        const lastBrace = cleanText.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            cleanText = cleanText.substring(firstBrace, lastBrace + 1);
        }

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("Gemini Service Error:", error.message);
        throw error;
    }
}