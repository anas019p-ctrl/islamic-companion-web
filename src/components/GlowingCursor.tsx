import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    hue: number;
}

export const GlowingCursor: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const particles = useRef<Particle[]>([]);
    const hue = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;

            // Create lightweight particles with rainbow gradient
            for (let i = 0; i < 2; i++) {
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1.0,
                    hue: hue.current
                });
            }

            // Increment hue for rainbow effect
            hue.current = (hue.current + 2) % 360;
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.current = particles.current.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.vy += 0.1; // Gravity effect

                if (p.life > 0) {
                    const size = p.life * 4;

                    // Rainbow gradient glow
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2);
                    gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.life})`);
                    gradient.addColorStop(0.5, `hsla(${p.hue + 30}, 100%, 60%, ${p.life * 0.5})`);
                    gradient.addColorStop(1, `hsla(${p.hue + 60}, 100%, 50%, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Core particle
                    ctx.fillStyle = `hsla(${p.hue}, 100%, 90%, ${p.life})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
                    ctx.fill();

                    return true;
                }
                return false;
            });

            // Cursor glow
            const cursorGradient = ctx.createRadialGradient(
                mouse.current.x, mouse.current.y, 0,
                mouse.current.x, mouse.current.y, 30
            );
            cursorGradient.addColorStop(0, `hsla(${hue.current}, 100%, 70%, 0.3)`);
            cursorGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = cursorGradient;
            ctx.beginPath();
            ctx.arc(mouse.current.x, mouse.current.y, 30, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[100]"
        />
    );
};
