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
        const MAX_SEGMENTS = 6;
        const SPAWN_ZONES = [
            { x: 0.1, y: 0.2 },   // Top left
            { x: 0.9, y: 0.2 },   // Top right
            { x: 0.1, y: 0.8 },   // Bottom left
            { x: 0.9, y: 0.8 },   // Bottom right
            { x: 0.5, y: 0.1 },   // Top center
            { x: 0.5, y: 0.9 },   // Bottom center
        ];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createSegment(zoneIndex?: number): DNASegment {
            const zone = zoneIndex !== undefined
                ? SPAWN_ZONES[zoneIndex % SPAWN_ZONES.length]
                : SPAWN_ZONES[Math.floor(Math.random() * SPAWN_ZONES.length)];

            // Add randomness to spawn position
            const x = zone.x * canvas.width + (Math.random() - 0.5) * 100;
            const y = zone.y * canvas.height + (Math.random() - 0.5) * 100;

            // Velocity toward center with randomness
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const angle = Math.atan2(centerY - y, centerX - x);
            const speed = 0.2 + Math.random() * 0.1;

            return {
                id: nextId++,
                x,
                y,
                vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.1,
                vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.1,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.005,
                points: 6 + Math.floor(Math.random() * 4),  // 6-9 points
                amplitude: 25 + Math.random() * 15,
                phase: Math.random() * Math.PI * 2,
                opacity: 0,  // Fade in
                scale: 0.8 + Math.random() * 0.4
            };
        }

        function initSegments() {
            segments = [];
            // Start with segments in different zones
            for (let i = 0; i < 4; i++) {
                segments.push(createSegment(i));
            }
        }

        function updateSegments() {
            // Spawn new segments if needed
            if (segments.length < MAX_SEGMENTS && Math.random() < 0.005) {
                segments.push(createSegment());
            }

            for (let i = segments.length - 1; i >= 0; i--) {
                const seg = segments[i];

                // Fade in
                if (seg.opacity < 0.6) {
                    seg.opacity += 0.008;
                }

                // Move
                seg.x += seg.vx;
                seg.y += seg.vy;
                seg.rotation += seg.rotationSpeed;
                seg.phase += 0.015;

                // Gentle drift - slight random acceleration
                seg.vx += (Math.random() - 0.5) * 0.01;
                seg.vy += (Math.random() - 0.5) * 0.01;

                // Speed limit
                const speed = Math.sqrt(seg.vx * seg.vx + seg.vy * seg.vy);
                if (speed > 0.5) {
                    seg.vx *= 0.95;
                    seg.vy *= 0.95;
                }

                // Soft boundary - push back from edges
                const margin = 150;
                if (seg.x < margin) seg.vx += 0.02;
                if (seg.x > canvas.width - margin) seg.vx -= 0.02;
                if (seg.y < margin) seg.vy += 0.02;
                if (seg.y > canvas.height - margin) seg.vy -= 0.02;

                // REPULSION from other segments (prevents clumping)
                for (const other of segments) {
                    if (other.id === seg.id) continue;

                    const dx = other.x - seg.x;
                    const dy = other.y - seg.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // If too close, push apart
                    if (dist < 200 && dist > 0) {
                        const force = (200 - dist) / 200 * 0.02;
                        seg.vx -= (dx / dist) * force;
                        seg.vy -= (dy / dist) * force;
                    }
                }

                // Remove if way off screen
                if (seg.x < -300 || seg.x > canvas.width + 300 ||
                    seg.y < -300 || seg.y > canvas.height + 300) {
                    segments.splice(i, 1);
                }
            }
        }

        function drawSegment(seg: DNASegment) {
            ctx.save();
            ctx.translate(seg.x, seg.y);
            ctx.rotate(seg.rotation);
            ctx.scale(seg.scale, seg.scale);

            const spacing = 20;
            const startY = -(seg.points * spacing) / 2;

            // Calculate all points
            const strand1: { x: number, y: number, depth: number }[] = [];
            const strand2: { x: number, y: number, depth: number }[] = [];

            for (let i = 0; i < seg.points; i++) {
                const y = startY + i * spacing;
                const p = seg.phase + i * 0.4;
                const depth1 = (Math.sin(p) + 1) / 2;
                const depth2 = (Math.sin(p + Math.PI) + 1) / 2;

                strand1.push({ x: Math.sin(p) * seg.amplitude, y, depth: depth1 });
                strand2.push({ x: Math.sin(p + Math.PI) * seg.amplitude, y, depth: depth2 });
            }

            // Draw horizontal rungs
            ctx.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.25})`;
            ctx.lineWidth = 1;

            for (let i = 0; i < seg.points; i++) {
                ctx.beginPath();
                ctx.moveTo(strand1[i].x, strand1[i].y);
                ctx.lineTo(strand2[i].x, strand2[i].y);
                ctx.stroke();
            }

            // Draw strand lines with glow
            const drawStrandLine = (points: typeof strand1) => {
                // Glow layer
                ctx.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.2})`;
                ctx.lineWidth = 4;
                ctx.beginPath();
                points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                ctx.stroke();

                // Core line
                ctx.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.6})`;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                ctx.stroke();
            };

            drawStrandLine(strand1);
            drawStrandLine(strand2);

            // Draw dots with depth-based sizing
            const drawDots = (points: typeof strand1) => {
                points.forEach(p => {
                    const size = 2.5 + p.depth * 3;
                    const dotOpacity = seg.opacity * (0.4 + p.depth * 0.6);

                    // Glow
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
                    gradient.addColorStop(0, `rgba(0, 212, 255, ${dotOpacity})`);
                    gradient.addColorStop(0.5, `rgba(0, 212, 255, ${dotOpacity * 0.3})`);
                    gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 2.5, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();

                    // Core dot
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 212, 255, ${dotOpacity})`;
                    ctx.fill();

                    // Bright center
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, size * 0.3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity * 0.8})`;
                    ctx.fill();
                });
            };

            drawDots(strand1);
            drawDots(strand2);

            ctx.restore();
        }

        // Draw connection lines between nearby segments
        function drawConnections() {
            for (let i = 0; i < segments.length; i++) {
                for (let j = i + 1; j < segments.length; j++) {
                    const a = segments[i];
                    const b = segments[j];

                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Draw faint connection line if within range
                    if (dist < 350 && dist > 100) {
                        const opacity = (1 - dist / 350) * 0.15 * Math.min(a.opacity, b.opacity);

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.setLineDash([5, 10]);
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            updateSegments();
            drawConnections();

            // Draw segments
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}
        />
    );
}
