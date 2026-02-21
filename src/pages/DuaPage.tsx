import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Play, Pause, Heart, Volume2, Book, Bookmark, Compass, Coffee, Stars, ShieldCheck, Bed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AudioService from '@/lib/AudioService';
import { COMPREHENSIVE_ADKAR, ADKAR_COUNTS, type Dua } from '@/data/adkar-database';

const DuaPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('morning');

  const { data: duas = COMPREHENSIVE_ADKAR, isLoading } = useQuery({
    queryKey: ['duas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('duas')
        .select('*')
        .order('order_index');

      if (error || !data || data.length < COMPREHENSIVE_ADKAR.length) {
        return COMPREHENSIVE_ADKAR;
      }
      return data as any;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const filteredDuas = duas.filter(dua => dua.category === activeCategory);
  const isRTL = language === 'ar';

  const getTranslation = (dua: Dua) => {
    return dua.translations?.[language] || dua.translations?.en || '';
  };

  const speak = (text: string) => {
    AudioService.speak(text, 'ar-SA');
  };

  return (
    <div className={`min-h-screen bg-background/50 backdrop-blur-sm text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main className="container mx-auto px-4 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <Compass className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">{t('spiritualFortress')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
            {t('dhikrDevotion')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t('adkarDesc')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="h-14 bg-secondary/30 p-1 rounded-2xl border border-white/5 flex gap-2 overflow-x-auto">
                <TabsTrigger value="morning" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <Coffee className="w-4 h-4" /> {t('morning')} ({ADKAR_COUNTS.morning})
                </TabsTrigger>
                <TabsTrigger value="evening" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <Stars className="w-4 h-4" /> {t('evening')} ({ADKAR_COUNTS.evening})
                </TabsTrigger>
                <TabsTrigger value="daily" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <Bookmark className="w-4 h-4" /> {t('daily')} ({ADKAR_COUNTS.daily})
                </TabsTrigger>
                <TabsTrigger value="prayer" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <Book className="w-4 h-4" /> {t('prayer_tab')} ({ADKAR_COUNTS.prayer})
                </TabsTrigger>
                <TabsTrigger value="sleep" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <Bed className="w-4 h-4" /> {t('sleep')} ({ADKAR_COUNTS.sleep})
                </TabsTrigger>
                <TabsTrigger value="protection" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex gap-2 whitespace-nowrap">
                  <ShieldCheck className="w-4 h-4" /> {t('protection')} ({ADKAR_COUNTS.protection})
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[60vh] pr-4 -mr-4">
              <AnimatePresence mode="wait">
                <TabsContent value={activeCategory} className="space-y-6 m-0">
                  {filteredDuas.map((dua, index) => (
                    <motion.div
                      key={dua.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="futuristic-card group">
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[8px] tracking-widest uppercase opacity-50 border-primary/20">{dua.source}</Badge>
                            <Button variant="ghost" size="icon" className="h-10 w-10 text-primary hover:bg-primary/10" onClick={() => speak(dua.text_ar)}>
                              <Volume2 className="w-5 h-5" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-8">
                          <div className="text-right" dir="rtl">
                            <h3 className="text-xl font-bold text-primary mb-4">{dua.title_ar}</h3>
                            <p className="text-3xl font-amiri leading-[2.2] text-foreground group-hover:drop-shadow-[0_0_8px_rgba(201,164,74,0.3)] transition-all">
                              {dua.text_ar}
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div>
                              <p className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground mb-2">{t('transliteration_label')}</p>
                              <p className="text-xs text-muted-foreground italic leading-relaxed">{dua.transliteration}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-widest font-bold text-primary mb-2">{t('translation_label')}</p>
                              <p className="text-sm text-foreground/80 leading-relaxed font-medium">{getTranslation(dua)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
              </AnimatePresence>
            </ScrollArea>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DuaPage;
