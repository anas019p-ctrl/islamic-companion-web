import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  href?: string;
}

export const SectionCard = ({ icon: Icon, title, description, delay = 0, href }: SectionCardProps) => {
  const { t } = useLanguage();
  const content = (
    <>
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-10 h-10 text-primary" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-black text-white mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
        {description}
      </p>

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors duration-300">
        <span className="text-sm font-medium">{t('explore')}</span>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </motion.svg>
      </div>
    </>
  );

  const cardClasses = "section-card futuristic-card neon-border group cursor-pointer relative overflow-hidden";

  if (href) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
      >
        <Link to={href} className={cardClasses + " block"}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={cardClasses}
    >
      {content}
    </motion.div>
  );
};
