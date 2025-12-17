import React, { useEffect, useRef } from 'react';
import CursorGlow from './CursorGlow';

interface GlobalBackgroundProps {
    intensity?: 'low' | 'medium' | 'high';  // Star density
    showDNA?: boolean;                       // Show DNA helixes
    dnaCount?: number;                       // Number of DNA strands (1-4)
}

const GlobalBackground: React.FC<GlobalBackgroundProps> = ({
    intensity = 'medium',
    showDNA = false,
    dnaCount = 2
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let stars: any[] = [];
        let dnaStrands: any[] = [];
        let time = 0;

        // Star configuration based on intensity
        const starConfig = {
            low: { count: 30, maxSize: 1.5 },
            medium: { count: 60, maxSize: 2 },
            high: { count: 100, maxSize: 2.5 }
        };

        const isMobile = window.innerWidth < 768;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateStars();
            if (showDNA && !isMobile) generateDNA(); // Disable DNA on mobile global bg for performance
        };

        const generateStars = () => {
            const config = starConfig[intensity];
            // Reduce stars on mobile
            const count = isMobile ? Math.floor(config.count * 0.5) : config.count;

            stars = [];

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * config.maxSize + 0.5,
                    baseOpacity: Math.random() * 0.5 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.005,
                    twinkleOffset: Math.random() * Math.PI * 2
                });
            }
        };

        const getDNAPositions = (count: number, width: number): number[] => {
            // Distribute DNA strands symmetrically
            switch (count) {
                case 1: return [width * 0.5];
                case 2: return [width * 0.1, width * 0.9]; // Far sides
                case 3: return [width * 0.2, width * 0.5, width * 0.8];
                case 4: return [width * 0.1, width * 0.35, width * 0.65, width * 0.9];
                default: return [width * 0.5];
            }
        };

        const generateDNA = () => {
            dnaStrands = [];
            const positions = getDNAPositions(dnaCount, canvas.width);

            positions.forEach((pos, i) => {
                dnaStrands.push({
                    centerX: pos,
                    amplitude: 40 + Math.random() * 30,
                    speed: 0.0005 + Math.random() * 0.0003,
                    phase: (i * Math.PI) / dnaCount,
                    opacity: 0.1 + Math.random() * 0.1 // Subtle opacity
                });
            });
        };

        const drawStars = () => {
            stars.forEach(star => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
                const opacity = star.baseOpacity + twinkle * 0.3;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, opacity)})`;
                ctx.fill();
            });
        };

        const drawDNA = () => {
            const height = canvas.height;
            const pointSpacing = 60; // Spread out for performance
            const points = Math.ceil(height / pointSpacing) + 4;

            dnaStrands.forEach(strand => {
                const { centerX, amplitude, speed, phase, opacity } = strand;

                // Draw strand lines
                ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.4})`;
                ctx.lineWidth = 1;

                // Strand 1
                ctx.beginPath();
                for (let i = 0; i < points; i++) {
                    const y = -50 + i * pointSpacing;
                    const p = time * speed + i * 0.15 + phase;
                    const x = centerX + Math.sin(p) * amplitude;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Strand 2
                ctx.beginPath();
                for (let i = 0; i < points; i++) {
                    const y = -50 + i * pointSpacing;
                    const p = time * speed + i * 0.15 + phase + Math.PI;
                    const x = centerX + Math.sin(p) * amplitude;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();

                // Draw dots (simplified)
                for (let i = 0; i < points; i++) {
                    const y = -50 + i * pointSpacing;
                    const p = time * speed + i * 0.15 + phase;

                    // Strand 1 dot
                    const x1 = centerX + Math.sin(p) * amplitude;
                    ctx.beginPath();
                    ctx.arc(x1, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.fill();

                    // Strand 2 dot
                    const x2 = centerX + Math.sin(p + Math.PI) * amplitude;
                    ctx.beginPath();
                    ctx.arc(x2, y, 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.fill();
                }
            });
        };

        const animate = () => {
            // Throttle Check (30fps) - optional but good practice
            // For global bg which is subtle, we can run fairly standard requestAnimationFrame
            // but keeping it lightweight is key.

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawStars();
            if (showDNA && !isMobile) drawDNA();

            time += 16;
            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [intensity, showDNA, dnaCount]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="global-background-canvas"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: 0.8 // Subtle overlay
                }}
            />
            <CursorGlow />
        </>
    );
};

export default GlobalBackground;
