import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShamilaExplorer } from '@/components/ShamilaExplorer';
import { BackButton } from '@/components/BackButton';
import { BookOpen, ShieldCheck } from 'lucide-react';

const LibraryPage = () => {
    const { language, isRTL } = useLanguage();

    return (
        <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />

            <main className="container mx-auto px-4 py-8 pt-24 max-w-6xl">
                <BackButton />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary/20 to-accent/20 mb-6 border border-primary/20 shadow-xl">
                        <BookOpen className="w-10 h-10 text-primary" />
                    </div>
                    <h1 className="text-5xl font-bold font-amiri text-primary mb-4">
                        {language === 'ar' ? 'المكتبة الشاملة الرقمية' : 'Digital Shamila Library'}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto italic">
                        {language === 'ar'
                            ? 'استكشف آلاف المجلدات من التراث الإسلامي الكلاسيكي بلمسة واحدة.'
                            : 'Esplora migliaia di volumi del patrimonio islamico classico con un solo tocco.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
                    <div className="lg:col-span-3">
                        <div className="glass p-8 rounded-[2.5rem] border border-primary/10 shadow-2xl">
                            <ShamilaExplorer />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <section className="p-6 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <BookOpen className="w-8 h-8 text-primary" />
                            </div>
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4 flex items-center gap-2">
                                <BookOpen className="w-3 h-3" /> Ricerca Intelligente
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Il sistema RAG (Retrieval-Augmented Generation) integrato permette di interrogare i testi classici in linguaggio naturale.
                            </p>
                        </section>

                        <section className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-500 mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-3 h-3" /> Autenticità
                            </h4>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                Tutti i testi provengono dagli archivi digitali ufficiali di Al-Maktaba Al-Shamila, garantendo l'integrità dei contenuti originali.
                            </p>
                        </section>

                        <div className="p-6 rounded-3xl bg-primary/10 border border-primary/10 text-center">
                            <p className="text-2xl font-bold text-primary mb-1">20,000+</p>
                            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Volumi Digitalizzati</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LibraryPage;
