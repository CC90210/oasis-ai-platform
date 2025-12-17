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
        const MAX_SEGMENTS = 8; // Increased from 6
        const SPAWN_ZONES = [
            { x: 0.1, y: 0.2 },
            { x: 0.9, y: 0.2 },
            { x: 0.1, y: 0.8 },
            { x: 0.9, y: 0.8 },
            { x: 0.5, y: 0.5 }, // Center spawn
        ];

        function resize() {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        }

        function createSegment(zoneIndex?: number, parentX?: number, parentY?: number): DNASegment {
            const zone = zoneIndex !== undefined
                ? SPAWN_ZONES[zoneIndex % SPAWN_ZONES.length]
                : SPAWN_ZONES[Math.floor(Math.random() * SPAWN_ZONES.length)];

            // If parent provided (breaking off), spawn nearby, otherwise use zone
            const baseX = parentX ?? (zone.x * canvas!.width);
            const baseY = parentY ?? (zone.y * canvas!.height);

            const x = baseX + (Math.random() - 0.5) * 200;
            const y = baseY + (Math.random() - 0.5) * 200;

            const angle = Math.random() * Math.PI * 2;
            const speed = 0.1 + Math.random() * 0.15; // Slower, heavier movement

            return {
                id: nextId++,
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.003, // Very slow rotation
                points: 8 + Math.floor(Math.random() * 5),  // Longer segments
                amplitude: 35 + Math.random() * 20, // Wider amplitude
                phase: Math.random() * Math.PI * 2,
                opacity: 0,
                // BIGGER SCALE: 1.2 to 2.2
                scale: 1.2 + Math.random() * 1.0,
                glowStrength: 0.5 + Math.random() * 0.5
            };
        }

        function initSegments() {
            segments = [];
            for (let i = 0; i < 5; i++) {
                segments.push(createSegment(i));
            }
        }

        function updateSegments() {
            // Spawn new segments if needed
            if (segments.length < MAX_SEGMENTS && Math.random() < 0.008) {
                // Occasional "break off" from random existing segment
                if (segments.length > 0 && Math.random() < 0.3) {
                    const parent = segments[Math.floor(Math.random() * segments.length)];
                    segments.push(createSegment(undefined, parent.x, parent.y));
                } else {
                    segments.push(createSegment());
                }
            }

            for (let i = segments.length - 1; i >= 0; i--) {
                const seg = segments[i];

                // Fade in
                if (seg.opacity < 0.8) {
                    seg.opacity += 0.005;
                }

                // Move
                seg.x += seg.vx;
                seg.y += seg.vy;
                seg.rotation += seg.rotationSpeed;
                seg.phase += 0.02; // Slower DNA spin

                // Living organism movement: Perlin-ish noise
                seg.vx += Math.sin(time * 0.01 + seg.id) * 0.002;
                seg.vy += Math.cos(time * 0.01 + seg.id) * 0.002;

                // Repulsion
                for (const other of segments) {
                    if (other.id === seg.id) continue;
                    const dx = other.x - seg.x;
                    const dy = other.y - seg.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 300 * ((seg.scale + other.scale) / 2); // Scale-aware repulsion

                    if (dist < minDist && dist > 0) {
                        const force = (minDist - dist) / minDist * 0.01;
                        seg.vx -= (dx / dist) * force;
                        seg.vy -= (dy / dist) * force;
                    }
                }

                // Soft boundary
                const margin = 200;
                if (seg.x < margin) seg.vx += 0.01;
                if (seg.x > canvas!.width - margin) seg.vx -= 0.01;
                if (seg.y < margin) seg.vy += 0.01;
                if (seg.y > canvas!.height - margin) seg.vy -= 0.01;

                // Remove if way off screen (rare due to boundary logic, but safety net)
                if (seg.x < -500 || seg.x > canvas!.width + 500 ||
                    seg.y < -500 || seg.y > canvas!.height + 500) {
                    segments.splice(i, 1);
                }
            }
        }

        function drawSegment(seg: DNASegment) {
            ctx!.save();
            ctx!.translate(seg.x, seg.y);
            ctx!.rotate(seg.rotation);
            ctx!.scale(seg.scale, seg.scale);

            // AURA: Large radial gradient
            const auraSize = 300;
            const aura = ctx!.createRadialGradient(0, 0, 0, 0, 0, auraSize);
            aura.addColorStop(0, `rgba(0, 212, 255, ${seg.opacity * 0.05 * seg.glowStrength})`);
            aura.addColorStop(0.5, `rgba(0, 212, 255, ${seg.opacity * 0.02})`);
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx!.fillStyle = aura;
            ctx!.fillRect(-auraSize, -auraSize, auraSize * 2, auraSize * 2);

            const spacing = 22;
            const startY = -(seg.points * spacing) / 2;

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

            // Rungs
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.2})`;
            ctx!.lineWidth = 2; // Thicker rungs
            for (let i = 0; i < seg.points; i++) {
                ctx!.moveTo(strand1[i].x, strand1[i].y);
                ctx!.lineTo(strand2[i].x, strand2[i].y);
            }
            ctx!.stroke();

            // Strands
            const drawStrandLine = (points: typeof strand1) => {
                // Heavy Glow
                ctx!.shadowBlur = 15;
                ctx!.shadowColor = "rgba(0, 150, 255, 0.5)";
                ctx!.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.4})`;
                ctx!.lineWidth = 5;
                ctx!.beginPath();
                points.forEach((p, i) => i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y));
                ctx!.stroke();

                // Reset shadow for core
                ctx!.shadowBlur = 0;
                ctx!.strokeStyle = `rgba(200, 240, 255, ${seg.opacity * 0.8})`;
                ctx!.lineWidth = 2;
                ctx!.beginPath();
                points.forEach((p, i) => i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y));
                ctx!.stroke();
            };

            drawStrandLine(strand1);
            drawStrandLine(strand2);

            // Dots
            const drawDots = (points: typeof strand1) => {
                points.forEach(p => {
                    const size = 3 + p.depth * 4; // Bigger dots
                    const dotOpacity = seg.opacity * (0.5 + p.depth * 0.5);

                    // Glow
                    const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2); // Larger glow radius
                    gradient.addColorStop(0, `rgba(0, 255, 255, ${dotOpacity})`);
                    gradient.addColorStop(0.5, `rgba(0, 200, 255, ${dotOpacity * 0.4})`);
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    ctx!.beginPath();
                    ctx!.arc(p.x, p.y, size * 2, 0, Math.PI * 2);
                    ctx!.fillStyle = gradient;
                    ctx!.fill();
                });
            };

            drawDots(strand1);
            drawDots(strand2);

            ctx!.restore();
        }

        // Draw connections between segments (Neural Ecosystem)
        function drawNetwork() {
            ctx!.globalCompositeOperation = 'screen'; // Additive blending for glow
            for (let i = 0; i < segments.length; i++) {
                for (let j = i + 1; j < segments.length; j++) {
                    const a = segments[i];
                    const b = segments[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 400) {
                        const opacity = (1 - dist / 400) * 0.15 * Math.min(a.opacity, b.opacity);
                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx!.lineWidth = 1;
                        ctx!.moveTo(a.x, a.y);
                        // Curved connection
                        const cx = (a.x + b.x) / 2 + (Math.random() - 0.5) * 20;
                        const cy = (a.y + b.y) / 2 + (Math.random() - 0.5) * 20;
                        ctx!.quadraticCurveTo(cx, cy, b.x, b.y);
                        ctx!.stroke();
                    }
                }
            }
            ctx!.globalCompositeOperation = 'source-over';
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
                position: 'fixed', // Fixed to ensure it stays in background
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 1 // Above stars (0), below content
            }}
        />
    );
}
