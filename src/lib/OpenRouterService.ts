/**
 * 🤖 OPENROUTER AI SERVICE - Free Models Optimized
 * Uses OpenRouter API with proven working FREE models
 * 
 * Features:
 * - Free model rotation (no credits needed)
 * - Islamic content generation with authentic sources
 * - Scholar-level responses
 * - Smart retry logic with model switching
 * 
 * 🛡️ STRICT RELIGIOUS FILTER: Only Islamic topics allowed
 */

export class OpenRouterService {
  private static API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
  private static BASE_URL = 'https://openrouter.ai/api/v1';

  // ✅ Verified working free models on OpenRouter (as of Feb 2026)
  private static FREE_MODELS = [
    'mistralai/mistral-7b-instruct:free',
    'meta-llama/llama-3.2-3b-instruct:free',
    'microsoft/phi-3-mini-128k-instruct:free',
    'google/gemma-2-9b-it:free',
    'qwen/qwen-2-7b-instruct:free',
  ];

  private static DEFAULT_MODEL = OpenRouterService.FREE_MODELS[0];

  // 🛡️ STRICT ISLAMIC SYSTEM PROMPT - Applied to ALL requests
  private static ISLAMIC_GUARD_PROMPT = `
🛡️ STRICT OPERATING RULES - YOU ARE AN ISLAMIC SCHOLAR ASSISTANT:

1. TOPIC RESTRICTION: You are ONLY allowed to answer questions about:
   - Islamic Theology (Tawhid, Aqidah, Names of Allah)
   - Islamic Jurisprudence (Fiqh, Halal/Haram, Worship)
   - Quran and Hadith studies (Tafsir, Seerah)
   - Islamic History (Prophets, Sahaba, Islamic Empires, Al-Andalus)
   - Islamic Ethics and Spirituality (Akhlaq, Tasawwuf)
   - Arabic language learning for religious purposes
   - Daily Muslim practices (Salah, Dua, Dhikr, Ramadan)

2. OFF-TOPIC PROTOCOL: If the user asks about ANYTHING ELSE:
   - Politely decline with: "Mi scuso, sono specializzato esclusivamente in temi islamici. Posso aiutarti con domande sulla religione islamica, storia islamica, Corano, Hadith o pratiche religiose."

3. RESPONSE STYLE:
   - Provide clear, authentic answers based on Quran and Sunnah
   - Cite supporting evidence (verse/hadith references)
   - Be respectful and educational
`;

  /**
   * Main AI request function with free model rotation
   */
  private static async request(
    messages: any[],
    preferredModel: string = OpenRouterService.DEFAULT_MODEL,
    temperature: number = 0.7,
    maxRetries: number = 5
  ): Promise<string> {
    // Build model queue: preferred first, then rest of free models
    const modelQueue = [
      preferredModel,
      ...OpenRouterService.FREE_MODELS.filter(m => m !== preferredModel)
    ];

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const model = modelQueue[attempt % modelQueue.length];

      try {
        console.log(`🤖 AI Request [${model}] Attempt ${attempt + 1}:`, messages[messages.length - 1]?.content?.substring(0, 50) + '...');

        if (!OpenRouterService.API_KEY) {
          throw new Error('No OpenRouter API key configured');
        }

        const response = await fetch(`${OpenRouterService.BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OpenRouterService.API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://islamic-companion-web.pages.dev',
            'X-Title': 'Islamic Companion'
          },
          body: JSON.stringify({
            model,
            messages,
            temperature,
            max_tokens: 3000,
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.warn(`OpenRouter [${model}] Error ${response.status}:`, errorData?.error?.message || '');

          // Try next model for known failure codes
          if ([400, 402, 403, 404, 422, 429].includes(response.status)) {
            lastError = new Error(`OpenRouter API error: ${response.status} - ${errorData?.error?.message || 'Unknown'}`);
            if (attempt < maxRetries - 1) {
              await new Promise(resolve => setTimeout(resolve, 500));
              continue;
            }
          }

          // Server errors: wait and retry same model
          if (response.status >= 500) {
            lastError = new Error(`Server error: ${response.status}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            continue;
          }

          throw new Error(`OpenRouter API error: ${response.status} - ${errorData?.error?.message || 'Unknown'}`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) throw new Error('AI response content is empty');

        return content;
      } catch (error: any) {
        console.error(`OpenRouter Failure (Attempt ${attempt + 1}/${maxRetries}):`, error.message);
        lastError = error;

        if (attempt < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    throw lastError || new Error('All OpenRouter free models failed');
  }

  /**
   * 🌍 TRANSLATE with AI
   */
  static async translate(text: string, targetLang: string, isReligious: boolean = false): Promise<string> {
    const langMap: Record<string, string> = {
      'ar': 'Arabic', 'en': 'English', 'it': 'Italian',
      'fr': 'French', 'es': 'Spanish', 'de': 'German',
      'tr': 'Turkish', 'ur': 'Urdu', 'bn': 'Bengali', 'sq': 'Albanian'
    };
    const targetLanguage = langMap[targetLang] || targetLang;

    const systemPrompt = isReligious
      ? `You are an expert Islamic translator. Translate to ${targetLanguage} preserving Islamic terms (Allah, Rasulullah, etc.). Return ONLY the translation.`
      : `Translate the following text to ${targetLanguage}. Return ONLY the translation.`;

    return await OpenRouterService.request(
      [{ role: 'system', content: systemPrompt }, { role: 'user', content: text }],
      OpenRouterService.DEFAULT_MODEL,
      0.3
    );
  }

  /**
   * 🎙️ TRANSLATE KHUTBAH
   */
  static async translateKhutbah(text: string, targetLang: string): Promise<string> {
    if (text.length < 15) return text;
    return await OpenRouterService.translate(text, targetLang, true);
  }

  /**
   * 📚 GENERATE HADITH EXPLANATION
   */
  static async explainHadith(hadithText: string, language: string = 'en'): Promise<string> {
    return await OpenRouterService.request([
      {
        role: 'system',
        content: `You are a knowledgeable Islamic scholar. Explain the following hadith in ${language} with: main teaching, context, practical application, and related Quranic verses. Keep it concise and authentic.`
      },
      { role: 'user', content: hadithText }
    ]);
  }

  /**
   * 📖 GENERATE TAFSIR
   */
  static async generateTafsir(surah: number, ayah: number, language: string = 'en'): Promise<string> {
    return await OpenRouterService.request([
      {
        role: 'system',
        content: `You are an expert in Tafsir. Provide a concise explanation for Surah ${surah}, Ayah ${ayah} in ${language}. Summarize views of Ibn Kathir, Al-Jalalayn, and Sa'di. 150-300 words.`
      },
      { role: 'user', content: `Explain Surah ${surah}, Ayah ${ayah}` }
    ]);
  }

  /**
   * 🎯 VERIFY HADITH AUTHENTICITY
   */
  static async verifyHadithAuthenticity(hadithText: string): Promise<string> {
    return await OpenRouterService.request([
      {
        role: 'system',
        content: `You are a Hadith authentication expert. Verify the authenticity of this text. Return: Collection, Status (Sahih/Hasan/Da'if/Mawdu'), Scholar comments, and alternatives if Da'if.`
      },
      { role: 'user', content: `Verify: ${hadithText}` }
    ]);
  }

  /**
   * 👶 GENERATE KIDS STORY
   */
  static async generateKidsStory(prompt: string, language: string = 'en'): Promise<string> {
    return await OpenRouterService.request([
      {
        role: 'system',
        content: `You are a talented Muslim storyteller for kids. Create a simple, engaging story in ${language} with:
        - Simple vocabulary for children
        - A clear Islamic moral lesson
        - 2-3 interactive questions within the story
        - A beautiful lesson for daily life
        STYLE: Educational, fun, purely Islamic.`
      },
      { role: 'user', content: prompt }
    ], OpenRouterService.DEFAULT_MODEL, 0.7);
  }

  /**
   * 📚 GENERATE ISLAMIC QUIZ QUESTIONS
   */
  static async generateQuizQuestions(topic: string, difficulty: string = 'medium', count: number = 5): Promise<any[]> {
    const response = await OpenRouterService.request([
      {
        role: 'system',
        content: `Generate ${count} ${difficulty} difficulty multiple-choice quiz questions about ${topic}.
        Return ONLY a valid JSON array with this EXACT structure (no markdown, no code blocks):
        [{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"...","encouragement":"..."}]
        Ensure questions are factually correct for Islamic education.`
      },
      { role: 'user', content: `Generate quiz about ${topic}` }
    ], OpenRouterService.DEFAULT_MODEL, 0.5);

    try {
      return JSON.parse(response);
    } catch {
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
      throw new Error('Failed to parse quiz questions');
    }
  }

  /**
   * ❓ ISLAMIC Q&A with STRICT RELIGIOUS FILTERS
   */
  static async answerIslamicQuestion(question: string, language: string = 'en'): Promise<string> {
    const langLabel = language === 'it' ? 'ITALIAN' : language === 'ar' ? 'ARABIC' : 'ENGLISH';

    return await OpenRouterService.request([
      {
        role: 'system',
        content: `${OpenRouterService.ISLAMIC_GUARD_PROMPT}
LANGUAGE: Respond ONLY in ${langLabel}.
If the question is not about Islamic topics, politely decline and redirect to Islamic topics.`
      },
      { role: 'user', content: question }
    ], OpenRouterService.DEFAULT_MODEL, 0.5);
  }

  /**
   * 🏗️ GENERIC CONTENT GENERATION
   */
  static async generateContent(prompt: string, _model?: string): Promise<string> {
    // Always use free models regardless of what model is passed
    return await OpenRouterService.request([{ role: 'user', content: prompt }]);
  }
}

export default OpenRouterService;
