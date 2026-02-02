import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, ChevronRight, BookOpen, Users } from 'lucide-react';

const mistakesData = [
    {
        category: {
            en: 'Prayer (Salah)',
            it: 'Preghiera (Salah)',
            ar: 'الصلاة',
            fr: 'Prière (Salah)',
            es: 'Oración (Salah)',
            ur: 'نماز',
            bn: 'সালাত',
            sq: 'Namazi',
            ru: 'Молитва',
            tr: 'Namaz',
            de: 'Gebet'
        },
        icon: BookOpen,
        errors: [
            {
                title: {
                    en: 'Excessive Speed',
                    it: 'Velocità eccessiva',
                    ar: 'السرعة المفرطة',
                    fr: 'Vitesse Excessive',
                    es: 'Velocidad Excesiva'
                },
                error: {
                    en: 'Reciting prayers too quickly without tranquility (Tumaneenah).',
                    it: 'Recitare le preghiere troppo velocemente senza tranquillità (Tumaneenah).',
                    ar: 'تلاوة الصلاة بسرعة كبيرة دون طمأنينة (طمأنينة).',
                    fr: 'Réciter les prières trop rapidement sans tranquillité.',
                    es: 'Recitar oraciones demasiado rápido sin tranquilidad.'
                },
                correction: {
                    en: 'Prayer must be performed calmly. Each position (Ruku, Sujud) must be held for at least the time of one "Subhana Allah".',
                    it: 'La preghiera deve essere eseguita con calma. Ogni posizione (Ruku, Sujud) deve essere mantenuta per almeno il tempo di un "Subhana Allah".',
                    ar: 'يجب أداء الصلاة بهدوء. يجب البقاء في كل وضع (ركوع، سجود) لمدة "سبحان الله" واحدة على الأقل.',
                    fr: 'La prière doit être effectuée calmement via le maintien de chaque position.',
                    es: 'La oración debe realizarse con calma manteniendo cada posición.'
                },
                severity: 'high'
            },
            {
                title: {
                    en: 'Foot Alignment',
                    it: 'Posizione dei piedi',
                    ar: 'محاذاة القدم',
                    fr: 'Alignement des Pieds',
                    es: 'Alineación de Pies'
                },
                error: {
                    en: 'Not aligning feet or leaving them too far apart.',
                    it: 'Non allineare i piedi o lasciarli troppo distanti.',
                    ar: 'عدم محاذاة القدمين أو تركهما متباعدين جداً.',
                    fr: 'Ne pas aligner les pieds ou les laisser trop écartés.',
                    es: 'No alinear los pies o dejarlos demasiado separados.'
                },
                correction: {
                    en: 'Feet should be aligned with shoulders and pointing towards Qibla.',
                    it: 'I piedi dovrebbero essere allineati con le spalle e puntare verso la Qibla.',
                    ar: 'يجب أن تكون القدمان بمحاذاة الكتفين ومتجهتين نحو القبلة.',
                    fr: 'Les pieds doivent être alignés avec les épaules face à la Qibla.',
                    es: 'Los pies deben estar alineados con los hombros hacia la Qibla.'
                },
                severity: 'low'
            }
        ]
    },
    {
        category: {
            en: 'Wudu & Purification',
            it: 'Wudu & Purificazione',
            ar: 'الوضوء والطهارة',
            fr: 'Wudu & Purification',
            es: 'Wudu y Purificación',
            ur: 'وضو اور طہارت',
            bn: 'ওযু ও পবিত্রতা',
            sq: 'Abdesi & Pastrimi',
            ru: 'Вуду и Очищение',
            tr: 'Abdest & Temizlik',
            de: 'Wudu & Reinigung'
        },
        icon: Info,
        errors: [
            {
                title: {
                    en: 'Forgetting Bismillah',
                    it: 'Dimenticare la Bismillah',
                    ar: 'نسيان البسملة',
                    fr: 'Oublier Bismillah',
                    es: 'Olvidar Bismillah'
                },
                error: {
                    en: 'Starting Wudu without mentioning Allah\'s name.',
                    it: 'Iniziare il Wudu senza menzionare il nome di Allah.',
                    ar: 'البدء في الوضوء دون ذكر اسم الله.',
                    fr: 'Commencer le Wudu sans mentionner le nom d\'Allah.',
                    es: 'Comenzar Wudu sin mencionar el nombre de Allah.'
                },
                correction: {
                    en: 'It is Sunnah to say "Bismillah" before starting washing.',
                    it: 'È Sunnah dire "Bismillah" prima di iniziare il lavaggio.',
                    ar: 'من السنة قول "بسم الله" قبل البدء في الغسل.',
                    fr: 'C\'est une Sunnah de dire "Bismillah" avant de commencer.',
                    es: 'Es Sunnah decir "Bismillah" antes de comenzar.'
                },
                severity: 'low'
            },
            {
                title: {
                    en: 'Wasting Water',
                    it: 'Spreco d\'acqua',
                    ar: 'إسراف الماء',
                    fr: 'Gaspillage d\'Eau',
                    es: 'Desperdicir Agua'
                },
                error: {
                    en: 'Using excessive amounts of water during washing.',
                    it: 'Usare quantità eccessive di acqua durante il lavaggio.',
                    ar: 'استخدام كميات مفرطة من الماء أثناء الغسل.',
                    fr: 'Utiliser des quantités excessives d\'eau.',
                    es: 'Usar cantidades excesivas de agua.'
                },
                correction: {
                    en: 'The Prophet (S) used very little water. Waste is discouraged in Islam.',
                    it: 'Il Profeta (S) usava pochissima acqua. Lo spreco è scoraggiato nell\'Islam.',
                    ar: 'كان النبي (ص) يستخدم القليل جداً من الماء. الإسراف مكروه في الإسلام.',
                    fr: 'Le Prophète (S) utilisait très peu d\'eau. Le gaspillage est déconseillé.',
                    es: 'El Profeta (S) usaba muy poca agua. El desperdicio está desaconsejado.'
                },
                severity: 'medium'
            }
        ]
    },
    {
        category: {
            en: 'Social Adab (Etiquette)',
            it: 'Adab Sociale (Etichetta)',
            ar: 'الآداب الاجتماعية',
            fr: 'Adab Social',
            es: 'Etiqueta Social',
            ur: 'معاشرتی آداب',
            bn: 'সামাজিক আদব',
            sq: 'Etika Sociale',
            ru: 'Социальный Этикет',
            tr: 'Sosyal Adab',
            de: 'Soziale Etikette'
        },
        icon: Users,
        errors: [
            {
                title: {
                    en: 'Interrupting Others',
                    it: 'Interrompere chi parla',
                    ar: 'مقاطعة الآخرين',
                    fr: 'Interrompre les Autres',
                    es: 'Interrumpir a Otros'
                },
                error: {
                    en: 'Speaking over others or cutting them off abruptly.',
                    it: 'Parlare sopra gli altri o interrompere bruscamente.',
                    ar: 'التحدث فوق الآخرين أو مقاطعتهم بفظاظة.',
                    fr: 'Parler par-dessus les autres ou les couper brusquement.',
                    es: 'Hablar sobre otros o cortarlos bruscamente.'
                },
                correction: {
                    en: 'Islam teaches to listen with patience and respect until the other has finished.',
                    it: 'L\'Islam insegna ad ascoltare con pazienza e rispetto fino a quando l\'altro non ha finito.',
                    ar: 'يعلمنا الإسلام الاستماع بصبر واحترام حتى ينتهي الآخر.',
                    fr: 'L\'Islam enseigne d\'écouter avec patience et respect.',
                    es: 'El Islam enseña a escuchar con paciencia y respeto.'
                },
                severity: 'medium'
            },
            {
                title: {
                    en: 'Not Greeting',
                    it: 'Mancanza di saluto',
                    ar: 'عدم إلقاء السلام',
                    fr: 'Absence de Salutation',
                    es: 'Falta de Saludo'
                },
                error: {
                    en: 'Entering a place without giving Salam.',
                    it: 'Entrare in un luogo senza dare il Salam.',
                    ar: 'دخول مكان دون إلقاء السلام.',
                    fr: 'Entrer dans un lieu sans donner le Salam.',
                    es: 'Entrar en un lugar sin dar el Salam.'
                },
                correction: {
                    en: 'The Salam should be given to those you know and those you don\'t, bringing peace.',
                    it: 'Il Salam deve essere dato a chi si conosce e a chi non si conosce, portando pace.',
                    ar: 'يجب إلقاء السلام على من تعرف ومن لا تعرف، لنشر السلام.',
                    fr: 'Le Salam doit être donné pour apporter la paix.',
                    es: 'El Salam debe darse para traer paz.'
                },
                severity: 'low'
            }
        ]
    }
];

const EducationalPage = () => {
    const { t, language } = useLanguage();

    const getLocalized = (obj: any): string => {
        return obj[language] || obj['en'] || Object.values(obj)[0] as string;
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 pt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Info className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">{t('knowledgeBase')}</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-bold font-amiri text-gradient-gold mb-4">
                        {t('commonMistakes')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t('commonMistakesDesc')}
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto space-y-12">
                    {/* Common Mistakes Section */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-amiri text-gradient-gold mb-4">{t('commonMistakes')}</h2>
                    </div>
                    {mistakesData.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-bold font-amiri text-foreground">
                                    {getLocalized(cat.category)}
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {cat.errors.map((item, i) => (
                                    <Card key={i} className="futuristic-card group h-full">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-xl font-bold text-primary">{getLocalized(item.title)}</CardTitle>
                                                <Badge className={`${item.severity === 'high' ? 'bg-red-500/20 text-red-400' : item.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'} border-none uppercase text-[8px]`}>
                                                    {t(item.severity)} {t('impact')}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                            <div className="space-y-2">
                                                <p className="text-[10px] uppercase font-bold text-red-500/60 tracking-widest">{t('theMistake')}</p>
                                                <p className="text-sm opacity-80 leading-relaxed">{getLocalized(item.error)}</p>
                                            </div>
                                            <div className="space-y-2 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                                <p className="text-[10px] uppercase font-bold text-emerald-500/60 tracking-widest">{t('theCorrection')}</p>
                                                <p className="text-sm text-foreground/90 leading-relaxed italic">"{getLocalized(item.correction)}"</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* NEW SECTION: Arkan & Wajibat */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="pt-24"
                    >
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                                <BookOpen className="w-5 h-5 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.3em]">{t('essentials')}</span>
                            </div>
                            <h2 className="text-4xl font-bold font-amiri text-gradient-gold mb-4">
                                {language === 'it' ? 'I Pilastri della Preghiera' : (language === 'ar' ? 'أركان الصلاة' : 'Pillars of Salah')}
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { title: { en: 'Takbirat al-Ihram', it: 'Takbirat al-Ihram', ar: 'تكبيرة الإحرام' }, desc: { en: 'Saying "Allahu Akbar" to start.', it: 'Dire "Allahu Akbar" per iniziare.', ar: 'قول الله أكبر في البدء.' } },
                                { title: { en: 'Standing (Qiyam)', it: 'Stare in piedi (Qiyam)', ar: 'القيام' }, desc: { en: 'Standing if able.', it: 'Stare in piedi se capaci.', ar: 'الوقوف مع القدرة.' } },
                                { title: { en: 'Reciting Al-Fatiha', it: 'Recitare Al-Fatiha', ar: 'قراءة الفاتحة' }, desc: { en: 'In every Rak\'ah.', it: 'In ogni Rak\'ah.', ar: 'في كل ركعة.' } },
                                { title: { en: 'Ruku (Bowing)', it: 'Ruku (Inchino)', ar: 'الركوع' }, desc: { en: 'Bowing until back is straight.', it: 'Inchinarsi fino a raddrizzare la schiena.', ar: 'الانحناء حتى يستوي الظهر.' } },
                                { title: { en: 'Rising from Ruku', it: 'Rialzarsi dal Ruku', ar: 'الرفع من الركوع' }, desc: { en: 'Standing straight up.', it: 'Ritornare in posizione eretta.', ar: 'الاعتدال قائماً.' } },
                                { title: { en: 'Sujud (Prostration)', it: 'Sujud (Prosternazione)', ar: 'السجود' }, desc: { en: 'On 7 body parts.', it: 'Su 7 parti del corpo.', ar: 'على سبعة أعضاء.' } },
                                { title: { en: 'Sitting between Sujood', it: 'Sedersi tra i Sujud', ar: 'الجلوس بين السجدتين' }, desc: { en: 'Sitting briefly.', it: 'Sedersi brevemente.', ar: 'الجلوس بثبات.' } },
                                { title: { en: 'Final Tashahhud', it: 'Tashahhud Finale', ar: 'التشهد الأخير' }, desc: { en: 'Reciting the testimony.', it: 'Recitare la testimonianza.', ar: 'قراءة التحيات.' } },
                                { title: { en: 'Tasleem', it: 'Tasleem', ar: 'التسليم' }, desc: { en: 'Concluding with Salam.', it: 'Concludere con il Salam.', ar: 'السلام عليكم.' } }
                            ].map((item, i) => (
                                <Card key={i} className="glass-premium border-primary/20 hover:border-primary/50 transition-colors">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-4xl text-primary">{i + 1}</div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-primary mb-2">{getLocalized(item.title)}</h3>
                                        <p className="text-sm text-muted-foreground">{getLocalized(item.desc)}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EducationalPage;

