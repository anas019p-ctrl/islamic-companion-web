import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
// import meccaCosmic from '@/assets/mecca-cosmic.jpg';
// import alAqsaHeritage from '@/assets/al-aqsa-heritage.png';
const meccaCosmic = '/mecca-cosmic.jpg';
const alAqsaHeritage = '/al-aqsa-heritage.png';
import { Star, MapPin } from 'lucide-react';

export const SacredHeritage = () => {
    const { t, isRTL, language } = useLanguage();

    const sites = [
        {
            id: 'mecca',
            image: meccaCosmic,
            title: { ar: 'Ù…ÙƒØ© Ø§Ù„Ù…ÙƒØ±Ù…Ø©', en: 'Holy Makkah', it: 'La Mecca' },
            location: { ar: 'Ø§Ù„Ù…Ù…Ù„ÙƒØ© Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ø³Ø¹ÙˆØ¯ÙŠØ©', en: 'Saudi Arabia', it: 'Arabia Saudita' },
            desc: {
                ar: 'Ø£Ø·Ù‡Ø± Ø¨Ù‚Ø§Ø¹ Ø§Ù„Ø£Ø±Ø¶ ÙˆÙ‚Ø¨Ù„Ø© Ø§Ù„Ù…Ø³Ù„Ù…ÙŠÙ† ÙÙŠ ØµÙ„Ø§ØªÙ‡Ù….',
                en: 'The holiest site in Islam and the direction of prayer for all Muslims.',
                it: 'Il sito piÃ¹ sacro dell\'Islam e la direzione della preghiera per tutti i musulmani.'
            }
        },
        {
            id: 'alaqsa',
            image: alAqsaHeritage,
            title: { ar: 'Ø§Ù„Ù…Ø³Ø¬Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰', en: 'Al-Aqsa Mosque', it: 'Moschea di Al-Aqsa' },
            location: { ar: 'Ø§Ù„Ù‚Ø¯Ø³ØŒ ÙÙ„Ø³Ø·ÙŠÙ†', en: 'Jerusalem, Palestine', it: 'Gerusalemme, Palestina' },
            desc: {
                ar: 'Ø£ÙˆÙ„Ù‰ Ø§Ù„Ù‚Ø¨Ù„ØªÙŠÙ† ÙˆØ«Ø§Ù„Ø« Ø§Ù„Ø­Ø±Ù…ÙŠÙ† Ø§Ù„Ø´Ø±ÙŠÙÙŠÙ†.',
                en: 'The first Qibla and the third holiest site in Islam.',
                it: 'La prima Qibla e il terzo sito piÃ¹ sacro dell\'Islam.'
            }
        }
    ];

    return (
        <section className="py-20 bg-transparent overflow-hidden">
            <div className="container px-4 mx-auto">
                <motion.div
                    initial={{ opacity: 1, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{t('sacredHeritage') || 'Sacred Heritage'}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 font-amiri text-gradient-gold">
                        {t('sacredMonuments') || 'Sacred Monuments'}
                    </h2>
                </motion.div>

                <div className="space-y-32">
                    {sites.map((site, index) => (
                        <div
                            key={site.id}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                        >
                            {/* Image with Motion */}
                            <motion.div
                                initial={{ opacity: 1, scale: 1, x: 0 }}
                                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-full lg:w-1/2 aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group shadow-2xl"
                            >
                                <motion.img
                                    src={site.image}
                                    alt={site.title.en}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

                                {/* Moving Light Effects */}
                                <motion.div
                                    animate={{
                                        opacity: [0.2, 0.5, 0.2],
                                        scale: [1, 1.2, 1],
                                        x: [0, 20, 0],
                                        y: [0, -20, 0]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 blur-3xl rounded-full"
                                />
                            </motion.div>

                            {/* Content */}
                            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                                <motion.div
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-2 text-primary/60 mb-2 justify-center lg:justify-start">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-widest">
                                            {site.location[language as keyof typeof site.location] || site.location.en}
                                        </span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-bold font-amiri mb-4">
                                        {site.title[language as keyof typeof site.title] || site.title.en}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                        {site.desc[language as keyof typeof site.desc] || site.desc.en}
                                    </p>

                                    <div className="pt-8">
                                        <div className="h-[1px] w-24 bg-gradient-to-r from-primary to-transparent mx-auto lg:mx-0" />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
