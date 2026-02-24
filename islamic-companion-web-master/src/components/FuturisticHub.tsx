import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Eye, EyeOff, Ear, Volume2, Settings, Compass, Globe, MessageSquare, Zap, Orbit, X } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Button } from './ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const FuturisticHub = () => {
    const { isHubOpen, toggleHub, speak, isDeafMode, toggleDeafMode, isBlindMode, toggleBlindMode } = useAccessibility();
    const { language, t } = useLanguage();

    return (
        <>
            {/* Floating Trigger */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    toggleHub(true);
                    speak(t('hubOpened'));
                }}
                className="fixed bottom-6 right-6 w-14 h-14 rounded-2xl glass border border-primary/40 flex items-center justify-center text-primary shadow-[0_0_20px_rgba(201,164,74,0.3)] z-50 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                <Compass className="w-6 h-6 relative z-10" />
            </motion.button>

            {/* Heroic Overlay Hub */}
            <AnimatePresence>
                {isHubOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/40 backdrop-blur-2xl"
                        onClick={() => toggleHub(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 50, rotateX: 20 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 relative"
                        >
                            {/* Accessibility Board */}
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <HubCard
                                    title={t('visionInclusion')}
                                    icon={isBlindMode ? Eye : EyeOff}
                                    active={isBlindMode}
                                    onClick={toggleBlindMode}
                                    desc={t('visionDesc')}
                                />
                                <HubCard
                                    title={t('hearingInclusion')}
                                    icon={Ear}
                                    active={isDeafMode}
                                    onClick={toggleDeafMode}
                                    desc={t('hearingDesc')}
                                />
                                <HubCard
                                    title={t('hadithArchive')}
                                    icon={ShieldCheck}
                                    active={false}
                                    onClick={() => window.location.href = '/hadith'}
                                    desc={t('hadithDescHub')}
                                />
                                <HubCard
                                    title={t('qiblaStarMap')}
                                    icon={Globe}
                                    active={false}
                                    onClick={() => speak(t('qiblaCalculating'))}
                                    desc={t('qiblaDesc')}
                                />
                            </div>

                            {/* Side Status */}
                            <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold text-gradient-gold mb-2">Cosmos v2.0</h3>
                                    <p className="text-[10px] uppercase tracking-widest opacity-50 mb-6">Sacred Knowledge Interface</p>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs">
                                            <span>{t('systemSync')}</span>
                                            <span className="text-emerald-500 underline decoration-emerald-500/30">Stable</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span>{t('holyDataStream')}</span>
                                            <span className="text-primary font-bold">114 Surahs</span>
                                        </div>
                                    </div>
                                </div>

                                <Button variant="ghost" className="w-full mt-8 border border-primary/20 hover:bg-primary/10" onClick={() => toggleHub(false)}>
                                    {t('closeInterface')}
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

interface HubCardProps {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    active: boolean;
    onClick: () => void;
    desc: string;
}

const HubCard = ({ title, icon: Icon, active, onClick, desc }: HubCardProps) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        onClick={onClick}
        className={`p-6 rounded-3xl cursor-pointer transition-all border ${active
                ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(201,164,74,0.2)]'
                : 'glass border-white/5 hover:border-primary/30'
            }`}
    >
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Icon className={`w-6 h-6 ${active ? 'text-primary' : 'text-white/60'}`} />
        </div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-[10px] opacity-50 uppercase tracking-tighter leading-tight">{desc}</p>
    </motion.div>
);
