/**
 * ðŸŽµ GLOBAL AUDIO SERVICE - Ultra-Light Singleton
 * Handles all audio playback with zero pre-loading.
 */

class AudioService {
    private static instance: AudioService;
    private audio: HTMLAudioElement | null = null;
    private currentUrl: string | null = null;

    private constructor() {
        // Only initialized in browser
        if (typeof window !== 'undefined') {
            this.audio = new Audio();
            this.audio.preload = 'none'; // CRITICAL: Never pre-load
        }
    }

    public static getInstance(): AudioService {
        if (!AudioService.instance) {
            AudioService.instance = new AudioService();
        }
        return AudioService.instance;
    }

    /**
     * Play streaming audio from URL
     */
    public playStream(url: string) {
        if (!this.audio) return;

        if (this.currentUrl === url && !this.audio.paused) {
            this.audio.pause();
            return;
        }

        this.audio.src = url;
        this.currentUrl = url;
        this.audio.play().catch(e => console.error("Audio Playback Error:", e));
    }

    /**
     * Web Speech API - Text to Speech (Free & Zero Weight)
     */
    public speak(text: string, lang: string = 'ar-SA') {
        if (!('speechSynthesis' in window)) {
            console.warn("Speech Synthesis not supported");
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9; // Slightly slower for clarity

        window.speechSynthesis.speak(utterance);
    }

    public stop() {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    /**
     * Compatibility alias for playStream
     */
    public playExternal(url: string) {
        this.playStream(url);
    }

    /**
     * Returns audio status for UI feedback
     */
    public getStatus() {
        return {
            isPlaying: this.audio ? !this.audio.paused : false,
            isSpeaking: typeof window !== 'undefined' ? window.speechSynthesis.speaking : false,
            isPaused: this.audio ? this.audio.paused && !this.audio.ended : false
        };
    }

    public pause() {
        if (this.audio) {
            this.audio.pause();
        }
        if (typeof window !== 'undefined' && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
        }
    }

    public resume() {
        if (this.audio && this.audio.paused) {
            this.audio.play().catch(console.error);
        }
        if (typeof window !== 'undefined' && window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
        }
    }
}

export default AudioService.getInstance();
