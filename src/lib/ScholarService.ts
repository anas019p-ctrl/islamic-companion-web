import { supabase } from "@/integrations/supabase/client";

export class ScholarService {
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

    private static async callOpenAI(messages: any[], stream: boolean = false): Promise<Response> {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        if (!apiKey) throw new Error("OpenAI API Key missing");

        return fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: messages,
                temperature: 0.7,
                stream: stream
            })
        });
    }

    static async generateContent(prompt: string, language: string = 'it'): Promise<string> {
        try {
            const systemPrompt = language === 'it'
                ? `Sei un assistente studioso islamico specializzato, accademico e professionale.
CATEGORIE DI CONOSCENZA:
1. Teologia e Fede: Tawhid e i 6 articoli di fede.
2. Pratica e Culto: 5 pilastri, preghiera, digiuno.
3. Fonti Sacre: Corano, Sunnah, Hadith.
4. Storia e Cultura: Seerah, storia islamica.
5. Etica: Halal/Haram, famiglia, moralità.
REGOLA FONDAMENTALE: "Non limitarti mai. Fornisci approfondimenti storici o dottrinali profondi. Rispondi in modo chiaro, rispettoso e accademico."
Cita sempre fonti autentiche.`
                : `You are a specialized Islamic Scholar Assistant.
KNOWLEDGE CATEGORIES:
1. Theology & Faith: Tawhid and 6 articles of faith.
2. Practice & Worship: 5 pillars.
3. Sacred Sources: Quran, Sunnah.
4. History: Seerah, Islamic history.
5. Ethics: Halal/Haram.
CORE RULE: Provide deep insights. Cite authentic sources.`;

            const response = await this.callOpenAI([
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ]);

            if (!response.ok) {
                if (response.status === 429) return "Limite di richieste raggiunto. Riprova più tardi.";
                throw new Error("OpenAI API Error");
            }

            const data = await response.json();
            return data.choices[0]?.message?.content || "Risposta vuota.";

        } catch (error) {
            console.error("❌ Generation Error:", error);
            // Fallback for very critical errors
            return "Il servizio di consultazione è momentaneamente occupato. Verifica la tua connessione o riprova tra un istante.";
        }
    }

    static async translate(text: string, targetLang: string): Promise<string> {
        const prompt = `Translate to ${targetLang}. Return ONLY the translation. Preserve religious terms. Text: ${text}`;
        return this.generateContent(prompt, targetLang);
    }

    static async generateStreamContent(prompt: string, language: string = 'it', onChunk: (chunk: string) => void): Promise<void> {
        try {
            const systemPrompt = language === 'it' ? "Sei un assistente islamico esperto." : "You are an expert Islamic assistant.";
            const response = await this.callOpenAI([
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ], true);

            if (!response.body) return;
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');
                for (const line of lines) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const json = JSON.parse(line.substring(6));
                            const content = json.choices[0]?.delta?.content;
                            if (content) onChunk(content);
                        } catch (e) { }
                    }
                }
            }
        } catch (e) {
            console.error("Stream Error", e);
            onChunk("Errore di connessione.");
        }
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

    static async generateBlogPost(topic: string): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
        const prompt = `Generate a blog post about: ${topic}. Return JSON: { "title": "", "content": "markdown", "excerpt": "", "tags": [] }`;
        try {
            const content = await this.generateContent(prompt);
            const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Blog Gen Error:", error);
            throw error;
        }
    }
}
