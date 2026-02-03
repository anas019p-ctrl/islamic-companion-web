import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import logo from '@/assets/logo.png';
const logo = '/logo.png';
import { BackButton } from './BackButton';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-premium transition-all duration-300">
      {/* Animated Glowing Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
        <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-border-flow" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo & Back Button */}
          <div className="flex items-center gap-4">
            {location.pathname !== '/' && (
              <div className="md:hidden">
                <BackButton />
              </div>
            )}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 blur-md bg-primary/30 rounded-full scale-110 hidden md:block" />
                <img src={logo} alt="Logo" className="relative w-10 h-10 md:w-12 md:h-12 object-contain z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-gradient-gold drop-shadow-sm flex items-center gap-2">
                  {t('appName')}
                  <span className="text-[8px] px-1 bg-primary/20 rounded border border-primary/30 text-primary animate-pulse">V2.1</span>
                </span>
                <span className="text-sm text-muted-foreground/60 hidden sm:block uppercase tracking-widest">{t('tagline')}</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/quran" className="magic-nav-item text-[11px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary transition-all">
              {t('quran')}
            </Link>
            <Link to="/hadith" className="magic-nav-item text-[11px] font-black uppercase tracking-widest text-primary hover:text-accent transition-all drop-shadow-[0_0_8px_rgba(201,164,74,0.3)]">
              {t('hadith')}
            </Link>
            <Link to="/dua" className="magic-nav-item text-[11px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary transition-all">
              {t('dua')}
            </Link>
            <Link to="/scholar" className="magic-nav-item text-[11px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-all flex items-center gap-1">
              {t('ai_guide')} <span className="text-[8px] px-1 bg-emerald-500/10 rounded animate-pulse">{t('new')}</span>
            </Link>
            <Link to="/translate" className="magic-nav-item text-[11px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-all">
              {t('translator_nav')}
            </Link>
            <LanguageSelector />
          </nav>

          {/* Mobile Actions: Language & Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center border border-white/5 active:scale-90 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 1, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 1, height: 0 }}
            className="md:hidden pb-4"
          >
            <nav className="flex flex-col gap-3">
              <Link to="/quran" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('quran')}
              </Link>
              <Link to="/hadith" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('hadith') || 'Hadith'}
              </Link>
              <Link to="/dua" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('dua')}
              </Link>
              <Link to="/education" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('education_short') || 'Education'}
              </Link>
              <Link to="/#learn-arabic" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('learn_arabic')}
              </Link>
              <Link to="/sahaba" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('sahaba_stories')}
              </Link>
              <Link to="/library" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('library_shamila')}
              </Link>
              <Link to="/videos" className="px-4 py-2 rounded-lg bg-secondary/30 text-sm font-medium">
                {t('video_edu')}
              </Link>
              <Link to="/scholar" className="px-4 py-2 rounded-lg bg-emerald-500/10 text-sm font-medium text-emerald-500">
                {t('ai_guide')}
              </Link>
              <Link to="/translate" className="px-4 py-2 rounded-lg bg-primary/10 text-sm font-medium text-primary">
                {t('translator_nav')}
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};
