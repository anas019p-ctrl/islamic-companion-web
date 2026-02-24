import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Shield, Share2, QrCode } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import logo from '@/assets/logo.png';

export const Footer = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);
  const APP_URL = 'https://islamic-companion-web.pages.dev';
  const VERSION = 'v2.2-MIRACLE-SYNC-SUCCESS';

  const handleShare = () => {
    const url = window.location.origin;
    navigator.clipboard.writeText(url);
    toast({
      title: t('linkCopied') || 'Link Copied',
      description: t('linkCopiedDesc') || 'App link has been copied to clipboard!',
    });
  };

  return (
    <footer className="py-12 border-t border-primary/20 relative overflow-hidden glass-premium mt-12">
      {/* Futuristic Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="absolute inset-0 islamic-pattern opacity-5" />

      <div className="container relative z-10 px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <span className="text-xl font-bold text-gradient-gold">{t('appName')}</span>
              <p className="text-xs text-muted-foreground">{t('tagline')} <span className="text-[9px] opacity-50 ml-1">{VERSION}</span></p>
            </div>
          </div>

          {/* Authentic Sources Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <Link
              to="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-all group"
            >
              <Shield className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-primary">{t('authenticSources')}</span>
            </Link>
          </motion.div>

          {/* Share & Credits */}
          <div className="flex items-center justify-end gap-4 text-muted-foreground text-sm">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-primary/20 hover:border-primary/50"
                onClick={handleShare}
              >
                <Share2 className="w-4 h-4" />
                {t('shareApp')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 border-primary/20 hover:border-primary/50"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="w-4 h-4" />
                QR
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <a href="/security" className="hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold">
                {t('security')}
              </a>
              <div className="flex items-center gap-2">
                <span>{t('madeWith')}</span>
                <Heart className="w-4 h-4 text-primary fill-current" />
                <span>{t('forUmmah')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            {t('authenticSourcesDesc')}
          </p>
          <p className="font-arabic text-lg text-primary/80">
            رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t('quranicVerseFooter')}
          </p>
        </div>

        {/* QR Code Modal */}
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex flex-col items-center gap-4 p-6 glass-premium rounded-3xl border border-primary/20 max-w-sm mx-auto"
          >
            <p className="text-sm font-bold text-primary">{t('scanToAccess')}</p>
            <div className="p-4 bg-white rounded-2xl">
              <QRCodeSVG
                value={APP_URL}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">{APP_URL}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQR(false)}
              className="text-xs"
            >
              {t('close')}
            </Button>
          </motion.div>
        )}
      </div>
    </footer>
  );
};

