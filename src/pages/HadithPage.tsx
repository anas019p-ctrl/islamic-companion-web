import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Book, User, Volume2, ShieldCheck, Loader2, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { islamicApi } from '@/services/islamicApi';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import AudioService from '@/lib/AudioService';
import { ShamilaService } from '@/lib/ShamilaService';
import { BackButton } from '@/components/BackButton';
import { ScholarService } from '@/lib/ScholarService';

interface Hadith {
  id: string;
  narrator: string;
  text: string;
  text_ar: string;
  translations: Record<string, string>;
  collection: string;
  chapter?: string;
  grade?: string;
  source: string;
}

const HadithPage = () => {
  const { language, isRTL, t } = useLanguage();

  const { speak } = useAccessibility();
  const { toast } = useToast();
  const [activeCollection, setActiveCollection] = useState('bukhari');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: hadiths = [], isLoading } = useQuery({
    queryKey: ['hadiths', activeCollection],
    queryFn: async () => {
      const apiHadiths: any[] = await islamicApi.getHadithsByCollection(activeCollection);
      return apiHadiths.map((h: any, idx: number) => {
        const isIta = h.edition?.startsWith('ita-') || h.text?.toLowerCase().includes('dio') || h.text?.toLowerCase().includes('profeta');
        const isAra = h.edition?.startsWith('ara-');

        return {
          id: h.id || `api-${activeCollection}-${idx}`,
          narrator: h.narrator || (language === 'ar' ? 'غير معروف' : 'Unknown'),
          text: h.text || '',
          text_ar: h.arabic || (isAra ? h.text : ''),
          translations: {
            ...h.translations,
            [isIta ? 'it' : 'en']: h.text
          },
          collection: h.edition || activeCollection,
          grade: h.grade,
          source: (h.edition || activeCollection).toUpperCase()
        };
      }) as Hadith[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const [explainingId, setExplainingId] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [translatingId, setTranslatingId] = useState<string | null>(null);
  const [cachedTranslations, setCachedTranslations] = useState<Record<string, Record<string, string>>>(() => {
    const saved = localStorage.getItem('hadith_translations');
    return saved ? JSON.parse(saved) : {};
  });

  const getTranslation = async (hadith: Hadith): Promise<string | null> => {
    // 1. Direct match
    if (hadith.translations?.[language]) {
      return hadith.translations[language];
    }

    // 2. Cache match
    if (cachedTranslations[hadith.id]?.[language]) {
      return cachedTranslations[hadith.id][language];
    }

    // 3. Arabic Mode: Return Arabic text
    if (language === 'ar') {
      return hadith.text_ar || null;
    }

    // 4. English Mode: Return English text (fallback is allowed ONLY for English)
    if (language === 'en') {
      return hadith.translations?.en || hadith.text || null;
    }

    // 5. Other Languages: MUST TRANSLATE.
    const fallbackText = hadith.translations?.en || hadith.text || hadith.text_ar || '';
    if (!fallbackText) return null;

    try {
      setTranslatingId(hadith.id);

      // Use our high-quality Digital Scholar primarily for superior results
      const translatedText = await ScholarService.translate(fallbackText, language);

      if (translatedText && translatedText !== fallbackText) {
        // Cache the translation
        const newCache = {
          ...cachedTranslations,
          [hadith.id]: { ...cachedTranslations[hadith.id], [language]: translatedText }
        };
        setCachedTranslations(newCache);
        localStorage.setItem('hadith_translations', JSON.stringify(newCache));
        setTranslatingId(null);
        return translatedText;
      }

      // If scholar engine returned same text or failed, try basic backend as secondary fallback
      const encodedText = encodeURIComponent(fallbackText);
      const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${language}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }

    } catch (error) {
      console.error('Hadith translation error:', error);
    }

    setTranslatingId(null);
    return fallbackText; // Return original as absolute last resort
  };

  const handleExplain = async (hadith: Hadith) => {
    if (explanations[hadith.id]) return;

    setExplainingId(hadith.id);
    try {
      const promptTitles: Record<string, string> = {
        ar: "شرح مفصل للحديث",
        it: "Spiegazione profonda Hadith",
        en: "Deep Hadith Explanation"
      };

      const title = promptTitles[language] || promptTitles.en;
      // Use getTranslation but handle null
      const translatedText = await getTranslation(hadith) || hadith.text;
      const query = `${title}: "${translatedText}" (Narrator: ${hadith.narrator})`;
      const result = await ShamilaService.research(query, language);

      if (result && result.content) {
        setExplanations(prev => ({ ...prev, [hadith.id]: result.content }));
        toast({
          title: language === 'ar' ? 'تم استرداد البيانات' : 'Shamila Integrated',
          description: language === 'ar' ? 'تم الوصول إلى المكتبة الشamlة' : `Dati recuperati da: ${result.source}`,
        });
      } else {
        throw new Error("Empty response from Digital Scholar");
      }
    } catch (error) {
      console.error("Scholar Research Error:", error);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'تعذر الاتصال بالباحث الرقمي' : "Could not connect to digital scholar. Please check your connection.",
        variant: "destructive"
      });
    } finally {
      setExplainingId(null);
    }
  };

  const filteredHadiths = hadiths.filter(hadith => {
    const translation = hadith.translations?.[language] || hadith.translations?.en || hadith.text || '';
    return searchQuery === '' ||
      hadith.text_ar.includes(searchQuery) ||
      translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hadith.narrator.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
            {language === 'ar' ? 'الأحاديث النبوية الشريفة' : 'Prophetic Hadiths'}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Accesso istantaneo a migliaia di Hadith da Bukhari, Muslim e altri.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12 space-y-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { id: 'bukhari', label: 'Sahih al-Bukhari' },
              { id: 'muslim', label: 'Sahih Muslim' },
              { id: 'tirmidhi', label: 'Jami` at-Tirmidhi' },
              { id: 'abudawud', label: 'Sunan Abi Dawud' },
              { id: 'ibnmajah', label: 'Sunan Ibn Majah' }
            ].map((col) => (
              <Button
                key={col.id}
                variant={activeCollection === col.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCollection(col.id)}
                className={`glass rounded-full text-[10px] uppercase tracking-widest px-8 h-10 border-primary/20 transition-all ${activeCollection === col.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:border-primary/50'
                  }`}
              >
                {col.label}
              </Button>
            ))}
          </div>

          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-50" />
            <Input
              placeholder={language === 'ar' ? 'بحث في الأرشيف المقدس...' : 'Search the Sacred Archives...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 glass border-primary/20 rounded-2xl focus:border-primary/50 transition-all text-lg"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            <p className="text-[10px] uppercase tracking-widest opacity-50">Accessing Sacred Archives...</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence>
              {filteredHadiths.slice(0, 50).map((hadith, index) => (
                <motion.article
                  key={hadith.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index % 10) * 0.05 }}
                >
                  <Card className="futuristic-card group overflow-hidden border-primary/10 hover:border-primary/40 transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-all group-hover:bg-primary/10" />

                    <CardHeader className="pb-4 border-b border-primary/5 bg-primary/[0.02]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Book className="w-4 h-4 text-primary" />
                          </div>
                          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase text-[9px] px-3 font-bold tracking-widest">
                            {hadith.source}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-primary/10 rounded-xl text-primary"
                            onClick={async () => {
                              const text = await getTranslation(hadith);
                              if (text) {
                                const langToSpeak = language === 'ar' ? 'ar-SA' : (language === 'it' ? 'it-IT' : 'en-US');
                                AudioService.speak(text, langToSpeak);
                              }
                            }}
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-8 p-8">
                      <div className="text-right space-y-4" dir="rtl">
                        <HadithMainText hadith={hadith} language={language} getTranslation={getTranslation} />
                      </div>

                      <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/10 to-transparent rounded-full" />
                        <div className="pl-8 space-y-6">
                          {language !== 'ar' && (
                            <div className="space-y-2">
                              <HadithTranslation hadith={hadith} language={language} getTranslation={getTranslation} translatingId={translatingId} />
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[10px] h-9 rounded-xl uppercase tracking-widest border-primary/20 hover:bg-primary/10 transition-all font-bold"
                              onClick={async () => {
                                const text = await getTranslation(hadith);
                                if (text) AudioService.speak(text, language);
                              }}
                            >
                              <Volume2 className="w-3.5 h-3.5 mr-2 text-primary" />
                              {t('listen')}
                            </Button>

                            <Button
                              variant="default"
                              size="sm"
                              className="text-[10px] h-9 rounded-xl uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-6 font-bold"
                              disabled={explainingId === hadith.id}
                              onClick={() => handleExplain(hadith)}
                            >
                              {explainingId === hadith.id ? (
                                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                              ) : (
                                <BookOpen className="w-3.5 h-3.5 mr-2" />
                              )}
                              {t('aiExplanation')}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {explanations[hadith.id] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 rounded-xl bg-primary/5 border border-primary/10 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 p-2 opacity-10">
                            <BookOpen className="w-8 h-8" />
                          </div>
                          <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" />
                            {t('aiExplanation')}
                          </h4>
                          <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line">
                            {explanations[hadith.id]}
                          </p>
                        </motion.div>
                      )}

                      <div className="flex items-center gap-4 pt-4 border-t border-primary/5 opacity-50 text-[10px] uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{hadith.narrator}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// Component to handle async translation display
const HadithTranslation = ({ hadith, language, getTranslation, translatingId }: {
  hadith: any;
  language: string;
  getTranslation: (h: any) => Promise<string | null>;
  translatingId: string | null;
}) => {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setIsError(false);

    getTranslation(hadith).then(result => {
      if (isMounted) {
        if (result) {
          setText(result);
        } else {
          setIsError(true);
        }
        setIsLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [hadith.id, language]);

  if (isLoading || translatingId === hadith.id) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm italic">Translating...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-muted-foreground/50 italic text-sm border-l-2 border-destructive/30 pl-2">
        Translation unavailable for this specific Hadith.
      </p>
    );
  }

  return (
    <p className="text-muted-foreground leading-relaxed italic text-base font-medium">
      {text}
    </p>
  );
};

// Component to handle the main text display (with strict language enforcement)
const HadithMainText = ({ hadith, language, getTranslation }: {
  hadith: any;
  language: string;
  getTranslation: (h: any) => Promise<string | null>;
}) => {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [translationFailed, setTranslationFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkAndTranslate = async () => {
      setIsLoading(true);
      setTranslationFailed(false);

      // 1. If we are in Arabic mode
      if (language === 'ar') {
        const latinCount = (hadith.text_ar.match(/[a-zA-Z]/g) || []).length;
        const arabicCount = (hadith.text_ar.match(/[\u0600-\u06FF]/g) || []).length;

        // If it looks like English but we want Arabic
        if (latinCount > arabicCount) {
          try {
            const result = await getTranslation({ ...hadith, translations: { ...hadith.translations, ar: null } });
            // Verify result is actually Arabic
            const resultArabicCount = (result?.match(/[\u0600-\u06FF]/g) || []).length;
            if (result && resultArabicCount > 0) {
              if (isMounted) setText(result);
            } else {
              if (isMounted) setTranslationFailed(true);
            }
          } catch (e) {
            if (isMounted) setTranslationFailed(true);
          }
        } else {
          if (isMounted) setText(hadith.text_ar);
        }
      }
      // 2. If we are in ANY other mode (Italian, French, etc.)
      else {
        // Try to get translation for the target language
        try {
          const result = await getTranslation(hadith);
          if (isMounted && result) {
            setText(result);
          } else {
            if (isMounted) setTranslationFailed(true);
          }
        } catch (e) {
          if (isMounted) setTranslationFailed(true);
        }
      }

      if (isMounted) setIsLoading(false);
    };

    checkAndTranslate();

    return () => { isMounted = false; };
  }, [hadith.text_ar, language, hadith.id]);

  if (isLoading) {
    return (
      <div className="flex justify-end p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  // STRICT MODE: If translation failed, DO NOT SHOW WRONG LANGUAGE.
  if (translationFailed) {
    const messages: Record<string, string> = {
      ar: "عذراً، النص غير متوفر حالياً.",
      it: "Traduzione non disponibile al momento.",
      en: "Text unavailable.",
      fr: "Texte indisponible.",
      es: "Texto no disponible.",
      de: "Text nicht verfügbar."
    };

    return (
      <div className="text-center p-6 border border-dashed border-primary/20 rounded-xl bg-primary/5">
        <p className="text-lg font-arabic text-muted-foreground">
          {messages[language] || messages.en}
          <br />
          <span className="text-xs opacity-50">(Translation Unavailable)</span>
        </p>
      </div>
    );
  }

  return (
    <p className="text-3xl font-amiri leading-[2.2] text-foreground/90 selection:bg-primary/30">
      {text}
    </p>
  );
};

export default HadithPage;
