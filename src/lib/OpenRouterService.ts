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
  private static DEFAULT_MODEL = 'anthropic/claude-3.5-sonnet'; // Best for Islamic content
  
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
          'X-Title': 'Islamic Companion App'
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
   * 🌍 TRANSLATE with AI - Perfect Islamic translations
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
      'ur': 'Urdu'
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
   * 📚 GENERATE HADITH EXPLANATION
   */
  static async explainHadith(hadithText: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a knowledgeable Islamic scholar. Explain the following hadith in ${language} with:
        - Main teaching/lesson
        - Context and relevance
        - Practical application for modern Muslims
        - Related Quranic verses if applicable
        
        Keep it concise and authentic.`
      },
      { role: 'user', content: hadithText }
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
        Create a simple, engaging story about ${prophetName} in ${language} that:
        - Uses simple vocabulary
        - Includes a clear moral lesson
        - Is age-appropriate
        - Is factually accurate according to Islamic sources
        - Ends with a lesson children can apply
        
        Length: 200-300 words.`
      },
      { role: 'user', content: `Tell a story about ${prophetName}` }
    ];

    return await this.request(messages, 'google/gemini-2.0-flash-001', 0.8);
  }

  /**
   * 🤲 GENERATE DUA EXPLANATION
   */
  static async explainDua(duaText: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Explain this Islamic dua in ${language}. Include:
        - Translation if in Arabic
        - Meaning and significance
        - When to recite it
        - Benefits mentioned in authentic sources
        
        Be concise and respectful.`
      },
      { role: 'user', content: duaText }
    ];

    return await this.request(messages);
  }

  /**
   * 📖 GENERATE TAFSIR (Quran Explanation)
   */
  static async getTafsir(surahNumber: number, ayahNumber: number, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an Islamic scholar providing tafsir (Quran interpretation) in ${language}.
        For Surah ${surahNumber}, Ayah ${ayahNumber}, provide:
        - Brief context (asbab al-nuzul if known)
        - Clear explanation of meaning
        - Main lessons
        - Practical application
        
        Base your explanation on classical tafsir works (Ibn Kathir, Al-Tabari, etc.).
        Be authentic and scholarly. Length: 150-250 words.`
      },
      { role: 'user', content: `Explain Surah ${surahNumber}, Ayah ${ayahNumber}` }
    ];

    return await this.request(messages);
  }

  /**
   * 🕌 GENERATE FRIDAY KHUTBAH SUMMARY
   */
  static async summarizeKhutbah(khutbahText: string, targetLanguage: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Summarize this Friday Khutbah in ${targetLanguage}. Provide:
        - Main topic/theme
        - Key points (3-5 bullet points)
        - Main lesson/takeaway
        
        Keep it concise and clear.`
      },
      { role: 'user', content: khutbahText }
    ];

    return await this.request(messages, this.DEFAULT_MODEL, 0.5);
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
   * 🎯 VERIFY HADITH AUTHENTICITY
   */
  static async verifyHadith(hadithText: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are a hadith authenticity expert. For the given hadith:
        1. Search your knowledge for this or similar hadiths
        2. State if it's found in authentic collections (Bukhari, Muslim, etc.)
        3. Provide authentication status (Sahih, Hasan, Daif, Mawdu)
        4. Cite the source if known
        
        If unsure, recommend checking with hadith databases like sunnah.com.`
      },
      { role: 'user', content: `Is this hadith authentic: "${hadithText}"` }
    ];

    return await this.request(messages);
  }

  /**
   * 🌙 GENERATE RAMADAN ADVICE
   */
  static async getRamadanAdvice(topic: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Provide practical Ramadan advice about "${topic}" in ${language}.
        Include authentic sunnah practices and avoid innovations.
        Keep it practical and encouraging. Length: 150-200 words.`
      },
      { role: 'user', content: `Give advice about ${topic} during Ramadan` }
    ];

    return await this.request(messages, 'google/gemini-2.0-flash-001', 0.7);
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
            "explanation": "Brief explanation"
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
      // Fallback: extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse quiz questions');
    }
  }

  /**
   * 🎨 IMPROVE TEXT QUALITY
   */
  static async improveText(text: string, purpose: string = 'general'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Improve the following text for ${purpose}. 
        - Fix grammar and spelling
        - Enhance clarity
        - Maintain original meaning
        - Keep Islamic terms accurate
        
        Return ONLY the improved text.`
      },
      { role: 'user', content: text }
    ];

    return await this.request(messages, this.DEFAULT_MODEL, 0.4);
  }

  /**
   * 🌍 DETECT LANGUAGE
   */
  static async detectLanguage(text: string): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: 'Detect the language of the following text. Return ONLY the ISO 639-1 code (e.g., "en", "ar", "it").'
      },
      { role: 'user', content: text }
    ];

    return (await this.request(messages, 'google/gemini-2.0-flash-001', 0.1)).trim().toLowerCase();
  }

  /**
   * 🔍 SEARCH ISLAMIC CONTENT
   */
  static async searchIslamicContent(query: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `You are an Islamic knowledge assistant. Search your knowledge for "${query}" and provide:
        - Relevant Quranic verses
        - Related authentic hadiths
        - Scholarly explanations
        - Practical guidance
        
        Present in ${language}. Cite sources when possible.`
      },
      { role: 'user', content: query }
    ];

    return await this.request(messages);
  }

  /**
   * 🎓 GENERATE STUDY NOTES
   */
  static async generateStudyNotes(topic: string, language: string = 'en'): Promise<string> {
    const messages = [
      {
        role: 'system',
        content: `Create concise study notes about "${topic}" in ${language}.
        Format:
        - Main Points (bullet points)
        - Key Terms
        - Important Dates/Names
        - Summary
        
        Keep it clear and organized for easy learning.`
      },
      { role: 'user', content: `Create study notes on ${topic}` }
    ];

    return await this.request(messages);
  }

  /**
   * 💬 LIVE TRANSLATION STREAMING (for Khutbah mode)
   */
  static async translateStream(text: string, targetLang: string, onChunk: (chunk: string) => void): Promise<void> {
    // For streaming, we'll use chunks approach
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    for (const sentence of sentences) {
      if (sentence.trim()) {
        const translated = await this.translate(sentence, targetLang, true);
        onChunk(translated);
      }
    }
  }

  /**
   * 🧮 GET AVAILABLE MODELS
   */
  static getAvailableModels() {
    return [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (Best Quality)', cost: 'Low' },
      { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash (Fastest)', cost: 'Lowest' },
      { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo (Advanced)', cost: 'Medium' },
      { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B (Free)', cost: 'Free' }
    ];
  }

  /**
   * 📊 CHECK API STATUS
   */
  static async checkStatus(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`
        }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default OpenRouterService;
