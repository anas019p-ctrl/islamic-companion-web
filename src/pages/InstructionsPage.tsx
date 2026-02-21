import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
    Compass, Bell, Bot, BookOpen, Clock,
    Smartphone, Search, Volume2, Globe, ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const InstructionsPage = () => {
    const { t, language } = useLanguage();

    const sections = [
        {
            title: language === 'it' ? 'Strumenti Smart' : 'Smart Tools',
            icon: Compass,
            steps: [
                {
                    head: language === 'it' ? 'Bussola Qibla' : 'Qibla Compass',
                    text: language === 'it' ? 'Usa la bussola in tempo reale per trovare la direzione della Kaaba. Assicurati di calibrare i sensori del telefono muovendolo a "8".' : 'Use the real-time compass to find the Kaaba direction. Calibrate your phone sensors by moving it in a "figure 8" pattern.'
                },
                {
                    head: language === 'it' ? 'Orari Preghiera' : 'Prayer Times',
                    text: language === 'it' ? 'Gli orari sono calcolati con precisione atomica. Puoi inserire l\'altitudine per correggere gli orari in zone montuose.' : 'Times are calculated with atomic precision. You can enter altitude to correct times in mountainous areas.'
                }
            ]
        },
        {
            title: language === 'it' ? 'Notifiche & Adhan' : 'Notifications & Adhan',
            icon: Bell,
            steps: [
                {
                    head: language === 'it' ? 'Libreria Adhan' : 'Adhan Library',
                    text: language === 'it' ? 'Scegli tra oltre 20 richiami alla preghiera da tutto il mondo. Puoi ascoltare un\'anteprima prima di selezionare.' : 'Choose from over 20 calls to prayer from around the world. Preview them before selecting.'
                },
                {
                    head: language === 'it' ? 'Automazione' : 'Automation',
                    text: language === 'it' ? 'Abilita l\'Adhan automatico per far partire il suono esattamente all\'ora stabilita.' : 'Enable auto-adhan to trigger the sound precisely at the scheduled time.'
                }
            ]
        },
        {
            title: language === 'it' ? 'Ricerca Scientifica' : 'Scholarly Research',
            icon: Bot,
            steps: [
                {
                    head: language === 'it' ? 'Studioso Digitale' : 'Digital Scholar',
                    text: language === 'it' ? 'Chiedi spiegazioni su Hadith o concetti complessi. Il sistema utilizzerà fonti certificate.' : 'Ask for explanations on Hadiths or complex concepts. The system uses certified sources.'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="container mx-auto px-4 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold font-amiri text-gradient-gold mb-6">
                        {language === 'it' ? 'Guida all\'Uso' : 'Usage Guide'}
                    </h1>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                        {language === 'it' ? 'Scopri come sfruttare al meglio tutte le funzioni innovative del tuo compagno spirituale.' : 'Discover how to make the most of all the innovative features of your spiritual companion.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="glass h-full border-none shadow-xl hover:shadow-primary/5 transition-all">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                        <section.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{section.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {section.steps.map((step, sIdx) => (
                                        <div key={sIdx} className="space-y-2">
                                            <h4 className="font-black text-xs uppercase tracking-widest text-primary">{step.head}</h4>
                                            <p className="text-muted-foreground leading-relaxed">{step.text}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Support */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 p-12 glass rounded-[3rem] text-center border border-white/5"
                >
                    <ShieldCheck className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-4">Supporto Certificato</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        {language === 'it' ? 'Tutti i contenuti sono verificati e provengono da fonti accademiche affidabili. In caso di dubbi tecnici, l\'app si sincronizza automaticamente con orologi atomici per la massima precisione.' : 'All content is verified and comes from reliable academic sources. In case of technical doubts, the app automatically syncs with atomic clocks for maximum precision.'}
                    </p>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default InstructionsPage;
