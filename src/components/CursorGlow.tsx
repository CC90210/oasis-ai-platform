import { useEffect, useState } from 'react';

export default function CursorGlow() {
    const [position, setPosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        // Only on desktop
        if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

        const handleMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    // Hide on mobile (server-side safe check + client side)
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 9999,
                transition: 'left 0.1s ease-out, top 0.1s ease-out'
            }}
        />
    );
}
