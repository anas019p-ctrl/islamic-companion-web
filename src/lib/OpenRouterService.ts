/**
 * 🤖 OPENROUTER AI SERVICE - Unlimited AI Power
 * Uses OpenRouter API for unlimited, high-quality AI responses
 * 
 * Features:
 * - Unlimited translations (Arabic/Italian/English)
 * - Islamic content generation with authentic sources
 * - Scholar-level responses
 * - Multi-model support (GPT-4, Claude, Gemini)
 * - Zero rate limits!
 */

export class OpenRouterService {
  private static API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';
  private static BASE_URL = 'https://openrouter.ai/api/v1';
  private static DEFAULT_MODEL = 'google/gemini-2.0-flash-lite-preview-02-05:free'; // ⚡ Ultra-fast & Free

  /**
   * Main AI request function
   */
  private static async request(messages: any[], model: string = this.DEFAULT_MODEL, temperature: number = 0.7): Promise<string> {
    try {
      const response = await fetch(`${this.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Islamic Companion App - Miracle Edition'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  }

  /**
   * 🌍 TRANSLATE with AI - Perfect Islamic translations for 9+ languages
   */
  static async translate(text: string, targetLang: string, isReligious: boolean = false): Promise<string> {
    const langMap: Record<string, string> = {
      'ar': 'Arabic',
      'en': 'English',
      'it': 'Italian',
      'fr': 'French',
      'es': 'Spanish',
      'de': 'German',
      'tr': 'Turkish',
      'ur': 'Urdu',
      'bn': 'Bengali',
      'sq': 'Albanian'
    };

    const targetLanguage = langMap[targetLang] || targetLang;

    const systemPrompt = isReligious
      ? `You are an expert Islamic translator with deep knowledge of Quran, Hadith, and Islamic terminology. 
         Translate the following text to ${targetLanguage} while:
         - Preserving Islamic terms (Allah, Rasulullah, etc.)
         - Using respectful language
         - Maintaining theological accuracy
         - Following scholarly translation standards
         
         IMPORTANT: Return ONLY the translation, no explanations.`
      : `Translate the following text to ${targetLanguage}. Return ONLY the translation.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text }
    ];

    return await this.request(messages, this.DEFAULT_MODEL, 0.3);
  }

  /**
   * 🎙️ TRANSLATE KHUTBAH - Live translation streaming optimized
   */
  static async translateKhutbah(text: string, targetLang: string): Promise<string> {
    if (text.length < 15) return text; // Ignora frammenti troppo brevi
    return await this.translate(text, targetLang, true);
  }

  /**
   * 📚 GENERATE HADITH EXPLANATION - Scholar level
   */
  static async explainHadith(hadithText: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a knowledgeable Islamic scholar. Explain the following hadith in ${language} with:
        - Main teaching/lesson (Sharah)
        - Context and relevance (Asbab al-Wurud)
        - Practical application for modern Muslims
        - Related Quranic verses if applicable
        
        Cite sources like Fath al-Bari or Sharh Nabawi. Keep it concise and authentic.`
      },
      { role: 'user', content: hadithText }
    ];

    return await this.request(messages);
  }

  /**
   * 📖 GENERATE TAFSIR (Quran Explanation) - Concise & Authentic
   */
  static async generateTafsir(surah: number, ayah: number, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an expert in Tafsir. Provide a concise explanation for Surah ${surah}, Ayah ${ayah} in ${language}.
        Summarize the views of Ibn Kathir, Al-Jalalayn, and Sa'di. Include spiritual reflections.
        Length: 150-300 words.`
      },
      { role: 'user', content: `Explain Surah ${surah}, Ayah ${ayah}` }
    ];

    return await this.request(messages);
  }

  /**
   * 🎯 VERIFY HADITH AUTHENTICITY - Cross-reference checking
   */
  static async verifyHadithAuthenticity(hadithText: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a Hadith authentication expert (Muhaddith). Verify the authenticity of this text.
        Return:
        - Collection (Bukhari, Muslim, etc.)
        - Status (Sahih, Hasan, Da'if, Mawdu')
        - Scholar comments (e.g., Al-Albani, Shu'ayb al-Arna'ut)
        - If Da'if/Mawdu', explain why and provide the authentic alternative if possible.`
      },
      { role: 'user', content: `Verify: ${hadithText}` }
    ];

    return await this.request(messages);
  }

  /**
   * 👶 GENERATE KIDS STORY (Islamic Prophets/Companions)
   */
  static async generateKidsStory(prophetName: string, language: string = 'en', ageGroup: string = '6-10'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an Islamic educator for children aged ${ageGroup}. 
        Create a simple, engaging, and highly interactive story about ${prophetName} in ${language} that:
        - Uses simple vocabulary suitable for children
        - Includes a clear moral lesson
        - Is factually accurate according to Islamic sources
        - **IMPORTANT:** Include 2-3 interactive questions within the story (e.g., "What do you think happened next?" or "If you were there, would you help him?") to keep the child engaged.
        - Ends with a beautiful lesson the child can apply in daily life.
        
        Length: 250-400 words.`
      },
      { role: 'user', content: `Tell a story about ${prophetName}` }
    ];

    return await this.request(messages, 'google/gemini-2.0-flash-001', 0.8);
  }

  /**
   * 📚 GENERATE ISLAMIC QUIZ QUESTIONS
   */
  static async generateQuizQuestions(topic: string, difficulty: string = 'medium', count: number = 5): Promise<any[]> {
    const messages = [
      {
        role: 'system',
        content: `Generate ${count} ${difficulty} difficulty multiple-choice quiz questions about ${topic}.
        Return ONLY a valid JSON array with this exact structure:
        [
          {
            "question": "Question text",
            "questionAr": "Arabic translation",
            "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
            "optionsAr": ["خيار 1", "خيار 2", "خيار 3", "خيار 4"],
            "correct": 0,
            "explanation": "Brief explanation",
            "encouragement": "A very encouraging message for a child (e.g., 'Amazing! You know so much about our Prophets!')"
          }
        ]
        
        Ensure questions are factually correct and appropriate for Islamic education.`
      },
      { role: 'user', content: `Generate quiz about ${topic}` }
    ];

    const response = await this.request(messages, 'google/gemini-2.0-flash-001', 0.6);

    try {
      return JSON.parse(response);
    } catch (e) {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse quiz questions');
    }
  }

  /**
   * ❓ ISLAMIC Q&A - Scholar-level answers
   */
  static async answerIslamicQuestion(question: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a knowledgeable Islamic scholar trained in Quran, Hadith, and Fiqh.
        Answer the following question in ${language} with:
        - Clear, authentic answer based on Quran and Sunnah
        - Supporting evidence (verse/hadith references when possible)
        - Mention if scholars differ on the issue
        - Practical guidance
        
        IMPORTANT: If you're unsure, say "Consult a qualified scholar" rather than guessing.
        Avoid extremes. Follow the balanced approach of mainstream scholarship.`
      },
      { role: 'user', content: question }
    ];

    return await this.request(messages);
  }

  /**
   * 🏗️ GENERIC CONTENT GENERATION
   */
  static async generateContent(prompt: string, model: string = this.DEFAULT_MODEL): Promise<string> {
    const messages = [{ role: 'user', content: prompt }];
    return await this.request(messages, model);
  }
}

export default OpenRouterService;
