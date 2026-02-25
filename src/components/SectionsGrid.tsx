import { motion } from 'framer-motion';
import {
  Moon,
  HandHeart,
  Droplets,
  BookOpen,
  BookMarked,
  Users,
  Star,
  GraduationCap,
  Compass,
  BookOpenCheck,
  Library,
  Video,
  Book,
  History,
  Baby,
  MapPin,
  AlertTriangle,
} from 'lucide-react';
import { SectionCard } from './SectionCard';
import { useLanguage } from '@/contexts/LanguageContext';

const sections = [
  { key: 'quran', icon: BookMarked, descKey: 'quranDesc', href: '/quran' },
  { key: 'hadith', icon: Library, descKey: 'hadithDesc', href: '/hadith' },
  { key: 'dua', icon: BookOpen, descKey: 'duaDesc', href: '/dua' },
  { key: 'education', icon: GraduationCap, descKey: 'educationDesc', href: '/education' },
  { key: 'fasting', icon: Moon, descKey: 'fastingDesc', href: '/tools' },
  { key: 'prayer', icon: HandHeart, descKey: 'prayerDesc', href: '/tools' },
  { key: 'prophets', icon: Star, descKey: 'prophetsDesc', href: '/prophets' },
  { key: 'sahaba', icon: Users, descKey: 'sahabaDesc', href: '/sahaba' },
  { key: 'aiAssistant', icon: GraduationCap, descKey: 'aiAssistantDesc', href: '/scholar' },
  { key: 'video', icon: Video, descKey: 'videoDesc', href: '/videos' },
  { key: 'library', icon: Book, descKey: 'libraryDesc', href: '/library' },
  { key: 'history', icon: History, descKey: 'historyDesc', href: '/history' },
  { key: 'tools', icon: Compass, descKey: 'toolsDesc', href: '/tools' },
  { key: 'kids', icon: Baby, descKey: 'kidsDesc', href: '/kids' },
  { key: 'mosques', icon: MapPin, descKey: 'mosquesDesc', href: '/mosques' },
  { key: 'commonMistakes', icon: AlertTriangle, descKey: 'commonMistakesDesc', href: '/mistakes' },
];

export const SectionsGrid = () => {
  const { t } = useLanguage();

  const categories = [
    {
      titleKey: 'catSacredKnowledge',
      items: [
        { key: 'quran', icon: BookMarked, descKey: 'quranDesc', href: '/quran' },
        { key: 'hadith', icon: Library, descKey: 'hadithDesc', href: '/hadith' },
        { key: 'prophets', icon: Star, descKey: 'prophetsDesc', href: '/prophets' },
        { key: 'sahaba', icon: Users, descKey: 'sahabaDesc', href: '/sahaba' },
      ]
    },
    {
      titleKey: 'catDailyPractice',
      items: [
        { key: 'prayer', icon: HandHeart, descKey: 'prayerDesc', href: '/tools' },
        { key: 'dua', icon: BookOpen, descKey: 'duaDesc', href: '/dua' },
        { key: 'fasting', icon: Moon, descKey: 'fastingDesc', href: '/tools' },
        { key: 'tools', icon: Compass, descKey: 'toolsDesc', href: '/tools' },
        { key: 'mosques', icon: MapPin, descKey: 'mosquesDesc', href: '/mosques' },
        { key: 'commonMistakes', icon: AlertTriangle, descKey: 'commonMistakesDesc', href: '/mistakes' },
      ]
    },
    {
      titleKey: 'catWisdomMedia',
      items: [
        { key: 'aiAssistant', icon: GraduationCap, descKey: 'aiAssistantDesc', href: '/scholar' },
        { key: 'education', icon: GraduationCap, descKey: 'educationDesc', href: '/education' },
        { key: 'blog', icon: BookOpenCheck, descKey: 'blogDesc', href: '/blog' },
        { key: 'video', icon: Video, descKey: 'videoDesc', href: '/videos' },
        { key: 'kids', icon: Baby, descKey: 'kidsDesc', href: '/kids' },
        { key: 'history', icon: History, descKey: 'historyDesc', href: '/history' },
      ]
    }
  ];

  return (
    <section id="sections" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-30 px-6" />

      <div className="container relative z-10 px-4">
        {categories.map((cat, catIdx) => (
          <div key={cat.titleKey} className="mb-20 last:mb-0">
            <motion.div
              initial={{ opacity: 1, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                {t(cat.titleKey)}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {cat.items.map((section, index) => (
                <SectionCard
                  key={section.key}
                  icon={section.icon}
                  title={t(section.key)}
                  description={t(section.descKey)}
                  delay={index * 0.05}
                  href={section.href}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
