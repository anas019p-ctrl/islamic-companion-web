/**
 * 🌍 TRANSLATION SERVICE
 * Alternative to Google Translate using free and reliable APIs
 * Supports: MyMemory API (free, no key needed) + Gemini AI fallback
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyDwhhh92P5dlREFe_hqkT6MoU_Qj79-bDg';

interface TranslationResult {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    service: 'mymemory' | 'gemini' | 'cache';
}

class TranslationService {
    private cache: Map<string, string> = new Map();
    private genAI: GoogleGenerativeAI;
    private model: any;

    constructor() {
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    /**
     * Get cache key for translation
     */
    private getCacheKey(text: string, from: string, to: string): string {
        return `${from}:${to}:${text.substring(0, 100)}`;
    }

    /**
     * Translate using MyMemory API (Free, no API key needed)
     * Limit: 1000 words/day per IP (usually enough)
     */
    private async translateWithMyMemory(
        text: string,
        from: string = 'auto',
        to: string = 'it'
    ): Promise<string> {
        try {
            // MyMemory API endpoint
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.responseStatus === 200 && data.responseData) {
                return data.responseData.translatedText;
            }

            throw new Error('MyMemory translation failed');
        } catch (error) {
            console.warn('MyMemory API error:', error);
            throw error;
        }
    }

    /**
     * Translate using Gemini AI (Fallback, very accurate)
     */
    private async translateWithGemini(
        text: string,
        from: string = 'auto',
        to: string = 'it'
    ): Promise<string> {
        try {
            const targetLang = this.getLanguageName(to);
            const sourceLang = from === 'auto' ? 'detected language' : this.getLanguageName(from);

            const prompt = `Translate the following text from ${sourceLang} to ${targetLang}. 
Provide ONLY the translation without any explanations, notes, or additional text.
If the text contains Islamic terms, preserve them accurately.

Text to translate:
${text}

Translation:`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const translation = response.text().trim();

            // Remove any markdown or extra formatting
            return translation.replace(/^["']|["']$/g, '').trim();
        } catch (error) {
            console.error('Gemini translation error:', error);
            throw error;
        }
    }

    /**
     * Get full language name from code
     */
    private getLanguageName(code: string): string {
        const languages: Record<string, string> = {
            'it': 'Italian',
            'en': 'English',
            'ar': 'Arabic',
            'fr': 'French',
            'es': 'Spanish',
            'de': 'German',
            'tr': 'Turkish',
            'ur': 'Urdu',
            'auto': 'auto-detect'
        };
        return languages[code] || code;
    }

    /**
     * Main translation method with intelligent fallback
     */
    async translate(
        text: string,
        options: {
            from?: string;
            to?: string;
            preferGemini?: boolean;
        } = {}
    ): Promise<TranslationResult> {
        const { from = 'auto', to = 'it', preferGemini = false } = options;

        // Check cache first
        const cacheKey = this.getCacheKey(text, from, to);
        if (this.cache.has(cacheKey)) {
            return {
                translatedText: this.cache.get(cacheKey)!,
                sourceLanguage: from,
                targetLanguage: to,
                service: 'cache'
            };
        }

        try {
            let translatedText: string;
            let service: 'mymemory' | 'gemini';

            if (preferGemini || text.length > 500) {
                // Use Gemini for long texts or when preferred
                translatedText = await this.translateWithGemini(text, from, to);
                service = 'gemini';
            } else {
                try {
                    // Try MyMemory first (faster, free)
                    translatedText = await this.translateWithMyMemory(text, from, to);
                    service = 'mymemory';
                } catch (error) {
                    // Fallback to Gemini
                    console.log('MyMemory failed, using Gemini fallback');
                    translatedText = await this.translateWithGemini(text, from, to);
                    service = 'gemini';
                }
            }

            // Cache the result
            this.cache.set(cacheKey, translatedText);

            // Limit cache size
            if (this.cache.size > 1000) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }

            return {
                translatedText,
                sourceLanguage: from,
                targetLanguage: to,
                service
            };

        } catch (error) {
            console.error('Translation failed:', error);
            // Return original text if all fails
            return {
                translatedText: text,
                sourceLanguage: from,
                targetLanguage: to,
                service: 'mymemory'
            };
        }
    }

    /**
     * Batch translation for multiple texts
     */
    async translateBatch(
        texts: string[],
        options: { from?: string; to?: string } = {}
    ): Promise<string[]> {
        const results = await Promise.all(
            texts.map(text => this.translate(text, options))
        );
        return results.map(r => r.translatedText);
    }

    /**
     * Detect language of text
     */
    async detectLanguage(text: string): Promise<string> {
        try {
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 100))}&langpair=auto|en`;
            const response = await fetch(url);
            const data = await response.json();
            
            // MyMemory doesn't provide language detection, use Gemini
            const prompt = `Detect the language of this text and respond with ONLY the ISO 639-1 language code (e.g., 'en', 'ar', 'it'). Text: ${text.substring(0, 200)}`;
            
            const result = await this.model.generateContent(prompt);
            const response2 = await result.response;
            return response2.text().trim().toLowerCase();
        } catch (error) {
            console.error('Language detection error:', error);
            return 'en'; // Default to English
        }
    }

    /**
     * Clear translation cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}

// Export singleton instance
export const translationService = new TranslationService();
export default translationService;
