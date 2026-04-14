import { useEffect, useRef } from 'react';

/**
 * CursorGlow — GPU-accelerated cursor follower.
 * - No React re-renders (uses ref, not state)
 * - transform: translate3d (GPU compositing, no layout thrash)
 * - requestAnimationFrame throttle for 60fps native
 * - Instant tracking — no CSS transition lag
 */
export default function CursorGlow() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 1024) return;

        let x = 0;
        let y = 0;
        let rafId: number | null = null;

        const update = () => {
            if (ref.current) {
                ref.current.style.transform = `translate3d(${x - 60}px, ${y - 60}px, 0)`;
            }
            rafId = null;
        };

        const handleMove = (e: MouseEvent) => {
            x = e.clientX;
            y = e.clientY;
            if (rafId === null) rafId = requestAnimationFrame(update);
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMove);
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

    return (
        <div
            ref={ref}
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.06) 40%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 9999,
                willChange: 'transform',
                transform: 'translate3d(-9999px, -9999px, 0)'
            }}
        />
    );
}
