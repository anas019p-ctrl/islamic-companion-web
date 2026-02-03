import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Languages, Play, Volume2, BookOpen, GraduationCap, Star, Book,
  CheckCircle2, MessageSquare, Brain, HelpCircle, Trophy, Lightbulb, Loader2, Infinity
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { VoiceService } from '@/lib/VoiceService';
import { ScholarService } from '@/lib/ScholarService';
import { useToast } from '@/hooks/use-toast';
import { ALL_VOCABULARY, ALL_PHRASES, ALL_GRAMMAR } from '@/data/arabic-vocabulary-massive';
import { supabase } from '@/integrations/supabase/client';

const arabicLetters = [
  { letter: 'أ', name: 'Alif', transliteration: 'ʾ', example: 'أرنب (Arnab)', meaning: 'Rabbit' },
  { letter: 'ب', name: 'Baa', transliteration: 'b', example: 'بيت (Bayt)', meaning: 'House' },
  { letter: 'ت', name: 'Taa', transliteration: 't', example: 'تمر (Tamr)', meaning: 'Date (fruit)' },
  { letter: 'ث', name: 'Thaa', transliteration: 'th', example: 'ثعلب (Tha\'lab)', meaning: 'Fox' },
  { letter: 'ج', name: 'Jeem', transliteration: 'j', example: 'جمل (Jamal)', meaning: 'Camel' },
  { letter: 'ح', name: 'Haa', transliteration: 'ḥ', example: 'حليب (Haleeb)', meaning: 'Milk' },
  { letter: 'خ', name: 'Khaa', transliteration: 'kh', example: 'خبز (Khubz)', meaning: 'Bread' },
  { letter: 'د', name: 'Daal', transliteration: 'd', example: 'ديك (Deek)', meaning: 'Rooster' },
  { letter: 'ذ', name: 'Dhaal', transliteration: 'dh', example: 'ذهب (Dhahab)', meaning: 'Gold' },
  { letter: 'ر', name: 'Raa', transliteration: 'r', example: 'رمان (Rumman)', meaning: 'Pomegranate' },
  { letter: 'ز', name: 'Zay', transliteration: 'z', example: 'زهرة (Zahrah)', meaning: 'Flower' },
  { letter: 'س', name: 'Seen', transliteration: 's', example: 'سمكة (Samakah)', meaning: 'Fish' },
  { letter: 'ش', name: 'Sheen', transliteration: 'sh', example: 'شمس (Shams)', meaning: 'Sun' },
  { letter: 'ص', name: 'Saad', transliteration: 'ṣ', example: 'صقر (Saqr)', meaning: 'Falcon' },
  { letter: 'ض', name: 'Daad', transliteration: 'ḍ', example: 'ضوء (Daw\')', meaning: 'Light' },
  { letter: 'ط', name: 'Taa', transliteration: 'ṭ', example: 'طائرة (Ta\'irah)', meaning: 'Airplane' },
  { letter: 'ظ', name: 'Zaa', transliteration: 'ẓ', example: 'ظرف (Tharf)', meaning: 'Envelope' },
  { letter: 'ع', name: 'Ayn', transliteration: 'ʿ', example: 'عين (Ayn)', meaning: 'Eye' },
  { letter: 'غ', name: 'Ghayn', transliteration: 'gh', example: 'غابة (Ghabah)', meaning: 'Forest' },
  { letter: 'ف', name: 'Faa', transliteration: 'f', example: 'فيل (Feel)', meaning: 'Elephant' },
  { letter: 'ق', name: 'Qaaf', transliteration: 'q', example: 'قمر (Qamar)', meaning: 'Moon' },
  { letter: 'ك', name: 'Kaaf', transliteration: 'k', example: 'كتاب (Kitab)', meaning: 'Book' },
  { letter: 'ل', name: 'Laam', transliteration: 'l', example: 'ليمون (Laymoon)', meaning: 'Lemon' },
  { letter: 'م', name: 'Meem', transliteration: 'm', example: 'مفتاح (Miftah)', meaning: 'Key' },
  { letter: 'ن', name: 'Noon', transliteration: 'n', example: 'نجمة (Najmah)', meaning: 'Star' },
  { letter: 'هـ', name: 'Haa', transliteration: 'h', example: 'هلال (Hilal)', meaning: 'Crescent' },
  { letter: 'و', name: 'Waw', transliteration: 'w', example: 'وردة (Wardah)', meaning: 'Rose' },
  { letter: 'ي', name: 'Yaa', transliteration: 'y', example: 'يد (Yad)', meaning: 'Hand' },
];

const vocabulary = ALL_VOCABULARY;


const grammarLessons = [
  {
    title: { en: 'Definite vs Indefinite', it: 'Determinato vs Indeterminato' },
    content: {
      en: 'In Arabic, adding "Al" (ال) makes a noun definite (The). Without it, it is indefinite (A/An).',
      it: 'In Arabo, aggiungere "Al" (ال) rende un nome determinato (Il/Lo/La). Senza di esso, è indeterminato.'
    },
    example_ar: 'الكتاب vs كتاب',
    example_tr: 'Al-Kitab vs Kitab'
  },
  {
    title: { en: 'Gender in Nouns', it: 'Genere nei Nomi' },
    content: {
      en: 'Most feminine nouns in Arabic end with a Ta-Marbuta (ة).',
      it: 'La maggior parte dei nomi femminili in arabo terminano con una Ta-Marbuta (ة).'
    },
    example_ar: 'سيارة (Macchina)',
    example_tr: 'Sayyarah'
  },
];

const phrases = [
  // Saluti
  { ar: 'السلام عليكم', en: 'Peace be upon you', it: 'La pace sia su di voi', tr: 'As-salamu alaykum' },
  { ar: 'وعليكم السلام', en: 'And upon you peace', it: 'E su di voi la pace', tr: 'Wa alaykumu as-salam' },
  { ar: 'صباح الخير', en: 'Good morning', it: 'Buongiorno', tr: 'Sabah al-khayr' },
  { ar: 'صباح النور', en: 'Morning of light (response)', it: 'Mattina di luce', tr: 'Sabah an-nur' },
  { ar: 'مساء الخير', en: 'Good evening', it: 'Buonasera', tr: 'Masa\' al-khayr' },
  { ar: 'مساء النور', en: 'Evening of light (response)', it: 'Sera di luce', tr: 'Masa\' an-nur' },
  { ar: 'تصبح على خير', en: 'Good night', it: 'Buonanotte', tr: 'Tusbih ala khayr' },
  { ar: 'مع السلامة', en: 'Goodbye', it: 'Arrivederci', tr: 'Ma\'a salama' },
  { ar: 'في أمان الله', en: 'In Allah\'s protection', it: 'Nella protezione di Allah', tr: 'Fi aman Allah' },

  // Domande Comuni
  { ar: 'كيف حالك؟', en: 'How are you?', it: 'Come stai?', tr: 'Kayfa haluk?' },
  { ar: 'ما اسمك؟', en: 'What is your name?', it: 'Come ti chiami?', tr: 'Ma ismuk?' },
  { ar: 'من أين أنت؟', en: 'Where are you from?', it: 'Da dove vieni?', tr: 'Min ayna anta?' },
  { ar: 'كم عمرك؟', en: 'How old are you?', it: 'Quanti anni hai?', tr: 'Kam umruk?' },
  { ar: 'أين تسكن؟', en: 'Where do you live?', it: 'Dove abiti?', tr: 'Ayna taskun?' },
  { ar: 'هل تتكلم العربية؟', en: 'Do you speak Arabic?', it: 'Parli arabo?', tr: 'Hal tatakallam al-arabiya?' },
  { ar: 'ماذا تعمل؟', en: 'What do you do?', it: 'Che lavoro fai?', tr: 'Madha ta\'mal?' },

  // Risposte e Espressioni
  { ar: 'الحمد لله', en: 'Praise be to Allah', it: 'Sia lodato Allah', tr: 'Alhamdulillah' },
  { ar: 'بخير والحمد لله', en: 'Fine, praise be to Allah', it: 'Bene, lode ad Allah', tr: 'Bi-khayr walhamdulillah' },
  { ar: 'أنا بخير', en: 'I am fine', it: 'Sto bene', tr: 'Ana bi-khayr' },
  { ar: 'شكراً جزيلاً', en: 'Thank you very much', it: 'Grazie mille', tr: 'Shukran jazilan' },
  { ar: 'جزاك الله خيراً', en: 'May Allah reward you', it: 'Che Allah ti ricompensi', tr: 'Jazak Allahu khayran' },
  { ar: 'بارك الله فيك', en: 'May Allah bless you', it: 'Che Allah ti benedica', tr: 'Barak Allahu fik' },
  { ar: 'عفواً', en: 'You\'re welcome', it: 'Prego', tr: 'Afwan' },
  { ar: 'لا شكر على واجب', en: 'No thanks for duty', it: 'Non c\'è di che', tr: 'La shukr ala wajib' },

  // Espressioni Islamiche
  { ar: 'بسم الله', en: 'In the name of Allah', it: 'Nel nome di Allah', tr: 'Bismillah' },
  { ar: 'ما شاء الله', en: 'What Allah wills', it: 'Ciò che Allah vuole', tr: 'Masha\'Allah' },
  { ar: 'إن شاء الله', en: 'If Allah wills', it: 'Se Allah vuole', tr: 'Insha\'Allah' },
  { ar: 'سبحان الله', en: 'Glory be to Allah', it: 'Gloria ad Allah', tr: 'Subhan Allah' },
  { ar: 'الله أكبر', en: 'Allah is the Greatest', it: 'Allah è il più Grande', tr: 'Allahu Akbar' },
  { ar: 'لا إله إلا الله', en: 'There is no god but Allah', it: 'Non c\'è dio all\'infuori di Allah', tr: 'La ilaha illa Allah' },
  { ar: 'أستغفر الله', en: 'I seek forgiveness from Allah', it: 'Chiedo perdono ad Allah', tr: 'Astaghfirullah' },
  { ar: 'توكلت على الله', en: 'I put my trust in Allah', it: 'Mi affido ad Allah', tr: 'Tawakkaltu ala Allah' },

  // Richieste e Bisogni
  { ar: 'من فضلك', en: 'Please', it: 'Per favore', tr: 'Min fadlak' },
  { ar: 'لو سمحت', en: 'Excuse me / If you please', it: 'Scusa / Permesso', tr: 'Law samaht' },
  { ar: 'آسف', en: 'Sorry', it: 'Mi dispiace', tr: 'Asif' },
  { ar: 'أعتذر', en: 'I apologize', it: 'Mi scuso', tr: 'A\'tadhir' },
  { ar: 'لا بأس', en: 'No problem', it: 'Non c\'è problema', tr: 'La ba\'s' },
  { ar: 'أحتاج مساعدة', en: 'I need help', it: 'Ho bisogno di aiuto', tr: 'Ahtaj musa\'ada' },
  { ar: 'هل يمكنك مساعدتي؟', en: 'Can you help me?', it: 'Puoi aiutarmi?', tr: 'Hal yumkinuk musa\'adati?' },

  // Espressioni Quotidiane
  { ar: 'أهلاً وسهلاً', en: 'Welcome', it: 'Benvenuto', tr: 'Ahlan wa sahlan' },
  { ar: 'تفضل', en: 'Please (go ahead)', it: 'Prego (vai avanti)', tr: 'Tafaddal' },
  { ar: 'حاضر', en: 'Okay / Ready', it: 'Va bene / Pronto', tr: 'Hadir' },
  { ar: 'طبعاً', en: 'Of course', it: 'Certamente', tr: 'Tab\'an' },
  { ar: 'ممكن', en: 'Possible / May I', it: 'Possibile / Posso', tr: 'Mumkin' },
  { ar: 'مستحيل', en: 'Impossible', it: 'Impossibile', tr: 'Mustahil' },
  { ar: 'ربما', en: 'Maybe', it: 'Forse', tr: 'Rubbama' },
  { ar: 'نعم', en: 'Yes', it: 'Sì', tr: 'Na\'am' },
  { ar: 'لا', en: 'No', it: 'No', tr: 'La' },

  // Auguri e Congratulazioni
  { ar: 'مبروك', en: 'Congratulations', it: 'Congratulazioni', tr: 'Mabruk' },
  { ar: 'الله يبارك فيك', en: 'May Allah bless you', it: 'Che Allah ti benedica', tr: 'Allah yubarik fik' },
  { ar: 'كل عام وأنتم بخير', en: 'Happy new year (lit: every year and you are well)', it: 'Buon anno', tr: 'Kull \'am wa antum bi-khayr' },
  { ar: 'عيد مبارك', en: 'Blessed Eid', it: 'Buon Eid', tr: '\'Id Mubarak' },
  { ar: 'رمضان كريم', en: 'Generous Ramadan', it: 'Ramadan generoso', tr: 'Ramadan Karim' },
  { ar: 'تقبل الله منا ومنكم', en: 'May Allah accept from us and you', it: 'Che Allah accetti da noi e da voi', tr: 'Taqabbal Allahu minna wa minkum' },
];


export const LearnArabicSection = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'alphabet' | 'vocab' | 'phrases' | 'grammar' | 'quiz'>('alphabet');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isInfiniteMode, setIsInfiniteMode] = useState(false);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [scholarQuestion, setScholarQuestion] = useState<{ question: string, options: string[], correctAnswer: string, translation: string } | null>(null);

  // State for live data
  const [staticQuizWords, setStaticQuizWords] = useState<any[]>([]);
  const [liveVocabulary, setLiveVocabulary] = useState<any[]>([]);

  useEffect(() => {
    fetchLiveVocabulary();
  }, []);

  const fetchLiveVocabulary = async () => {
    setIsLoadingAi(true); // Re-use loading state or add a new one
    try {
      const { data, error } = await supabase.from('vocabulary' as any).select('*');
      if (!error && data && data.length > 0) {
        const mapped = data.map((item: any) => ({
          ar: item.word_ar,
          en: item.word_en,
          it: item.word_it,
          cat: item.category || 'Basic',
          tr: ''
        }));
        setLiveVocabulary(mapped);
        setStaticQuizWords([...mapped].sort(() => Math.random() - 0.5));
      } else {
        setLiveVocabulary(ALL_VOCABULARY);
        setStaticQuizWords([...ALL_VOCABULARY].sort(() => Math.random() - 0.5));
      }
    } catch (err) {
      console.error("Vocabulary fetch failed:", err);
      setLiveVocabulary(ALL_VOCABULARY);
      setStaticQuizWords([...ALL_VOCABULARY].sort(() => Math.random() - 0.5));
    } finally {
      setIsLoadingAi(false);
    }
  };

  const vocabularyToUse = liveVocabulary.length > 0 ? liveVocabulary : ALL_VOCABULARY;
  const currentQuizWord = staticQuizWords[quizIndex];

  const handleAnswer = async (selectedOption: string) => {
    if (!currentQuizWord) return;

    const correct = isInfiniteMode
      ? selectedOption === scholarQuestion?.correctAnswer
      : (vocabularyToUse.find(v => v.ar === currentQuizWord.ar)?.[language] || vocabularyToUse.find(v => v.ar === currentQuizWord.ar)?.en) === selectedOption;

    if (correct) {
      setScore(score + 1);
      toast({
        title: "Correct! 🎉",
        description: "Excellent work!",
        className: "bg-green-500/10 border-green-500/20 text-green-500"
      });
    } else {
      const correctAnswer = isInfiniteMode
        ? scholarQuestion?.correctAnswer
        : (vocabularyToUse.find(v => v.ar === currentQuizWord.ar)?.[language] || vocabularyToUse.find(v => v.ar === currentQuizWord.ar)?.en);

      toast({
        title: "Incorrect",
        description: `The correct answer was: ${correctAnswer}`,
        variant: "destructive"
      });
    }

    if (isInfiniteMode) {
      // Generate next scholar question
      await generateNextScholarQuestion();
    } else {
      if (quizIndex < staticQuizWords.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        setShowScore(true);
      }
    }
  };

  const generateNextScholarQuestion = async () => {
    setIsLoadingAi(true);
    try {
      const question = await ScholarService.generateQuizQuestion('beginner', language);
      setScholarQuestion(question);
    } catch (error) {
      toast({ title: "Error", description: "Could not generate question", variant: "destructive" });
      setIsInfiniteMode(false);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const startInfiniteMode = async () => {
    setIsInfiniteMode(true);
    setScore(0);
    setShowScore(false);
    await generateNextScholarQuestion();
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setShowScore(false);
    setIsInfiniteMode(false);
    setStaticQuizWords([...vocabularyToUse].sort(() => Math.random() - 0.5));
  };

  return (
    <section id="learn-arabic" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-secondary/10 to-background">
      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">{t('learnArabic')} Academia</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Master the <span className="text-gradient-gold">Sacred Language</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deepen your connection with the Divine Revelation by mastering the Arabic language through our modular learning system.
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'alphabet', label: 'Alphabet', icon: Languages },
            { id: 'vocab', label: 'Vocabulary', icon: Book },
            { id: 'phrases', label: 'Phrases', icon: MessageSquare },
            { id: 'grammar', label: 'Grammar', icon: GraduationCap },
            { id: 'quiz', label: 'Quiz', icon: Brain },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="rounded-2xl px-8 h-12 gap-2 glass transition-all"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'alphabet' && (
            <motion.div
              key="alphabet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
            >
              {arabicLetters.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => VoiceService.speak(item.letter, 'ar')}
                  className="futuristic-card p-4 text-center cursor-pointer group relative overflow-hidden notranslate"
                >
                  <div className="absolute top-0 right-0 p-1 opacity-10">
                    <Volume2 className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-arabic text-5xl text-primary block mb-3 group-hover:drop-shadow-[0_0_10px_rgba(201,164,74,0.5)] transition-all">
                    {item.letter}
                  </span>
                  <div className="flex flex-col gap-1 border-t border-primary/10 pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground notranslate">{item.name}</span>
                    <span className="text-[9px] text-primary/60 notranslate">[{item.transliteration}]</span>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-[9px] text-foreground font-arabic notranslate">{item.example}</p>
                      <p className="text-[8px] text-muted-foreground italic">{item.meaning}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'vocab' && (
            <motion.div
              key="vocab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {vocabularyToUse.map((item: any, index) => (
                <Card key={index} className="futuristic-card group cursor-pointer" onClick={() => VoiceService.speak(item.ar, 'ar')}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline" className="text-[8px] uppercase tracking-tighter opacity-50">{item.cat}</Badge>
                      <Volume2 className="w-4 h-4 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="font-arabic text-4xl text-foreground notranslate">{item.ar}</h3>
                      <p className="font-bold text-primary">{item[language] || item.en}</p>
                      <p className="text-[10px] uppercase text-muted-foreground tracking-[0.2em] notranslate">{item.tr}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}

          {activeTab === 'phrases' && (
            <motion.div
              key="phrases"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-4"
            >
              {phrases.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10, backgroundColor: 'rgba(201,164,74,0.05)' }}
                  onClick={() => VoiceService.speak(item.ar, 'ar', 'phrase')}
                  className="futuristic-card p-6 flex items-center justify-between cursor-pointer group border-l-4 border-l-transparent hover:border-l-primary transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item[language as keyof typeof item] || item.en}</h3>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium">{item.tr}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <span className="font-arabic text-3xl text-foreground block group-hover:scale-110 transition-transform origin-right notranslate">{item.ar}</span>
                    <div className="p-2 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-all">
                      <Volume2 className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'grammar' && (
            <motion.div
              key="grammar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {grammarLessons.map((lesson, idx) => (
                <div key={idx} className="p-8 rounded-[2.5rem] bg-card glass border border-white/5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold">{lesson.title[language as keyof typeof lesson.title] || lesson.title.en}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {lesson.content[language as keyof typeof lesson.content] || lesson.content.en}
                  </p>
                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">Example</p>
                      <h3 className="font-arabic text-3xl">{lesson.example_ar}</h3>
                      <p className="text-xs text-muted-foreground">{lesson.example_tr}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => VoiceService.speak(lesson.example_ar, 'ar')}>
                      <Volume2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {!showScore ? (
                <Card className="futuristic-card p-10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Brain className="w-20 h-20 text-primary" />
                  </div>
                  <div className="text-center space-y-8">
                    <Badge variant="outline" className="px-6 py-2 uppercase tracking-widest flex items-center gap-2 mx-auto w-fit">
                      {isInfiniteMode ? <Infinity className="w-4 h-4" /> : `Question ${quizIndex + 1} / ${staticQuizWords.length}`}
                      {isInfiniteMode && "Infinite Mode"}
                    </Badge>

                    {isLoadingAi ? (
                      <div className="py-12 flex flex-col items-center justify-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <p className="text-muted-foreground animate-pulse">Generating new challenge...</p>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-arabic text-7xl text-gradient-gold py-4">
                          {isInfiniteMode ? scholarQuestion?.question : staticQuizWords[quizIndex]?.ar}
                        </h3>
                        <p className="text-sm text-muted-foreground uppercase tracking-widest">What does this mean?</p>
                      </>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      {isInfiniteMode ? (
                        scholarQuestion?.options.map((option, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            className="h-16 rounded-2xl text-lg font-bold hover:bg-primary/10 hover:border-primary/40 transition-all"
                            onClick={() => handleAnswer(option)}
                            disabled={isLoadingAi}
                          >
                            {option}
                          </Button>
                        ))
                      ) : (
                        currentQuizWord && vocabularyToUse
                          .filter(v => v.ar !== currentQuizWord.ar)
                          .slice(0, 3)
                          .concat(currentQuizWord)
                          .sort(() => Math.random() - 0.5)
                          .map((option: any, i: number) => (
                            <Button
                              key={i}
                              variant="outline"
                              className="h-16 rounded-2xl text-lg font-bold hover:bg-primary/20 hover:border-primary/50 transition-all glass"
                              onClick={() => handleAnswer(option[language] || option.en)}
                            >
                              {option[language] || option.en}
                            </Button>
                          ))
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <Card className="futuristic-card p-12 text-center space-y-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto border-2 border-primary/20">
                    <Trophy className="w-12 h-12 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-4xl font-bold">Quiz Complete!</h3>
                    <p className="text-xl text-muted-foreground">You scored <span className="text-primary font-bold">{score}</span> out of {staticQuizWords.length}</p>
                  </div>
                  <Button onClick={resetQuiz} className="w-full h-14 rounded-2xl text-lg font-bold">
                    Try Again
                  </Button>
                  <Button onClick={startInfiniteMode} variant="secondary" className="w-full h-14 rounded-2xl text-lg font-bold mt-4">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Infinite Scholar Quiz
                  </Button>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Highlights */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center border-t border-white/5 pt-16">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Scholar Audio System</h4>
            <p className="text-sm text-muted-foreground">High-fidelity natural voice synthesis for perfect pronunciation.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-500">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Adaptive Curriculum</h4>
            <p className="text-sm text-muted-foreground">Lessons that evolve based on your learning speed.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto text-amber-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold">Quranic Focus</h4>
            <p className="text-sm text-muted-foreground">Vocabulary specifically chosen from the most frequent words in the Quran.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
