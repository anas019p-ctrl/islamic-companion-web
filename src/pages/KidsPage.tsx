import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Baby, BookOpen, Gamepad2, Trophy, Star, Sparkles, Video,
  CheckCircle2, XCircle, Wand2, Send
} from 'lucide-react';
import { ScholarService } from '@/lib/ScholarService';
import { OpenRouterService } from '@/lib/OpenRouterService';
import { YouTubeService, VideoContent } from '@/lib/YouTubeService';
import { EducationalErrorBoundary } from '@/components/EducationalErrorBoundary';
import { useEffect } from 'react';

const prophetStories = [
  {
    id: 1,
    name: 'Prophet Adam (AS)',
    nameAr: 'آدم عليه السلام',
    nameIt: 'Profeta Adamo (AS)',
    story: 'The first human and prophet created by Allah. He was made from clay and Allah breathed life into him.',
    storyAr: 'أول إنسان ونبي خلقه الله من طين ونفخ فيه الروح',
    storyIt: 'Il primo essere umano e profeta creato da Allah. Fu plasmato dall\'argilla e Allah soffiò in lui la vita.',
    lesson: 'We should always ask for forgiveness when we make mistakes',
    lessonAr: 'يجب أن نستغفر دائماً عندما نخطئ',
    lessonIt: 'Dovremmo sempre chiedere perdono quando commettiamo errori.',
    emoji: '👨',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 2,
    name: 'Prophet Nuh (AS)',
    nameAr: 'نوح عليه السلام',
    nameIt: 'Profeta Noè (AS)',
    story: 'Built a big ark (ship) to save believers from the great flood. He called people to worship Allah for 950 years!',
    storyAr: 'بنى سفينة كبيرة لإنقاذ المؤمنين من الطوفان العظيم. دعا قومه 950 سنة!',
    storyIt: 'Costruì una grande arca (nave) per salvare i credenti dal grande diluvio. Invitò le persone a adorare Allah per 950 anni!',
    lesson: 'Never give up on doing good, even if it takes a long time',
    lessonAr: 'لا تيأس من فعل الخير حتى لو استغرق وقتاً طويلاً',
    lessonIt: 'Non rinunciare mai a fare il bene, anche se richiede molto tempo.',
    emoji: '🚢',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    name: 'Prophet Ibrahim (AS)',
    nameAr: 'إبراهيم عليه السلام',
    nameIt: 'Profeta Abramo (AS)',
    story: 'The father of prophets who built the Kaaba with his son Ismail. He loved Allah more than anything!',
    storyAr: 'أبو الأنبياء الذي بنى الكعبة مع ابنه إسماعيل. أحب الله أكثر من أي شيء!',
    storyIt: 'Il padre dei profeti che costruì la Kaaba con suo figlio Ismaele. Amava Allah più di ogni altra cosa!',
    lesson: 'Put your trust in Allah in all situations',
    lessonAr: 'توكل على الله في كل الأحوال',
    lessonIt: 'Riponi la tua fiducia in Allah in ogni situazione.',
    emoji: '🕋',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    name: 'Prophet Yusuf (AS)',
    nameAr: 'يوسف عليه السلام',
    nameIt: 'Profeta Giuseppe (AS)',
    story: 'A beautiful prophet who was thrown in a well by his brothers but became a king of Egypt. He forgave them!',
    storyAr: 'نبي جميل ألقاه إخوته في البئر لكنه أصبح ملكاً في مصر. ثم سامحهم!',
    storyIt: 'Un bellissimo profeta che fu gettato in un pozzo dai suoi fratelli ma divenne re d\'Egitto. Li perdonò tutti!',
    lesson: 'Forgive others even when they hurt you',
    lessonAr: 'اعفُ عن الآخرين حتى لو آذوك',
    lessonIt: 'Perdona gli altri anche quando ti fanno del male.',
    emoji: '👑',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 5,
    name: 'Prophet Musa (AS)',
    nameAr: 'موسى عليه السلام',
    nameIt: 'Profeta Mosè (AS)',
    story: 'Talked directly to Allah and split the sea with his staff to save his people from Pharaoh!',
    storyAr: 'كلم الله مباشرة وشق البحر بعصاه لإنقاذ قومه من فرعون!',
    storyIt: 'Parlò direttamente con Allah e divise il mare con il suo bastone per salvare il suo popolo dal Faraone!',
    lesson: 'Have courage and trust in Allah\'s help',
    lessonAr: 'كن شجاعاً وثق بعون الله',
    lessonIt: 'Abbi coraggio e fida nell\'aiuto di Allah.',
    emoji: '🌊',
    color: 'from-teal-500 to-blue-600'
  },
  {
    id: 6,
    name: 'Prophet Muhammad (ﷺ)',
    nameAr: 'محمد صلى الله عليه وسلم',
    nameIt: 'Profeta Muhammad (ﷺ)',
    story: 'The last and greatest prophet. He was kind to everyone - children, animals, and even his enemies!',
    storyAr: 'آخر وأعظم الأنبياء. كان رحيماً بالجميع - الأطفال والحيوانات وحتى أعدائه!',
    storyIt: 'L\'ultimo e il più grande dei profeti. Era gentile con tutti: bambini, animali e persino i suoi nemici!',
    lesson: 'Be kind and merciful to all of Allah\'s creation',
    lessonAr: 'كن رحيماً ولطيفاً مع كل مخلوقات الله',
    lessonIt: 'Sii gentile e misericordioso con tutto il creato di Allah.',
    emoji: '✨',
    color: 'from-emerald-500 to-green-600'
  }
];

const quizQuestions = [
  {
    question: 'Who built the Kaaba?',
    questionAr: 'من بنى الكعبة؟',
    questionIt: 'Chi ha costruito la Kaaba?',
    options: ['Prophet Ibrahim and Ismail', 'Prophet Muhammad', 'Prophet Musa', 'Prophet Adam'],
    optionsAr: ['النبي إبراهيم وإسماعيل', 'النبي محمد', 'النبي موسى', 'النبي آدم'],
    optionsIt: ['Profeta Abramo e Ismaele', 'Profeta Muhammad', 'Profeta Mosè', 'Profeta Adamo'],
    correct: 0,
    emoji: '🕋'
  },
  {
    question: 'How many times do we pray each day?',
    questionAr: 'كم مرة نصلي في اليوم؟',
    questionIt: 'Quante volte preghiamo ogni giorno?',
    options: ['3 times', '5 times', '7 times', '10 times'],
    optionsAr: ['3 مرات', '5 مرات', '7 مرات', '10 مرات'],
    optionsIt: ['3 volte', '5 volte', '7 volte', '10 volte'],
    correct: 1,
    emoji: '🤲'
  },
  {
    question: 'What is the first pillar of Islam?',
    questionAr: 'ما هو الركن الأول من أركان الإسلام؟',
    questionIt: 'Qual è il primo pilastro dell\'Islam?',
    options: ['Prayer', 'Fasting', 'Shahada (Faith)', 'Charity'],
    optionsAr: ['الصلاة', 'الصيام', 'الشهادة', 'الزكاة'],
    optionsIt: ['Preghiera', 'Digiuno', 'Shahada (Fede)', 'Elemosina'],
    correct: 2,
    emoji: '☪️'
  },
  {
    question: 'Which prophet could talk to animals?',
    questionAr: 'أي نبي كان يتكلم مع الحيوانات؟',
    questionIt: 'Quale profeta poteva parlare con gli animali?',
    options: ['Prophet Nuh', 'Prophet Sulayman', 'Prophet Yusuf', 'Prophet Isa'],
    optionsAr: ['النبي نوح', 'النبي سليمان', 'النبي يوسف', 'النبي عيسى'],
    optionsIt: ['Profeta Noè', 'Profeta Salomone', 'Profeta Giuseppe', 'Profeta Gesù'],
    correct: 1,
    emoji: '🦜'
  },
  {
    question: 'What do we say before eating?',
    questionAr: 'ماذا نقول قبل الأكل؟',
    questionIt: 'Cosa diciamo prima di mangiare?',
    options: ['Alhamdulillah', 'Bismillah', 'SubhanAllah', 'Allahu Akbar'],
    optionsAr: ['الحمد لله', 'بسم الله', 'سبحان الله', 'الله أكبر'],
    optionsIt: ['Alhamdulillah', 'Bismillah', 'SubhanAllah', 'Allahu Akbar'],
    correct: 1,
    emoji: '🍽️'
  },
  {
    question: 'Which month do we fast?',
    questionAr: 'في أي شهر نصوم؟',
    questionIt: 'In quale mese digiuniamo?',
    options: ['Muharram', 'Ramadan', 'Shawwal', 'Dhul Hijjah'],
    optionsAr: ['محرم', 'رمضان', 'شوال', 'ذو الحجة'],
    optionsIt: ['Muharram', 'Ramadan', 'Shawwal', 'Dhul Hijjah'],
    correct: 1,
    emoji: '🌙'
  }
];

const goodDeeds = [
  { id: 1, deed: 'Say Bismillah before eating', deedAr: 'قل بسم الله قبل الأكل', deedIt: 'Dì Bismillah prima di mangiare', points: 5, icon: '🍽️' },
  { id: 2, deed: 'Pray 5 times a day', deedAr: 'صلِّ خمس مرات في اليوم', deedIt: 'Prega 5 volte al giorno', points: 20, icon: '🤲' },
  { id: 3, deed: 'Help your parents', deedAr: 'ساعد والديك', deedIt: 'Aiuta i tuoi genitori', points: 15, icon: '❤️' },
  { id: 4, deed: 'Read Quran', deedAr: 'اقرأ القرآن', deedIt: 'Leggi il Corano', points: 10, icon: '📖' },
  { id: 5, deed: 'Be kind to friends', deedAr: 'كن لطيفاً مع الأصدقاء', deedIt: 'Sii gentile con gli amici', points: 8, icon: '🤝' },
  { id: 6, deed: 'Say Alhamdulillah', deedAr: 'قل الحمد لله', deedIt: 'Dì Alhamdulillah', points: 5, icon: '🙏' },
  { id: 7, deed: 'Smile at others', deedAr: 'ابتسم للآخرين', deedIt: 'Sorridi agli altri', points: 3, icon: '😊' },
  { id: 8, deed: 'Give charity', deedAr: 'تصدق', deedIt: 'Fai l\'elemosina (Sadaqa)', points: 12, icon: '💝' }
];

const KidsPage = () => {
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedDeeds, setCompletedDeeds] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiStories, setAiStories] = useState<any[]>([]);
  const [aiQuiz, setAiQuiz] = useState<any[]>([]);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [prophetInput, setProphetInput] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [badges, setBadges] = useState<string[]>([]);

  // Persistence for Gamification
  useEffect(() => {
    const savedPoints = localStorage.getItem('kids_points');
    const savedBadges = localStorage.getItem('kids_badges');
    if (savedPoints) setTotalPoints(parseInt(savedPoints));
    if (savedBadges) setBadges(JSON.parse(savedBadges));
  }, []);

  useEffect(() => {
    localStorage.setItem('kids_points', totalPoints.toString());
    localStorage.setItem('kids_badges', JSON.stringify(badges));

    // Check for new badges
    if (totalPoints >= 100 && !badges.includes('explorer')) {
      const newBadges = [...badges, 'explorer'];
      setBadges(newBadges);
      toast({ title: `🎓 ${t('congratulations')}`, description: t('badgeExplorer') });
    }
    if (totalPoints >= 500 && !badges.includes('scholar')) {
      const newBadges = [...badges, 'scholar'];
      setBadges(newBadges);
      toast({ title: `🏮 ${t('congratulations')}`, description: t('badgeScholar') });
    }
  }, [totalPoints, badges]);

  const isArabic = language === 'ar';
  const isItalian = language === 'it';

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    const activeQuiz = aiQuiz.length > 0 ? aiQuiz : quizQuestions;
    const isCorrect = index === activeQuiz[currentQuestion].correct;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      toast({
        title: t('quizFeedback').split('!')[0] + '!',
        description: t('excellentMashaAllah'),
      });
    } else {
      toast({
        title: t('tryAgain'),
        description: t('tryAgain'),
        variant: 'destructive'
      });
    }

    setTimeout(() => {
      if (currentQuestion < activeQuiz.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setQuizFinished(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false);
  };

  const completeDeed = (deedId: number, points: number) => {
    if (!completedDeeds.includes(deedId)) {
      setCompletedDeeds(prev => [...prev, deedId]);
      setTotalPoints(prev => prev + points);
      toast({
        title: `⭐ ${t('congratulations')}`,
        description: `+${points} ${t('points')}`,
      });
    }
  };

  const generateAIStory = async () => {
    if (!prophetInput) return;

    setIsGenerating(true);
    setIsAiDialogOpen(false);
    try {
      const story = await ScholarService.generateKidsStoryWithAI(prophetInput, language);
      const newStory = {
        id: Date.now(),
        name: prophetInput,
        nameAr: prophetInput,
        nameIt: prophetInput,
        story: story,
        storyAr: story,
        storyIt: story,
        lesson: "Always trust Allah.",
        lessonAr: "ثق بالله دائماً.",
        lessonIt: "Fidati sempre di Allah.",
        emoji: '✨',
        color: 'from-pink-500 to-rose-600',
        isAiGenerated: true
      };
      setAiStories(prev => [newStory, ...prev]);
      setSelectedStory(newStory.id);
      setProphetInput('');
      toast({ title: t('storyGenerated'), description: t('aiStoryReady') });
    } catch (error) {
      toast({ title: '❌ Error', description: t('storyError'), variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAIQuiz = async () => {
    setIsGenerating(true);
    try {
      const questions = await OpenRouterService.generateQuizQuestions('islamic basics for kids', language);
      setAiQuiz(questions);
      resetQuiz();
      toast({ title: t('quizReady'), description: t('aiQuizFresh') });
    } catch (error) {
      toast({ title: '❌ Error', description: t('quizError'), variant: 'destructive' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              {t('kidsCorner')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('learnPlayEarn')}
            </p>
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg animate-pulse border-none">
              <Star className="w-6 h-6 mr-2 fill-white" />
              {totalPoints} {t('starPoints')}
            </Badge>

            <AnimatePresence>
              {badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-wrap justify-center gap-2 mt-2"
                >
                  {badges.map(badge => (
                    <Badge key={badge} className="bg-purple-500/20 text-purple-600 border-purple-500/30 px-3 py-1 flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {badge === 'explorer' ? t('badgeExplorer') : t('badgeScholar')}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="flex md:grid w-full grid-cols-4 mb-8 h-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-1.5 gap-2 border border-purple-500/20 overflow-x-auto no-scrollbar">
            <TabsTrigger value="stories" className="flex-1 min-w-[80px] rounded-xl data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all">
              <BookOpen className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">{t('prophetStories')}</span>
              <span className="md:hidden text-[10px] mt-1 block">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex-1 min-w-[80px] rounded-xl data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">
              <Gamepad2 className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Quiz</span>
              <span className="md:hidden text-[10px] mt-1 block">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1 min-w-[80px] rounded-xl data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all">
              <Video className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Video</span>
              <span className="md:hidden text-[10px] mt-1 block">Video</span>
            </TabsTrigger>
            <TabsTrigger value="deeds" className="flex-1 min-w-[80px] rounded-xl data-[state=active]:bg-pink-600 data-[state=active]:text-white transition-all">
              <Star className="w-5 h-5 md:mr-2" />
              <span className="hidden md:inline">Deeds</span>
              <span className="md:hidden text-[10px] mt-1 block">Deeds</span>
            </TabsTrigger>
          </TabsList>

          {/* PROPHET STORIES TAB */}
          <TabsContent value="stories" className="space-y-6">
            <EducationalErrorBoundary>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  {t('prophetStories')}
                </h2>

                <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      disabled={isGenerating}
                      className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-4 md:p-6 h-auto flex flex-row md:flex-col items-center gap-3 shadow-xl hover:shadow-2xl transition-all border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <Wand2 className={`w-5 h-5 md:w-6 md:h-6 ${isGenerating ? 'animate-spin' : 'animate-pulse'}`} />
                      </div>
                      <div className="text-left md:text-center">
                        <p className="font-bold text-base md:text-lg">{t('newAiStory')}</p>
                        <p className="text-[10px] md:text-xs opacity-80">{t('createMagicStory')}</p>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-purple-500/20">
                    <DialogHeader>
                      <DialogTitle>{t('newAiStory')}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                      <div className="grid flex-1 gap-2">
                        <Input
                          placeholder={t('enterProphetName')}
                          value={prophetInput}
                          onChange={(e) => setProphetInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && generateAIStory()}
                          className="bg-slate-50 dark:bg-slate-800 border-purple-500/20"
                        />
                      </div>
                      <Button type="button" size="sm" onClick={generateAIStory} className="bg-purple-600 hover:bg-purple-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...aiStories, ...prophetStories].map((prophet, index) => (
                  <motion.div
                    key={prophet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`h-full min-h-[120px] cursor-pointer hover:scale-[1.02] active:scale-95 transition-all duration-300 bg-gradient-to-br ${prophet.color} text-white border-0 shadow-lg hover:shadow-2xl overflow-hidden`}
                      onClick={() => setSelectedStory(selectedStory === prophet.id ? null : prophet.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between">
                          <span className="text-2xl">{prophet.emoji}</span>
                          <span className="text-lg font-bold">
                            {isArabic ? prophet.nameAr : isItalian ? (prophet.nameIt || prophet.name) : prophet.name}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <AnimatePresence>
                          {selectedStory === prophet.id ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3"
                            >
                              <p className="text-sm leading-relaxed opacity-90">
                                {isArabic ? prophet.storyAr : isItalian ? (prophet.storyIt || prophet.story) : prophet.story}
                              </p>
                              <div className="pt-3 border-t border-white/30">
                                <p className="text-xs font-bold mb-1 uppercase tracking-wider">
                                  {isArabic ? '💡 العبرة:' : isItalian ? '💡 Lezione:' : '💡 Lesson:'}
                                </p>
                                <p className="text-sm italic opacity-100 font-medium">
                                  {isArabic ? prophet.lessonAr : isItalian ? (prophet.lessonIt || prophet.lesson) : prophet.lesson}
                                </p>
                              </div>
                            </motion.div>
                          ) : (
                            <p className="text-xs opacity-70 italic line-clamp-1">
                              {isArabic ? 'انقر للقراءة...' : isItalian ? 'Clicca per leggere...' : 'Click to read...'}
                            </p>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </EducationalErrorBoundary>
          </TabsContent>

          {/* QUIZ TAB */}
          <TabsContent value="quiz">
            <EducationalErrorBoundary>
              <Card className="glass-premium border-purple-500/30 overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
                  <CardTitle className="text-center sm:text-left text-2xl">
                    {t('testYourKnowledge')}
                  </CardTitle>
                  <Button
                    onClick={generateAIQuiz}
                    disabled={isGenerating}
                    variant="outline"
                    className="w-full sm:w-auto glass border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
                  >
                    {isGenerating ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Gamepad2 className="w-4 h-4 mr-2" />}
                    {t('newAiQuiz')}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {!quizFinished ? (
                    <>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm font-medium text-muted-foreground">
                          <span>{isArabic ? 'السؤال' : isItalian ? 'Domanda' : 'Question'} {currentQuestion + 1}/{(aiQuiz.length > 0 ? aiQuiz : quizQuestions).length}</span>
                          <span>{t('yourScore')}: {quizScore}</span>
                        </div>
                        <Progress value={((currentQuestion + 1) / (aiQuiz.length > 0 ? aiQuiz : quizQuestions).length) * 100} className="h-3 bg-slate-200 dark:bg-slate-800" />
                      </div>

                      <div className="text-center py-6 sm:py-10">
                        <motion.span
                          key={currentQuestion}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-7xl mb-6 block"
                        >
                          {(aiQuiz.length > 0 ? aiQuiz : quizQuestions)[currentQuestion].emoji || '❓'}
                        </motion.span>
                        <h3 className="text-xl sm:text-2xl font-bold mb-8 px-2 leading-tight">
                          {isArabic ? (aiQuiz.length > 0 ? aiQuiz[currentQuestion].question : quizQuestions[currentQuestion].questionAr) : isItalian ? (aiQuiz.length > 0 ? aiQuiz[currentQuestion].question : quizQuestions[currentQuestion].questionIt) : (aiQuiz.length > 0 ? aiQuiz[currentQuestion].question : quizQuestions[currentQuestion].question)}
                        </h3>

                        <div className="grid gap-3 sm:gap-4 max-w-md mx-auto">
                          {(aiQuiz.length > 0 ? aiQuiz : quizQuestions)[currentQuestion].options.map((option, index) => {
                            const activeQuiz = aiQuiz.length > 0 ? aiQuiz : quizQuestions;
                            const isCorrect = index === activeQuiz[currentQuestion].correct;
                            const currentOptions = isArabic && aiQuiz.length === 0 ? quizQuestions[currentQuestion].optionsAr :
                              isItalian && aiQuiz.length === 0 ? quizQuestions[currentQuestion].optionsIt :
                                activeQuiz[currentQuestion].options;

                            return (
                              <Button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                disabled={selectedAnswer !== null}
                                variant={selectedAnswer === index ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                                className={`h-auto py-5 text-base sm:text-lg font-medium transition-all shadow-sm ${selectedAnswer === index && isCorrect ? 'bg-green-500 hover:bg-green-600 border-none scale-105' :
                                  selectedAnswer === index && !isCorrect ? 'animate-shake' :
                                    'hover:border-purple-500 hover:bg-purple-50'
                                  }`}
                              >
                                {selectedAnswer === index && (
                                  isCorrect ? <CheckCircle2 className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />
                                )}
                                {currentOptions[index]}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-10 sm:py-16 space-y-6"
                    >
                      <div className="text-8xl mb-4 animate-bounce">
                        {quizScore >= (aiQuiz.length > 0 ? aiQuiz : quizQuestions).length * 0.8 ? '🏆' : quizScore >= (aiQuiz.length > 0 ? aiQuiz : quizQuestions).length * 0.5 ? '🎉' : '📚'}
                      </div>
                      <h3 className="text-3xl font-bold">{t('quizComplete')}</h3>
                      <p className="text-4xl font-black text-primary">
                        {t('yourScore')}: {quizScore}/{(aiQuiz.length > 0 ? aiQuiz : quizQuestions).length}
                      </p>
                      <p className="text-xl font-medium text-muted-foreground max-w-xs mx-auto">
                        {quizScore >= (aiQuiz.length > 0 ? aiQuiz : quizQuestions).length * 0.8 ?
                          t('excellentMashaAllah') :
                          quizScore >= (aiQuiz.length > 0 ? aiQuiz : quizQuestions).length * 0.5 ?
                            t('goodJobKeepItUp') :
                            t('tryAgain')
                        }
                      </p>
                      <Button onClick={resetQuiz} size="lg" className="mt-8 px-10 h-14 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t('playAgain')}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </EducationalErrorBoundary>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <EducationalErrorBoundary>
              <div className="flex flex-col gap-10">
                {['stories', 'learning', 'songs'].map((cat) => (
                  <div key={cat} className="space-y-6">
                    <h3 className="text-2xl font-bold capitalize flex items-center gap-3 px-2">
                      <div className={`w-3 h-10 rounded-full ${cat === 'stories' ? 'bg-purple-500' : cat === 'learning' ? 'bg-amber-500' : 'bg-pink-500'}`} />
                      {cat === 'stories' ? t('storyTime') : cat === 'learning' ? t('learning') : t('songs')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {YouTubeService.getVideos(cat as any).map((video, idx) => (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-40 group-hover:opacity-60 transition-opacity flex items-center justify-center">
                              <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl group-hover:scale-110 transition-transform">
                                <Video className="w-7 h-7 fill-white" />
                              </div>
                            </div>
                          </div>
                          <div className="p-5">
                            <h4 className="font-bold text-base line-clamp-2 leading-snug">{video.title}</h4>
                            <div className="flex items-center gap-2 mt-3">
                              <Badge variant="outline" className="text-[10px] uppercase tracking-wider px-2 py-0 border-purple-500/30 text-purple-600">{video.channel}</Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </EducationalErrorBoundary>
          </TabsContent>

          {/* VIDEO OVERLAY */}
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                >
                  <Button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-4 right-4 z-[110] bg-black/50 hover:bg-black/80 rounded-full w-12 h-12 p-0 backdrop-blur-md border border-white/20"
                  >
                    <XCircle className="w-7 h-7 text-white" />
                  </Button>
                  <iframe
                    src={YouTubeService.getEmbedUrl(selectedVideo.id)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <TabsContent value="deeds">
            <Card className="glass-premium border-green-500/30 overflow-hidden">
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
                  {t('deedsTracker')}
                </CardTitle>
                <p className="text-center text-muted-foreground mt-2">
                  {t('earnPointsDaily')}
                </p>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goodDeeds.map((deed, index) => {
                    const isDone = completedDeeds.includes(deed.id);
                    return (
                      <motion.div
                        key={deed.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card
                          className={`group transition-all duration-300 border-2 ${isDone ? 'bg-green-500/10 border-green-500/40 shadow-inner' : 'hover:border-primary/40 hover:shadow-md bg-white/50 dark:bg-slate-900/50'}`}
                        >
                          <CardContent className="p-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110 ${isDone ? 'bg-green-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                {deed.icon}
                              </div>
                              <div>
                                <p className="font-bold text-base sm:text-lg leading-tight">
                                  {isArabic ? deed.deedAr : isItalian ? (deed.deedIt || deed.deed) : deed.deed}
                                </p>
                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                  +{deed.points} {t('points')}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => completeDeed(deed.id, deed.points)}
                              disabled={isDone}
                              variant={isDone ? 'default' : 'outline'}
                              size="sm"
                              className={`rounded-xl px-4 h-10 font-bold transition-all ${isDone ? 'bg-green-500 hover:bg-green-500 border-none opacity-100' : 'border-primary/30 text-primary hover:bg-primary/10'}`}
                            >
                              {isDone ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                                  {t('didIt')}
                                </>
                              ) : (
                                t('interact')
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="mt-10 text-center p-8 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl border border-white/20 shadow-xl"
                >
                  <p className="text-sm font-medium text-muted-foreground mb-3 tracking-wide uppercase">
                    {t('rememberAllahLovesGood')}
                  </p>
                  <p className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {t('mayAllahBlessYou')}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default KidsPage;
