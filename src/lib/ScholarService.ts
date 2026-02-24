import OpenRouterService from './OpenRouterService';

/**
 * 🎓 SCHOLAR SERVICE - Islamic Knowledge Hub
 * 
 * This service provides AI-powered Islamic content generation
 * with robust error handling and fallback mechanisms.
 * 
 * All AI calls go through OpenRouter for reliability.
 * 🛡️ STRICT ISLAMIC FILTER: Only responds to Islamic topics
 */

// Error messages in multiple languages
const ERROR_MESSAGES: Record<string, { busy: string; connection: string; retry: string }> = {
    'it': {
        busy: "Il servizio è momentaneamente occupato. Riprova tra qualche secondo.",
        connection: "Errore di connessione. Verifica la tua connessione internet e riprova.",
        retry: "Si è verificato un errore. Riprova tra poco."
    },
    'en': {
        busy: "The service is temporarily busy. Please try again in a few seconds.",
        connection: "Connection error. Please check your internet connection and try again.",
        retry: "An error occurred. Please try again soon."
    },
    'ar': {
        busy: "الخدمة مشغولة مؤقتاً. يرجى المحاولة مرة أخرى بعد بضع ثوانٍ.",
        connection: "خطأ في الاتصال. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.",
        retry: "حدث خطأ. يرجى المحاولة مرة أخرى قريباً."
    }
};

export class ScholarService {
    private static sessionHistory: string[] = [];
    private static MAX_HISTORY = 5;
    private static requestCount = 0;
    private static lastRequestTime = 0;
    private static RATE_LIMIT_DELAY = 1000; // 1 second between requests

    /**
     * Clear conversation history
     */
    static clearHistory() {
        this.sessionHistory = [];
    }

    /**
     * Get error message in the specified language
     */
    private static getErrorMessage(type: 'busy' | 'connection' | 'retry', language: string): string {
        const messages = ERROR_MESSAGES[language] || ERROR_MESSAGES['en'];
        return messages[type];
    }

    /**
     * Rate limiting helper
     */
    private static async rateLimitCheck(): Promise<void> {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        if (timeSinceLastRequest < this.RATE_LIMIT_DELAY) {
            await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY - timeSinceLastRequest));
        }
        
        this.lastRequestTime = Date.now();
        this.requestCount++;
    }

    /**
     * 📚 MAIN CONTENT GENERATION
     * Generates Islamic content with context awareness
     */
    static async generateContent(
        prompt: string, 
        language: string = 'it', 
        role: 'scholar' | 'kids' | 'general' = 'scholar'
    ): Promise<string> {
        await this.rateLimitCheck();

        // Build context-aware prompt with history
        const contextStr = this.sessionHistory.length > 0
            ? `\nCONTEXT (Previous topics discussed): ${this.sessionHistory.join(', ')}. Avoid repeating details.`
            : '';

        const fullPrompt = prompt + contextStr;

        try {
            let content = '';

            if (role === 'kids') {
                content = await OpenRouterService.generateKidsStory(prompt, language);
            } else {
                content = await OpenRouterService.answerIslamicQuestion(fullPrompt, language);
            }

            // Update history on success
            this.sessionHistory.push(prompt.substring(0, 50));
            if (this.sessionHistory.length > this.MAX_HISTORY) {
                this.sessionHistory.shift();
            }

            return content;
        } catch (error) {
            console.error("ScholarService.generateContent Error:", error);
            
            // Determine error type
            if (error instanceof Error) {
                if (error.message.includes('429') || error.message.includes('rate')) {
                    return this.getErrorMessage('busy', language);
                }
                if (error.message.includes('network') || error.message.includes('fetch')) {
                    return this.getErrorMessage('connection', language);
                }
            }
            
            return this.getErrorMessage('retry', language);
        }
    }

    /**
     * 🌍 TRANSLATION SERVICE
     */
    static async translate(text: string, targetLang: string): Promise<string> {
        await this.rateLimitCheck();
        
        try {
            return await OpenRouterService.translate(text, targetLang, true);
        } catch (error) {
            console.error("ScholarService.translate Error:", error);
            throw error;
        }
    }

    /**
     * 📡 STREAMING CONTENT (Fallback to non-streaming)
     */
    static async generateStreamContent(
        prompt: string, 
        language: string = 'it', 
        onChunk: (chunk: string) => void
    ): Promise<void> {
        try {
            const content = await this.generateContent(prompt, language);
            onChunk(content);
        } catch (e) {
            console.error("ScholarService.generateStreamContent Error:", e);
            onChunk(this.getErrorMessage('connection', language));
        }
    }

    /**
     * 📝 QUIZ QUESTION GENERATION
     */
    static async generateQuizQuestion(
        level: 'beginner' | 'intermediate' | 'advanced', 
        language: string = 'it'
    ): Promise<any> {
        const prompt = `Generate an Arabic learning quiz question, level ${level}. JSON only: { "question": "", "translation": "", "options": [], "correctAnswer": "" }`;
        
        try {
            const response = await this.generateContent(prompt, language);
            const cleanJson = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Quiz generation failed:", error);
            // Return fallback question
            return { 
                question: "شكراً", 
                translation: language === 'it' ? "Grazie" : "Thank you", 
                options: language === 'it' 
                    ? ["Grazie", "Prego", "Ciao", "Sì"]
                    : ["Thank you", "You're welcome", "Hello", "Yes"], 
                correctAnswer: language === 'it' ? "Grazie" : "Thank you"
            };
        }
    }

    /**
     * 📰 BLOG POST GENERATION
     */
    static async generateBlogPost(topic: string): Promise<{ title: string; content: string; excerpt: string; tags: string[] }> {
        const prompt = `Generate an Islamic blog post about: ${topic}. Return JSON: { "title": "", "content": "markdown content", "excerpt": "brief summary", "tags": ["tag1", "tag2"] }`;
        
        try {
            const content = await this.generateContent(prompt);
            const cleanJson = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Blog Gen Error:", error);
            // Return fallback blog post
            return {
                title: "Riflessione del Giorno",
                content: "Il contenuto non è disponibile al momento. Riprova più tardi.",
                excerpt: "Contenuto non disponibile",
                tags: ["islam", "riflessione"]
            };
        }
    }

    /**
     * 🚀 OPENROUTER ENHANCED METHODS
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
        await this.rateLimitCheck();
        
        try {
            return await OpenRouterService.explainHadith(hadithText, language);
        } catch (error) {
            console.error('Hadith explanation failed:', error);
            return this.getErrorMessage('retry', language);
        }
    }

    static async answerQuestion(question: string, language: string = 'it'): Promise<string> {
        try {
            return await OpenRouterService.answerIslamicQuestion(question, language);
        } catch (error) {
            console.warn('OpenRouter Q&A failed, using fallback');
            return await this.generateContent(question, language);
        }
    }

    static async verifyHadithAuthenticity(hadithText: string): Promise<string> {
        await this.rateLimitCheck();
        
        try {
            return await OpenRouterService.verifyHadithAuthenticity(hadithText);
        } catch (error) {
            console.error('Hadith verification failed:', error);
            throw error;
        }
    }

    static async generateKidsStoryWithAI(prophetName: string, language: string = 'it'): Promise<string> {
        await this.rateLimitCheck();
        
        try {
            return await OpenRouterService.generateKidsStory(prophetName, language);
        } catch (error) {
            console.warn('OpenRouter kids story failed, using fallback');
            const prompt = language === 'it'
                ? `Racconta una storia interattiva per bambini sul profeta ${prophetName}.`
                : `Tell an interactive story for children about Prophet ${prophetName}.`;
            return await this.generateContent(prompt, language, 'kids');
        }
    }

    /**
     * 📖 GENERATE TAFSIR
     */
    static async generateTafsir(surah: number, ayah: number, language: string = 'it'): Promise<string> {
        await this.rateLimitCheck();
        
        try {
            return await OpenRouterService.generateTafsir(surah, ayah, language);
        } catch (error) {
            console.error('Tafsir generation failed:', error);
            return this.getErrorMessage('retry', language);
        }
    }
}
