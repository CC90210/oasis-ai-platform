import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
}

export const FloatingParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const particleCount = window.innerWidth < 768 ? 20 : 40;
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 2,
                speedY: -(Math.random() * 0.5 + 0.2),
                speedX: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.4 + 0.2
            });
        }
        particlesRef.current = particles;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                // Update position
                particle.y += particle.speedY;
                particle.x += particle.speedX;

                // Reset if out of bounds
                if (particle.y < -10) {
                    particle.y = canvas.height + 10;
                    particle.x = Math.random() * canvas.width;
                }
                if (particle.x < -10) particle.x = canvas.width + 10;
                if (particle.x > canvas.width + 10) particle.x = -10;

                // Draw particle with glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, `rgba(0, 212, 255, ${particle.opacity})`);
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1, opacity: 0.6 }}
        />
    );
};
