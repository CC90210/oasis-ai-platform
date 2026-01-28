import { useEffect, useRef } from 'react';
import { useTheme } from '@/store/themeStore';

interface StarFieldProps {
    paused?: boolean;
    forceTheme?: 'dark' | 'light';
}

export default function StarField({ paused = false, forceTheme }: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    const effectiveTheme = forceTheme || theme;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        interface Star {
            x: number;
            y: number;
            size: number;
            opacity: number;
            twinkleSpeed: number;
            phase: number;
            color: { r: number; g: number; b: number };
            type: 'normal' | 'accent';
        }

        let stars: Star[] = [];
        let animationId: number;
        let time = 0;

        const currentCanvas = canvas;

        // Theme-aware colors
        const isLightMode = effectiveTheme === 'light';
        const bgColor = isLightMode ? '#F8FAFC' : '#050508';

        // Star color palettes
        const darkModeColors = [
            { r: 255, g: 255, b: 255 },  // White (primary)
            { r: 100, g: 200, b: 255 },  // Cyan/Blue
            { r: 168, g: 85, b: 247 },   // Purple
            { r: 6, g: 182, b: 212 },    // Teal/Cyan
        ];

        const lightModeColors = [
            { r: 30, g: 40, b: 60 },     // Dark blue-gray (primary)
            { r: 59, g: 130, b: 246 },   // Blue
            { r: 139, g: 92, b: 246 },   // Purple
            { r: 14, g: 165, b: 233 },   // Sky blue
            { r: 79, g: 70, b: 229 },    // Indigo
        ];

        const colorPalette = isLightMode ? lightModeColors : darkModeColors;

        // Update canvas background
        canvas.style.background = bgColor;

        function resize() {
            // Full viewport size
            currentCanvas.width = window.innerWidth;
            currentCanvas.height = window.innerHeight;
            generateStars();
        }

        function generateStars() {
            stars = [];
            // Dense star field - approximately 180-250 stars
            const count = Math.max(180, Math.floor((currentCanvas.width * currentCanvas.height) / 5000));

            for (let i = 0; i < count; i++) {
                // 60% normal stars, 40% accent colored stars
                const isAccent = Math.random() < 0.4;
                const colorIndex = isAccent
                    ? Math.floor(Math.random() * (colorPalette.length - 1)) + 1
                    : 0;

                stars.push({
                    x: Math.random() * currentCanvas.width,
                    y: Math.random() * currentCanvas.height,
                    size: Math.random() * 2.5 + 0.5,
                    opacity: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.03 + 0.008,
                    phase: Math.random() * Math.PI * 2,
                    color: colorPalette[colorIndex],
                    type: isAccent ? 'accent' : 'normal'
                });
            }
        }

        function draw() {
            if (paused) return;

            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            stars.forEach(star => {
                // Enhanced twinkle effect with fade in/out
                const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);

                // Accent stars have more dramatic fading
                const fadeMultiplier = star.type === 'accent' ? 0.6 : 0.4;
                const currentOpacity = star.opacity * (0.5 + twinkle * fadeMultiplier);

                // Draw star with glow effect for accent stars
                if (star.type === 'accent' && currentOpacity > 0.4) {
                    // Subtle glow
                    const gradient = ctx!.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 3
                    );
                    gradient.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentOpacity * 0.4})`);
                    gradient.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);

                    ctx!.beginPath();
                    ctx!.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
                    ctx!.fillStyle = gradient;
                    ctx!.fill();
                }

                // Draw the star core
                ctx!.beginPath();
                ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx!.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentOpacity})`;
                ctx!.fill();
            });

            time++;
            animationId = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();

        if (!paused) {
            draw();
        }

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [paused, effectiveTheme]);

    // Theme-aware background color
    const bgColor = effectiveTheme === 'light' ? '#F8FAFC' : '#050508';

    return (
        <canvas
            ref={canvasRef}
            id="global-star-field"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                background: bgColor,
                transition: 'background 0.5s ease'
            }}
        />
    );
}
