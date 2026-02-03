// Isolated Scholar Service using OpenAI API

export class ScholarService {
    private static OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";
    private static OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
        if (!this.OPENAI_API_KEY) {
            console.error("❌ Missing OpenAI API Key");
            return "Errore di configurazione: API Key mancante.";
        }

        try {
            const response = await fetch(this.OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: this.getSystemPrompt(language)
                        },
                        {
                            role: "user",
                            content: `TASK: ${prompt}\n\n${this.getFormattingGuidelines(language)}`
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 2048,
                })
            });

            if (response.ok) {
                const data = await response.json();
                const content = data?.choices?.[0]?.message?.content;
                if (content) return this.ensureString(content, "Spiacente, risposta non valida.");
            } else if (response.status === 429) {
                return "Limite di richieste raggiunto. Riprova tra un minuto.";
            } else {
                const errText = await response.text();
                console.error(`❌ OpenAI API Error (${response.status}):`, errText);
                throw new Error(`OpenAI API Error: ${response.status}`);
            }
        } catch (error) {
            console.error("❌ Generation Error:", error);
            return "Il servizio di consultazione è momentaneamente occupato. Ti preghiamo di riprovare tra un istante.";
        }

        return "Errore imprevisto nel collegamento.";
    }

    private static getSystemPrompt(language: string): string {
        return `CRITICAL: RESPONSE MUST BE ENTIRELY IN ${language.toUpperCase()}.
        
        ROLE: You are an authoritative, academic, and deeply compassionate Senior Islamic Scholar Assistant. 
        Your voice is scholarly yet accessible to laypeople, ensuring every answer is rooted in authentic tradition while addressing modern contexts.
        CRITICAL: Provide Arabic citations with full VOWEL POINTS (Tashkeel) to ensure correct phonetic pronunciation by AI voices.
        
        KNOWLEDGE DOMAINS & RIGOR:
        1. Theology (Aqidah): Deep explanations of the 6 articles of faith, Tawhid, and the names of Allah.
        2. Jurisprudence (Fiqh): Provide balanced views based on major schools (Madhabs).
        3. Primary Sources: Cite the Quran (Surah:Ayah), Sahih Bukhari, Sahih Muslim.
        4. History: Detailed narratives of the Prophets and Islamic Heritage.
        5. Ethics/Spirituality: Guidance on Tazkiyah and Akhlaq.`;
    }

    private static getFormattingGuidelines(language: string): string {
        return `FORMATTING GUIDELINES:
        1. Language: ${language.toUpperCase()} ONLY.
        2. Structure: Use H2/H3 headers. Use bullet points.
        3. Style: Use Bold for key concepts.
        4. Citations: [Source Name, Reference Number] format.`;
    }

    static async translateText(text: string, targetLang: string): Promise<string> {
        if (!this.OPENAI_API_KEY) return text;

        try {
            const response = await fetch(this.OPENAI_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: `Translate to ${targetLang}. Return ONLY the translation. Preserve religious terms.`
                        },
                        { role: "user", content: text }
                    ],
                    temperature: 0.3
                })
            });
            if (response.ok) {
                const data = await response.json();
                return this.ensureString(data?.choices?.[0]?.message?.content, text);
            }
        } catch (error) {
            console.warn("AI Translate failed:", error);
        }
        return text;
    }

    static async translate(text: string, targetLang: string): Promise<string> {
        return this.translateText(text, targetLang);
    }

    static async generateStreamContent(prompt: string, language: string = 'it', onChunk: (chunk: string) => void): Promise<void> {
        const content = await this.generateContent(prompt, language);
        onChunk(content);
    }

    static async generateQuizQuestion(level: 'beginner' | 'intermediate' | 'advanced', language: string = 'it'): Promise<any> {
        const prompt = `Generate an Arabic learning quiz question, level ${level}. JSON only: { "question": "", "translation": "", "options": [], "correctAnswer": "" }`;
        try {
            const response = await this.generateContent(prompt, language);
            const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Quiz generation failed:", error);
            return { question: "شكراً", translation: "Grazie", options: ["Grazie", "Prego", "Ciao", "Sì"], correctAnswer: "Grazie" };
        }
    }
}
