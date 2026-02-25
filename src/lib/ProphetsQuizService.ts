/**
 * 📚 PROPHETS QUIZ SERVICE
 * Infinite quiz generation about Prophets' stories using Gemini AI
 * Supports multilingual questions (Arabic, Italian, English)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = 'AIzaSyDwhhh92P5dlREFe_hqkT6MoU_Qj79-bDg';

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
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
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
     * Generate multiple questions (batch)
     */
    async generateQuestions(count: number, options: {
        prophet?: string;
        difficulty?: 'easy' | 'medium' | 'hard';
        category?: 'story' | 'lesson' | 'miracle' | 'family' | 'general';
    } = {}): Promise<QuizQuestion[]> {
        const questions: QuizQuestion[] = [];
        
        for (let i = 0; i < count; i++) {
            try {
                const question = await this.generateQuestion(
                    options.prophet,
                    options.difficulty,
                    options.category
                );
                questions.push(question);
                
                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.error(`Failed to generate question ${i + 1}:`, error);
            }
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
     * Fallback question when API fails
     */
    private getFallbackQuestion(
        prophetName?: string,
        difficulty: 'easy' | 'medium' | 'hard' = 'medium'
    ): QuizQuestion {
        const prophet = prophetName 
            ? this.PROPHETS.find(p => p.en.toLowerCase() === prophetName.toLowerCase()) || this.PROPHETS[16]
            : this.PROPHETS[16]; // Muhammad by default

        return {
            id: `fallback_${Date.now()}`,
            prophet: prophet.en,
            prophetAr: prophet.ar,
            question: `What is the main message that Prophet ${prophet.en} brought to his people?`,
            questionAr: `ما هي الرسالة الرئيسية التي جاء بها النبي ${prophet.ar} لقومه؟`,
            questionIt: `Qual è il messaggio principale che il Profeta ${prophet.it} ha portato al suo popolo?`,
            options: [
                'Belief in One God (Tawhid)',
                'Polytheism is acceptable',
                'No life after death',
                'Worship of idols'
            ],
            optionsAr: [
                'الإيمان بالله الواحد (التوحيد)',
                'الشرك مقبول',
                'لا حياة بعد الموت',
                'عبادة الأصنام'
            ],
            optionsIt: [
                'Credere in un Unico Dio (Tawhid)',
                'Il politeismo è accettabile',
                'Nessuna vita dopo la morte',
                'Adorazione degli idoli'
            ],
            correctAnswer: 0,
            explanation: 'All prophets came with the same fundamental message: belief in One God (Tawhid), which is the core of Islam.',
            explanationAr: 'جميع الأنبياء جاؤوا بنفس الرسالة الأساسية: الإيمان بالله الواحد (التوحيد)، وهو جوهر الإسلام.',
            explanationIt: 'Tutti i profeti sono venuti con lo stesso messaggio fondamentale: credere in un Unico Dio (Tawhid), che è il nucleo dell\'Islam.',
            difficulty,
            category: 'general'
        };
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
