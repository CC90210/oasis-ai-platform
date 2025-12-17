import { useEffect, useRef } from 'react';

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let stars: {
            x: number;
            y: number;
            size: number;
            opacity: number;
            twinkleSpeed: number;
            twinklePhase: number;
        }[] = [];

        function resize() {
            canvas.width = window.innerWidth;
            // Use window height for fixed background, or scrollHeight if we want it to scroll (spec said "fixed" in style but logic used scrollHeight)
            // The user spec code had `height: '100%'` and `position: 'fixed'` in style, but `document.documentElement.scrollHeight` in resize logic.
            // If position is fixed, height should be window.innerHeight to avoid drawing massive canvas for long pages.
            // However, user spec explicitly used scrollHeight in resize(). 
            // AND style position fixed. This creates a massive canvas fixed to the window? 
            // If position is fixed, the canvas stays with the viewport. A height > viewport height is wasteful/wrong if it doesnt scroll.
            // If the intent is a fixed background that stays while content scrolls:
            canvas.height = window.innerHeight;
            generateStars();
        }

        function generateStars() {
            stars = [];

            // DENSE star field - approx 1 per 5000px
            const area = canvas.width * canvas.height;
            const count = Math.floor(area / 5000);

            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.6 + 0.2,
                    twinkleSpeed: Math.random() * 0.015 + 0.005,
                    twinklePhase: Math.random() * Math.PI * 2
                });
            }
        }

        let time = 0;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
                const opacity = star.opacity * (0.6 + twinkle * 0.4);

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.fill();

                // Add subtle glow to brighter stars
                if (star.size > 1.5 && opacity > 0.5) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                    ctx.fill();
                }
            });

            time++;
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0
            }}
        />
    );
}
