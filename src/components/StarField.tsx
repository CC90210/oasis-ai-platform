import { useEffect, useRef } from 'react';

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        }

        let stars: Star[] = [];
        let animationId: number;
        let time = 0;

        function resize() {
            // Full viewport size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            generateStars();
        }

        function generateStars() {
            stars = [];
            // Dense star field - approximately 150-200 stars
            const count = Math.max(150, Math.floor((canvas.width * canvas.height) / 6000));

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.7 + 0.3,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    phase: Math.random() * Math.PI * 2
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                // Twinkle effect
                const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
                const currentOpacity = star.opacity * (0.5 + twinkle * 0.5);

                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
                ctx.fill();
            });

            time++;
            animationId = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

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
                background: '#050508'  // Dark background color
            }}
        />
    );
}
