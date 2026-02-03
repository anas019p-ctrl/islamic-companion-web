import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, BookOpen, ShieldCheck, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';

import heroPattern from '@/assets/hero-pattern.jpg';
import logo from '@/assets/logo.png';

export const HeroSection = () => {
  const { t, isRTL, language } = useLanguage();
  const [time, setTime] = useState(new Date());
  const { prayerTimes } = usePrayerTimes();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Hijri Date Calculation (Simplified Approximation)
  const getHijriDate = () => {
    // Simple Hijri date logic for UI display
    const today = new Date();
    const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-uma', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return hijriFormatter.format(today);
  };

  const getNextPrayer = () => {
    if (!prayerTimes) return null;
    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();

    const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    for (const p of prayers) {
      const timeStr = prayerTimes[p as keyof typeof prayerTimes] as string;
      if (!timeStr) continue;
      let [h, m] = timeStr.replace(/ (AM|PM)/, '').split(':').map(Number);
      if (timeStr.includes('PM') && h < 12) h += 12;
      if (timeStr.includes('AM') && h === 12) h = 0;

      if (h > currentH || (h === currentH && m > currentM)) {
        return { name: p, time: timeStr };
      }
    }
    return { name: 'fajr', time: prayerTimes.fajr }; // Tomorrow
  };

  const nextP = getNextPrayer();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 animated-bg particles-bg">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 glowing-bg-lines"
        style={{
          backgroundImage: `url(${heroPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />

      <div className="container relative z-10 px-4">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

          {/* Top Status Bar: Clock & Hijri */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-6 mb-12 glass p-4 rounded-3xl border border-white/5 shadow-2xl neon-glow-gold"
          >
            <div className="flex items-center gap-2 px-4 border-r border-white/10 last:border-0">
              <Clock className="w-4 h-4 text-primary" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-primary tracking-widest leading-none mb-1">{t('realTime')}</p>
                <p className="text-base font-mono font-bold leading-none">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 border-r border-white/10 last:border-0">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest leading-none mb-1">{t('hijriDate')}</p>
                <p className="text-base font-bold leading-none">{getHijriDate()}</p>
              </div>
            </div>

            {nextP && (
              <div className="flex items-center gap-2 px-4 border-r border-white/10 last:border-0">
                <Star className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-amber-400 tracking-widest leading-none mb-1">{t('nextPrayer')}</p>
                  <p className="text-base font-bold leading-none">{nextP.name.toUpperCase()} • {nextP.time}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Logo with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 blur-3xl bg-primary/30 rounded-full scale-110" />
            <img
              src={logo}
              alt="Logo"
              className="relative w-32 h-32 md:w-40 md:h-40 object-contain float-animation"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-arabic text-3xl md:text-5xl text-primary mb-2 drop-shadow-[0_0_15px_rgba(201,164,74,0.4)]"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </motion.p>

          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-[1px] w-8 bg-cyan-500/50" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] neon-text-cyan font-bold">
              {t('innovate')} • {t('accessibility')} • {t('education_short')}
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/50" />
          </motion.div>

          {/* Main Prayer Widget - CENTRAL FOCUS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-sm gradient-border glass-card p-10 rounded-[3.5rem] border-transparent shadow-[0_0_50px_rgba(201,164,74,0.15)] mb-12 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />

            <div className="relative z-10 flex flex-col items-center">
              <p className="text-[10px] uppercase font-black text-primary tracking-[0.3em] mb-4 opacity-70">
                {t('nextPrayer')}
              </p>

              <h2 className="text-5xl md:text-6xl font-black text-gradient-gold mb-2 tracking-tighter">
                {nextP ? t(nextP.name) : '---'}
              </h2>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-bold opacity-60">{t('at')}</span>
                <span className="text-3xl font-black text-white">{nextP?.time || '--:--'}</span>
              </div>

              {/* Countdown or Status Line */}
              <div className="h-[1px] w-12 bg-primary/30 mb-6" />

              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  {t('syncedWithSky')}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 font-amiri"
          >
            <span className="text-gradient-gold drop-shadow-2xl">{t('appName')}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl font-medium leading-relaxed opacity-60">
              {t('subtitle')}
            </p>

            {/* Direct Navigation - Large and Textual as requested */}
            <div className={`grid grid-cols-2 gap-4 w-full max-w-md ${isRTL ? 'rtl' : ''}`}>
              <Link to="/quran" className="flex flex-col items-center justify-center p-6 rounded-3xl glass-premium border border-white/5 hover:border-primary/40 transition-all group active:scale-95">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{t('readQuran')}</span>
              </Link>
              <Link to="/tools" className="flex flex-col items-center justify-center p-6 rounded-3xl glass-premium border border-white/5 hover:border-primary/40 transition-all group active:scale-95">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest">{t('prayerTimes')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

