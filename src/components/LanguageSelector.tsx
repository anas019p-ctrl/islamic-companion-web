import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/lib/translations';

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-secondary/30 border border-white/5 flex items-center justify-center hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 group"
        aria-label="Change Language"
      >
        <Globe className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 w-64 max-h-80 overflow-y-auto bg-card border border-border rounded-xl shadow-card z-50"
            >
              <div className="p-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${language === lang.code
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-secondary/50'
                      }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className={`font-medium ${lang.rtl ? 'font-arabic' : ''}`}>
                        {lang.nativeName}
                      </span>
                      <span className="text-xs text-muted-foreground">{lang.name}</span>
                    </div>
                    {language === lang.code && <Check className="w-4 h-4 text-primary" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
