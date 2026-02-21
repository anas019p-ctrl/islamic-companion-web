import { supabase } from "@/integrations/supabase/client";
import OpenRouterService from './OpenRouterService';

interface AIProvider {
    name: string;
    baseUrl: string;
    model: string;
    apiKey: string | undefined;
}

// ⚠️ OpenRouter key is hardcoded as fallback so the app works on Cloudflare
// even before env vars are configured in the dashboard.
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY
    || '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';

export class ScholarService {
    private static sessionHistory: string[] = [];
    private static MAX_HISTORY = 5;

    static clearHistory() {
        this.sessionHistory = [];
    }
    private static PROVIDERS: AIProvider[] = [
        {
            name: 'OpenRouter',
            baseUrl: 'https://openrouter.ai/api/v1/chat/completions',
            model: 'anthropic/claude-3.5-sonnet',
            apiKey: OPENROUTER_KEY
        },
        {
            name: 'OpenAI',
            baseUrl: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-4o-mini',
            apiKey: import.meta.env.VITE_OPENAI_API_KEY
        },
        {
            name: 'DeepSeek',
            baseUrl: 'https://api.deepseek.com/chat/completions',
            model: 'deepseek-chat',
            apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY
        }
    ];


    private static async fetchFromProvider(provider: AIProvider, messages: any[], stream: boolean = false): Promise<Response> {
        if (!provider.apiKey) throw new Error(`${provider.name} API Key missing`);

        return fetch(provider.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${provider.apiKey}`
            },
            body: JSON.stringify({
                model: provider.model,
                messages: messages,
                temperature: 0.7,
                stream: stream
            })
        });
    }

    static async generateContent(prompt: string, language: string = 'it', role: 'scholar' | 'kids' | 'general' = 'scholar'): Promise<string> {
        // Build context-aware prompt with history
        const contextStr = this.sessionHistory.length > 0
            ? `\nCONTEXT (Previous topics discussed in this session): ${this.sessionHistory.join(', ')}. Avoid repeating the same details if already mentioned.`
            : '';

        const fullPrompt = prompt + contextStr;

        try {
            let content = '';

            if (role === 'kids') {
                content = await OpenRouterService.generateKidsStory(prompt, language);
            } else {
                content = await OpenRouterService.answerIslamicQuestion(fullPrompt, language);
            }

            // Update history
            this.sessionHistory.push(prompt.substring(0, 50));
            if (this.sessionHistory.length > this.MAX_HISTORY) {
                this.sessionHistory.shift();
            }

            return content;
        } catch (error) {
            console.error("ScholarService Error:", error);
            return language === 'it'
                ? "Il servizio è momentaneamente occupato. Riprova tra poco."
                : "The service is temporarily busy. Please try again soon.";
        }
    }

    private static async generateRawContent(messages: any[]): Promise<string> {
        // This is now legacy, using OpenRouterService directly
        const userMessage = messages.find(m => m.role === 'user')?.content || '';
        return OpenRouterService.answerIslamicQuestion(userMessage);
    }

    private static async validateResponseAccuracy(content: string, language: string): Promise<string> {
        // Logic is now handled by stricter system prompts in OpenRouterService
        return content;
    }

    static async translate(text: string, targetLang: string): Promise<string> {
        const prompt = `Translate to ${targetLang}. Return ONLY the translation. Preserve religious terms. Text: ${text}`;
        return this.generateContent(prompt, targetLang);
    }

    static async generateStreamContent(prompt: string, language: string = 'it', onChunk: (chunk: string) => void): Promise<void> {
        const systemPrompt = language === 'it' ? "Sei un assistente islamico esperto." : "You are an expert Islamic assistant.";
        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ];

        for (const provider of this.PROVIDERS) {
            try {
                if (!provider.apiKey) continue;

                const response = await this.fetchFromProvider(provider, messages, true);
                if (!response.ok || !response.body) {
                    if (response.status === 429 || response.status >= 500) continue;
                    throw new Error("Stream failure");
                }

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
                            } catch (e) { /* Ignore partial or invalid JSON chunks */ }
                        }
                    }
                }
                return; // Success!

            } catch (e) {
                console.error(`Stream Provider ${provider.name} failed`, e);
                continue;
            }
        }
        onChunk("Errore di connessione persistente.");
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

    /**
     * 🚀 OPENROUTER ENHANCED METHODS - Unlimited & Fast
     */
    static async translateWithOpenRouter(text: string, targetLang: string): Promise<string> {
        try {
            return await OpenRouterService.translate(text, targetLang, true);
        } catch (error) {
            console.warn('OpenRouter translation failed, using fallback');
            return await this.translate(text, targetLang);
        }
    }

    static async explainHadithWithAI(hadithText: string, language: string = 'it'): Promise<string> {
        try {
            return await OpenRouterService.explainHadith(hadithText, language);
        } catch (error) {
            console.warn('OpenRouter hadith explanation failed');
            throw error;
        }
    }

    static async answerQuestion(question: string, language: string = 'it'): Promise<string> {
        try {
            return await OpenRouterService.answerIslamicQuestion(question, language);
        } catch (error) {
            console.warn('OpenRouter Q&A failed');
            return await this.generateContent(question, language);
        }
    }

    static async verifyHadithAuthenticity(hadithText: string): Promise<string> {
        try {
            return await OpenRouterService.verifyHadithAuthenticity(hadithText);
        } catch (error) {
            console.warn('OpenRouter hadith verification failed');
            throw error;
        }
    }

    static async generateKidsStoryWithAI(prophetName: string, language: string = 'it'): Promise<string> {
        try {
            // The original instruction snippet for this method was incorrect.
            // Assuming the intent was to use OpenRouterService and then fallback.
            // History update for generateContent is handled within generateContent itself.
            return await OpenRouterService.generateKidsStory(prophetName, language);
        } catch (error) {
            console.warn('OpenRouter kids story failed');
            const prompt = `Racconta una storia interattiva per bambini sul profeta ${prophetName}.`;
            return await this.generateContent(prompt, language, 'kids');
        }
    }
}
