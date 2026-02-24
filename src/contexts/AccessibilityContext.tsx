import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AccessibilityContextType {
    isBlindMode: boolean;
    isDeafMode: boolean;
    highContrast: boolean;
    isHubOpen: boolean;
    toggleBlindMode: () => void;
    toggleDeafMode: () => void;
    toggleHighContrast: () => void;
    toggleHub: (open?: boolean) => void;
    speak: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isBlindMode, setIsBlindMode] = useState(false);
    const [isDeafMode, setIsDeafMode] = useState(false);
    const [highContrast, setHighContrast] = useState(false);
    const [isHubOpen, setIsHubOpen] = useState(false);
    const { toast } = useToast();

    const speak = useCallback((text: string) => {
        if (!isBlindMode) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }, [isBlindMode]);

    const toggleBlindMode = () => {
        const newState = !isBlindMode;
        setIsBlindMode(newState);
        if (newState) {
            toast({
                title: "Modalità Non Vedenti Attivata",
                description: "L'app ora leggerà i contenuti e accetterà comandi vocali.",
            });
            speak("Modalità per non vedenti attivata. Puoi navigare usando la voce.");
        } else {
            window.speechSynthesis.cancel();
        }
    };

    const toggleDeafMode = () => {
        setIsDeafMode(!isDeafMode);
        toast({
            title: isDeafMode ? "Modalità Sordi Disattivata" : "Modalità Sordi Attivata",
            description: isDeafMode ? "Feedback visivo rimosso." : "Attivati sottotitoli e feedback visivi per l'audio.",
        });
    };

    const toggleHighContrast = () => setHighContrast(!highContrast);
    const toggleHub = (open?: boolean) => setIsHubOpen(open !== undefined ? open : !isHubOpen);

    // Implement Voice Recognition
    useEffect(() => {
        if (isBlindMode && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
             
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.lang = 'it-IT';

             
            recognition.onresult = (event: any) => {
                const command = event.results[event.results.length - 1][0].transcript.toLowerCase();

                if (command.includes('corano')) {
                    speak('Navigo al Corano');
                    window.location.href = '/quran';
                } else if (command.includes('hadith')) {
                    speak('Navigo agli Hadith');
                    window.location.href = '/hadith';
                } else if (command.includes('chiudi') || command.includes('hub')) {
                    toggleHub(false);
                } else if (command.includes('apri hub')) {
                    toggleHub(true);
                }
            };

            recognition.start();
            return () => recognition.stop();
        }
    }, [isBlindMode, speak]);

    return (
        <AccessibilityContext.Provider value={{
            isBlindMode,
            isDeafMode,
            highContrast,
            isHubOpen,
            toggleBlindMode,
            toggleDeafMode,
            toggleHighContrast,
            toggleHub,
            speak
        }}>
            <div className={highContrast ? 'high-contrast' : ''}>
                {children}
            </div>
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);
    if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
    return context;
};
