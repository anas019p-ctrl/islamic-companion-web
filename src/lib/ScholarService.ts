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

    static async generateContent(prompt: string, language: string = 'it'): Promise<string> {
        try {
            const { data, error } = await supabase.functions.invoke('scholar-ai', {
                body: { action: 'chat', prompt, language }
            });

            if (error) {
                console.error("❌ Edge Function Error:", error);
                if (error.status === 429) return "Limite di richieste raggiunto. Riprova tra un minuto.";
                throw error;
            }

            const content = data?.content;
            if (content) return this.ensureString(content, "Spiacente, risposta non valida.");

        } catch (error) {
            console.error("❌ Generation Error:", error);
            return "Il servizio di consultazione è momentaneamente occupato. Ti preghiamo di riprovare tra un istante.";
        }

        return "Errore imprevisto nel collegamento.";
    }

    static async translate(text: string, targetLang: string): Promise<string> {
        const prompt = `Translate to ${targetLang}. Return ONLY the translation. Preserve religious terms. Text: ${text}`;
        return this.generateContent(prompt, targetLang);
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

    static async generateBlogPost(topic: string): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
        try {
            const { data, error } = await supabase.functions.invoke('scholar-ai', {
                body: { action: 'blog-generate', topic }
            });

            if (error) {
                console.error("❌ AI Blog Generation Error:", error);
                throw error;
            }

            return data;
        } catch (error) {
            console.error("❌ Generation Error:", error);
            throw error;
        }
    }
}
