// Isolated Scholar Service using Google AI (Gemini 1.5 Flash)

export class ScholarService {
    private static GOOGLE_AI_API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY || "";
    private static GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    private static ensureString(val: any, fallback: string = ""): string {
        if (typeof val === 'string') return val.trim();
        if (val === null || val === undefined || typeof val === 'function') return fallback;
        try {
            const str = String(val).trim();
            if (str.includes('[native code]') || str === '[object Object]') return fallback;
            return str;
        } catch {
            return fallback;
        }
    }

    static async generateContent(prompt: string, language: string = 'it'): Promise<string> {
        if (!this.GOOGLE_AI_API_KEY) {
            console.error("❌ Missing Google AI API Key");
            return "Errore di configurazione: API Key mancante.";
        }

        try {
            const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GOOGLE_AI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `CRITICAL: RESPONSE MUST BE ENTIRELY IN ${language.toUpperCase()}.
                            
                            ROLE: You are an authoritative, academic, and deeply compassionate Senior Islamic Scholar Assistant. 
                            Your voice is scholarly yet accessible to laypeople, ensuring every answer is rooted in authentic tradition while addressing modern contexts.
                            
                            KNOWLEDGE DOMAINS & RIGOR:
                            1. **Theology (Aqidah)**: Deep explanations of the 6 articles of faith, Tawhid, and the names of Allah with their spiritual meanings.
                            2. **Jurisprudence (Fiqh)**: Provide balanced views based on major schools (Madhabs) when applicable. Focus on the 5 pillars with surgical detail on correctness (Ihsaan).
                            3. **Primary Sources**: Cite the Quran (Surah:Ayah), Sahih Bukhari, Sahih Muslim, and other authentic collections. Use references from major scholarly bodies like Al-Azhar if necessary for contemporary issues.
                            4. **History (Tarikh & Seerah)**: Detailed narratives of the Prophets, the Sahaba, and Islamic Heritage. Provide deep context on the history of Palestine (Al-Quds) and the golden age of Islamic science.
                            5. **Ethics & Spirituality**: Guidance on Tazkiyah (purification of the soul), family values, and noble character (Akhlaq).
                            6. **Daily Insight**: When asked for a 'daily blog' or 'insight', provide a unique, coherent reflection connecting a Quranic verse, a Hadith, and a practical modern application.

                            CORE MANDATE: 
                            - Always provide deep historical and doctrinal insights. 
                            - NEVER give medical or legal advice that exceeds spiritual guidance.
                            - If a topic is disputed, mention the majority view (Jumhur) respectfully.
                            - Be reassuring and avoid extreme or non-consensus interpretations.
                            
                            TASK: ${prompt}
                            
                            FORMATTING GUIDELINES:
                            1. Language: ${language.toUpperCase()} ONLY.
                            2. Structure: Use H2/H3 headers for organization. Use bullet points for steps or lists.
                            3. Style: Use Bold for key concepts or Arabic terms.
                            4. Citations: [Source Name, Reference Number] format.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 2048,
                    },
                    safetySettings: [
                        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
                        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (content) return this.ensureString(content, "Spiacente, risposta non valida.");
            } else if (response.status === 429) {
                return "Limite di richieste raggiunto. Riprova tra un minuto.";
            } else {
                const errText = await response.text();
                console.error(`❌ Gemini API Error (${response.status}):`, errText);
                throw new Error(`Gemini API Error: ${response.status}`);
            }
        } catch (error) {
            console.error("❌ High-Fidelity Generation Error:", error);
            return "Il servizio di consultazione è momentaneamente occupato. Ti preghiamo di riprovare tra un istante.";
        }

        return "Errore imprevisto nel collegamento con l'Archivio della Sapienza.";
    }

    static async translateText(text: string, targetLang: string): Promise<string> {
        if (this.GOOGLE_AI_API_KEY) {
            try {
                const response = await fetch(`${this.GEMINI_API_URL}?key=${this.GOOGLE_AI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Translate the following text to ${targetLang}. 
                                RULES:
                                1. Return ONLY the translation.
                                2. DO NOT add any extra text, explanations, or quotes.
                                3. Preserve any religious terminology correctly.
                                
                                TEXT TO TRANSLATE: "${text}"`
                            }]
                        }],
                        generationConfig: { temperature: 0.3 }
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (content) return this.ensureString(content, "Errore traduzione.");
                }
            } catch (error) {
                console.warn("AI Translate fallback failed:", error);
            }
        }

        const prompt = `Translate to ${targetLang}. Return ONLY translation: "${text}"`;
        const result = await this.generateContent(prompt, targetLang);
        return this.ensureString(result, "Errore traduzione.");
    }

    static async translate(text: string, targetLang: string): Promise<string> {
        return this.translateText(text, targetLang);
    }

    static async generateStreamContent(
        prompt: string,
        language: string = 'it',
        onChunk: (chunk: string) => void
    ): Promise<void> {
        try {
            const content = await this.generateContent(prompt, language);
            onChunk(content);
        } catch (error) {
            console.error("Streaming error:", error);
            onChunk("Errore nel collegamento.");
        }
    }

    static async generateQuizQuestion(level: 'beginner' | 'intermediate' | 'advanced', language: string = 'it'): Promise<{ question: string, options: string[], correctAnswer: string, translation: string }> {
        const langName = language === 'it' ? 'Italiano' : (language === 'ar' ? 'Arabo' : 'English');
        const prompt = `Generate an Arabic learning quiz question, level ${level}.
        Return ONLY a valid JSON object with this structure (no markdown):
        {
            "question": "Arabic Word/Phrase",
            "translation": "Translation in ${langName}",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "correctAnswer": "Correct Option Value"
        }
        Instructions: 
        1. All options and translation MUST be in ${langName}.
        2. The question must be in Arabic script.`;

        try {
            const jsonString = await this.generateContent(prompt, language);
            const cleanJson = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Error generating quiz:", error);
            const fallbacks: Record<string, any> = {
                it: { question: "شكراً", translation: "Grazie", options: ["Grazie", "Prego", "Ciao", "Sì"], correctAnswer: "Grazie" },
                en: { question: "شكراً", translation: "Thank you", options: ["Thank you", "Please", "Hello", "Yes"], correctAnswer: "Thank you" },
                ar: { question: "كتاب", translation: "كتاب", options: ["كتاب", "قلم", "muntakhab", "سيارة"], correctAnswer: "كتاب" }
            };
            return fallbacks[language] || fallbacks.en;
        }
    }
}
