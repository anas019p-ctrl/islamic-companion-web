import { motion } from 'framer-motion';
import ancientMecca from '@/assets/ancient-mecca-bg.png';

export const AncientBackground = () => {
    return (
        <div className="fixed inset-0 z-[-20] overflow-hidden bg-black pointer-events-none">
            {/* 8K Main Image with Parallax & Zoom Movement */}
            <motion.div
                animate={{
                    scale: [1, 1.05, 1],
                    x: [-10, 10, -10],
                    y: [-10, 5, -10],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={ancientMecca}
                    alt="Ancient Makkah"
                    className="w-[110%] h-[110%] object-cover opacity-60 grayscale-[0.3] brightness-[0.7] sepia-[0.2]"
                />
            </motion.div>

            {/* Atmospheric Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background" />

            {/* Sand Drift / Dust Particles Simulation */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            opacity: 0,
                            scale: Math.random() * 0.5 + 0.2
                        }}
                        animate={{
                            x: [null, (Math.random() - 0.5) * 50 + "%"],
                            y: [null, (Math.random() + 0.2) * 30 + "%"],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute w-1 h-1 bg-primary/40 blur-[1px] rounded-full"
                    />
                ))}
            </div>

            {/* Animated Spiritual Glows */}
            <motion.div
                animate={{
                    opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity, delay: 5 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]"
            />
        </div>
    );
};
