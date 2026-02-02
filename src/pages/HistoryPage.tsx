import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookOpen, MapPin, History, Star, Landmark, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HistoryPage = () => {
    const { t, language, isRTL } = useLanguage();

    const islamicTimeline = [
        { year: '2000 BCE', event: { en: 'Prophet Ibrahim (Abraham) builds the Kaaba', it: 'Il Profeta Ibrahim (Abramo) costruisce la Kaaba', ar: 'بناء الكعبة على يد النبي إبراهيم' } },
        { year: '570 CE', event: { en: 'Birth of Prophet Muhammad (ﷺ)', it: 'Nascita del Profeta Muhammad (ﷺ)', ar: 'مولد النبي محمد ﷺ' } },
        { year: '610 CE', event: { en: 'First Revelation at Mount Hira', it: 'Prima Rivelazione al Monte Hira', ar: 'أول الوحي في غار حراء' } },
        { year: '622 CE', event: { en: 'The Hijra (Migration to Medina)', it: 'L\'Egira (Migrazione a Medina)', ar: 'الهجرة النبوية إلى المدينة' } },
        { year: '630 CE', event: { en: 'Conquest of Mecca (Fatah Makkah)', it: 'Conquista della Mecca', ar: 'فتح مكة' } },
        { year: '632 CE', event: { en: 'Death of Prophet Muhammad (ﷺ)', it: 'Morte del Profeta Muhammad (ﷺ)', ar: 'وفاة النبي محمد ﷺ' } },
        { year: '632-661 CE', event: { en: 'Rashidun Caliphate', it: 'Califfato dei Rashidun', ar: 'الخلافة الراشدة' } },
        { year: '661-750 CE', event: { en: 'Umayyad Caliphate (Expansion)', it: 'Califfato Omayyade (Espansione)', ar: 'الخلافة الأموية' } },
        { year: '750-1258 CE', event: { en: 'Abbasid Golden Age', it: 'Età dell\'Oro Abbaside', ar: 'العصر العباسي الذهبي' } },
        { year: '1453 CE', event: { en: 'Ottoman Conquest of Constantinople', it: 'Conquista Ottomana di Costantinopoli', ar: 'فتح القسطنطينية' } },
        { year: 'Modern Era', event: { en: 'Islam as a Global Faith (2B+ Muslims)', it: 'Islam come Fede Globale (2B+ fedeli)', ar: 'الإسلام كدين عالمي' } }
    ];

    const palestineTimeline = [
        { year: '3000 BCE', event: { en: 'Canaanites (Arab ancestors) settle', it: 'I Cananei (antenati arabi) si insediano', ar: 'الكنعانيون العرب يستوطنون الأرض' } },
        { year: '637 CE', event: { en: 'Umar ibn al-Khattab liberates Jerusalem', it: 'Umar ibn al-Khattab libera Gerusalemme', ar: 'عمر بن الخطاب يفتح القدس' } },
        { year: '1187 CE', event: { en: 'Saladin liberates Jerusalem from Crusaders', it: 'Saladino libera Gerusalemme dai Crociati', ar: 'صلاح الدين يحرر القدس من الصليبيين' } },
        { year: '1917', event: { en: 'Balfour Declaration (British Mandate)', it: 'Dichiarazione Balfour (Mandato Britannico)', ar: 'وعد بلفور المشؤوم' } },
        { year: '1948', event: { en: 'The Nakba: 750k+ Palestinians expelled', it: 'La Nakba: 750k+ palestinesi espulsi', ar: 'النكبة: تهجير ٧٥٠ ألف فلسطيني' } },
        { year: '1967', event: { en: 'The Naksa: Occupation of West Bank & Gaza', it: 'La Naksa: Occupazione di Cisgiordania e Gaza', ar: 'النكسة: احتلال الضفة وغزة' } },
        { year: '1987', event: { en: 'First Intifada (Stone Uprising)', it: 'Prima Intifada (Rivolta delle Pietre)', ar: 'الانتفاضة الأولى (الحجارة)' } },
        { year: '2000', event: { en: 'Second Intifada (Al-Aqsa)', it: 'Seconda Intifada (Al-Aqsa)', ar: 'انتفاضة الأقصى' } },
        { year: '2008-2023', event: { en: 'Gaza Blockade & Repeated Wars', it: 'Blocco di Gaza e Guerre Ripetute', ar: 'حصار غزة والحروب المتكررة' } },
        { year: '2024+', event: { en: 'Ongoing Genocide & Resistance', it: 'Genocidio in corso e Resistenza', ar: 'حرب الإبادة المستمرة والصمود' } }
    ];

    return (
        <div className="min-h-screen bg-transparent text-foreground overflow-x-hidden">
            <Header />

            <main className="container mx-auto px-4 py-32">
                {/* Hero section for History */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24 max-w-4xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border border-primary/30 mb-8">
                        <History className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">{t('historicalChronicles')}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold font-amiri text-gradient-gold mb-8 leading-tight">
                        {t('legacyHistory')}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        {t('journey_centuries')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 relative">
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

                    {/* Section: Islam */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`flex items-center gap-4 mb-12 ${isRTL ? 'lg:justify-start' : 'lg:justify-end'}`}
                        >
                            <h2 className="text-4xl font-bold font-amiri">{t('islamHistory')}</h2>
                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                        </motion.div>

                        <div className={`space-y-8 ${isRTL ? 'lg:pl-8' : 'lg:pr-8'}`}>
                            {islamicTimeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative pl-12 border-l border-white/5 pb-8 group ${isRTL ? 'text-right pr-12 pl-0 border-l-0 border-r' : ''}`}
                                >
                                    <div className={`absolute ${isRTL ? 'right-[-5px]' : 'left-[-5px]'} top-1 w-[10px] h-[10px] rounded-full bg-primary shadow-[0_0_10px_rgba(201,164,74,0.5)] group-hover:scale-150 transition-transform`} />
                                    <span className="text-primary font-black text-sm tracking-widest">{item.year}</span>
                                    <h4 className="text-xl font-medium mt-2 leading-snug">
                                        {item.event[language as keyof typeof item.event] || item.event.en}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Section: Palestine */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`flex items-center gap-4 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-emerald-500" />
                            </div>
                            <h2 className="text-4xl font-bold font-amiri">{t('palestineHistory')}</h2>
                        </motion.div>

                        <div className={`space-y-8 ${isRTL ? 'lg:pr-8' : 'lg:pl-8'}`}>
                            {palestineTimeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative pl-12 border-l border-white/5 pb-8 group ${isRTL ? 'text-right pr-12 pl-0 border-l-0 border-r' : ''}`}
                                >
                                    <div className={`absolute ${isRTL ? 'right-[-5px]' : 'left-[-5px]'} top-1 w-[10px] h-[10px] rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] group-hover:scale-150 transition-transform`} />
                                    <span className="text-emerald-400 font-black text-sm tracking-widest">{item.year}</span>
                                    <h4 className="text-xl font-medium mt-2 leading-snug">
                                        {item.event[language as keyof typeof item.event] || item.event.en}
                                    </h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Narrative Text - Detailed facts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 glass rounded-[3rem] border border-white/5"
                >
                    <BookOpen className="w-16 h-16 text-primary/40 mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-center mb-12">{t('compendioStorico')}</h2>
                    <div className="grid md:grid-cols-2 gap-12 text-muted-foreground leading-relaxed text-lg">
                        <section className="space-y-4">
                            <p>
                                {t('islam_narrative')}
                            </p>
                        </section>
                        <section className={`space-y-4 ${isRTL ? 'border-r pr-12 pl-0' : 'border-l pl-12'} border-white/5`}>
                            <p>
                                {t('palestine_narrative')}
                            </p>
                        </section>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};
