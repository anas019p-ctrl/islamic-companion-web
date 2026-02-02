import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export const ContentHeatEffect: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Transform scroll progress into dynamic color shifts
    const hue = useTransform(smoothScroll, [0, 1], [0, 80]); // Shift from teal/black base to warmer tones
    const saturation = useTransform(smoothScroll, [0, 0.5, 1], [0, 30, 0]);
    const opacity = useTransform(smoothScroll, [0, 0.5, 1], [0.1, 0.3, 0.1]);
    const blur = useTransform(smoothScroll, [0, 1], [2, 5]);

    return (
        <motion.div
            className="fixed inset-0 z-[-15] pointer-events-none"
            style={{
                background: useTransform(hue, h => `radial-gradient(circle at 50% 50%, hsla(${h + 170}, 80%, 40%, 0.2), transparent 80%)`),
                backdropFilter: useTransform(saturation, s => `saturate(${100 + s}%) blur(${blur}px)`),
            }}
        >
            <motion.div
                className="absolute inset-0 bg-primary opacity-10"
                style={{ opacity }}
            />
            {/* Pulsing light effect */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                style={{ opacity: useTransform(smoothScroll, [0, 0.5, 1], [0, 1, 0]) }}
            />
        </motion.div>
    );
};
