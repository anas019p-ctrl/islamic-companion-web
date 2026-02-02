import React from 'react';
import { motion } from 'framer-motion';

interface GlassThermometerProps {
    value: number; // 0 to 100
    label?: string;
}

export const GlassThermometer: React.FC<GlassThermometerProps> = ({ value, label = "Activity" }) => {
    // Color calculation based on value (Green to Red)
    const getColor = (v: number) => {
        if (v < 30) return '#22c55e'; // Green
        if (v < 70) return '#eab308'; // Yellow
        return '#ef4444'; // Red
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 glass-premium rounded-3xl w-fit">
            <div className="relative w-12 h-64 bg-background/50 rounded-full border border-white/10 overflow-hidden shadow-inner">
                {/* Mercury Column */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    style={{
                        background: `linear-gradient(to top, ${getColor(value)}, ${getColor(value)}dd)`,
                        boxShadow: `0 0 20px ${getColor(value)}66`
                    }}
                >
                    {/* Glass Reflection Effect */}
                    <div className="absolute inset-y-0 left-1 w-1 bg-white/20 rounded-full" />

                    {/* Bubbles animation */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                </motion.div>

                {/* Measurement Marks */}
                <div className="absolute inset-0 flex flex-col justify-between py-4 px-2 pointer-events-none opacity-20">
                    {[100, 75, 50, 25, 0].map(mark => (
                        <div key={mark} className="flex items-center gap-2">
                            <div className="w-2 h-[1px] bg-white" />
                            <span className="text-[8px] text-white font-mono">{mark}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <div className="text-2xl font-bold font-mono" style={{ color: getColor(value) }}>
                    {value}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {label}
                </div>
            </div>
        </div>
    );
};
