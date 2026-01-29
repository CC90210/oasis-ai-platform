import React, { useEffect, useRef, memo } from 'react';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    type: 'white' | 'purple' | 'cyan';
    delay: number;
    duration: number;
}

function StarryBackgroundComponent() {
    const containerRef = useRef<HTMLDivElement>(null);
    const starsGeneratedRef = useRef(false);

    useEffect(() => {
        if (!containerRef.current || starsGeneratedRef.current) return;

        const container = containerRef.current;
        starsGeneratedRef.current = true;

        const starCount = 80; // Slightly fewer for performance
        const stars: Star[] = [];

        for (let i = 0; i < starCount; i++) {
            const typeRand = Math.random();
            let type: 'white' | 'purple' | 'cyan' = 'white';
            if (typeRand > 0.7) type = 'purple';
            else if (typeRand > 0.5) type = 'cyan';

            stars.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 0.5,
                type,
                delay: Math.random() * 3,
                duration: Math.random() * 2 + 2,
            });
        }

        stars.forEach(star => {
            const el = document.createElement('div');
            el.className = `star star-${star.type}`;
            el.style.cssText = `
        left: ${star.x}%;
        top: ${star.y}%;
        width: ${star.size}px;
        height: ${star.size}px;
        animation-delay: ${star.delay}s;
        animation-duration: ${star.duration}s;
      `;
            container.appendChild(el);
        });

        return () => {
            // Cleanup on unmount
            if (container) {
                container.innerHTML = '';
                starsGeneratedRef.current = false;
            }
        };
    }, []);

    return <div ref={containerRef} className="stars-container" aria-hidden="true" />;
}

// Memoize to prevent unnecessary re-renders
const StarryBackground = memo(StarryBackgroundComponent);
StarryBackground.displayName = 'StarryBackground';

export default StarryBackground;
