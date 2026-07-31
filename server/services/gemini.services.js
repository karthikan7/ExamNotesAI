export const generateGeminiResponse = async (prompt) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey.includes("Enter your")) {
            throw new Error("GEMINI_API_KEY is missing in environment variables.");
        }

        const modelsToTry = [
            process.env.GEMINI_MODEL || "gemini-1.5-flash",
            "gemini-flash-latest",
            "gemini-2.0-flash",
            "gemini-1.5-pro"
        ];

        // Filter duplicates while preserving order
        const uniqueModels = [...new Set(modelsToTry.filter(Boolean))];

        let lastError = null;

        for (const model of uniqueModels) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            try {
                const response = await fetch(url, {
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
                    const errText = await response.text();
                    console.warn(`Model ${model} failed (${response.status}): ${errText}`);
                    lastError = new Error(`Gemini API (${model} - ${response.status}): ${errText}`);
                    continue;
                }

                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) {
                    throw new Error(`No text returned from Gemini model ${model}`);
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

            } catch (err) {
                lastError = err;
            }
        }

        throw lastError || new Error("All Gemini API models failed");

    } catch (error) {
        console.error("Gemini Service Error:", error.message);
        throw error;
    }
};