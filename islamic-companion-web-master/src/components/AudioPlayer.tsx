import { useState, useEffect, useRef } from 'react';
import { Play, Pause, X, Volume2, Square, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioPlayerProps {
    text: string;
    language?: string;
    onClose?: () => void;
    autoPlay?: boolean;
    onNext?: () => void;
    showNext?: boolean;
}

// Singleton to prevent multiple audio players
class AudioManager {
    private static instance: AudioManager;
    private currentUtterance: SpeechSynthesisUtterance | null = null;
    private currentPlayer: string | null = null;

    private constructor() { }

    static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    stopAll() {
        window.speechSynthesis.cancel();
        this.currentUtterance = null;
        this.currentPlayer = null;
    }

    setCurrentPlayer(id: string, utterance: SpeechSynthesisUtterance) {
        if (this.currentPlayer && this.currentPlayer !== id) {
            this.stopAll();
        }
        this.currentPlayer = id;
        this.currentUtterance = utterance;
    }

    isPlaying(id: string): boolean {
        return this.currentPlayer === id && window.speechSynthesis.speaking;
    }
}

export const AudioPlayer = ({ text, language = 'auto', onClose, autoPlay = false, onNext, showNext = false }: AudioPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const playerIdRef = useRef<string>(`player-${Date.now()}-${Math.random()}`);
    const audioManager = AudioManager.getInstance();

    useEffect(() => {
        if (autoPlay) {
            handlePlay();
        }

        return () => {
            handleStop();
        };
    }, []);

    const detectLanguage = (text: string): string => {
        const arabicPattern = /[\u0600-\u06FF]/;
        const englishWords = ['the', 'is', 'and', 'was', 'prophet', 'said', 'narrated'];
        const italianWords = ['il', 'e', 'è', 'del', 'profeta', 'disse', 'narrò'];

        if (arabicPattern.test(text)) return 'ar';

        const textLower = text.toLowerCase();
        const enScore = englishWords.filter(word => textLower.includes(word)).length;
        const itScore = italianWords.filter(word => textLower.includes(word)).length;

        if (enScore > itScore) return 'en';
        if (itScore > enScore) return 'it';
        return 'it';
    };

    const handlePlay = () => {
        if (isPaused && utteranceRef.current) {
            window.speechSynthesis.resume();
            setIsPlaying(true);
            setIsPaused(false);
            return;
        }

        // Stop any other playing audio
        audioManager.stopAll();

        const detectedLang = language === 'auto' ? detectLanguage(text) : language;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = detectedLang === 'ar' ? 'ar-SA' : (detectedLang === 'it' ? 'it-IT' : 'en-US');
        utterance.rate = 0.9;

        utterance.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utterance.onerror = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        utteranceRef.current = utterance;
        audioManager.setCurrentPlayer(playerIdRef.current, utterance);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setIsPaused(true);
    };

    const handleStop = () => {
        audioManager.stopAll();
        setIsPlaying(false);
        setIsPaused(false);
        utteranceRef.current = null;
    };

    const handleClose = () => {
        handleStop();
        onClose?.();
    };

    const handleNext = () => {
        handleStop();
        onNext?.();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-8 right-8 z-50 glass p-4 rounded-2xl border border-primary/20 shadow-2xl flex items-center gap-3 min-w-[320px]"
            >
                <div className="flex items-center gap-2 flex-1">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">Audio Player</p>
                        <p className="text-[10px] text-muted-foreground truncate">{text.substring(0, 30)}...</p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    {!isPlaying && !isPaused && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-primary/10"
                            onClick={handlePlay}
                            title="Play"
                        >
                            <Play className="w-4 h-4" />
                        </Button>
                    )}

                    {isPlaying && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-primary/10"
                            onClick={handlePause}
                            title="Pause"
                        >
                            <Pause className="w-4 h-4" />
                        </Button>
                    )}

                    {isPaused && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-primary/10"
                            onClick={handlePlay}
                            title="Resume"
                        >
                            <Play className="w-4 h-4" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-orange-500/10 hover:text-orange-500"
                        onClick={handleStop}
                        title="Stop"
                    >
                        <Square className="w-4 h-4" />
                    </Button>

                    {showNext && onNext && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 hover:bg-blue-500/10 hover:text-blue-500"
                            onClick={handleNext}
                            title="Next"
                        >
                            <SkipForward className="w-4 h-4" />
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
                        onClick={handleClose}
                        title="Close"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
