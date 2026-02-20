import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, Volume2, ArrowRightLeft, BookOpen, AlertCircle } from 'lucide-react';
import { VoiceService } from '@/lib/VoiceService';
import { useToast } from '@/hooks/use-toast';
import OpenRouterService from '@/lib/OpenRouterService';

const languages = [
    { code: 'ar', name: 'Arabic', native: 'العربية' },
    { code: 'en', name: 'English', native: 'English' },
    { code: 'it', name: 'Italian', native: 'Italiano' },
    { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'tr', name: 'Turkish', native: 'Türkçe' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'fa', name: 'Persian', native: 'فارسی' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
    { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
    { code: 'ru', name: 'Russian', native: 'Русский' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'ko', name: 'Korean', native: '한국어' },
    { code: 'pt', name: 'Portuguese', native: 'Português' },
    { code: 'nl', name: 'Dutch', native: 'Nederlands' },
    { code: 'pl', name: 'Polish', native: 'Polski' },
    { code: 'sv', name: 'Swedish', native: 'Svenska' },
    { code: 'no', name: 'Norwegian', native: 'Norsk' },
    { code: 'da', name: 'Danish', native: 'Dansk' },
    { code: 'fi', name: 'Finnish', native: 'Suomi' },
    { code: 'el', name: 'Greek', native: 'Ελληνικά' },
    { code: 'he', name: 'Hebrew', native: 'עברית' },
    { code: 'th', name: 'Thai', native: 'ไทย' },
    { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
    { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
    { code: 'am', name: 'Amharic', native: 'አማርኛ' },
    { code: 'so', name: 'Somali', native: 'Soomaali' },
    { code: 'ha', name: 'Hausa', native: 'Hausa' },
    { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
    { code: 'ig', name: 'Igbo', native: 'Igbo' },
    { code: 'zu', name: 'Zulu', native: 'isiZulu' },
    { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
    { code: 'sq', name: 'Albanian', native: 'Shqip' },
    { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
    { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
    { code: 'bg', name: 'Bulgarian', native: 'Български' },
    { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
    { code: 'cs', name: 'Czech', native: 'Čeština' },
    { code: 'ro', name: 'Romanian', native: 'Română' },
    { code: 'sr', name: 'Serbian', native: 'Српски' },
    { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
    { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
    { code: 'uk', name: 'Ukrainian', native: 'Українська' },
    { code: 'ka', name: 'Georgian', native: 'ქართული' },
    { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
    { code: 'kk', name: 'Kazakh', native: 'Қазақша' },
    { code: 'uz', name: 'Uzbek', native: 'Oʻzbekcha' },
    { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
    { code: 'ps', name: 'Pashto', native: 'پښتو' },
    { code: 'sd', name: 'Sindhi', native: 'سنڌي' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'si', name: 'Sinhala', native: 'සිංහල' },
    { code: 'my', name: 'Burmese', native: 'မြန်မာ' },
    { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
    { code: 'lo', name: 'Lao', native: 'ລາວ' },
    { code: 'tl', name: 'Filipino', native: 'Filipino' },
    { code: 'jv', name: 'Javanese', native: 'Basa Jawa' },
    { code: 'su', name: 'Sundanese', native: 'Basa Sunda' }
];

const TranslationPage = () => {
    const { t, language: appLanguage, isRTL } = useLanguage();
    const { toast } = useToast();
    const [sourceText, setSourceText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sourceLang, setSourceLang] = useState('it');
    const [targetLang, setTargetLang] = useState('ar');
    const [isListening, setIsListening] = useState(false);
    const [isKhutbahMode, setIsKhutbahMode] = useState(false);
    const [fullTranscript, setFullTranscript] = useState('');

    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            // @ts-ignore
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = isKhutbahMode;
            recognitionRef.current.interimResults = isKhutbahMode;
            recognitionRef.current.maxAlternatives = 1;

            recognitionRef.current.onresult = (event: any) => {
                let currentTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        currentTranscript += event.results[i][0].transcript + ' ';
                    }
                }

                if (currentTranscript) {
                    if (isKhutbahMode) {
                        const newText = sourceText + currentTranscript;
                        setSourceText(newText);
                        // INSTANT translation for Friday Khutbah mode - translate every sentence
                        if (currentTranscript.trim().length > 15) {
                            handleTranslate(newText);
                        }
                    } else {
                        setSourceText(currentTranscript.trim());
                        handleTranslate(currentTranscript.trim());
                        setIsListening(false);
                    }
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event);
                setIsListening(false);
                toast({
                    title: t('micErrorTitle'),
                    description: t('micErrorDesc'),
                    variant: "destructive"
                });
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, [sourceLang]);

    const handleTranslate = async (text: string = sourceText) => {
        if (!text.trim()) {
            toast({
                title: t('emptyTextTitle'),
                description: t('emptyTextDesc'),
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);
        setTranslatedText("");

        try {
            // 🚀 FIRST: Try OpenRouter AI Translation (UNLIMITED & PERFECT)
            try {
                const isReligious = text.toLowerCase().includes('allah') || 
                                   text.toLowerCase().includes('prophet') || 
                                   text.toLowerCase().includes('dio') ||
                                   text.toLowerCase().includes('preghiera');
                
                const aiTranslation = await OpenRouterService.translate(text, targetLang, isReligious);
                if (aiTranslation && aiTranslation.length > 0) {
                    setTranslatedText(aiTranslation);
                    setIsLoading(false);
                    return;
                }
            } catch (aiError) {
                console.warn('OpenRouter translation failed, using fallback:', aiError);
            }

            // FALLBACK: Use FREE MyMemory Translation API
            const sourceLangCode = sourceLang || 'auto';
            const targetLangCode = targetLang;

            const encodedText = encodeURIComponent(text);
            const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLangCode}|${targetLangCode}`;

            const response = await fetch(url);

            if (!response.ok || response.status === 429) {
                const scholarResult = await (await import('@/lib/ScholarService')).ScholarService.translate(text, targetLang);
                if (scholarResult) {
                    setTranslatedText(scholarResult);
                    setIsLoading(false);
                    return;
                }
                throw new Error(`Translation service error: ${response.status}`);
            }

            const data = await response.json();

            if (data.responseStatus === 200 && data.responseData?.translatedText) {
                let translated = data.responseData.translatedText;

                // For Arabic, try AI first if it's religious text
                const textLower = text.toLowerCase();
                const isReligious = textLower.includes('allah') || textLower.includes('prophet') || textLower.includes('hadith') || textLower.includes('dio') || textLower.includes('maometto');

                if (targetLang === 'ar' && isReligious) {
                    try {
                        const scholarTranslated = await (await import('@/lib/ScholarService')).ScholarService.translate(text, targetLang);
                        if (scholarTranslated) translated = scholarTranslated;
                    } catch (e) {
                        console.warn("Scholar religious translation failed");
                    }
                }

                const safeTranslated = (typeof translated === 'string' && !translated.includes('[native code]'))
                    ? translated
                    : String(translated || "");

                setTranslatedText(safeTranslated);
            } else {
                // If API returns success but invalid data, fallback to Scholar
                const scholarResult = await (await import('@/lib/ScholarService')).ScholarService.translate(text, targetLang);
                if (scholarResult) setTranslatedText(scholarResult);
                else throw new Error("Invalid response from translation service");
            }

        } catch (error) {
            console.error("❌ Translation Error, trying final research fallback:", error);
            try {
                const scholarResult = await (await import('@/lib/ScholarService')).ScholarService.translate(text, targetLang);
                if (scholarResult) {
                    setTranslatedText(scholarResult);
                } else {
                    throw error;
                }
            } catch (innerError) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                toast({
                    title: t('translationFailed'),
                    description: errorMessage,
                    variant: "destructive"
                });
                setTranslatedText(t('translationServiceOverloaded'));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            toast({
                title: t('notSupported'),
                description: t('voiceInputNotSupported'),
                variant: "destructive"
            });
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            // Set language based on sourceLang
            let langCode = 'en-US';
            if (sourceLang === 'ar') langCode = 'ar-SA';
            else if (sourceLang === 'it') langCode = 'it-IT';
            recognitionRef.current.lang = langCode;

            recognitionRef.current.start();
            setIsListening(true);
            toast({ title: t('listening'), description: t('speakNow') });
        }
    };

    const swapLanguages = () => {
        setSourceLang(targetLang);
        setTargetLang(sourceLang);
        setSourceText(translatedText);
        setTranslatedText(sourceText);
    };

    return (
        <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold mb-4 font-amiri text-primary">{t('translator_title')}</h1>
                    <p className="text-muted-foreground mb-6">{t('translator_subtitle')}</p>

                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Button
                            variant={isKhutbahMode ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                setIsKhutbahMode(!isKhutbahMode);
                                if (isListening) recognitionRef.current?.stop();
                            }}
                            className={`rounded-full px-6 transition-all ${isKhutbahMode ? 'neon-glow-primary' : ''}`}
                        >
                            <Mic className={`w-4 h-4 mr-2 ${isKhutbahMode ? 'animate-pulse' : ''}`} />
                            {isKhutbahMode ? t('khutbahModeOn') : t('standardMode')}
                        </Button>
                    </div>
                </motion.div>

                <Card className="glass-premium border-primary/20">
                    <CardContent className="p-6 space-y-6">
                        {/* Language Selectors */}
                        <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-xl relative z-20">
                            <select
                                value={sourceLang}
                                onChange={(e) => setSourceLang(e.target.value)}
                                className="bg-transparent font-bold text-center w-full focus:outline-none cursor-pointer"
                            >
                                {languages.map(l => <option key={l.code} value={l.code} className="bg-background text-foreground">{l.native}</option>)}
                            </select>

                            <Button variant="ghost" size="icon" onClick={swapLanguages} className="shrink-0 rounded-full hover:bg-primary/20">
                                <ArrowRightLeft className="w-5 h-5 text-primary" />
                            </Button>

                            <select
                                value={targetLang}
                                onChange={(e) => setTargetLang(e.target.value)}
                                className="bg-transparent font-bold text-center w-full focus:outline-none cursor-pointer"
                            >
                                {languages.map(l => <option key={l.code} value={l.code} className="bg-background text-foreground">{l.native}</option>)}
                            </select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Source */}
                            <div className="space-y-2">
                                <div className="relative">
                                    <Textarea
                                        value={sourceText}
                                        onChange={(e) => setSourceText(e.target.value)}
                                        placeholder={t('enter_text')}
                                        className="min-h-[200px] resize-none p-4 text-lg bg-background/50 border-primary/10 rounded-2xl focus:ring-primary/20"
                                        dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
                                    />
                                    <div className="absolute bottom-3 right-3 flex gap-2">
                                        <Button
                                            size="icon"
                                            variant={isListening ? "destructive" : "secondary"}
                                            className={`rounded-full w-10 h-10 shadow-lg ${isListening ? 'animate-pulse' : ''}`}
                                            onClick={toggleListening}
                                        >
                                            <Mic className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-sm text-muted-foreground px-2">
                                    <span>{sourceText.length} {t('chars')}</span>
                                    <Button size="sm" onClick={() => handleTranslate()} disabled={isLoading || (typeof sourceText === 'string' && !sourceText.trim())}>
                                        {isLoading ? t('translating') : t('translate')}
                                    </Button>
                                </div>
                            </div>

                            {/* Target */}
                            <div className="space-y-2">
                                <div className="relative h-full">
                                    <div
                                        className={`w-full h-full min-h-[200px] p-4 text-lg bg-primary/5 border border-primary/10 rounded-2xl ${isLoading ? 'animate-pulse' : ''}`}
                                        dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
                                    >
                                        {translatedText || <span className="text-muted-foreground opacity-50 italic">{t('translation_appear')}</span>}
                                    </div>
                                    <div className="absolute bottom-3 right-3">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="rounded-full w-10 h-10 hover:bg-primary/20"
                                            onClick={async () => {
                                                try {
                                                    await VoiceService.speak(translatedText, targetLang);
                                                } catch (e) {
                                                    console.error("Speech error", e);
                                                    toast({
                                                        title: `❌ ${t('audioError')}`,
                                                        description: t('audioErrorDescShort'),
                                                        variant: "destructive"
                                                    });
                                                }
                                            }}
                                            disabled={!translatedText}
                                        >
                                            <Volume2 className="w-5 h-5 text-primary" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                        <span className="text-[10px] sm:text-xs">{t('scholarInsight')}</span>
                        <AlertCircle className="w-3 h-3" />
                        {t('verify_religious')}
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TranslationPage;
