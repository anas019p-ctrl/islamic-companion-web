/**
 * 📚 PROPHETS QUIZ SERVICE
 * Infinite quiz generation about Prophets' stories using Gemini AI
 * Supports multilingual questions (Arabic, Italian, English)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { prophetsData } from '@/data/prophetsData';
import { ScholarService } from './ScholarService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export interface QuizQuestion {
    id: string;
    prophet: string;
    prophetAr: string;
    question: string;
    questionAr: string;
    questionIt: string;
    options: string[];
    optionsAr: string[];
    optionsIt: string[];
    correctAnswer: number; // Index of correct option
    explanation: string;
    explanationAr: string;
    explanationIt: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: 'story' | 'lesson' | 'miracle' | 'family' | 'general';
}

class ProphetsQuizService {
    private genAI: GoogleGenerativeAI;
    private model: any;
    private questionCache: Map<string, QuizQuestion[]> = new Map();

    // List of Prophets for quiz generation
    private readonly PROPHETS = [
        { en: 'Adam', ar: 'آدم', it: 'Adamo' },
        { en: 'Noah', ar: 'نوح', it: 'Noè' },
        { en: 'Ibrahim', ar: 'إبراهيم', it: 'Abramo' },
        { en: 'Ismail', ar: 'إسماعيل', it: 'Ismaele' },
        { en: 'Ishaq', ar: 'إسحاق', it: 'Isacco' },
        { en: 'Yaqub', ar: 'يعقوب', it: 'Giacobbe' },
        { en: 'Yusuf', ar: 'يوسف', it: 'Giuseppe' },
        { en: 'Musa', ar: 'موسى', it: 'Mosè' },
        { en: 'Harun', ar: 'هارون', it: 'Aronne' },
        { en: 'Dawud', ar: 'داوود', it: 'Davide' },
        { en: 'Sulaiman', ar: 'سليمان', it: 'Salomone' },
        { en: 'Ayyub', ar: 'أيوب', it: 'Giobbe' },
        { en: 'Yunus', ar: 'يونس', it: 'Giona' },
        { en: 'Zakariyya', ar: 'زكريا', it: 'Zaccaria' },
        { en: 'Yahya', ar: 'يحيى', it: 'Giovanni Battista' },
        { en: 'Isa', ar: 'عيسى', it: 'Gesù' },
        { en: 'Muhammad', ar: 'محمد', it: 'Muhammad' }
    ];

    constructor() {
        this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    }

    /**
     * Generate a single quiz question about a specific prophet
     */
    async generateQuestion(
        prophetName?: string,
        difficulty: 'easy' | 'medium' | 'hard' = 'medium',
        category?: 'story' | 'lesson' | 'miracle' | 'family' | 'general'
    ): Promise<QuizQuestion> {
        try {
            // Select random prophet if not specified
            const prophet = prophetName
                ? this.PROPHETS.find(p => p.en.toLowerCase() === prophetName.toLowerCase()) || this.PROPHETS[0]
                : this.PROPHETS[Math.floor(Math.random() * this.PROPHETS.length)];

            const categoryText = category || ['story', 'lesson', 'miracle', 'family', 'general'][Math.floor(Math.random() * 5)];

            const prompt = `Generate a ${difficulty} multiple-choice quiz question about Prophet ${prophet.en} (${prophet.ar}).

Category: ${categoryText}
- If "story": Ask about events in the prophet's life
- If "lesson": Ask about moral/spiritual lessons from the prophet
- If "miracle": Ask about miracles performed by the prophet
- If "family": Ask about the prophet's family members
- If "general": Ask general knowledge about the prophet

Requirements:
1. The question must be historically accurate based on Islamic sources (Quran and Sahih Hadith)
2. Provide the question in 3 languages: English, Arabic, and Italian
3. Provide 4 options (one correct, three plausible but wrong)
4. Provide a detailed explanation for the correct answer
5. All content must be in JSON format

Return ONLY a valid JSON object (no markdown, no extra text) with this exact structure:
{
  "question": "English question",
  "questionAr": "Arabic question",
  "questionIt": "Italian question",
  "options": ["option1_en", "option2_en", "option3_en", "option4_en"],
  "optionsAr": ["option1_ar", "option2_ar", "option3_ar", "option4_ar"],
  "optionsIt": ["option1_it", "option2_it", "option3_it", "option4_it"],
  "correctAnswer": 0,
  "explanation": "English explanation",
  "explanationAr": "Arabic explanation",
  "explanationIt": "Italian explanation"
}`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            let jsonText = response.text().trim();

            // Clean up the response - remove markdown code blocks if present
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            const questionData = JSON.parse(jsonText);

            return {
                id: `${prophet.en.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                prophet: prophet.en,
                prophetAr: prophet.ar,
                difficulty,
                category: categoryText as any,
                ...questionData
            };

        } catch (error) {
            console.error('Error generating quiz question:', error);
            // Fallback to a default question if generation fails
            return this.getFallbackQuestion(prophetName, difficulty);
        }
    }

    /**
     * Fallback question when API fails - uses static data
     */
    private getFallbackQuestion(
        prophetName?: string,
        difficulty: 'easy' | 'medium' | 'hard' = 'medium'
    ): QuizQuestion {
        // Try to find the prophet in our static data
        const staticProphet = prophetName
            ? prophetsData.find(p => p.name.toLowerCase() === prophetName.toLowerCase())
            : prophetsData[Math.floor(Math.random() * prophetsData.length)];

        const prophet = staticProphet || prophetsData[0]; // Adam by default

        // Pick a random fact for the correct answer
        const correctFact = prophet.keyFacts[Math.floor(Math.random() * prophet.keyFacts.length)];

        return {
            id: `static_${prophet.id}_${Date.now()}`,
            prophet: prophet.name,
            prophetAr: prophet.nameAr,
            question: `Which of these is a key fact about Prophet ${prophet.name}?`,
            questionAr: `ما هي الحقيقة الرئيسية عن النبي ${prophet.nameAr}؟`,
            questionIt: `Quale di questi è un fatto chiave sul Profeta ${prophet.name}?`,
            options: [
                correctFact,
                'Fu il primo re di un impero moderno',
                'Scoprì nuove terre oltre l\'oceano',
                'Insegnò scienze moderne in un\'università'
            ],
            optionsAr: [
                correctFact,
                'كان أول ملك لإمبراطورية حديثة',
                'اكتشف أراضٍ جديدة عبر المحيط',
                'علم العلوم الحديثة في الجامعة'
            ],
            optionsIt: [
                correctFact,
                'Fu il primo re di un impero moderno',
                'Scoprì nuove terre oltre l\'oceano',
                'Insegnò scienze moderne in un\'università'
            ],
            correctAnswer: 0,
            explanation: prophet.fullStoryIt || prophet.summary,
            explanationAr: prophet.summary,
            explanationIt: prophet.fullStoryIt || prophet.summary,
            difficulty,
            category: 'general'
        };
    }

    /**
     * Generate multiple questions (batch)
     * Now using ScholarService for TRUE infinite variation
     */
    async generateQuestions(count: number, options: {
        prophet?: string;
        difficulty?: 'easy' | 'medium' | 'hard';
        category?: 'story' | 'lesson' | 'miracle' | 'family' | 'general';
    } = {}): Promise<QuizQuestion[]> {
        try {
            const scholarLevel = options.difficulty === 'easy' ? 'beginner' : (options.difficulty === 'hard' ? 'advanced' : 'intermediate');
            const topic = options.prophet || 'Prophets of Islam';

            // Call ScholarService for infinite variations
            const aiQuestions = await ScholarService.generateInfiniteQuizBatch(
                topic,
                scholarLevel as any,
                'it', // Defaulting to 'it' as requested for core, but can be dynamic
                count
            );

            if (aiQuestions && aiQuestions.length > 0) {
                return aiQuestions.map(q => ({
                    id: q.id || `ai_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                    prophet: topic,
                    prophetAr: topic,
                    question: q.questionEn,
                    questionAr: q.questionAr,
                    questionIt: q.questionIt,
                    options: q.optionsEn,
                    optionsAr: q.optionsAr,
                    optionsIt: q.optionsIt,
                    correctAnswer: q.correctIndex,
                    explanation: q.explanationEn,
                    explanationAr: q.explanationAr,
                    explanationIt: q.explanationIt,
                    difficulty: options.difficulty || 'medium',
                    category: options.category || 'general'
                }));
            }
        } catch (error) {
            console.error("AI batch generation failed, falling back to static questions", error);
        }

        // Fallback to static generation if AI fails
        const questions: QuizQuestion[] = [];
        for (let i = 0; i < count; i++) {
            questions.push(await this.generateQuestion(options.prophet, options.difficulty, options.category));
        }
        return questions;
    }

    /**
     * Get a random prophet
     */
    getRandomProphet() {
        return this.PROPHETS[Math.floor(Math.random() * this.PROPHETS.length)];
    }

    /**
     * Get all prophets list
     */
    getAllProphets() {
        return this.PROPHETS;
    }


    /**
     * Clear question cache
     */
    clearCache(): void {
        this.questionCache.clear();
    }
}

// Export singleton instance
export const prophetsQuizService = new ProphetsQuizService();
export default prophetsQuizService;
