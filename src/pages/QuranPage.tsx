import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Book, Play, Search, ChevronLeft, ChevronRight, Volume2, Headset, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { islamicApi } from '@/services/islamicApi';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { BackButton } from '@/components/BackButton';
import { VoiceService } from '@/lib/VoiceService';

interface Ayah {
  id: string;
  ayah_number: number;
  text_ar: string;
  text_uthmani: string | null;
  translations: unknown;
}

interface Surah {
  id: number;
  number: number;
  name_ar: string;
  name_en: string;
  revelation_type: string;
  verses_count: number;
  translations: unknown;
}

const QuranPage = () => {
  const { t, language } = useLanguage();
  const { speak, isDeafMode } = useAccessibility();
  const { toast } = useToast();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Array<{ id: string; ayah_number: number; text_ar: string; translation?: string }>>([]);
  const [isAyahsLoading, setIsAyahsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(VoiceService.getStatus().isSpeaking);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    if (selectedSurah) {
      fetchAyahs(selectedSurah.number);
    }
  }, [selectedSurah]);

  // Sync isPlaying with global VoiceService status
  useEffect(() => {
    const interval = setInterval(() => {
      const status = VoiceService.getStatus();
      if (status.isSpeaking !== isPlaying) {
        setIsPlaying(status.isSpeaking);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const fetchAyahs = async (surahNumber: number) => {
    setIsAyahsLoading(true);
    try {
      // First try API for full content (114 surahs guaranteed)
      const data = await islamicApi.getSurahWithDetails(surahNumber, language === 'it' ? 'it.piccardo' : 'en.sahih');
      console.log('Surah details from API:', data);

       
      const combinedAyahs = data.arabic.map((a: any, i: number) => ({
        id: `${surahNumber}-${a.numberInSurah}`,
        ayah_number: a.numberInSurah,
        text_ar: a.text,
         
        translation: data.translation[i]?.text || (data.translation[i] as any)?.translations?.[language] || (data.translation[i] as any)?.translations?.en
      }));

      setAyahs(combinedAyahs);
    } catch (error) {
      console.error('Error fetching ayahs from API, trying Supabase:', error);
      // Fallback to Supabase if API fails
      const { data, error: sbError } = await supabase
        .from('ayahs')
        .select('*')
        .eq('surah_number', surahNumber)
        .order('ayah_number');

      if (!sbError) setAyahs(data || []);
    } finally {
      setIsAyahsLoading(false);
    }
  };

  const fetchSurahs = async () => {
    try {
      // Try Supabase first
      const { data, error } = await supabase
        .from('surahs')
        .select('*')
        .order('number');

      // If Supabase has data but it's incomplete (less than 114), or if there's an error/no data
      if (error || !data || data.length < 114) {
        console.log(`Supabase has ${data?.length || 0} surahs. Fetching all 114 from external API...`);
        const apiData = await islamicApi.getAllSurahs();
        const mappedSurahs: Surah[] = apiData.map(s => ({
          id: s.number,
          number: s.number,
          name_ar: s.name,
          name_en: s.englishName,
          revelation_type: s.revelationType.toLowerCase(),
          verses_count: s.numberOfAyahs,
          translations: { en: s.englishNameTranslation }
        }));
        setSurahs(mappedSurahs);
      } else {
        setSurahs(data);
      }
    } catch (error) {
      console.error('Error fetching surahs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playSurahAudio = async (surahNumber: number) => {
    try {
      const url = await islamicApi.getAudioUrl(surahNumber);
      // Use global VoiceService for all audio to ensure synchronization and GlobalAudioPlayer support
      await VoiceService.playExternal(url);

      const status = VoiceService.getStatus();
      setIsPlaying(status.isSpeaking);

      toast({
        title: t('playingAudio'),
        description: `${t('surah')} ${surahNumber}`,
      });

      // Speak title but don't stop the external audio being loaded
      VoiceService.speak(`${language === 'ar' ? 'تشغيل سورة' : 'Playing Surah'} ${surahNumber}`, language === 'ar' ? 'ar' : 'en', 'generic', false);
    } catch (error) {
      setIsPlaying(false);
      console.error('Audio play error:', error);
    }
  };

  const getSurahTranslation = (surah: Surah) => {
    const translations = surah.translations as Record<string, string> | null;
    return translations?.[language] || translations?.en || surah.name_en;
  };

  const filteredSurahs = surahs.filter(surah =>
    surah.name_ar.includes(searchQuery) ||
    surah.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getSurahTranslation(surah).toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.number.toString().includes(searchQuery)
  );

  const isRTL = language === 'ar' || language === 'ur';

  return (
    <div className={`min-h-screen bg-transparent ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />

      <main className="container mx-auto px-4 py-8 pt-24">
        <BackButton />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold font-amiri text-primary mb-4">
            {t('quran_title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('quran_subtitle')}
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t('searchSurah')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filteredSurahs.map((surah) => (
                <motion.div
                  key={surah.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    setSelectedSurah(surah);
                    speak(getSurahTranslation(surah));
                  }}
                >
                  <Card className="futuristic-card cursor-pointer group relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSurahAudio(surah.number);
                        }}
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* Surah Number with Neon Effect */}
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary font-bold shadow-[0_0_15px_hsla(var(--islamic-gold),0.2)]">
                          {surah.number}
                        </div>

                        {/* Surah Info */}
                        <div className="flex-1">
                          <h3 className="font-amiri text-2xl text-foreground group-hover:text-primary transition-colors">
                            {surah.name_ar}
                          </h3>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">
                            {getSurahTranslation(surah)}
                          </p>
                        </div>

                        {/* Info Badges */}
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] text-muted-foreground">{surah.verses_count} vrs</span>
                          <div className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${surah.revelation_type === 'meccan'
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            }`}>
                            {surah.revelation_type === 'meccan' ? t('meccan') : t('medinan')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Surah Reader Modal */}
        <AnimatePresence>
          {selectedSurah && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSurah(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSurah(null)}
                      className="text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <div className="text-center">
                      <h2 className="text-3xl font-amiri">{selectedSurah.name_ar}</h2>
                      <p className="text-primary-foreground/80">
                        {getSurahTranslation(selectedSurah)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={() => playSurahAudio(selectedSurah.number)}
                    >
                      {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Play className="w-6 h-6" />}
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[65vh] p-6 bg-gradient-to-b from-card to-background">
                  <div className="space-y-8">
                    {/* Basmala */}
                    {selectedSurah.number !== 1 && selectedSurah.number !== 9 && !isAyahsLoading && (
                      <div className="text-center mb-12">
                        <p className="text-3xl font-amiri text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                      </div>
                    )}

                    {isAyahsLoading ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="text-xs tracking-widest uppercase opacity-50">{t('loadingSacredCodes')}</p>
                      </div>
                    ) : ayahs.length > 0 ? (
                      <div className="space-y-12">
                        {ayahs.map((ayah) => (
                          <motion.div
                            key={ayah.id}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="group relative"
                          >
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center text-[10px] text-primary shrink-0 font-bold group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                                  {ayah.ayah_number}
                                </div>
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                              </div>

                              <p className="text-4xl md:text-5xl font-amiri leading-[2.5] text-foreground text-right" dir="rtl">
                                {ayah.text_ar}
                              </p>

                              {ayah.translation && (
                                <p className="text-foreground/90 text-lg md:text-xl leading-relaxed border-l-4 border-primary/20 pl-6 py-2">
                                  {ayah.translation}
                                </p>
                              )}

                              {isDeafMode && isPlaying && (
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="h-1 w-full bg-blue-500/20 rounded-full overflow-hidden"
                                >
                                  <div className="h-full bg-blue-400 w-1/3 animate-pulse" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground font-amiri">{t('verbsNotFound')}</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default QuranPage;
