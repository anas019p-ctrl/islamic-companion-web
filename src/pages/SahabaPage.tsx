import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Book, Users, Star, Shield, Heart, Gem, Loader2, BookOpen, Volume2, Search, Download, FileText, X, GraduationCap, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScholarService } from '@/lib/ScholarService';
import AudioService from '@/lib/AudioService';
import { ShamilaService } from '@/lib/ShamilaService';
import { BackButton } from '@/components/BackButton';

interface HeroFigure {
    id: string;
    name_ar: string;
    name_en: string;
    translations: Record<string, string>;
    story_ar: string;
    story_translations: Record<string, string>;
    category: 'prophet' | 'caliph' | 'warrior' | 'woman' | 'companion';
    dawah_lesson_it?: string;
    dawah_lesson_ar?: string;
    quran_ref?: string;
}

const sahabaData: HeroFigure[] = [
    {
        id: 'p1',
        name_ar: 'محمد ﷺ',
        name_en: 'Prophet Muhammad ﷺ',
        translations: { it: 'Il Profeta Muhammad ﷺ' },
        category: 'prophet',
        quran_ref: 'Surah Al-Ahzab 33:21',
        story_ar: 'خاتم الأنبياء والمرسلين، بعثه الله رحمة للعالمين. كان خلقه القرآن، وأسس دولة الإسلام بالعدل والرحمة والشورى.',
        story_translations: {
            it: 'Il Sigillo dei Profeti e la Misericordia per i mondi. La sua vita è l\'esempio perfetto di ogni virtù umana, dalla spiritualità alla leadership politica.',
            en: 'The Seal of the Prophets and Mercy to the worlds. His character was the Quran in practice.'
        },
        dawah_lesson_it: 'Il predicatore deve essere l\'esempio vivente di ciò che insegna. La gentilezza (Rifq) e l\'onestà (Al-Amin) sono le basi prima della parola.',
        dawah_lesson_ar: 'القدوة الحسنة هي أعظم وسيلة للدعوة. الصدق والأمانة والرفق بالجاهل.'
    },
    {
        id: 'p2',
        name_ar: 'إبراهيم عليه السلام',
        name_en: 'Prophet Ibrahim (AS)',
        translations: { it: 'Profeta Ibrahim (AS)' },
        category: 'prophet',
        quran_ref: 'Surah An-Nahl 16:120',
        story_ar: 'خليل الله وأبو الأنبياء، جاهد في الله حق جهاده وواجه قومه بالمنطق والحجة العقلية واليقين القلبي.',
        story_translations: {
            it: 'L\'Amico di Allah e il padre dei Profeti. Unificatore del monoteismo puro, affrontò il fuoco e l\'esilio con fede incrollabile.',
            en: 'The Friend of Allah and father of Prophets. He faced trial and fire with absolute certainty.'
        },
        dawah_lesson_it: 'Usa la ragione e la logica per far riflettere le persone, ma mantieni sempre il cuore connesso ad Allah. La Da\'wah richiede pazienza nei confronti della propria famiglia.',
        dawah_lesson_ar: 'استخدام المنطق والحجة العقلية في الدعوة، والصبر على أذى الأقربين.'
    },
    {
        id: 'p3',
        name_ar: 'موسى عليه السلام',
        name_en: 'Prophet Musa (AS)',
        translations: { it: 'Profeta Musa (AS)' },
        category: 'prophet',
        quran_ref: 'Surah Taha 20:25-28',
        story_ar: 'كليم الله، قاد بني إسرائيل من الظلم إلى النور وواجه فرعون بأعظم الآيات واليقين بنصر الله.',
        story_translations: {
            it: 'Colui che parlò con Allah. Liberatore del suo popolo, affrontò la tirannia di Faraone con coraggio e miracoli divini.',
            en: 'The one who spoke to Allah. He led his people from darkness to light and faced Pharaoh.'
        },
        dawah_lesson_it: 'Chiedi sempre ad Allah di "aprire il tuo petto" e facilitare la tua parola. La Da\'wah deve essere fatta con fermezza contro l\'ingiustizia, ma usando parole gentili all\'inizio.',
        dawah_lesson_ar: 'الدعاء بالثبات وفصاحة اللسان، ومواجهة الظلم بالحق مع لين القول في البداية.'
    },
    {
        id: '1',
        name_ar: 'أبو بكر الصديق',
        name_en: 'Abu Bakr As-Siddiq',
        translations: { it: 'Abu Bakr As-Siddiq' },
        category: 'caliph',
        story_ar: 'عبد الله بن أبي قحافة، الملقب بالصديق، هو أول الخلفاء الراشدين ورفيق النبي محمد في الهجرة.',
        story_translations: {
            it: 'Il primo dei Califfi Ben Guidati. Noto come Al-Siddiq per la sua fede incrollabile. Abu Bakr dedicò tutta la sua ricchezza alla causa di Allah.',
            en: 'The first of the Rightly Guided Caliphs. Known as Al-Siddiq for his truthfulness.'
        },
        dawah_lesson_it: 'La lealtà totale alla verità è la forza del predicatore. Sacrifica i tuoi beni materiali per elevare la parola di Allah.',
        dawah_lesson_ar: 'التصديق المطلق بالحق والتضحية بالمال والنفس لنصرة الدين.'
    },
    {
        id: '16',
        name_ar: 'مصعب بن عمير',
        name_en: 'Mus\'ab ibn Umayr',
        translations: { it: 'Mus\'ab ibn Umayr' },
        category: 'companion',
        story_ar: 'سفير الإسلام الأول، الذي أُرسل للمدينة ليعلم أهلها القرآن قبل الهجرة.',
        story_translations: {
            it: 'Il primo ambasciatore dell\'Islam. Inviato a Medina, convertì i capi delle tribù con la sua eloquenza e la sua grazia.',
            en: 'The first ambassador of Islam. He paved the way for the Migration.'
        },
        dawah_lesson_it: 'La capacità di adattamento e l\'eloquenza calma sono essenziali. Mus\'ab conquistò i cuori di Medina prima che il Profeta vi arrivasse.',
        dawah_lesson_ar: 'أدب الحوار والقدرة على إقناع الناس بالقرآن والخلق الحسن.'
    },
    {
        id: 'p4',
        name_ar: 'نوح عليه السلام',
        name_en: 'Prophet Nuh (AS)',
        translations: { it: 'Profeta Nuh (AS)' },
        category: 'prophet',
        quran_ref: 'Surah Nuh 71:5',
        story_ar: 'شيخ المرسلين، دعا قومه ليلاً ونهاراً، سراً وجهراً، لمدة 950 عاماً بصبر لا ينفد.',
        story_translations: {
            it: 'Il Patriarca dei Messaggeri. Predicò al suo popolo per 950 anni, giorno e notte, in pubblico e in privato, con una pazienza leggendaria.',
            en: 'The Patriarch of Messengers. He called his people for 950 years with legendary patience.'
        },
        dawah_lesson_it: 'Il successo nella Da\'wah non si misura dai numeri, ma dalla costanza e dalla fedeltà al messaggio. Non arrenderti mai, anche dopo anni di sforzi senza frutti apparenti.',
        dawah_lesson_ar: 'الاستمرار في الدعوة وعدم اليأس من هداية الناس مهما طال الزمن.'
    },
    {
        id: 'p5',
        name_ar: 'يوسف عليه السلام',
        name_en: 'Prophet Yusuf (AS)',
        translations: { it: 'Profeta Yusuf (AS)' },
        category: 'prophet',
        quran_ref: 'Surah Yusuf 12:101',
        story_ar: 'نبي الله الكريم بن الكريم، واجه الفتن والسجن والمؤامرات بعفة وصبر، ثم مكن الله له في الأرض بالعدل والعلم.',
        story_translations: {
            it: 'Il nobile figlio di nobili. Affrontò tentazioni, prigionia e cospirazioni con castità e pazienza, fino a diventare tesoriere d\'Egitto.',
            en: 'The noble son of nobles. He faced trials and prison with chastity and patience.'
        },
        dawah_lesson_it: 'Mantieni la tua integrità morale anche nelle situazioni più difficili. Il perdono nei confronti di chi ti ha fatto del male è lo strumento più potente per conquistare i cuori.',
        dawah_lesson_ar: 'العفة والصبر على الابتلاء، والصفح الجميل عن المسيئين عند المقدرة.'
    },
    {
        id: 'p6',
        name_ar: 'يونس عليه السلام',
        name_en: 'Prophet Yunus (AS)',
        translations: { it: 'Profeta Yunus (AS)' },
        category: 'prophet',
        quran_ref: 'Surah Al-Anbiya 21:87',
        story_ar: 'صاحب الحوت، الذي تعلم درساً عظيماً في الصبر والرجوع إلى الله في أحلك الظروف.',
        story_translations: {
            it: 'L\'uomo della balena. Imparò una grande lezione sulla pazienza e sul ritorno ad Allah nelle circostanze più oscure.',
            en: 'The companion of the whale. He learned a great lesson in patience and turning to Allah.'
        },
        dawah_lesson_it: 'Un predicatore non deve mai abbandonare il suo popolo per rabbia o frustrazione. Riconosci i tuoi errori e torna sempre ad Allah con umiltà.',
        dawah_lesson_ar: 'عدم الاستعجال في ترك الناس غضباً، والاعتراف بالخطأ والرجوع إلى الله.'
    },
    {
        id: 'p7',
        name_ar: 'أيوب عليه السلام',
        name_en: 'Prophet Ayyub (AS)',
        translations: { it: 'Profeta Ayyub (AS)' },
        category: 'prophet',
        quran_ref: 'Surah Al-Anbiya 21:83',
        story_ar: 'رمز الصبر على المرض وفقد المال والولد، ظل لسانه رطباً بذكر الله في أصعب المحن.',
        story_translations: {
            it: 'Il simbolo della pazienza. Perse salute, ricchezza e figli, ma la sua lingua rimase sempre umida del ricordo di Allah.',
            en: 'The symbol of patience. He lost everything but never stopped remembering Allah.'
        },
        dawah_lesson_it: 'Le prove personali sono parte del cammino. La tua pazienza durante la malattia o la perdita è essa stessa una forma di Da\'wah silenziosa ma potentissima.',
        dawah_lesson_ar: 'الصبر الجميل على البلاء البدني والمادي، والرضا بقضاء الله.'
    }

];

const categoryIcons = {
    prophet: Sparkles,
    caliph: Gem,
    warrior: Shield,
    woman: Heart,
    companion: Users
};

const SahabaPage = () => {
    const { t, language } = useLanguage();
    const [sahaba, setSahaba] = useState<HeroFigure[]>(sahabaData);
    const [selectedSahbi, setSelectedSahbi] = useState<HeroFigure | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [deepStories, setDeepStories] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();

    const filteredSahaba = sahaba.filter(s => {
        const matchesCategory = !activeCategory || s.category === activeCategory;
        const matchesSearch = s.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.name_ar.includes(searchQuery) ||
            (s.translations?.[language]?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getName = (item: HeroFigure) => {
        if (language === 'ar') return item.name_ar;
        return item.translations?.[language] || item.name_en;
    };

    const getStory = (item: HeroFigure) => {
        if (language === 'ar') return item.story_ar;
        return item.story_translations?.[language] || item.story_translations?.en || item.story_ar;
    };

    const handleGenerateDeepStory = async (sahbi: HeroFigure) => {
        if (deepStories[sahbi.id]) return;

        setIsGenerating(true);
        try {
            const prompt = `Genera una biografia professionale, estremamente dettagliata e lunga (almeno 10-15 paragrafi) su ${sahbi.name_en} (${sahbi.name_ar}). 
            Includi obbligatoriamente le seguenti sezioni:
            - **Introduzione e Origini**: nascita, famiglia e contesto tribale.
            - **L'incontro con l'Islam**: come ha accettato la fede e i sacrifici compiuti.
            - **Legame con il Profeta (S)**: eventi chiave vissuti insieme, aneddoti e testimonianze.
            - **Contributo alla Storia Islamica**: battaglie, missioni, sapienza trasmessa o ruoli amministrativi.
            - **Qualità Morali e Caratteriali**: cosa lo/la rendeva speciale e amato/a.
            - **Hadith Relativi**: cita almeno un Hadith autentico in cui viene menzionato/a.
            - **La Morte e l'Eredità**: ultimi anni, lascito spirituale e importanza oggi.
            
            Usa un tono narrativo ma accademico, basandoti su fonti classiche come Ibn Ishaq o Al-Dhahabi. Rispondi in ${language}.`;

            const story = await ScholarService.generateContent(prompt, language);
            setDeepStories(prev => ({ ...prev, [sahbi.id]: story }));
        } catch (error) {
            console.error("Sahaba Story Generation Error:", error);
            toast({
                title: language === 'ar' ? 'خطأ' : 'Error',
                description: language === 'ar' ? 'تعذر توليد القصة' : "Could not generate story. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownloadPDF = (sahaba: HeroFigure) => {
        window.print();
        toast({
            title: language === 'ar' ? 'جاري تحضير PDF' : 'PDF Export Initiated',
            description: language === 'ar' ? 'تم تجهيز مستند السيرة' : 'Preparing biography document...',
        });
    };

    const handleShamilaResearch = async (sahabi: HeroFigure) => {
        if (deepStories[sahabi.id]) return;

        setIsGenerating(true);
        try {
            const promptTitles: Record<string, string> = {
                ar: "بحث عميق في سيرة الصحابي",
                it: "Ricerca approfondita Sahaba",
                en: "Deep Sahaba Research"
            };

            const title = promptTitles[language] || promptTitles.en;
            const query = `${title}: ${sahabi.name_en} (${sahabi.name_ar}). Fonti: Al-Maktaba Al-Shamila, Sirah, Tabari.`;
            const result = await ShamilaService.research(query, language);
            setDeepStories(prev => ({ ...prev, [sahabi.id]: result.content }));

            toast({
                title: language === 'ar' ? 'اكتمل البحث' : 'Shamila Integrated',
                description: language === 'ar' ? 'تم استرجاع البيانات' : `Dati recuperati da: ${result.source}`,
            });
        } catch (error) {
            toast({
                title: "Errore",
                description: "Impossibile accedere agli archivi Shamila.",
                variant: "destructive"
            });
        } finally {
            setIsGenerating(false);
        }
    };

    const isRTL = language === 'ar';

    return (
        <div className={`min-h-screen bg-transparent text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24">
                <BackButton />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">{t('starsOfGuidance')}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
                        {t('sahabaStories')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t('sahabaIntro')}
                    </p>
                </motion.div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['all', 'caliph', 'warrior', 'woman', 'companion'].map((cat) => (
                        <Button
                            key={cat}
                            variant={activeCategory === (cat === 'all' ? null : cat) ? 'default' : 'outline'}
                            onClick={() => setActiveCategory(cat === 'all' ? null : cat)}
                            className="rounded-2xl px-6 h-10 gap-2 glass capitalize"
                        >
                            {t(cat)}
                        </Button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12 relative px-4">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder={t('searchSahaba')}
                        className="glass h-14 pl-12 pr-4 rounded-2xl border-primary/20 text-lg"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {filteredSahaba.map((item, index) => {
                            const Icon = categoryIcons[item.category];
                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => setSelectedSahbi(item)}
                                >
                                    <Card className="futuristic-card group cursor-pointer overflow-hidden h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                            <Icon className="w-8 h-8 text-primary" />
                                        </div>
                                        <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                                            <div className="w-20 h-20 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                <Icon className="w-10 h-10 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-amiri text-3xl text-foreground mb-1">{item.name_ar}</h3>
                                                <p className="text-xs uppercase tracking-widest text-primary font-bold">{getName(item)}</p>
                                            </div>
                                            <Badge variant="outline" className="text-[8px] uppercase tracking-tighter opacity-50">{item.category}</Badge>
                                            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                                                {getStory(item)}
                                            </p>
                                            <Button variant="ghost" className="w-full mt-4 border border-primary/10 group-hover:bg-primary/10 text-[10px] uppercase tracking-widest">
                                                {t('discoverLegacy')}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Digital scholar fallback */}
                {searchQuery && filteredSahaba.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 px-4"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t('notFoundAi')}</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-8">
                            {t('notFoundAiDesc')}
                        </p>
                        <Button
                            className="rounded-xl h-12 px-8 font-bold uppercase tracking-widest gap-2"
                            onClick={async () => {
                                setIsGenerating(true);
                                try {
                                    const prompt = `Genera una biografia professionale, estremamente dettagliata e lunga 15 paragrafi su ${searchQuery}, un Sahabi del Profeta (S). Includi discendenza, vita, ruolo nell'Islam e eredità. Se non è un Sahabi, spiega chi è o correggi gentilmente.`;
                                    const story = await ScholarService.generateContent(prompt, language);
                                    // Create a temporary "Scholar Sahabi" to show
                                    const aiSahbi: HeroFigure = {
                                        id: 'ai-gen',
                                        name_ar: searchQuery,
                                        name_en: searchQuery,
                                        translations: { [language]: searchQuery },
                                        category: 'companion',
                                        story_ar: story.substring(0, 200) + '...',
                                        story_translations: { [language]: story.substring(0, 200) + '...' }
                                    };
                                    setDeepStories(prev => ({ ...prev, ['ai-gen']: story }));
                                    setSelectedSahbi(aiSahbi);
                                } catch (e) {
                                    toast({ title: "Errore", description: "Impossibile caricare il profilo ricercato.", variant: "destructive" });
                                } finally {
                                    setIsGenerating(false);
                                }
                            }}
                        >
                            <GraduationCap className="w-4 h-4" />
                            {t('generateAiBio')}
                        </Button>
                    </motion.div>
                )}

                {/* Detail Modal */}
                <AnimatePresence>
                    {selectedSahbi && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-4"
                            onClick={() => setSelectedSahbi(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                className="bg-card glass border border-white/10 rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col print:max-h-none print:overflow-visible print:shadow-none print:border-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Print Header */}
                                <div className="hidden print:block text-center mb-8 pt-8 no-screen">
                                    <h1 className="text-4xl font-bold mb-2">The Islamic Companion</h1>
                                    <div className="w-24 h-1 bg-black mx-auto mb-4"></div>
                                    <p className="text-sm text-gray-500">Biography of {selectedSahbi.name_en}</p>
                                </div>

                                <div className="p-10 pb-0 flex justify-between items-start print:p-0">
                                    <div className="space-y-2">
                                        <Badge className="bg-primary/20 text-primary border-primary/30 uppercase text-[9px] px-4 py-1">
                                            {t(selectedSahbi.category)}
                                        </Badge>
                                        <h2 className="text-5xl font-amiri text-gradient-gold">{selectedSahbi.name_ar}</h2>
                                        <p className="text-xl text-muted-foreground">{getName(selectedSahbi)}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedSahbi(null)} className="h-12 w-12 rounded-2xl hover:bg-white/5">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>

                                <ScrollArea className="flex-1">
                                    <div className="p-10 grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                                        <Star className="w-4 h-4" /> {t('storyGreatness')}
                                                    </h4>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/20" onClick={() => AudioService.speak(selectedSahbi.story_ar, 'ar-SA')}>
                                                        <Volume2 className="w-4 h-4 text-primary" />
                                                    </Button>
                                                </div>
                                                <p className="text-lg font-amiri leading-[2.2] text-right" dir="rtl">
                                                    {selectedSahbi.story_ar}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-6 rounded-3xl bg-secondary/30 border border-white/5">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-2">
                                                        <Book className="w-4 h-4" /> {t('westernAccount')}
                                                    </h4>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-neutral-500/20"
                                                        onClick={() => {
                                                            const langToSpeak = language === 'ar' ? 'ar-SA' : (language === 'it' ? 'it-IT' : 'en-US');
                                                            AudioService.speak(getStory(selectedSahbi), langToSpeak);
                                                        }}>
                                                        <Volume2 className="w-4 h-4 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed text-sm">
                                                    {getStory(selectedSahbi)}
                                                </p>
                                            </div>

                                            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                                    <BookOpen className="w-10 h-10 text-primary" />
                                                </div>
                                                <h4 className="text-xs uppercase tracking-widest text-primary font-bold mb-6 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4" /> {t('sacredChronicles')}
                                                </h4>

                                                {!deepStories[selectedSahbi.id] ? (
                                                    <div className="space-y-6">
                                                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                                                            Accedi a una narrazione espansa e dettagliata attinta direttamente da <strong>Al-Maktaba Al-Shamila</strong> e dalle fonti classiche.
                                                        </p>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            <Button
                                                                onClick={() => handleShamilaResearch(selectedSahbi)}
                                                                disabled={isGenerating}
                                                                className="h-12 rounded-xl text-[9px] uppercase font-bold tracking-[0.2em] shadow-lg shadow-primary/10"
                                                            >
                                                                {isGenerating ? (
                                                                    <>
                                                                        <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                                                                        {t('loading')}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {t('aiExplanation')}
                                                                    </>
                                                                )}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => handleDownloadPDF(selectedSahbi)}
                                                                className="h-12 rounded-xl text-[9px] uppercase font-bold tracking-[0.2em] border-primary/20 hover:bg-primary/10 no-print"
                                                            >
                                                                <Download className="w-3 h-3 mr-2" />
                                                                {language === 'ar' ? 'تصدير PDF' : (language === 'it' ? 'Esporta PDF' : 'Export PDF')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-6">
                                                        <ScrollArea className="h-64 pr-4">
                                                            <div className="text-[11px] text-foreground/80 leading-[1.8] whitespace-pre-line font-medium print:text-black print:text-sm">
                                                                {deepStories[selectedSahbi.id]}
                                                            </div>
                                                        </ScrollArea>
                                                        <div className="grid grid-cols-2 gap-3 no-print">
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() => {
                                                                    const langToSpeak = language === 'ar' ? 'ar-SA' : (language === 'it' ? 'it-IT' : 'en-US');
                                                                    AudioService.speak(deepStories[selectedSahbi.id], langToSpeak);
                                                                }}
                                                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest"
                                                            >
                                                                <Volume2 className="w-3 h-3 mr-2" />
                                                                {t('listen')}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => handleDownloadPDF(selectedSahbi)}
                                                                className="h-10 rounded-lg text-[9px] uppercase font-bold tracking-widest border-primary/20"
                                                            >
                                                                <FileText className="w-3 h-3 mr-2" />
                                                                PDF
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 rounded-2xl border border-white/5 glass text-center">
                                                    <p className="text-[10px] uppercase opacity-50 mb-1">{t('rank')}</p>
                                                    <p className="font-bold text-xs">Major Sahbi</p>
                                                </div>
                                                <div className="p-4 rounded-2xl border border-white/5 glass text-center">
                                                    <p className="text-[10px] uppercase opacity-50 mb-1">{t('status')}</p>
                                                    <p className="font-bold text-xs text-emerald-500">Promised Jannah</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                                <div className="p-10 pt-4">
                                    <Button className="w-full h-14 rounded-2xl text-[12px] uppercase tracking-widest font-bold shadow-lg shadow-primary/20" onClick={() => setSelectedSahbi(null)}>
                                        {t('backToGalaxy')}
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
            <Footer />
        </div >
    );
};

export default SahabaPage;
