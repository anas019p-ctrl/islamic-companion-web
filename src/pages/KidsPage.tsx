import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Gamepad2,
    BookOpen,
    Video,
    Star,
    Trophy,
    Heart,
    Sparkles,
    ArrowRight,
    ArrowLeft,
    Play,
    CheckCircle2,
    Brain,
    MessageCircle,
    Lightbulb,
    Home,
    RefreshCw
} from 'lucide-react';
import { OpenRouterService } from '@/lib/OpenRouterService';
import { toast } from 'sonner';

type Section = 'home' | 'stories' | 'quiz' | 'videos' | 'deeds';

// 🎨 Kids-friendly color palette
const KIDS_COLORS = {
    stories: { bg: 'from-blue-500 to-indigo-600', border: 'border-blue-400/40', text: 'text-blue-400' },
    quiz: { bg: 'from-orange-500 to-red-500', border: 'border-orange-400/40', text: 'text-orange-400' },
    videos: { bg: 'from-purple-500 to-pink-500', border: 'border-purple-400/40', text: 'text-purple-400' },
    deeds: { bg: 'from-green-500 to-teal-500', border: 'border-green-400/40', text: 'text-green-400' }
};

// 📺 Video Educativi per Bambini (Aggiornati 2026)
const KIDS_VIDEOS = [
    { id: 'adam', title: "Storia del Profeta Adamo (AS)", titleIt: "Storia del Profeta Adamo (AS)", url: "https://www.youtube.com/embed/5tHNj5VvZKk", time: "12 min", thumbnail: "🌍" },
    { id: 'nuh', title: "Il Profeta Nuh (AS) e l'Arca", titleIt: "Il Profeta Nuh (AS) e l'Arca", url: "https://www.youtube.com/embed/U74Y6iU0jLg", time: "10 min", thumbnail: "🚢" },
    { id: 'yunus', title: "Il Profeta Yunus (AS) e la Balena", titleIt: "Il Profeta Yunus (AS) e la Balena", url: "https://www.youtube.com/embed/F0396009yXU", time: "8 min", thumbnail: "🐋" },
    { id: 'ibrahim', title: "Il Profeta Ibrahim (AS)", titleIt: "Il Profeta Ibrahim (AS)", url: "https://www.youtube.com/embed/U0gY1x1Fj1w", time: "15 min", thumbnail: "⭐" },
    { id: 'musa', title: "Il Profeta Musa (AS)", titleIt: "Il Profeta Musa (AS)", url: "https://www.youtube.com/embed/Wd4lJbLzP-c", time: "14 min", thumbnail: "🌊" },
    { id: 'muhammad', title: "Il Profeta Muhammad ﷺ", titleIt: "Il Profeta Muhammad ﷺ", url: "https://www.youtube.com/embed/0L3K3b6D50A", time: "16 min", thumbnail: "☀️" },
];

// 📖 Story Topics for Kids
const STORY_TOPICS = [
    { id: 'adam', name: 'Prophet Adam (AS)', nameIt: 'Profeta Adamo (AS)', emoji: '🌍' },
    { id: 'nuh', name: 'Prophet Nuh (AS)', nameIt: 'Profeta Nuh (AS)', emoji: '🚢' },
    { id: 'ibrahim', name: 'Prophet Ibrahim (AS)', nameIt: 'Profeta Ibrahim (AS)', emoji: '⭐' },
    { id: 'yusuf', name: 'Prophet Yusuf (AS)', nameIt: 'Profeta Yusuf (AS)', emoji: '🌙' },
    { id: 'musa', name: 'Prophet Musa (AS)', nameIt: 'Profeta Musa (AS)', emoji: '🌊' },
    { id: 'muhammad', name: 'Prophet Muhammad ﷺ', nameIt: 'Profeta Muhammad ﷺ', emoji: '☀️' },
];

const KidsPage = () => {
    const { t, language } = useLanguage();
    const [activeSection, setActiveSection] = useState<Section>('home');
    const [stars, setStars] = useState(0);
    const [badges, setBadges] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [story, setStory] = useState('');
    const [selectedStoryTopic, setSelectedStoryTopic] = useState<string | null>(null);
    const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [quizScore, setQuizScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<typeof KIDS_VIDEOS[0] | null>(null);

    const isRTL = language === 'ar' || language === 'ur';
    const isIt = language === 'it';

    // 💾 Persistence
    useEffect(() => {
        const savedStars = localStorage.getItem('kids_stars');
        const savedBadges = localStorage.getItem('kids_badges');
        if (savedStars) setStars(parseInt(savedStars));
        if (savedBadges) setBadges(JSON.parse(savedBadges));
    }, []);

    const addStars = (amount: number) => {
        const newStars = stars + amount;
        setStars(newStars);
        localStorage.setItem('kids_stars', newStars.toString());

        // Check for badges
        if (newStars >= 50 && !badges.includes('Star Beginner')) {
            const newBadges = [...badges, 'Star Beginner'];
            setBadges(newBadges);
            localStorage.setItem('kids_badges', JSON.stringify(newBadges));
            toast.success(isIt ? 'Nuovo Badge: Principiante Stellare! ⭐' : 'New Badge: Star Beginner! ⭐');
        }
        if (newStars >= 100 && !badges.includes('Star Explorer')) {
            const newBadges = [...badges, 'Star Explorer'];
            setBadges(newBadges);
            localStorage.setItem('kids_badges', JSON.stringify(newBadges));
            toast.success(isIt ? 'Nuovo Badge: Esploratore Stellare! 🌟' : 'New Badge: Star Explorer! 🌟');
        }
        if (newStars >= 250 && !badges.includes('Star Master')) {
            const newBadges = [...badges, 'Star Master'];
            setBadges(newBadges);
            localStorage.setItem('kids_badges', JSON.stringify(newBadges));
            toast.success(isIt ? 'Nuovo Badge: Maestro delle Stelle! 🏆' : 'New Badge: Star Master! 🏆');
        }
    };

    // 📖 Generate Story
    const generateStory = async (topic: string) => {
        setLoading(true);
        setStory('');
        setSelectedStoryTopic(topic);
        setActiveSection('stories');

        try {
            const prompt = isIt
                ? `Racconta una storia bellissima e interattiva per bambini sul ${topic}. Usa un linguaggio semplice e divertente.`
                : `Tell a beautiful and interactive story for children about ${topic}. Use simple and fun language.`;

            const result = await OpenRouterService.generateKidsStory(prompt, language);
            setStory(result);
        } catch (err) {
            console.error('Story generation error:', err);
            toast.error(isIt ? 'Oops! La storia sta facendo una pausa. Riprova!' : 'Oops! Story time is taking a break. Try again!');
            setStory(isIt
                ? 'Mi dispiace, non sono riuscito a generare la storia. Riprova tra poco! 📖'
                : 'Sorry, I could not generate the story. Please try again soon! 📖');
        } finally {
            setLoading(false);
        }
    };

    // 🧠 Start Quiz
    const startQuiz = async () => {
        setLoading(true);
        setQuizQuestions([]);
        setCurrentQuizIndex(0);
        setQuizScore(0);
        setQuizCompleted(false);
        setActiveSection('quiz');

        try {
            const topic = isIt ? 'Conoscenza islamica per bambini' : 'Islamic Knowledge for kids';
            const questions = await OpenRouterService.generateQuizQuestions(topic, 'easy', 5);

            if (questions && questions.length > 0) {
                setQuizQuestions(questions);
            } else {
                throw new Error('No questions generated');
            }
        } catch (err) {
            console.error('Quiz generation error:', err);
            toast.error(isIt ? 'Errore nel caricamento del quiz' : 'Error loading quiz');
            // Provide fallback questions
            setQuizQuestions([
                {
                    question: "How many times do Muslims pray each day?",
                    questionAr: "كم مرة يصلي المسلمون في اليوم؟",
                    questionIt: "Quante volte pregano i musulmani ogni giorno?",
                    options: ["3 times", "5 times", "7 times", "2 times"],
                    optionsAr: ["3 مرات", "5 مرات", "7 مرات", "مرتين"],
                    optionsIt: ["3 volte", "5 volte", "7 volte", "2 volte"],
                    correct: 1,
                    explanation: "Muslims pray 5 times daily: Fajr, Dhuhr, Asr, Maghrib, and Isha",
                    explanationIt: "I musulmani pregano 5 volte al giorno: Fajr, Dhuhr, Asr, Maghrib e Isha",
                    encouragement: "Excellent! You know about Salah! 🌟",
                    encouragementIt: "Eccellente! Conosci la Salah! 🌟"
                },
                {
                    question: "What is the holy book of Islam?",
                    questionAr: "ما هو الكتاب المقدس في الإسلام؟",
                    questionIt: "Qual è il libro sacro dell'Islam?",
                    options: ["Torah", "Bible", "Quran", "Vedas"],
                    optionsAr: ["التوراة", "الإنجيل", "القرآن", "الفيدا"],
                    optionsIt: ["Torah", "Bibbia", "Corano", "Veda"],
                    correct: 2,
                    explanation: "The Quran is the holy book revealed to Prophet Muhammad ﷺ",
                    explanationIt: "Il Corano è il libro sacro rivelato al Profeta Muhammad ﷺ",
                    encouragement: "Amazing! You know about the Quran! 📖",
                    encouragementIt: "Incredibile! Conosci il Corano! 📖"
                },
                {
                    question: "Which prophet built the Ark?",
                    questionAr: "أي نبي بنى السفينة؟",
                    questionIt: "Quale profeta costruì l'Arca?",
                    options: ["Adam (AS)", "Ibrahim (AS)", "Nuh (AS)", "Musa (AS)"],
                    optionsAr: ["آدم (ع)", "إبراهيم (ع)", "نوح (ع)", "موسى (ع)"],
                    optionsIt: ["Adamo (AS)", "Ibrahim (AS)", "Nuh (AS)", "Musa (AS)"],
                    correct: 2,
                    explanation: "Prophet Nuh (AS) built the Ark to save believers from the flood",
                    explanationIt: "Il Profeta Nuh (AS) costruì l'Arca per salvare i credenti dal diluvio",
                    encouragement: "Great job! You know about Prophet Nuh! 🚢",
                    encouragementIt: "Ottimo lavoro! Conosci il Profeta Nuh! 🚢"
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    // 🎯 Handle Quiz Answer
    const handleQuizAnswer = (index: number) => {
        const currentQuestion = quizQuestions[currentQuizIndex];
        const isCorrect = index === currentQuestion.correct;

        if (isCorrect) {
            setQuizScore(prev => prev + 1);
            const encouragement = isRTL
                ? currentQuestion.encouragementAr
                : isIt && currentQuestion.encouragementIt
                    ? currentQuestion.encouragementIt
                    : currentQuestion.encouragement;
            toast.success(encouragement || (isIt ? 'Fantastico! 🌟' : 'Great job! 🌟'));
            addStars(10);
        } else {
            toast.error(isIt ? 'Non proprio! Ma continua a provare! 💪' : 'Not quite! But keep trying! 💪');
        }

        if (currentQuizIndex < quizQuestions.length - 1) {
            setTimeout(() => setCurrentQuizIndex(prev => prev + 1), 1000);
        } else {
            setTimeout(() => {
                setQuizCompleted(true);
                const finalScore = quizScore + (isCorrect ? 1 : 0);
                toast.success(isIt
                    ? `Quiz Completato! Punteggio: ${finalScore}/${quizQuestions.length} 🎉`
                    : `Quiz Completed! Score: ${finalScore}/${quizQuestions.length} 🎉`);
            }, 1000);
        }
    };

    // 🏠 Navigation Button Component
    const BackButton = () => (
        <Button
            variant="outline"
            onClick={() => setActiveSection('home')}
            className="mb-4 sm:mb-6 gap-2 rounded-full border-primary/30 hover:bg-primary/10 text-sm sm:text-base"
        >
            <ArrowLeft className="w-4 h-4" />
            {isIt ? 'Indietro' : 'Back'}
        </Button>
    );

    return (
        <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />

            <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pt-20 sm:pt-24 max-w-5xl">
                {/* 🎮 Kids Header with Stats - Mobile Optimized */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center mb-6 sm:mb-10 gap-4 sm:gap-6 glass-premium p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-primary/20 shadow-xl relative overflow-hidden"
                >
                    {/* Animated top bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-primary animate-pulse" />

                    {/* Title Section */}
                    <div className="flex items-center gap-3 sm:gap-4 text-center">
                        <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                            <Gamepad2 className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold font-amiri text-primary">
                                {isIt ? 'Esploratore Kids' : 'Kids Explorer'} 🚀
                            </h1>
                            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                                {isIt ? 'Impara, Gioca e Vinci Stelle!' : 'Learn, Play & Earn Stars!'}
                            </p>
                        </div>
                    </div>

                    {/* Stats Row - Mobile Friendly */}
                    <div className="flex gap-3 sm:gap-4 w-full justify-center">
                        <div className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 border border-yellow-500/30 bg-yellow-500/10">
                            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                            <span className="text-lg sm:text-2xl font-bold text-yellow-500">{stars}</span>
                        </div>
                        <div className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex items-center gap-2 sm:gap-3 border border-primary/30 bg-primary/10">
                            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                            <span className="text-lg sm:text-2xl font-bold text-primary">{badges.length}</span>
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* 🏠 HOME SECTION */}
                    {activeSection === 'home' && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
                        >
                            {[
                                {
                                    id: 'stories',
                                    title: isIt ? 'Storie dei Profeti' : 'Prophet Stories',
                                    desc: isIt ? 'Ascolta storie magiche' : 'Listen to magical tales',
                                    icon: <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" />,
                                    color: KIDS_COLORS.stories,
                                    action: () => setActiveSection('stories')
                                },
                                {
                                    id: 'quiz',
                                    title: isIt ? 'Super Quiz' : 'Super Quiz',
                                    desc: isIt ? 'Metti alla prova la mente' : 'Test your brain power',
                                    icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
                                    color: KIDS_COLORS.quiz,
                                    action: () => startQuiz()
                                },
                                {
                                    id: 'videos',
                                    title: isIt ? 'Video Hub' : 'Video Hub',
                                    desc: isIt ? 'Guarda video divertenti' : 'Watch fun videos',
                                    icon: <Video className="w-6 h-6 sm:w-8 sm:h-8" />,
                                    color: KIDS_COLORS.videos,
                                    action: () => setActiveSection('videos')
                                },
                                {
                                    id: 'deeds',
                                    title: isIt ? 'Buone Azioni' : 'Good Deeds',
                                    desc: isIt ? 'Fai del bene ogni giorno' : 'Do good every day',
                                    icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />,
                                    color: KIDS_COLORS.deeds,
                                    action: () => setActiveSection('deeds')
                                }
                            ].map((card) => (
                                <motion.div
                                    key={card.id}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={card.action}
                                    className="cursor-pointer group"
                                >
                                    <Card className={`h-full border-2 ${card.color.border} shadow-xl overflow-hidden glass hover:bg-white/10 transition-all duration-300`}>
                                        <div className={`h-2 bg-gradient-to-r ${card.color.bg}`} />
                                        <CardContent className="p-3 sm:pt-6 sm:p-6 text-center">
                                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-2 sm:mb-4 bg-gradient-to-br ${card.color.bg} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                                {card.icon}
                                            </div>
                                            <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2 line-clamp-2">{card.title}</h3>
                                            <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 hidden sm:block">{card.desc}</p>
                                            <Button variant="ghost" size="sm" className={`rounded-full gap-1 sm:gap-2 ${card.color.text} font-bold text-xs sm:text-sm`}>
                                                {isIt ? 'Inizia' : 'Start'} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {/* 📖 STORIES SECTION */}
                    {activeSection === 'stories' && (
                        <motion.div
                            key="stories"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 sm:space-y-6"
                        >
                            <BackButton />

                            {!story && !loading ? (
                                // Story Topic Selection
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="text-center mb-4 sm:mb-8">
                                        <Badge variant="outline" className={`${KIDS_COLORS.stories.text} ${KIDS_COLORS.stories.border} mb-3 sm:mb-4`}>
                                            <Sparkles className="w-3 h-3 mr-1" /> {isIt ? 'Scegli una Storia' : 'Choose a Story'}
                                        </Badge>
                                        <h2 className="text-xl sm:text-3xl font-bold font-amiri">
                                            {isIt ? 'Quale storia vuoi ascoltare?' : 'Which story do you want to hear?'}
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                                        {STORY_TOPICS.map((topic) => (
                                            <motion.div
                                                key={topic.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Card
                                                    className={`cursor-pointer glass ${KIDS_COLORS.stories.border} hover:bg-blue-500/10 transition-all`}
                                                    onClick={() => generateStory(isIt ? topic.nameIt : topic.name)}
                                                >
                                                    <CardContent className="p-4 sm:p-6 text-center">
                                                        <div className="text-3xl sm:text-5xl mb-2 sm:mb-3">{topic.emoji}</div>
                                                        <h3 className="text-xs sm:text-base font-bold line-clamp-2">
                                                            {isIt ? topic.nameIt : topic.name}
                                                        </h3>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                // Story Display
                                <Card className={`glass overflow-hidden min-h-[50vh] ${KIDS_COLORS.stories.border}`}>
                                    <CardContent className="p-4 sm:p-8">
                                        {loading ? (
                                            <div className="flex flex-col items-center justify-center py-12 sm:py-20 space-y-4">
                                                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                <p className="animate-pulse font-bold text-sm sm:text-base text-center">
                                                    {isIt ? 'Scrivendo la tua storia magica...' : 'Writing your magical story...'}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none">
                                                <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200">
                                                    {story}
                                                </div>
                                                {story && !story.includes(isIt ? 'Mi dispiace' : 'Sorry') && (
                                                    <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                                        <Button
                                                            className="rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto text-sm sm:text-lg gap-2 sm:gap-3 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90"
                                                            onClick={() => { addStars(15); setStory(''); setSelectedStoryTopic(null); }}
                                                        >
                                                            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                                                            {isIt ? 'Ho Letto! +15 ⭐' : 'I Read It! +15 ⭐'}
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto text-sm sm:text-lg gap-2 sm:gap-3 border-blue-200 dark:border-blue-800"
                                                            onClick={() => { setStory(''); setSelectedStoryTopic(null); }}
                                                        >
                                                            <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                                                            {isIt ? 'Altra Storia' : 'Another Story'}
                                                        </Button>
                                                    </div>
                                                )}
                                                {story && (story.includes(isIt ? 'Mi dispiace' : 'Sorry') || story.includes('Oops')) && (
                                                    <div className="mt-8 sm:mt-12 flex justify-center">
                                                        <Button
                                                            className="rounded-full px-6 sm:px-8 py-4 sm:py-6 h-auto text-sm sm:text-lg gap-2 sm:gap-3 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600"
                                                            onClick={() => selectedStoryTopic && generateStory(selectedStoryTopic)}
                                                        >
                                                            <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                                                            {isIt ? 'Riprova' : 'Try Again'}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    )}

                    {/* 🧠 QUIZ SECTION */}
                    {activeSection === 'quiz' && (
                        <motion.div
                            key="quiz"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-2xl mx-auto"
                        >
                            <BackButton />

                            {loading ? (
                                <div className="text-center py-12 sm:py-20">
                                    <Brain className="w-12 h-12 sm:w-16 sm:h-16 text-orange-500 mx-auto animate-bounce mb-4" />
                                    <p className="text-lg sm:text-xl font-bold">
                                        {isIt ? 'Preparando le domande...' : 'Preparing questions...'}
                                    </p>
                                </div>
                            ) : quizCompleted ? (
                                // Quiz Results
                                <Card className={`glass-premium ${KIDS_COLORS.quiz.border}`}>
                                    <CardContent className="p-6 sm:p-8 text-center">
                                        <div className="text-5xl sm:text-7xl mb-4">🎉</div>
                                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                                            {isIt ? 'Quiz Completato!' : 'Quiz Completed!'}
                                        </h2>
                                        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                                            {isIt ? `Punteggio: ${quizScore}/${quizQuestions.length}` : `Score: ${quizScore}/${quizQuestions.length}`}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <Button
                                                className="rounded-full px-6 py-4 h-auto bg-gradient-to-r from-orange-500 to-red-500"
                                                onClick={() => startQuiz()}
                                            >
                                                <RefreshCw className="w-5 h-5 mr-2" />
                                                {isIt ? 'Gioca Ancora' : 'Play Again'}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="rounded-full px-6 py-4 h-auto"
                                                onClick={() => setActiveSection('home')}
                                            >
                                                <Home className="w-5 h-5 mr-2" />
                                                {isIt ? 'Torna Home' : 'Go Home'}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : quizQuestions.length > 0 ? (
                                // Quiz Questions
                                <Card className={`glass-premium ${KIDS_COLORS.quiz.border}`}>
                                    <CardContent className="p-4 sm:p-8">
                                        <div className="mb-4 sm:mb-6 flex justify-between items-center">
                                            <span className="text-xs sm:text-sm font-bold text-orange-500 uppercase tracking-widest">
                                                {isIt ? 'Domanda' : 'Question'} {currentQuizIndex + 1}/{quizQuestions.length}
                                            </span>
                                            <Badge className="bg-orange-500 hover:bg-orange-600">
                                                {isIt ? 'Punti' : 'Score'}: {quizScore}
                                            </Badge>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                                                style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                                            />
                                        </div>

                                        <h2 className="text-lg sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
                                            {isRTL
                                                ? quizQuestions[currentQuizIndex].questionAr
                                                : isIt && quizQuestions[currentQuizIndex].questionIt
                                                    ? quizQuestions[currentQuizIndex].questionIt
                                                    : quizQuestions[currentQuizIndex].question}
                                        </h2>

                                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                            {(isRTL
                                                ? quizQuestions[currentQuizIndex].optionsAr
                                                : isIt && quizQuestions[currentQuizIndex].optionsIt
                                                    ? quizQuestions[currentQuizIndex].optionsIt
                                                    : quizQuestions[currentQuizIndex].options
                                            ).map((option: string, i: number) => (
                                                <Button
                                                    key={i}
                                                    variant="outline"
                                                    className="justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-lg hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all rounded-xl"
                                                    onClick={() => handleQuizAnswer(i)}
                                                >
                                                    <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 mr-3 sm:mr-4 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                                                        {String.fromCharCode(65 + i)}
                                                    </span>
                                                    <span className="line-clamp-2">{option}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : null}
                        </motion.div>
                    )}

                    {/* 📺 VIDEOS SECTION */}
                    {activeSection === 'videos' && (
                        <motion.div
                            key="videos"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-4 sm:space-y-6"
                        >
                            <BackButton />

                            {selectedVideo ? (
                                // Video Player
                                <div className="space-y-4">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setSelectedVideo(null)}
                                        className="gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        {isIt ? 'Tutti i Video' : 'All Videos'}
                                    </Button>

                                    <Card className={`glass overflow-hidden ${KIDS_COLORS.videos.border}`}>
                                        <div className="aspect-video w-full relative group/video">
                                            <picture className="absolute inset-0 z-0">
                                                <source srcSet={`https://img.youtube.com/vi/${selectedVideo.url.split('/').pop()}/maxresdefault.jpg`} media="(min-width: 800px)" />
                                                <img
                                                    src={`https://img.youtube.com/vi/${selectedVideo.url.split('/').pop()}/0.jpg`}
                                                    alt="Video preview"
                                                    className="w-full h-full object-cover blur-sm opacity-50 transition-all group-hover/video:blur-none group-hover/video:opacity-100"
                                                />
                                            </picture>
                                            <iframe
                                                src={selectedVideo.url}
                                                className="w-full h-full relative z-10"
                                                title={isIt ? selectedVideo.titleIt : selectedVideo.title}
                                                allowFullScreen
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            />
                                        </div>
                                        <CardContent className="p-4 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                                {isIt ? selectedVideo.titleIt : selectedVideo.title}
                                            </h3>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">{selectedVideo.time}</span>
                                                <Button
                                                    size="sm"
                                                    className="bg-purple-500 hover:bg-purple-600 rounded-full"
                                                    onClick={() => { addStars(5); toast.success(isIt ? 'Video guardato! +5 ⭐' : 'Video watched! +5 ⭐'); }}
                                                >
                                                    +5 ⭐
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                // Video Grid
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
                                    {KIDS_VIDEOS.map((video) => (
                                        <motion.div
                                            key={video.id}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            <Card
                                                className={`glass overflow-hidden cursor-pointer group ${KIDS_COLORS.videos.border} hover:bg-purple-500/10 transition-all`}
                                                onClick={() => setSelectedVideo(video)}
                                            >
                                                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative">
                                                    <span className="text-4xl sm:text-6xl">{video.thumbnail}</span>
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Play className="w-10 h-10 sm:w-14 sm:h-14 text-white" />
                                                    </div>
                                                </div>
                                                <CardContent className="p-3 sm:p-4">
                                                    <h4 className="font-bold text-xs sm:text-sm line-clamp-2 mb-1">
                                                        {isIt ? video.titleIt : video.title}
                                                    </h4>
                                                    <span className="text-xs text-muted-foreground">{video.time}</span>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ❤️ GOOD DEEDS SECTION */}
                    {activeSection === 'deeds' && (
                        <motion.div
                            key="deeds"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-2xl mx-auto space-y-4 sm:space-y-6"
                        >
                            <BackButton />

                            <div className="text-center mb-6 sm:mb-8">
                                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-3 sm:mb-4 animate-pulse" />
                                <h2 className="text-2xl sm:text-3xl font-bold font-amiri">
                                    {isIt ? 'Le Mie Buone Azioni' : 'My Good Deeds'}
                                </h2>
                                <p className="text-sm sm:text-base text-muted-foreground">
                                    {isIt ? 'Ogni piccola azione conta!' : 'Every small act counts!'}
                                </p>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {[
                                    {
                                        icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
                                        text: isIt ? 'Ho detto Salam a qualcuno oggi' : 'I said Salam to someone today',
                                        stars: 5,
                                        color: 'border-blue-500/30 hover:border-blue-500/60'
                                    },
                                    {
                                        icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />,
                                        text: isIt ? 'Ho aiutato i miei genitori' : 'I helped my parents',
                                        stars: 10,
                                        color: 'border-yellow-500/30 hover:border-yellow-500/60'
                                    },
                                    {
                                        icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />,
                                        text: isIt ? 'Ho imparato un nuovo Versetto' : 'I learned a new Ayah',
                                        stars: 20,
                                        color: 'border-orange-500/30 hover:border-orange-500/60'
                                    },
                                    {
                                        icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
                                        text: isIt ? 'Ho fatto un sorriso a un amico' : 'I smiled at a friend',
                                        stars: 5,
                                        color: 'border-red-500/30 hover:border-red-500/60'
                                    },
                                    {
                                        icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />,
                                        text: isIt ? 'Ho letto il Corano oggi' : 'I read Quran today',
                                        stars: 15,
                                        color: 'border-purple-500/30 hover:border-purple-500/60'
                                    }
                                ].map((deed, i) => (
                                    <Card key={i} className={`glass-premium border-2 ${deed.color} transition-all`}>
                                        <CardContent className="p-4 sm:p-6 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                                                    {deed.icon}
                                                </div>
                                                <span className="text-sm sm:text-lg font-medium line-clamp-2">{deed.text}</span>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-green-500 hover:bg-green-600 rounded-full flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4"
                                                onClick={() => {
                                                    addStars(deed.stars);
                                                    toast.success('Masha Allah! 💚');
                                                }}
                                            >
                                                +{deed.stars} ⭐
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
};

export default KidsPage;
