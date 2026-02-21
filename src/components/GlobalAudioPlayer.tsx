import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioService from '@/lib/AudioService';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Volume2, Heart } from 'lucide-react';

export const GlobalAudioPlayer = () => {
    const [status, setStatus] = useState(AudioService.getStatus());

    useEffect(() => {
        const interval = setInterval(() => {
            const currentStatus = AudioService.getStatus();
            if (currentStatus.isSpeaking !== status.isSpeaking || currentStatus.isPaused !== status.isPaused) {
                setStatus(currentStatus);
            }
        }, 500);
        return () => clearInterval(interval);
    }, [status]);

    return (
        <AnimatePresence>
            {(status.isSpeaking || status.isPaused) && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] glass-premium rounded-full p-2 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-primary/30 px-6 backdrop-blur-2xl"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Volume2 className={`w-4 h-4 text-primary ${status.isSpeaking && !status.isPaused ? 'animate-pulse' : ''}`} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] uppercase font-black text-primary tracking-[0.2em] leading-none">Audio System</span>
                            <span className="text-[9px] font-medium opacity-60">Multimedia Control</span>
                        </div>
                    </div>

                    <div className="h-6 w-[1px] bg-white/10 mx-1" />

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full hover:bg-primary/20 transition-colors"
                            onClick={() => status.isPaused ? AudioService.resume() : AudioService.pause()}
                        >
                            {status.isPaused ? (
                                <Play className="w-5 h-5 text-primary fill-primary/20" />
                            ) : (
                                <Pause className="w-5 h-5 text-primary" />
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full hover:bg-destructive/20 transition-colors"
                            onClick={() => AudioService.stop()}
                        >
                            <Square className="w-4 h-4 text-destructive fill-destructive/20" />
                        </Button>
                    </div>

                    <div className="absolute -top-1 -right-1">
                        <Heart className="w-4 h-4 text-primary/40 animate-slow-spin" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
