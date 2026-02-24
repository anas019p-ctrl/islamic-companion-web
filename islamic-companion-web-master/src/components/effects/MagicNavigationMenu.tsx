import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, MessageCircle, Image, Settings, Library, Map, Baby, AlertTriangle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Library, label: 'Dua', path: '/dua' },
    { icon: Map, label: 'Mosques', path: '/mosques' },
    { icon: Baby, label: 'Kids', path: '/kids' },
    { icon: BookOpen, label: 'Quran', path: '/quran' },
    { icon: AlertTriangle, label: 'Mistakes', path: '/mistakes' },
    { icon: MessageCircle, label: 'Blog', path: '/blog' },
    { icon: Image, label: 'Media', path: '/videos' }
];

export const MagicNavigationMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
        if (currentIndex !== -1) setActiveIndex(currentIndex);
    }, [location.pathname]);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="glass-premium flex gap-2 p-2 rounded-[30px] shadow-2xl relative bg-background/40">
                {/* Magic Highlight Circle */}
                <motion.div
                    className="absolute h-12 w-12 bg-primary rounded-full blur-[2px] z-0"
                    initial={false}
                    animate={{
                        x: activeIndex * (48 + 8) + 8,
                        y: 8,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    <div className="absolute inset-0 bg-primary/30 rounded-full animate-pulse blur-xl" />
                </motion.div>

                {/* Hover Glow Effect */}
                {hoveredIndex !== null && hoveredIndex !== activeIndex && (
                    <motion.div
                        className="absolute h-12 w-12 rounded-full z-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            x: hoveredIndex * (48 + 8) + 8,
                            y: 8,
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-md" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-emerald-500/30 rounded-full animate-pulse" />
                    </motion.div>
                )}

                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeIndex === index;
                    const isHovered = hoveredIndex === index;

                    return (
                        <button
                            key={index}
                            onClick={() => {
                                if ('vibrate' in navigator) navigator.vibrate(10);
                                navigate(item.path);
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative z-10 h-12 w-12 flex items-center justify-center rounded-full transition-all duration-300 ${isActive
                                ? 'text-primary-foreground scale-110'
                                : isHovered
                                    ? 'text-primary scale-105'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                        >
                            <Icon size={24} className="transition-transform duration-200" />

                            {(isHovered) && (
                                <motion.span
                                    layoutId={`hover-label-${index}`}
                                    className={`absolute -top-10 text-xs px-3 py-1.5 rounded-lg shadow-lg font-bold whitespace-nowrap bg-primary/80 text-primary-foreground`}
                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    {item.label}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                                </motion.span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
