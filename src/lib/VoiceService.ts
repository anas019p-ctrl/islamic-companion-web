import { toast } from '@/hooks/use-toast';

export class VoiceService {
    private static ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || "";
    private static VOICES = {
        ar: "EXAVITQu4vr4xnSDxMaL", // Bella (Arabic Friendly)
        en: "21m00Tcm4TlvDq8ikWAM", // Rachel
        it: "pNInz6obpgmqMHCiWQ71"  // Adam (Italian Friendly)
    };

    private static isSpeaking = false;
    private static isPaused = false;
    private static currentAudio: HTMLAudioElement | null = null;
    private static currentUtterance: SpeechSynthesisUtterance | null = null;

    static async speak(text: string, language: string = 'auto', source: string = 'generic', stopExternal: boolean = true): Promise<void> {
        if (!text || text.trim().length === 0) return;

        if (stopExternal) this.stop(); // Stop any previous playback if requested

        const detectedLang = language === 'auto' ? this.detectLanguage(text) : language;

        const hasValidKey = this.ELEVENLABS_API_KEY &&
            this.ELEVENLABS_API_KEY !== "your_elevenlabs_key_here" &&
            this.ELEVENLABS_API_KEY.length > 10;

        if (hasValidKey) {
            try {
                await this.speakElevenLabs(text, detectedLang);
                return;
            } catch (error) {
                console.warn("[VoiceService] ElevenLabs failed, falling back to Browser TTS:", error);
            }
        }

        await this.speakBrowser(text, detectedLang);
    }

    static async playExternal(url: string, volume: number = 1.0): Promise<void> {
        try {
            // Se l'audio richiesto è lo stesso che sta già suonando, facciamo pausa/riprendi
            if (this.currentAudio && this.currentAudio.src === url) {
                if (this.currentAudio.paused) {
                    this.currentAudio.play();
                } else {
                    this.currentAudio.pause();
                }
                return;
            }

            this.stop();
            const audio = new Audio(url);
            audio.preload = "auto";
            audio.load(); // Force loading
            this.currentAudio = audio;
            audio.volume = volume;
            this.isSpeaking = true;

            audio.onended = () => { if (this.currentAudio === audio) this.isSpeaking = false; };
            audio.onerror = (e) => {
                console.error("[VoiceService] External Audio Error:", e);
                if (this.currentAudio === audio) this.isSpeaking = false;
            };

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    this.isSpeaking = false;
                });
            }
        } catch (error) {
            console.error("[VoiceService] Critical Audio Error:", error);
            this.isSpeaking = false;
        }
    }

    private static async speakElevenLabs(text: string, lang: string): Promise<void> {
        const voiceId = this.VOICES[lang as keyof typeof this.VOICES] || this.VOICES.en;

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': this.ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2",
                voice_settings: { stability: 0.5, similarity_boost: 0.8 }
            })
        });

        if (!response.ok) throw new Error("ElevenLabs API Limit reached or Key invalid");

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        this.currentAudio = new Audio(audioUrl);
        this.isSpeaking = true;

        this.currentAudio.onended = () => { this.isSpeaking = false; URL.revokeObjectURL(audioUrl); this.currentAudio = null; };
        this.currentAudio.onerror = () => { this.isSpeaking = false; URL.revokeObjectURL(audioUrl); this.currentAudio = null; };

        await this.currentAudio.play();
    }

    private static async speakBrowser(text: string, lang: string) {
        if (!window.speechSynthesis) return;

        window.speechSynthesis.cancel();

        if (window.speechSynthesis.getVoices().length === 0) {
            await new Promise(resolve => {
                const timer = setTimeout(resolve, 500);
                window.speechSynthesis.onvoiceschanged = () => {
                    clearTimeout(timer);
                    resolve(true);
                };
            });
        }

        const utterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance = utterance;

        const langMap: Record<string, string> = {
            'ar': 'ar-SA',
            'it': 'it-IT',
            'en': 'en-US',
            'fr': 'fr-FR',
            'es': 'es-ES',
            'de': 'de-DE',
            'tr': 'tr-TR',
            'ru': 'ru-RU',
            'ur': 'ur-PK',
            'fa': 'fa-IR',
            'hi': 'hi-IN',
            'id': 'id-ID',
            'ms': 'ms-MY',
            'zh': 'zh-CN',
            'bn': 'bn-BD',
            'sq': 'sq-AL',
            'ku': 'ku-TR'
        };

        let targetLang = langMap[lang] || 'en-US';
        utterance.lang = targetLang;
        const voices = window.speechSynthesis.getVoices();

        // 1. Exact match (e.g., ar-SA)
        let voice = voices.find(v => v.lang === targetLang);

        // 2. Language match (e.g., any ar-*)
        if (!voice && lang === 'ar') {
            voice = voices.find(v => v.lang.startsWith('ar'));
        }

        // 3. Specific high-quality voices fallback
        if (!voice && lang === 'ar') {
            voice = voices.find(v =>
                (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Maged')) &&
                v.lang.startsWith('ar')
            );
        }

        // 4. Fallback to generic language check for others
        if (!voice) {
            voice = voices.find(v => v.lang.startsWith(lang));
        }

        if (voice && voice.lang.startsWith(lang)) {
            utterance.voice = voice;
            toast({
                title: "🔊 Audio in riproduzione",
                description: `Voce: ${voice.name} (${voice.lang})`,
            });
        } else if (lang === 'ar') {
            // No Arabic voice available - try with any available voice
            console.warn("[VoiceService] No Arabic voice found, trying with available voice");
            const anyVoice = voices[0];
            if (anyVoice) {
                utterance.voice = anyVoice;
                toast({
                    title: "⚠️ Voce Araba non disponibile",
                    description: "Utilizzo voce alternativa. Per migliore qualità, installa voci arabe sul dispositivo.",
                });
            } else {
                toast({
                    title: "❌ Audio non disponibile",
                    description: "Nessuna voce TTS trovata sul dispositivo.",
                    variant: "destructive"
                });
                return;
            }
        }
        utterance.rate = 0.9;

        utterance.onstart = () => { this.isSpeaking = true; this.isPaused = false; };
        utterance.onend = () => { this.isSpeaking = false; this.currentUtterance = null; };
        utterance.onerror = (e) => {
            console.error("[VoiceService] Speech error:", e);
            this.isSpeaking = false;
            this.currentUtterance = null;
            toast({
                title: "❌ Errore Audio",
                description: "Impossibile riprodurre l'audio.",
                variant: "destructive"
            });
        };

        window.speechSynthesis.speak(utterance);
    }

    private static detectLanguage(text: string): string {
        const arabicPattern = /[\u0600-\u06FF]/;
        if (arabicPattern.test(text)) return 'ar';

        // Better Italian detection
        const italianKeywords = ['il', 'la', 'di', 'per', 'con', 'dio', 'preghiera', 'pace', 'grazie', 'ciao', 'buongiorno'];
        const textLower = text.toLowerCase();
        if (italianKeywords.some(word => textLower.includes(word))) return 'it';

        return 'en';
    }

    static pause(): void {
        if (this.currentAudio) {
            this.currentAudio.pause();
        } else if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
        this.isPaused = true;
    }

    static resume(): void {
        if (this.currentAudio) {
            this.currentAudio.play();
        } else if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
        this.isPaused = false;
    }

    static stop(): void {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        window.speechSynthesis.cancel();
        this.isSpeaking = false;
        this.isPaused = false;
        this.currentUtterance = null;
    }

    static getStatus() {
        return {
            isSpeaking: this.isSpeaking,
            isPaused: this.isPaused
        };
    }
}
