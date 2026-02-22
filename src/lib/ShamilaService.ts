import { ScholarService } from './ScholarService';
import OpenRouterService from './OpenRouterService';

/**
 * 📚 SHAMILA SERVICE - Classical Islamic Library Research
 * 
 * Provides deep research capabilities through AI-powered analysis
 * of classical Islamic texts and sources.
 * 
 * Uses OpenRouter for all AI operations with fallback mechanisms.
 */

export class ShamilaService {
    private static SHAMILA_API_ENDPOINT = import.meta.env.VITE_SHAMILA_API_URL || "";

    /**
     * 🔍 DEEP RESEARCH
     * Executes a deep research query against Islamic classical sources.
     * Falls back to AI-powered research if RAG server is unavailable.
     */
    static async research(query: string, language: string = 'it'): Promise<{ content: string; source?: string }> {
        // Try Shamila RAG endpoint first if configured
        if (this.SHAMILA_API_ENDPOINT) {
            try {
                const response = await fetch(this.SHAMILA_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        language: language
                    }),
                    signal: AbortSignal.timeout(10000) // 10 second timeout
                });

                if (response.ok) {
                    const data = await response.json();
                    return {
                        content: data.response || data.content,
                        source: "Al-Maktaba Al-Shamila (RAG Live)"
                    };
                }
            } catch (error) {
                console.warn("Shamila RAG Server unreachable, using AI fallback.", error);
            }
        }

        // AI Fallback with enhanced prompting
        return await this.aiResearchFallback(query, language);
    }

    /**
     * 🤖 AI RESEARCH FALLBACK
     * Uses OpenRouter to generate scholarly responses when RAG is unavailable
     */
    private static async aiResearchFallback(query: string, language: string): Promise<{ content: string; source?: string }> {
        const prompts: Record<string, string> = {
            'ar': `بصفتك باحثاً خبيراً في المكتبة الشاملة والتراث الإسلامي، أجب على السؤال التالي بتفصيل وعمق:

"${query}"

يجب أن تتضمن إجابتك:
- مصادر كلاسيكية موثقة (صحيح البخاري، صحيح مسلم، تاريخ الطبري، تفسير ابن كثير، إلخ)
- السياق التاريخي والروحاني
- الدروس والعبر المستفادة
- آراء العلماء المختلفة إن وجدت

اكتب بأسلوب علمي رفيع يناسب الباحثين والمتعلمين.`,

            'it': `Come esperto ricercatore della Maktaba Shamila e del patrimonio islamico, rispondi alla seguente domanda con dettaglio e profondità:

"${query}"

La tua risposta deve includere:
- Fonti classiche documentate (Sahih Bukhari, Sahih Muslim, Storia di al-Tabari, Tafsir Ibn Kathir, ecc.)
- Contesto storico e spirituale
- Lezioni e insegnamenti derivati
- Diverse opinioni degli studiosi se presenti

Scrivi in uno stile accademico elevato adatto a ricercatori e studenti.
IMPORTANTE: Rispondi SOLO in ITALIANO.`,

            'en': `As an expert researcher of the Maktaba Shamila and Islamic heritage, answer the following question with detail and depth:

"${query}"

Your response must include:
- Documented classical sources (Sahih Bukhari, Sahih Muslim, History of al-Tabari, Tafsir Ibn Kathir, etc.)
- Historical and spiritual context
- Derived lessons and teachings
- Different scholarly opinions if present

Write in an elevated academic style suitable for researchers and students.`
        };

        const prompt = prompts[language] || prompts['en'];

        try {
            const content = await OpenRouterService.answerIslamicQuestion(prompt, language);
            return {
                content: content,
                source: language === 'it' 
                    ? "Archivi Storici Islamici (Ricerca AI)" 
                    : language === 'ar'
                        ? "الأرشيف التاريخي الإسلامي (بحث ذكي)"
                        : "Islamic Historical Archives (AI Research)"
            };
        } catch (error) {
            console.error("Shamila AI Fallback failed:", error);
            
            // Final fallback through ScholarService
            try {
                const fallbackContent = await ScholarService.generateContent(query, language, 'scholar');
                return {
                    content: fallbackContent,
                    source: language === 'it' 
                        ? "Assistente Islamico" 
                        : "Islamic Assistant"
                };
            } catch (fallbackError) {
                console.error("Complete research failure:", fallbackError);
                return {
                    content: language === 'it'
                        ? "Spiacente, non è stato possibile completare la ricerca al momento. Riprova più tardi."
                        : language === 'ar'
                            ? "عذراً، لم نتمكن من إكمال البحث في الوقت الحالي. يرجى المحاولة لاحقاً."
                            : "Sorry, we could not complete the research at this time. Please try again later.",
                    source: "System Error"
                };
            }
        }
    }

    /**
     * 📖 SEARCH SPECIFIC BOOK
     * Searches within a specific classical Islamic book
     */
    static async searchBook(bookName: string, query: string, language: string = 'it'): Promise<{ content: string; source?: string }> {
        const prompt = language === 'it'
            ? `Cerca nel libro "${bookName}" informazioni su: "${query}". Cita passaggi specifici se possibile.`
            : language === 'ar'
                ? `ابحث في كتاب "${bookName}" عن معلومات حول: "${query}". اذكر مقاطع محددة إن أمكن.`
                : `Search in the book "${bookName}" for information about: "${query}". Cite specific passages if possible.`;

        try {
            const content = await OpenRouterService.answerIslamicQuestion(prompt, language);
            return {
                content: content,
                source: bookName
            };
        } catch (error) {
            console.error("Book search failed:", error);
            return this.research(query, language);
        }
    }

    /**
     * 📜 GET HADITH EXPLANATION
     * Provides scholarly explanation of a hadith
     */
    static async explainHadith(hadithText: string, language: string = 'it'): Promise<{ content: string; source?: string }> {
        try {
            const content = await OpenRouterService.explainHadith(hadithText, language);
            return {
                content: content,
                source: language === 'it' ? "Spiegazione Accademica" : "Scholarly Explanation"
            };
        } catch (error) {
            console.error("Hadith explanation failed:", error);
            return this.research(`Spiega questo hadith: ${hadithText}`, language);
        }
    }
}
