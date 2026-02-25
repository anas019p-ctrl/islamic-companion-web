/**
 * 🎯 INFINITE QUIZ PAGE
 * Endless quiz about Prophets' stories powered by AI
 * Multilingual support: Arabic, Italian, English
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
    Brain, CheckCircle2, XCircle, Loader2, Trophy, 
    Star, Sparkles, BookOpen, RefreshCw, ArrowRight 
} from 'lucide-react';
import { prophetsQuizService, QuizQuestion } from '@/lib/ProphetsQuizService';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

export default function InfiniteQuizPage() {
    const { language } = useLanguage();
    const { toast } = useToast();
    const isArabic = language === 'ar';
    const isIt = language === 'it';

    const [loading, setLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [streak, setStreak] = useState(0);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

    useEffect(() => {
        loadNextQuestion();
    }, []);

    const loadNextQuestion = async () => {
        setLoading(true);
        setSelectedAnswer(null);
        setShowExplanation(false);

        try {
            const question = await prophetsQuizService.generateQuestion(undefined, difficulty);
            setCurrentQuestion(question);
        } catch (error) {
            toast({
                title: isIt ? "Errore" : "Error",
                description: isIt 
                    ? "Impossibile caricare la domanda. Riprova." 
                    : "Failed to load question. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (index: number) => {
        if (showExplanation) return;
        
        setSelectedAnswer(index);
        setShowExplanation(true);
        setTotalQuestions(prev => prev + 1);

        const isCorrect = index === currentQuestion?.correctAnswer;
        
        if (isCorrect) {
            setScore(prev => prev + 1);
            setStreak(prev => prev + 1);
            
            // Celebration confetti
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            toast({
                title: isIt ? "🎉 Corretto!" : "🎉 Correct!",
                description: isIt 
                    ? `Serie di ${streak + 1} risposte corrette!` 
                    : `Streak of ${streak + 1} correct answers!`,
            });
        } else {
            setStreak(0);
            toast({
                title: isIt ? "❌ Sbagliato" : "❌ Wrong",
                description: isIt 
                    ? "Leggi la spiegazione e riprova!" 
                    : "Read the explanation and try again!",
                variant: "destructive"
            });
        }
    };

    const getQuestionText = () => {
        if (!currentQuestion) return '';
        if (isArabic) return currentQuestion.questionAr;
        if (isIt) return currentQuestion.questionIt;
        return currentQuestion.question;
    };

    const getOptions = () => {
        if (!currentQuestion) return [];
        if (isArabic) return currentQuestion.optionsAr;
        if (isIt) return currentQuestion.optionsIt;
        return currentQuestion.options;
    };

    const getExplanation = () => {
        if (!currentQuestion) return '';
        if (isArabic) return currentQuestion.explanationAr;
        if (isIt) return currentQuestion.explanationIt;
        return currentQuestion.explanation;
    };

    const getDifficultyColor = () => {
        switch (difficulty) {
            case 'easy': return 'bg-green-500';
            case 'medium': return 'bg-yellow-500';
            case 'hard': return 'bg-red-500';
        }
    };

    if (loading && !currentQuestion) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-16 h-16 animate-spin text-purple-500 mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                        {isIt ? "Generazione della domanda..." : "Generating question..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
            <Header />
            
            <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
                {/* Header with Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="text-center mb-6">
                        <Badge variant="outline" className="mb-4 py-2 px-4 border-purple-500/50 text-purple-600 bg-purple-500/10">
                            <Brain className="w-4 h-4 mr-2" />
                            {isIt ? "Quiz Infinito sui Profeti" : "Infinite Prophets Quiz"}
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            {isIt ? "Super Quiz" : "Super Quiz"}
                        </h1>
                        <p className="text-muted-foreground">
                            {isIt 
                                ? "Impara le storie dei Profeti con domande infinite!" 
                                : "Learn Prophets' stories with endless questions!"}
                        </p>
                    </div>

                    {/* Score Board */}
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                        <Card className="glass">
                            <CardContent className="pt-6 text-center">
                                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{score}/{totalQuestions}</p>
                                <p className="text-xs text-muted-foreground">{isIt ? "Punteggio" : "Score"}</p>
                            </CardContent>
                        </Card>
                        <Card className="glass">
                            <CardContent className="pt-6 text-center">
                                <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{streak}</p>
                                <p className="text-xs text-muted-foreground">{isIt ? "Serie" : "Streak"}</p>
                            </CardContent>
                        </Card>
                        <Card className="glass">
                            <CardContent className="pt-6 text-center">
                                <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                <p className="text-2xl font-bold">{totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0}%</p>
                                <p className="text-xs text-muted-foreground">{isIt ? "Precisione" : "Accuracy"}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Difficulty Selector */}
                    <div className="flex justify-center gap-2 mt-6">
                        {(['easy', 'medium', 'hard'] as const).map((diff) => (
                            <Button
                                key={diff}
                                variant={difficulty === diff ? "default" : "outline"}
                                size="sm"
                                onClick={() => setDifficulty(diff)}
                                disabled={loading}
                            >
                                {isIt 
                                    ? diff === 'easy' ? 'Facile' : diff === 'medium' ? 'Medio' : 'Difficile'
                                    : diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    {currentQuestion && (
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Card className="glass border-2 border-purple-500/20 mb-6">
                                <CardHeader>
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className={`${getDifficultyColor()} text-white`}>
                                            {currentQuestion.difficulty}
                                        </Badge>
                                        <Badge variant="outline" className="border-purple-500/30">
                                            <BookOpen className="w-3 h-3 mr-1" />
                                            {isIt ? "Profeta" : "Prophet"}: {isArabic ? currentQuestion.prophetAr : currentQuestion.prophet}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-xl sm:text-2xl leading-relaxed">
                                        {getQuestionText()}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {getOptions().map((option, index) => {
                                            const isSelected = selectedAnswer === index;
                                            const isCorrect = index === currentQuestion.correctAnswer;
                                            const showResult = showExplanation;

                                            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all ';
                                            
                                            if (!showResult) {
                                                buttonClass += isSelected 
                                                    ? 'border-purple-500 bg-purple-500/10' 
                                                    : 'border-slate-200 dark:border-slate-700 hover:border-purple-300';
                                            } else {
                                                if (isCorrect) {
                                                    buttonClass += 'border-green-500 bg-green-500/10';
                                                } else if (isSelected && !isCorrect) {
                                                    buttonClass += 'border-red-500 bg-red-500/10';
                                                } else {
                                                    buttonClass += 'border-slate-200 dark:border-slate-700 opacity-50';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    disabled={showExplanation}
                                                    className={buttonClass}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="flex-1">{option}</span>
                                                        {showResult && isCorrect && (
                                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        )}
                                                        {showResult && isSelected && !isCorrect && (
                                                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation */}
                                    {showExplanation && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="mt-6 p-4 rounded-lg bg-blue-500/10 border-2 border-blue-500/30"
                                        >
                                            <div className="flex items-start gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                                                        {isIt ? "Spiegazione:" : "Explanation:"}
                                                    </h4>
                                                    <p className="text-sm leading-relaxed">
                                                        {getExplanation()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Next Question Button */}
                                    {showExplanation && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="mt-6"
                                        >
                                            <Button
                                                onClick={loadNextQuestion}
                                                disabled={loading}
                                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                                                size="lg"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                        {isIt ? "Caricamento..." : "Loading..."}
                                                    </>
                                                ) : (
                                                    <>
                                                        {isIt ? "Prossima Domanda" : "Next Question"}
                                                        <ArrowRight className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Reset Button */}
                <div className="text-center">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setScore(0);
                            setTotalQuestions(0);
                            setStreak(0);
                            loadNextQuestion();
                        }}
                        className="glass"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        {isIt ? "Ricomincia" : "Start Over"}
                    </Button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
