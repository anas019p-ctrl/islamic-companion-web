import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Baby, BookOpen, Gamepad2, Trophy, Star, Sparkles, 
  Volume2, CheckCircle2, XCircle, Heart, Lightbulb 
} from 'lucide-react';

const prophetStories = [
  {
    id: 1,
    name: 'Prophet Adam (AS)',
    nameAr: 'آدم عليه السلام',
    story: 'The first human and prophet created by Allah. He was made from clay and Allah breathed life into him.',
    storyAr: 'أول إنسان ونبي خلقه الله من طين ونفخ فيه الروح',
    lesson: 'We should always ask for forgiveness when we make mistakes',
    lessonAr: 'يجب أن نستغفر دائماً عندما نخطئ',
    emoji: '👨',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 2,
    name: 'Prophet Nuh (AS)',
    nameAr: 'نوح عليه السلام',
    story: 'Built a big ark (ship) to save believers from the great flood. He called people to worship Allah for 950 years!',
    storyAr: 'بنى سفينة كبيرة لإنقاذ المؤمنين من الطوفان العظيم. دعا قومه 950 سنة!',
    lesson: 'Never give up on doing good, even if it takes a long time',
    lessonAr: 'لا تيأس من فعل الخير حتى لو استغرق وقتاً طويلاً',
    emoji: '🚢',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 3,
    name: 'Prophet Ibrahim (AS)',
    nameAr: 'إبراهيم عليه السلام',
    story: 'The father of prophets who built the Kaaba with his son Ismail. He loved Allah more than anything!',
    storyAr: 'أبو الأنبياء الذي بنى الكعبة مع ابنه إسماعيل. أحب الله أكثر من أي شيء!',
    lesson: 'Put your trust in Allah in all situations',
    lessonAr: 'توكل على الله في كل الأحوال',
    emoji: '🕋',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 4,
    name: 'Prophet Yusuf (AS)',
    nameAr: 'يوسف عليه السلام',
    story: 'A beautiful prophet who was thrown in a well by his brothers but became a king of Egypt. He forgave them!',
    storyAr: 'نبي جميل ألقاه إخوته في البئر لكنه أصبح ملكاً في مصر. ثم سامحهم!',
    lesson: 'Forgive others even when they hurt you',
    lessonAr: 'اعفُ عن الآخرين حتى لو آذوك',
    emoji: '👑',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 5,
    name: 'Prophet Musa (AS)',
    nameAr: 'موسى عليه السلام',
    story: 'Talked directly to Allah and split the sea with his staff to save his people from Pharaoh!',
    storyAr: 'كلم الله مباشرة وشق البحر بعصاه لإنقاذ قومه من فرعون!',
    lesson: 'Have courage and trust in Allah\'s help',
    lessonAr: 'كن شجاعاً وثق بعون الله',
    emoji: '🌊',
    color: 'from-teal-500 to-blue-600'
  },
  {
    id: 6,
    name: 'Prophet Muhammad (ﷺ)',
    nameAr: 'محمد صلى الله عليه وسلم',
    story: 'The last and greatest prophet. He was kind to everyone - children, animals, and even his enemies!',
    storyAr: 'آخر وأعظم الأنبياء. كان رحيماً بالجميع - الأطفال والحيوانات وحتى أعدائه!',
    lesson: 'Be kind and merciful to all of Allah\'s creation',
    lessonAr: 'كن رحيماً ولطيفاً مع كل مخلوقات الله',
    emoji: '✨',
    color: 'from-emerald-500 to-green-600'
  }
];

const quizQuestions = [
  {
    question: 'Who built the Kaaba?',
    questionAr: 'من بنى الكعبة؟',
    options: ['Prophet Ibrahim and Ismail', 'Prophet Muhammad', 'Prophet Musa', 'Prophet Adam'],
    optionsAr: ['النبي إبراهيم وإسماعيل', 'النبي محمد', 'النبي موسى', 'النبي آدم'],
    correct: 0,
    emoji: '🕋'
  },
  {
    question: 'How many times do we pray each day?',
    questionAr: 'كم مرة نصلي في اليوم؟',
    options: ['3 times', '5 times', '7 times', '10 times'],
    optionsAr: ['3 مرات', '5 مرات', '7 مرات', '10 مرات'],
    correct: 1,
    emoji: '🤲'
  },
  {
    question: 'What is the first pillar of Islam?',
    questionAr: 'ما هو الركن الأول من أركان الإسلام؟',
    options: ['Prayer', 'Fasting', 'Shahada (Faith)', 'Charity'],
    optionsAr: ['الصلاة', 'الصيام', 'الشهادة', 'الزكاة'],
    correct: 2,
    emoji: '☪️'
  },
  {
    question: 'Which prophet could talk to animals?',
    questionAr: 'أي نبي كان يتكلم مع الحيوانات؟',
    options: ['Prophet Nuh', 'Prophet Sulayman', 'Prophet Yusuf', 'Prophet Isa'],
    optionsAr: ['النبي نوح', 'النبي سليمان', 'النبي يوسف', 'النبي عيسى'],
    correct: 1,
    emoji: '🦜'
  },
  {
    question: 'What do we say before eating?',
    questionAr: 'ماذا نقول قبل الأكل؟',
    options: ['Alhamdulillah', 'Bismillah', 'SubhanAllah', 'Allahu Akbar'],
    optionsAr: ['الحمد لله', 'بسم الله', 'سبحان الله', 'الله أكبر'],
    correct: 1,
    emoji: '🍽️'
  },
  {
    question: 'Which month do we fast?',
    questionAr: 'في أي شهر نصوم؟',
    options: ['Muharram', 'Ramadan', 'Shawwal', 'Dhul Hijjah'],
    optionsAr: ['محرم', 'رمضان', 'شوال', 'ذو الحجة'],
    correct: 1,
    emoji: '🌙'
  }
];

const goodDeeds = [
  { id: 1, deed: 'Say Bismillah before eating', deedAr: 'قل بسم الله قبل الأكل', points: 5, icon: '🍽️' },
  { id: 2, deed: 'Pray 5 times a day', deedAr: 'صلِّ خمس مرات في اليوم', points: 20, icon: '🤲' },
  { id: 3, deed: 'Help your parents', deedAr: 'ساعد والديك', points: 15, icon: '❤️' },
  { id: 4, deed: 'Read Quran', deedAr: 'اقرأ القرآن', points: 10, icon: '📖' },
  { id: 5, deed: 'Be kind to friends', deedAr: 'كن لطيفاً مع الأصدقاء', points: 8, icon: '🤝' },
  { id: 6, deed: 'Say Alhamdulillah', deedAr: 'قل الحمد لله', points: 5, icon: '🙏' },
  { id: 7, deed: 'Smile at others', deedAr: 'ابتسم للآخرين', points: 3, icon: '😊' },
  { id: 8, deed: 'Give charity', deedAr: 'تصدق', points: 12, icon: '💝' }
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

  const isArabic = language === 'ar';

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQuestion].correct;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      toast({
        title: isArabic ? '🎉 صحيح!' : '🎉 Correct!',
        description: isArabic ? 'إجابة ممتازة!' : 'Great answer!',
      });
    } else {
      toast({
        title: isArabic ? '❌ خطأ' : '❌ Wrong',
        description: isArabic ? 'حاول مرة أخرى في المرة القادمة!' : 'Try again next time!',
        variant: 'destructive'
      });
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
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
        title: isArabic ? '⭐ أحسنت!' : '⭐ Well Done!',
        description: isArabic ? `حصلت على ${points} نقطة!` : `You earned ${points} points!`,
      });
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {isArabic ? '🌟 ركن الأطفال المسلمين' : '🌟 Muslim Kids Corner'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isArabic ? 'تعلم، العب واكسب النقاط!' : 'Learn, Play and Earn Points!'}
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg py-2 px-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Trophy className="w-5 h-5 mr-2" />
              {totalPoints} {isArabic ? 'نقطة' : 'Points'}
            </Badge>
          </div>
        </motion.div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 h-14">
            <TabsTrigger value="stories" className="text-base">
              <BookOpen className="w-5 h-5 mr-2" />
              {isArabic ? 'قصص الأنبياء' : 'Prophet Stories'}
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-base">
              <Gamepad2 className="w-5 h-5 mr-2" />
              {isArabic ? 'اختبار مرح' : 'Fun Quiz'}
            </TabsTrigger>
            <TabsTrigger value="deeds" className="text-base">
              <Star className="w-5 h-5 mr-2" />
              {isArabic ? 'الأعمال الصالحة' : 'Good Deeds'}
            </TabsTrigger>
          </TabsList>

          {/* PROPHET STORIES TAB */}
          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prophetStories.map((prophet, index) => (
                <motion.div
                  key={prophet.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br ${prophet.color} text-white border-0 shadow-lg hover:shadow-2xl`}
                    onClick={() => setSelectedStory(selectedStory === prophet.id ? null : prophet.id)}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-2xl">{prophet.emoji}</span>
                        <span className="text-lg">{isArabic ? prophet.nameAr : prophet.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedStory === prophet.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-3"
                        >
                          <p className="text-sm leading-relaxed">
                            {isArabic ? prophet.storyAr : prophet.story}
                          </p>
                          <div className="pt-3 border-t border-white/30">
                            <p className="text-xs font-semibold mb-1">
                              {isArabic ? '💡 العبرة:' : '💡 Lesson:'}
                            </p>
                            <p className="text-sm italic">
                              {isArabic ? prophet.lessonAr : prophet.lesson}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* QUIZ TAB */}
          <TabsContent value="quiz">
            <Card className="glass-premium border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {isArabic ? '🎮 اختبر معلوماتك!' : '🎮 Test Your Knowledge!'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!quizFinished ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{isArabic ? 'السؤال' : 'Question'} {currentQuestion + 1}/{quizQuestions.length}</span>
                        <span>{isArabic ? 'النتيجة' : 'Score'}: {quizScore}</span>
                      </div>
                      <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="h-2" />
                    </div>

                    <div className="text-center py-6">
                      <span className="text-6xl mb-4 block">{quizQuestions[currentQuestion].emoji}</span>
                      <h3 className="text-xl font-bold mb-6">
                        {isArabic ? quizQuestions[currentQuestion].questionAr : quizQuestions[currentQuestion].question}
                      </h3>

                      <div className="grid gap-3 max-w-md mx-auto">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={selectedAnswer !== null}
                            variant={selectedAnswer === index ? (index === quizQuestions[currentQuestion].correct ? 'default' : 'destructive') : 'outline'}
                            className={`h-auto py-4 text-base ${selectedAnswer === index && index === quizQuestions[currentQuestion].correct ? 'bg-green-500 hover:bg-green-600' : ''}`}
                          >
                            {selectedAnswer === index && (
                              index === quizQuestions[currentQuestion].correct ? 
                              <CheckCircle2 className="w-5 h-5 mr-2" /> : 
                              <XCircle className="w-5 h-5 mr-2" />
                            )}
                            {isArabic ? quizQuestions[currentQuestion].optionsAr[index] : option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="text-8xl mb-4">
                      {quizScore >= quizQuestions.length * 0.8 ? '🏆' : quizScore >= quizQuestions.length * 0.5 ? '🎉' : '📚'}
                    </div>
                    <h3 className="text-3xl font-bold">
                      {isArabic ? 'انتهى الاختبار!' : 'Quiz Complete!'}
                    </h3>
                    <p className="text-2xl text-primary">
                      {isArabic ? `نتيجتك: ${quizScore}/${quizQuestions.length}` : `Your Score: ${quizScore}/${quizQuestions.length}`}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      {quizScore >= quizQuestions.length * 0.8 ? 
                        (isArabic ? 'ممتاز! ماشاء الله!' : 'Excellent! MashaAllah!') : 
                        quizScore >= quizQuestions.length * 0.5 ?
                        (isArabic ? 'عمل جيد! استمر!' : 'Good job! Keep it up!') :
                        (isArabic ? 'حاول مرة أخرى!' : 'Try again!')
                      }
                    </p>
                    <Button onClick={resetQuiz} size="lg" className="mt-4">
                      <Sparkles className="w-5 h-5 mr-2" />
                      {isArabic ? 'ابدأ من جديد' : 'Play Again'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* GOOD DEEDS TAB */}
          <TabsContent value="deeds">
            <Card className="glass-premium border-green-500/30">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  {isArabic ? '⭐ سجل الأعمال الصالحة' : '⭐ Good Deeds Tracker'}
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  {isArabic ? 'اكسب نقاطاً بفعل الخير كل يوم!' : 'Earn points by doing good every day!'}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {goodDeeds.map((deed, index) => (
                    <motion.div
                      key={deed.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className={`transition-all duration-300 ${completedDeeds.includes(deed.id) ? 'bg-green-500/20 border-green-500' : 'hover:border-primary'}`}
                      >
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{deed.icon}</span>
                            <div>
                              <p className="font-semibold">{isArabic ? deed.deedAr : deed.deed}</p>
                              <p className="text-sm text-muted-foreground">+{deed.points} {isArabic ? 'نقطة' : 'points'}</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => completeDeed(deed.id, deed.points)}
                            disabled={completedDeeds.includes(deed.id)}
                            variant={completedDeeds.includes(deed.id) ? 'default' : 'outline'}
                            size="sm"
                          >
                            {completedDeeds.includes(deed.id) ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                {isArabic ? 'تم' : 'Done'}
                              </>
                            ) : (
                              isArabic ? 'أكملت' : 'Did it!'
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    {isArabic ? 'تذكر: كل عمل صالح يحبه الله' : 'Remember: Every good deed is loved by Allah'}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {isArabic ? '❤️ بارك الله فيك!' : '❤️ May Allah bless you!'}
                  </p>
                </div>
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
