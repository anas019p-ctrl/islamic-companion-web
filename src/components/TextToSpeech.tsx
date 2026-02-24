import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextToSpeechProps {
  text: string;
  language: string;
  className?: string;
}

// Map language codes to speech synthesis voices
const languageVoiceMap: Record<string, string> = {
  ar: 'ar-SA',
  en: 'en-US',
  it: 'it-IT',
  fr: 'fr-FR',
  es: 'es-ES',
  ur: 'ur-PK',
};

export const TextToSpeech = ({ text, language, className = '' }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Use Web Speech API as primary (with fallback ready for ElevenLabs if API key is provided)
  const speak = useCallback(async () => {
    if (isPlaying) {
      // Stop current speech
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      // Check if speech synthesis is available
      if (!('speechSynthesis' in window)) {
        throw new Error('Speech synthesis not supported');
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageVoiceMap[language] || 'en-US';
      utterance.rate = language === 'ar' ? 0.9 : 1.0; // Slower for Arabic
      utterance.pitch = 1.0;

      // Try to find a suitable voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith(languageVoiceMap[language]?.split('-')[0] || 'en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        setIsLoading(false);
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsPlaying(false);
        setIsLoading(false);
        toast({
          title: language === 'ar' ? 'خطأ' : 'Error',
          description: language === 'ar' ? 'فشل تشغيل الصوت' : 'Failed to play audio',
          variant: 'destructive',
        });
      };

      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('TTS error:', error);
      setIsLoading(false);
      toast({
        title: language === 'ar' ? 'خطأ' : 'Error',
        description: language === 'ar' ? 'الصوت غير متاح' : 'Audio not available',
        variant: 'destructive',
      });
    }
  }, [text, language, isPlaying, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Load voices (needed for some browsers)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={speak}
      disabled={isLoading}
      className={`gap-2 ${className}`}
      aria-label={isPlaying 
        ? (language === 'ar' ? 'إيقاف القراءة' : 'Stop reading') 
        : (language === 'ar' ? 'استماع' : 'Listen')}
      aria-pressed={isPlaying}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
      ) : isPlaying ? (
        <VolumeX className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Volume2 className="w-4 h-4" aria-hidden="true" />
      )}
      <span className="sr-only md:not-sr-only">
        {isPlaying 
          ? (language === 'ar' ? 'إيقاف' : 'Stop') 
          : (language === 'ar' ? 'استمع' : 'Listen')}
      </span>
    </Button>
  );
};

export default TextToSpeech;
