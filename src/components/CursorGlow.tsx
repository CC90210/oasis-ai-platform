import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const glow = glowRef.current;
        if (!glow) return;

        let mouseX = -100;
        let mouseY = -100;
        let currentX = -100;
        let currentY = -100;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Fade in on first movement
            if (glow.style.opacity === '0') {
                glow.style.opacity = '1';
            }
        };

        const handleMouseLeave = () => {
            if (glow) glow.style.opacity = '0';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Animation loop for smooth following (lerp)
        let rafId: number;
        const animate = () => {
            // Linear interpolation for smooth lag
            const ease = 0.15;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            if (glow) {
                // Use transform for GPU acceleration, centering the 150px div
                glow.style.transform = `translate3d(${currentX - 75}px, ${currentY - 75}px, 0)`;
            }

            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={glowRef}
            className="fixed top-0 left-0 w-[150px] h-[150px] rounded-full pointer-events-none z-10 mix-blend-screen"
            style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, rgba(0, 212, 255, 0) 70%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                willChange: 'transform'
            }}
        />
    );
};

export default CursorGlow;
