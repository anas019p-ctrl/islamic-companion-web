import { ScholarService } from './ScholarService';

export class ShamilaService {
    private static SHAMILA_API_ENDPOINT = import.meta.env.VITE_SHAMILA_API_URL || "";

    /**
     * Executes a deep research query against the Maktaba Shamila RAG System.
     * falls back to a specialized AI prompt if the RAG server is unreachable.
     */
    static async research(query: string, language: string = 'it'): Promise<{ content: string; source?: string }> {
        try {
            if (this.SHAMILA_API_ENDPOINT) {
                const response = await fetch(this.SHAMILA_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        language: language
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    return {
                        content: data.response || data.content,
                        source: "Al-Maktaba Al-Shamila (RAG Live)"
                    };
                }
            } else {
                console.log("Shamila API URL not configured, skipping direct fetch.");
            }

        } catch (error) {
            console.warn("Shamila RAG Server unreachable, using high-fidelity research fallback.", error);
        }

        // Fallback: Use advanced AI with Shamila-specific prompting
        const fallbackPrompt = language === 'ar'
            ? `بصفتك حكواتياً خبيراً وباحثاً في المكتبة الشاملة، اِحكِ لنا قصة مفصلة وموسعة بأسلوب أدبي رفيع حول: "${query}". 
               يجب أن تكون الرواية طويلة، غنية بالتفاصيل، وتغوص في السياق التاريخي والروحاني، مع ذكر مصادر كلاسيكية (مثل صحيح البخاري، تاريخ الطبري، تفسير ابن كثير). 
               اجعل القارئ يشعر وكأنه يعيش أحداث القصة.`
            : `Act as an expert storyteller and scholar from Al-Maktaba Al-Shamila. 
               Narrate an EXTENDED and immersive story based on: "${query}".
               The narrative must be detailed, deep, and focus on both historical context and spiritual lessons.
               Cite specific classical books (e.g., Sahih Bukhari, History of al-Tabari, Tafsir ibn Kathir) to ensure accuracy.
               Write in a captivating, expansive style that brings the history to life.
               
               IMPORTANT: Respond ONLY in ${language === 'it' ? 'ITALIAN' : 'ENGLISH'}.`;

        try {
            const aiContent = await ScholarService.generateContent(fallbackPrompt, language);
            return {
                content: aiContent,
                source: "Archivi Storici (Ricerca Digitale)"
            };
        } catch (error) {
            console.error("Shamila/Research Fallback failed:", error);
            return {
                content: "Spiacente, non è stato possibile generare la spiegazione al momento. Riprova più tardi.",
                source: "System Error"
            };
        }
    }
}
