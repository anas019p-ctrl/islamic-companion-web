import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Moon, Sunrise, Utensils,
    Waves, Sparkles, BookOpen,
    CheckCircle2, Star, Info
} from 'lucide-react';
import { BackButton } from '@/components/BackButton';

const sunnahData = [
    {
        category: {
            it: "Al Risveglio",
            en: "Upon Awakening",
            ar: "عند الاستيقاظ"
        },
        icon: Sunrise,
        practices: [
            {
                title: { it: "Pulizia dei denti", en: "Cleaning teeth", ar: "السواك" },
                desc: { it: "Usare il siwak per pulirsi la bocca dopo il sonno.", en: "Using siwak to clean the mouth after sleep.", ar: "استخدام السواك عند الاستيقاظ." },
                source: "Bukhari, Muslim"
            },
            {
                title: { it: "Invocazione del risveglio", en: "Awakening Supplication", ar: "دعاء الاستيقاظ" },
                desc: { it: "'Lode ad Allah, Che ci ha fatto vivere dopo averci fatto morire ed a Lui faremo ritorno.'", en: "'Praise be to Allah who gave us life after death and to Him is the resurrection.'", ar: "الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور" },
                source: "Bukhari"
            },
            {
                title: { it: "Lavarsi le mani", en: "Washing hands", ar: "غسل اليدين" },
                desc: { it: "Lavarsi le mani tre volte prima di introdurle in qualsiasi recipiente.", en: "Washing hands three times before putting them in any container.", ar: "غسل اليدين ثلاثاً قبل إدخالهما في الإناء." },
                source: "Bukhari, Muslim"
            }
        ]
    },
    {
        category: {
            it: "Abluzioni (Wudu)",
            en: "Ablution (Wudu)",
            ar: "الوضوء"
        },
        icon: Waves,
        practices: [
            {
                title: { it: "Menzione del Nome Divino", en: "Mentioning Allah's Name", ar: "التسمية" },
                desc: { it: "Dire 'Bismillah' prima di iniziare le abluzioni.", en: "Saying 'Bismillah' before starting wudu.", ar: "بسم الله قبل البدء." },
                source: "Ahmad, Abu Dawud"
            },
            {
                title: { it: "Iniziare dalla destra", en: "Starting with the right", ar: "البدء باليمين" },
                desc: { it: "Iniziare a lavare gli arti destri prima di quelli sinistri.", en: "Starting to wash right limbs before left.", ar: "تقديم اليمنى على اليسرى." },
                source: "Bukhari, Muslim"
            },
            {
                title: { it: "Risparmio dell'acqua", en: "Saving water", ar: "الاقتصاد في الماء" },
                desc: { it: "Il Profeta (S) usava pochissima acqua per le abluzioni. Lo spreco è sconsigliato.", en: "The Prophet (S) used very little water for wudu. Waste is discouraged.", ar: "عدم الإسراف في الماء." },
                source: "Bukhari"
            }
        ]
    },
    {
        category: {
            it: "Pasti e Bevande",
            en: "Eating and Drinking",
            ar: "الأكل والشرب"
        },
        icon: Utensils,
        practices: [
            {
                title: { it: "Menzione del nome di Allah", en: "Bismillah", ar: "التسمية عند الأكل" },
                desc: { it: "Menzionare il nome di Allah prima di iniziare a mangiare.", en: "Mentioning Allah's name before eating.", ar: "ذكر اسم الله قبل الأكل." },
                source: "Muslim"
            },
            {
                title: { it: "Mangiare con la destra", en: "Eating with the right hand", ar: "الأكل باليمين" },
                desc: { it: "Mangiare con la mano destra e quel che si trova dinanzi a sé.", en: "Eating with the right hand and eating from what is in front of you.", ar: "الأكل باليمين ومما يليك." },
                source: "Muslim"
            },
            {
                title: { it: "Lodare Allah dopo il pasto", en: "Praising Allah after eating", ar: "الحمد بعد الأكل" },
                desc: { it: "Dire 'Alhamdulillah' dopo aver finito di mangiare.", en: "Saying 'Alhamdulillah' after finishing the meal.", ar: "الحمد لله بعد الفراغ من الطعام." },
                source: "Tirmidhi"
            }
        ]
    },
    {
        category: {
            it: "Sonno e Riposo",
            en: "Sleep and Rest",
            ar: "النوم"
        },
        icon: Moon,
        practices: [
            {
                title: { it: "Abluzioni prima di dormire", en: "Wudu before sleep", ar: "الوضوء قبل النوم" },
                desc: { it: "Eseguire le abluzioni prima di mettersi a dormire.", en: "Performing wudu before going to bed.", ar: "الوضوء قبل النوم." },
                source: "Bukhari, Muslim"
            },
            {
                title: { it: "Dormire sul fianco destro", en: "Sleeping on the right side", ar: "النوم على الجانب الأيمن" },
                desc: { it: "Coricarsi sul fianco destro e porre la mano sotto la guancia.", en: "Lying on the right side and placing the hand under the cheek.", ar: "النوم على الشق الأيمن." },
                source: "Bukhari, Muslim"
            },
            {
                title: { it: "Spegnere luci e fiamme", en: "Extinguish lights", ar: "إطفاء المصابيح" },
                desc: { it: "Spegnere le luci e assicurarsi che i fuochi siano spenti prima di dormire.", en: "Extinguishing lights and ensuring fires are out before sleeping.", ar: "إطفاء المصابيح قبل النوم." },
                source: "Bukhari"
            }
        ]
    }
];

const SunnahPage = () => {
    const { language, t } = useLanguage();

    const getLocalized = (obj: any): string => {
        return obj[language] || obj['en'] || Object.values(obj)[0] as string;
    };

    const isRTL = language === 'ar';

    return (
        <div className={`min-h-screen bg-background text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />

            <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
                <BackButton />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                        <Star className="w-5 h-5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.3em]">{language === 'it' ? 'BUONE AZIONI' : 'GOOD DEEDS'}</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4 leading-tight">
                        {language === 'it' ? 'La Guida della Sunnah' : (language === 'ar' ? 'سنة النبي ﷺ' : 'The Path of Sunnah')}
                    </h1>
                    <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                        {language === 'it'
                            ? "Riscopri gli atti di Sunnah e le invocazioni quotidiane del Profeta (Allah lo benedica e gli dia la pace) per arricchire la tua giornata di benedizioni."
                            : (language === 'ar'
                                ? "اكتشف سنن النبي ﷺ وآدابه اليومية التي تنير حياة المسلم وتبارك في وقته."
                                : "Discover the Sunnah acts and daily supplications of the Prophet (PBUH) to enrich your day with blessings.")}
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {sunnahData.map((section, idx) => (
                        <motion.section
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                                    <section.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold font-amiri text-foreground leading-none">
                                        {getLocalized(section.category)}
                                    </h2>
                                    <div className="h-1 w-20 bg-emerald-500/30 rounded-full mt-2" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.practices.map((practice, pIdx) => (
                                    <Card key={pIdx} className="glass border-white/5 hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden h-full">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Sparkles className="w-12 h-12 text-emerald-500" />
                                        </div>
                                        <CardHeader>
                                            <div className="flex items-center justify-between mb-2">
                                                <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/5 uppercase tracking-widest">
                                                    Sunnah
                                                </Badge>
                                                <span className="text-[10px] text-muted-foreground font-mono opacity-50">#{idx + 1}.{pIdx + 1}</span>
                                            </div>
                                            <CardTitle className="text-xl font-bold text-foreground/90 group-hover:text-emerald-500 transition-colors">
                                                {getLocalized(practice.title)}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                {getLocalized(practice.desc)}
                                            </p>
                                            <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-2 text-[10px] text-emerald-500/60 font-bold uppercase tracking-wider">
                                                    <BookOpen className="w-3 h-3" />
                                                    {practice.source}
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Final Quote Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 p-12 rounded-[3rem] bg-emerald-500/5 border border-emerald-500/10 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                    <Info className="w-10 h-10 text-emerald-500 mx-auto mb-6 opacity-40" />
                    <p className="text-2xl font-amiri italic text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                        {language === 'it'
                            ? "\"Il Mio servitore non cessa d'avvicinarsi a me compiendo opere volontarie, fino a che Io l'amo\""
                            : "\"My servant continues to draw near to Me with supererogatory works so that I shall love him.\""}
                    </p>
                    <p className="mt-4 text-xs font-bold text-emerald-500 uppercase tracking-widest">— Hadith Qudsi</p>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default SunnahPage;
