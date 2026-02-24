import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Globe, FileCheck, ShieldAlert, Database } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const SecurityPage = () => {
    const { language } = useLanguage();
    const isRTL = language === 'ar';

    const sections = [
        {
            icon: ShieldCheck,
            title: isRTL ? 'أصالة المصادر' : 'Authenticity of Sources',
            it: 'Autenticità delle Fonti',
            content: isRTL
                ? 'نحن نعتمد فقط على المصادر الموثوقة مثل صحيح البخاري وصحيح مسلم ومصادر القرآن المعتمدة.'
                : 'We rely exclusively on authentic sources like Sahih Bukhari, Sahih Muslim, and verified Quranic data.',
            itContent: 'Ci affidiamo esclusivamente a fonti autentiche come Sahih Bukhari, Sahih Muslim e dati coranici verificati.'
        },
        {
            icon: Lock,
            title: isRTL ? 'حماية البيانات' : 'Data Protection',
            it: 'Protezione dei Dati',
            content: isRTL
                ? 'بياناتك الشخصية مشفرة ومحمية من خلال تقنيات Supabase الحديثة.'
                : 'Your personal data is encrypted and protected through modern Supabase technologies.',
            itContent: 'I tuoi dati personali sono crittografati e protetti attraverso le moderne tecnologie di Supabase.'
        },
        {
            icon: Database,
            title: isRTL ? 'الخصوصية أولاً' : 'Privacy First',
            it: 'Privacy Prima di Tutto',
            content: isRTL
                ? 'نحن لا نبيع بياناتك ولا نشاركها مع أطراف ثالثة. أمنك هو أولويتنا.'
                : 'We do not sell your data or share it with third parties. Your security is our priority.',
            itContent: 'Non vendiamo i tuoi dati né li condividiamo con terze parti. La tua sicurezza è la nostra priorità.'
        }
    ];

    return (
        <div className={`min-h-screen bg-background text-foreground ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
            <Header />
            <main className="container mx-auto px-4 py-8 pt-24">
                <BackButton />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Lock className="w-5 h-5 text-primary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-[0.3em]">
                            {isRTL ? 'الأمان والثقة' : 'Security & Trust'}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-amiri text-gradient-gold mb-4">
                        {isRTL ? 'الأمان والخصوصية' : 'Security & Privacy'}
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="futuristic-card h-full">
                                <CardHeader className="text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                        <section.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <CardTitle>
                                        {language === 'it' ? section.it : section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground">
                                    <p>{language === 'it' ? section.itContent : section.content}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SecurityPage;
