import { useEffect, useRef } from 'react';

interface DNASegment {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotationSpeed: number;
    points: number;
    amplitude: number;
    phase: number;
    opacity: number;
    scale: number;
    glowStrength: number;
    targetX?: number; // For reconnecting
    targetY?: number;
    connectedTo?: number[]; // IDs of connected segments
}

export default function CinematicDNA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let segments: DNASegment[] = [];
        let animationId: number;
        let time = 0;
        let nextId = 0;

        // Configuration
        const MAX_SEGMENTS = 5; // Reduced for cleaner look
        const SPAWN_ZONES = [
            { x: 0.2, y: 0.2 }, { x: 0.8, y: 0.2 },
            { x: 0.2, y: 0.8 }, { x: 0.8, y: 0.8 },
            { x: 0.5, y: 0.5 }
        ];

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }

        function createSegment(zoneIndex?: number, parentX?: number, parentY?: number): DNASegment {
            // Spawn mainly near edges if no parent
            const edge = Math.random() > 0.5 ? 'width' : 'height';
            const baseX = edge === 'width' ? (Math.random() * canvas!.width) : (Math.random() > 0.5 ? 100 : canvas!.width - 100);
            const baseY = edge === 'height' ? (Math.random() * canvas!.height) : (Math.random() > 0.5 ? 100 : canvas!.height - 100);

            // If parent provided/breakoff, nice spacing
            const x = parentX ? parentX + (Math.random() - 0.5) * 100 : baseX;
            const y = parentY ? parentY + (Math.random() - 0.5) * 100 : baseY;

            const angle = Math.random() * Math.PI * 2;
            const speed = 0.05 + Math.random() * 0.05; // Very slow, majestic

            return {
                id: nextId++,
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.001, // Barely rotating
                points: 10 + Math.floor(Math.random() * 6), // Longer elegance
                amplitude: 25 + Math.random() * 10, // Tighter amplitude
                phase: Math.random() * Math.PI * 2,
                opacity: 0,
                // MORE UNIFORM SCALE: 1.8 to 2.4
                scale: 1.8 + Math.random() * 0.6,
                glowStrength: 0.5 + Math.random() * 0.3, // Subtle glow
                connectedTo: []
            };
        }

        function initSegments() {
            segments = [];
            for (let i = 0; i < 4; i++) {
                segments.push(createSegment(i));
            }
        }

        function updateSegments() {
            // Very rare spawning
            if (segments.length < MAX_SEGMENTS && Math.random() < 0.002) {
                segments.push(createSegment());
            }

            for (let i = segments.length - 1; i >= 0; i--) {
                const seg = segments[i];

                // Fade in
                if (seg.opacity < 0.7) {
                    seg.opacity += 0.005;
                }

                // Move
                seg.x += seg.vx;
                seg.y += seg.vy;
                seg.rotation += seg.rotationSpeed;
                seg.phase += 0.01;

                // CENTER AVOIDANCE (Critical for "UI that converts")
                // Push DNA away from the center where text usually is
                const centerX = canvas!.width / 2;
                const centerY = canvas!.height / 2;
                const dxC = seg.x - centerX;
                const dyC = seg.y - centerY;
                const distC = Math.sqrt(dxC * dxC + dyC * dyC);

                // If too close to center, push out gently
                if (distC < 400) {
                    seg.vx += (dxC / distC) * 0.05;
                    seg.vy += (dyC / distC) * 0.05;
                }

                // Friction
                seg.vx *= 0.98; // High air resistance
                seg.vy *= 0.98;

                // REPULSION (Anti-clumping)
                for (const other of segments) {
                    if (other.id === seg.id) continue;
                    const dx = other.x - seg.x;
                    const dy = other.y - seg.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    // Massive exclusion zone
                    const minDist = 500;

                    if (dist < minDist && dist > 0) {
                        const force = (minDist - dist) / minDist * 0.04; // Strong force
                        seg.vx -= (dx / dist) * force;
                        seg.vy -= (dy / dist) * force;
                    }
                }

                // Screen Bounds - gentle bounce
                const margin = 150;
                if (seg.x < margin) seg.vx += 0.01;
                if (seg.x > canvas!.width - margin) seg.vx -= 0.01;
                if (seg.y < margin) seg.vy += 0.01;
                if (seg.y > canvas!.height - margin) seg.vy -= 0.01;
            }
        }

        function drawSegment(seg: DNASegment) {
            ctx!.save();
            ctx!.translate(seg.x, seg.y);
            ctx!.rotate(seg.rotation);
            ctx!.scale(seg.scale, seg.scale);

            // AURA
            const auraSize = 300;
            const aura = ctx!.createRadialGradient(0, 0, 0, 0, 0, auraSize);
            aura.addColorStop(0, `rgba(0, 150, 255, ${seg.opacity * 0.08 * seg.glowStrength})`);
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx!.fillStyle = aura;
            ctx!.fillRect(-auraSize, -auraSize, auraSize * 2, auraSize * 2);

            const spacing = 16;
            const startY = -(seg.points * spacing) / 2;

            const strand1: { x: number, y: number, depth: number }[] = [];
            const strand2: { x: number, y: number, depth: number }[] = [];

            for (let i = 0; i < seg.points; i++) {
                const y = startY + i * spacing;
                const p = seg.phase + i * 0.5;
                const depth1 = (Math.sin(p) + 1) / 2;
                const depth2 = (Math.sin(p + Math.PI) + 1) / 2;

                strand1.push({ x: Math.sin(p) * seg.amplitude, y, depth: depth1 });
                strand2.push({ x: Math.sin(p + Math.PI) * seg.amplitude, y, depth: depth2 });
            }

            // Rungs - cleaner
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0, 200, 255, ${seg.opacity * 0.1})`;
            ctx!.lineWidth = 1;
            for (let i = 0; i < seg.points; i++) {
                ctx!.moveTo(strand1[i].x, strand1[i].y);
                ctx!.lineTo(strand2[i].x, strand2[i].y);
            }
            ctx!.stroke();

            // Outline - "Tech/Bio" look
            const drawStrandLine = (points: typeof strand1) => {
                ctx!.shadowBlur = 0; // No blur for cleaner look
                ctx!.strokeStyle = `rgba(180, 240, 255, ${seg.opacity * 0.5})`;
                ctx!.lineWidth = 0.5;
                ctx!.beginPath();
                points.forEach((p, i) => i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y));
                ctx!.stroke();
            };

            drawStrandLine(strand1);
            drawStrandLine(strand2);

            // Particles
            const drawParticles = (points: typeof strand1) => {
                points.forEach(p => {
                    const size = 1.5 + p.depth * 2; // Smaller, sharper
                    const dotOpacity = seg.opacity * (0.6 + p.depth * 0.4);

                    ctx!.beginPath();
                    ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx!.fillStyle = `rgba(220, 255, 255, ${dotOpacity})`;
                    ctx!.fill();
                });
            };

            drawParticles(strand1);
            drawParticles(strand2);

            ctx!.restore();
        }

        // Long distance connections
        function drawNetwork() {
            ctx!.globalCompositeOperation = 'source-over';

            for (let i = 0; i < segments.length; i++) {
                for (let j = i + 1; j < segments.length; j++) {
                    const a = segments[i];
                    const b = segments[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 800) { // Very long range for "Ecosystem" feel
                        const opacity = (1 - dist / 800) * 0.1 * Math.min(a.opacity, b.opacity);

                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx!.lineWidth = 0.5;
                        ctx!.moveTo(a.x, a.y);
                        // Straight lines = modern/tech
                        ctx!.lineTo(b.x, b.y);
                        ctx!.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

            updateSegments();
            drawNetwork();
            segments.forEach(seg => drawSegment(seg));

            time++;
            animationId = requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        initSegments();
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
                zIndex: 1
            }}
        />
    );
}
