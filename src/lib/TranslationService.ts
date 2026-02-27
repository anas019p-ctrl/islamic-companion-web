/**
 * 🌍 TRANSLATION SERVICE
 * Uses MyMemory API (free, no key) + OpenRouter AI as fallback
 * Removed Gemini dependency (key was leaked/revoked)
 */

import OpenRouterService from './OpenRouterService';

interface TranslationResult {
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    service: 'mymemory' | 'openrouter' | 'cache';
}

class TranslationService {
    private cache: Map<string, string> = new Map();

    private getCacheKey(text: string, from: string, to: string): string {
        return `${from}:${to}:${text.substring(0, 100)}`;
    }

    /**
     * Translate using MyMemory API (Free, no API key needed)
     */
    private async translateWithMyMemory(text: string, from: string = 'auto', to: string = 'it'): Promise<string> {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData) {
            return data.responseData.translatedText;
        }
        throw new Error('MyMemory translation failed');
    }

    /**
     * Get full language name from code
     */
    private getLanguageName(code: string): string {
        const languages: Record<string, string> = {
            'it': 'Italian', 'en': 'English', 'ar': 'Arabic',
            'fr': 'French', 'es': 'Spanish', 'de': 'German',
            'tr': 'Turkish', 'ur': 'Urdu', 'auto': 'auto-detect'
        };
        return languages[code] || code;
    }

    /**
     * Main translation method with intelligent fallback
     */
    async translate(text: string, options: { from?: string; to?: string; preferGemini?: boolean } = {}): Promise<TranslationResult> {
        const { from = 'auto', to = 'it' } = options;

        const cacheKey = this.getCacheKey(text, from, to);
        if (this.cache.has(cacheKey)) {
            return { translatedText: this.cache.get(cacheKey)!, sourceLanguage: from, targetLanguage: to, service: 'cache' };
        }

        // Try MyMemory first (free, fast)
        try {
            const translatedText = await this.translateWithMyMemory(text, from, to);
            this.cache.set(cacheKey, translatedText);
            if (this.cache.size > 1000) {
                const firstKey = this.cache.keys().next().value;
                if (firstKey) this.cache.delete(firstKey);
            }
            return { translatedText, sourceLanguage: from, targetLanguage: to, service: 'mymemory' };
        } catch {
            // Fallback to OpenRouter AI
        }

        // OpenRouter fallback
        try {
            const targetLanguageName = this.getLanguageName(to);
            const translatedText = await OpenRouterService.translate(text, to, false);
            this.cache.set(cacheKey, translatedText);
            return { translatedText, sourceLanguage: from, targetLanguage: to, service: 'openrouter' };
        } catch (error) {
            console.error('All translation services failed:', error);
            return { translatedText: text, sourceLanguage: from, targetLanguage: to, service: 'mymemory' };
        }
    }

    /**
     * Batch translation
     */
    async translateBatch(texts: string[], options: { from?: string; to?: string } = {}): Promise<string[]> {
        const results = await Promise.all(texts.map(text => this.translate(text, options)));
        return results.map(r => r.translatedText);
    }

    /**
     * Detect language of text (uses MyMemory)
     */
    async detectLanguage(text: string): Promise<string> {
        try {
            const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 100))}&langpair=auto|en`;
            const response = await fetch(url);
            const data = await response.json();
            // MyMemory doesn't provide detection directly, default to 'en'
            return data.responseData?.detectedLanguage || 'en';
        } catch {
            return 'en';
        }
    }

    /**
     * Clear translation cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}

export const translationService = new TranslationService();
export default translationService;
