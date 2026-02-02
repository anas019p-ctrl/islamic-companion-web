
import { ScholarService } from '@/lib/ScholarService';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image?: string;
}

export class BlogService {
    private static STORAGE_KEY = 'islamic_app_daily_insight';

    static async getDailyInsight(): Promise<BlogPost> {
        // check if we already have today's insight
        const stored = localStorage.getItem(this.STORAGE_KEY);
        const today = new Date().toLocaleDateString();

        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.date === today && parsed.title) {
                return parsed;
            }
        }

        // Generate new insight
        const prompt = "Generate a 'Daily Islamic Insight' blog post. Structure it with a Title, Excerpt, and Full Content using Markdown. The content should connect a Quranic verse to a Hadith and a practical life lesson. Return JSON: { \"title\": \"...\", \"excerpt\": \"...\", \"content\": \"...\", \"category\": \"Daily Wisdom\" }";

        try {
            const response = await ScholarService.generateContent(prompt, 'it');
            // Clean up Markdown to get pure JSON if necessary (ScholarService usually returns string)
            // Since ScholarService.generateContent returns a string, we might need to parse it or just use it as content.
            // For robustness, let's treat the whole response as the content if parsing fails.

            let postData = {
                title: "Riflessione del Giorno",
                excerpt: "Un pensiero di saggezza islamica per oggi.",
                content: response,
                category: "Spiritualità"
            };

            // Attempt to parse if the model followed JSON instructions well
            try {
                const clean = response.replace(/```json/g, '').replace(/```/g, '').trim();
                const json = JSON.parse(clean);
                if (json.title && json.content) {
                    postData = { ...postData, ...json };
                }
            } catch (e) {
                // Fallback: use the raw text
                console.warn("Could not parse JSON from AI, using raw text", e);
            }

            const newPost: BlogPost = {
                id: 'daily-' + Date.now(),
                ...postData,
                date: today,
                author: 'AI Scholar',
                readTime: '3 min read',
                image: '/images/pattern-gold.png' // Placeholder
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newPost));
            return newPost;
        } catch (error) {
            console.error("Failed to generate daily insight", error);
            return {
                id: 'error',
                title: 'Servizio Momentaneamente Non Disponibile',
                excerpt: 'Riprova più tardi.',
                content: 'Ci scusiamo, ma non siamo riusciti a collegarci all\'archivio della sapienza in questo momento.',
                date: today,
                author: 'System',
                category: 'System',
                readTime: '1 min'
            };
        }
    }
}
