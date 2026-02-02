import React, { useEffect, useRef } from 'react';

export const GalaxyAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 2000;
        const colors = ['#ffffff', '#c9a44a', '#e5e7eb', '#fcd34d', '#1e293b', '#334155'];

        class Particle {
            x: number = 0;
            y: number = 0;
            size: number = 0;
            color: string = '';
            angle: number = 0;
            distance: number = 0;
            velocity: number = 0;
            spiralOffset: number = 0;
            opacity: number = 0;

            constructor() {
                this.reset();
            }

            reset() {
                const width = canvas!.width;
                const height = canvas!.height;
                const maxDist = Math.sqrt(width * width + height * height) / 2;

                this.distance = Math.pow(Math.random(), 0.5) * maxDist;
                this.angle = Math.random() * Math.PI * 2;

                // Spiral arms effect
                const arms = 3;
                this.spiralOffset = (this.distance / maxDist) * Math.PI * 4;
                this.angle = (Math.floor(Math.random() * arms) * (Math.PI * 2 / arms)) + (Math.random() * 0.5) + this.spiralOffset;

                this.size = Math.random() * 1.5 + 0.2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.velocity = (0.0001 + Math.random() * 0.0005) * (maxDist / (this.distance + 10));
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.angle += this.velocity;
                this.x = canvas!.width / 2 + Math.cos(this.angle) * this.distance;
                this.y = canvas!.height / 2 + Math.sin(this.angle) * this.distance;
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                if (this.size > 1.3) {
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = this.color;
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const drawNebula = () => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, canvas.width / 1.5
            );

            // Deep cosmic colors for the "solid" feel
            gradient.addColorStop(0, 'rgba(201, 164, 74, 0.05)');
            gradient.addColorStop(0.2, 'rgba(30, 41, 59, 0.03)');
            gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.02)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.globalAlpha = 1;
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawNebula();

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Center glow (The "Hole" or Core)
            const coreGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, 100
            );
            coreGradient.addColorStop(0, 'rgba(252, 211, 77, 0.15)');
            coreGradient.addColorStop(1, 'rgba(201, 164, 74, 0)');
            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
            ctx.fill();

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
            style={{ background: 'transparent', mixBlendMode: 'screen' }}
        />
    );
};
