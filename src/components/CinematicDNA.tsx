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
        const MAX_SEGMENTS = 10;
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
            const zone = zoneIndex !== undefined
                ? SPAWN_ZONES[zoneIndex % SPAWN_ZONES.length]
                : SPAWN_ZONES[Math.floor(Math.random() * SPAWN_ZONES.length)];

            const baseX = parentX ?? (zone.x * canvas!.width);
            const baseY = parentY ?? (zone.y * canvas!.height);

            // If parent provided, spawn VERY close (mitosis look)
            const spread = parentX ? 50 : 200;
            const x = baseX + (Math.random() - 0.5) * spread;
            const y = baseY + (Math.random() - 0.5) * spread;

            const angle = Math.random() * Math.PI * 2;
            const speed = 0.15 + Math.random() * 0.1;

            return {
                id: nextId++,
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.002,
                points: 8 + Math.floor(Math.random() * 4),
                amplitude: 30 + Math.random() * 15,
                phase: Math.random() * Math.PI * 2,
                opacity: 0,
                scale: 1.0 + Math.random() * 0.8, // Slightly reduced max scale
                glowStrength: 0.4 + Math.random() * 0.4, // Reduced glow baseline
                connectedTo: []
            };
        }

        function initSegments() {
            segments = [];
            for (let i = 0; i < 5; i++) {
                segments.push(createSegment(i));
            }
        }

        function updateSegments() {
            // Mitosis / Spawning
            if (segments.length < MAX_SEGMENTS && Math.random() < 0.005) {
                // Break off from existing
                if (segments.length > 0 && Math.random() < 0.6) {
                    const parent = segments[Math.floor(Math.random() * segments.length)];
                    const child = createSegment(undefined, parent.x, parent.y);

                    // Push parent and child apart violently
                    const angle = Math.atan2(child.y - parent.y, child.x - parent.x);
                    child.vx += Math.cos(angle) * 0.5;
                    child.vy += Math.sin(angle) * 0.5;
                    parent.vx -= Math.cos(angle) * 0.5;
                    parent.vy -= Math.sin(angle) * 0.5;

                    segments.push(child);
                } else {
                    segments.push(createSegment());
                }
            }

            for (let i = segments.length - 1; i >= 0; i--) {
                const seg = segments[i];

                // Fade in
                if (seg.opacity < 0.7) { // Capped max opacity for "less overwhelming"
                    seg.opacity += 0.005;
                }

                // Move
                seg.x += seg.vx;
                seg.y += seg.vy;
                seg.rotation += seg.rotationSpeed;
                seg.phase += 0.02;

                // Organic drift
                seg.vx += Math.sin(time * 0.005 + seg.id) * 0.001;
                seg.vy += Math.cos(time * 0.005 + seg.id) * 0.001;

                // Friction
                seg.vx *= 0.99;
                seg.vy *= 0.99;

                // Keep near center force (gentle)
                const dxCenter = canvas!.width / 2 - seg.x;
                const dyCenter = canvas!.height / 2 - seg.y;
                seg.vx += dxCenter * 0.00001;
                seg.vy += dyCenter * 0.00001;

                // Repulsion
                for (const other of segments) {
                    if (other.id === seg.id) continue;
                    const dx = other.x - seg.x;
                    const dy = other.y - seg.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = 250 * ((seg.scale + other.scale) / 2);

                    if (dist < minDist && dist > 0) {
                        const force = (minDist - dist) / minDist * 0.01;
                        seg.vx -= (dx / dist) * force;
                        seg.vy -= (dy / dist) * force;
                    }
                }

                // Bounds
                const margin = 100;
                if (seg.x < margin) seg.vx += 0.02;
                if (seg.x > canvas!.width - margin) seg.vx -= 0.02;
                if (seg.y < margin) seg.vy += 0.02;
                if (seg.y > canvas!.height - margin) seg.vy -= 0.02;
            }
        }

        function drawSegment(seg: DNASegment) {
            ctx!.save();
            ctx!.translate(seg.x, seg.y);
            ctx!.rotate(seg.rotation);
            ctx!.scale(seg.scale, seg.scale);

            // Subtle Aura (reduced from massive block)
            // Just a faint glow behind the structure
            const auraSize = 250;
            const aura = ctx!.createRadialGradient(0, 0, 0, 0, 0, auraSize);
            aura.addColorStop(0, `rgba(0, 150, 200, ${seg.opacity * 0.05})`); // Much subtler
            aura.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx!.fillStyle = aura;
            ctx!.fillRect(-auraSize, -auraSize, auraSize * 2, auraSize * 2);

            const spacing = 18; // Tighter spacing
            const startY = -(seg.points * spacing) / 2;

            const strand1: { x: number, y: number, depth: number }[] = [];
            const strand2: { x: number, y: number, depth: number }[] = [];

            for (let i = 0; i < seg.points; i++) {
                const y = startY + i * spacing;
                const p = seg.phase + i * 0.5; // Tighter twists
                const depth1 = (Math.sin(p) + 1) / 2;
                const depth2 = (Math.sin(p + Math.PI) + 1) / 2;

                strand1.push({ x: Math.sin(p) * seg.amplitude, y, depth: depth1 });
                strand2.push({ x: Math.sin(p + Math.PI) * seg.amplitude, y, depth: depth2 });
            }

            // Rungs (Thinner, sharper)
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.15})`;
            ctx!.lineWidth = 1;
            for (let i = 0; i < seg.points; i++) {
                ctx!.moveTo(strand1[i].x, strand1[i].y);
                ctx!.lineTo(strand2[i].x, strand2[i].y);
            }
            ctx!.stroke();

            // Defined Strands
            const drawStrandLine = (points: typeof strand1) => {
                // Subtle Glow
                ctx!.shadowBlur = 10;
                ctx!.shadowColor = "rgba(0, 180, 255, 0.4)";
                ctx!.strokeStyle = `rgba(100, 230, 255, ${seg.opacity * 0.4})`;
                ctx!.lineWidth = 2; // Thinner lines for definition
                ctx!.beginPath();
                points.forEach((p, i) => i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y));
                ctx!.stroke();

                // Core (Sharp)
                ctx!.shadowBlur = 0;
                ctx!.strokeStyle = `rgba(200, 250, 255, ${seg.opacity * 0.8})`;
                ctx!.lineWidth = 1;
                ctx!.beginPath();
                points.forEach((p, i) => i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y));
                ctx!.stroke();
            };

            drawStrandLine(strand1);
            drawStrandLine(strand2);

            // Particles (Defined, incomplete circles)
            const drawParticles = (points: typeof strand1) => {
                points.forEach(p => {
                    const size = 2 + p.depth * 2;
                    const dotOpacity = seg.opacity * (0.4 + p.depth * 0.6);

                    // Crisp Dot
                    ctx!.beginPath();
                    ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
                    ctx!.fillStyle = `rgba(200, 255, 255, ${dotOpacity})`;
                    ctx!.fill();

                    // Small "Orbital" dots for detail
                    if (Math.random() < 0.2) {
                        ctx!.beginPath();
                        ctx!.arc(p.x + 5, p.y - 5, 1, 0, Math.PI * 2);
                        ctx!.fillStyle = `rgba(0, 212, 255, ${dotOpacity * 0.5})`;
                        ctx!.fill();
                    }
                });
            };

            drawParticles(strand1);
            drawParticles(strand2);

            ctx!.restore();
        }

        // Network Connections - Long range reconnection
        function drawNetwork() {
            // No screen blend mode to avoid over-exposure
            ctx!.globalCompositeOperation = 'source-over';

            for (let i = 0; i < segments.length; i++) {
                // Find nearest neighbor
                let nearest = -1;
                let minDist = 1000;

                for (let j = i + 1; j < segments.length; j++) {
                    const a = segments[i];
                    const b = segments[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 600) { // Very long range
                        const opacity = (1 - dist / 600) * 0.15 * Math.min(a.opacity, b.opacity);

                        ctx!.beginPath();
                        ctx!.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx!.lineWidth = 0.5; // Very thin crisp lines
                        ctx!.moveTo(a.x, a.y);

                        // Taut connections (less curve) imply tension/snapping
                        ctx!.lineTo(b.x, b.y);
                        ctx!.stroke();

                        // Data packet
                        if (Date.now() % 2000 < 50) {
                            ctx!.beginPath();
                            const mx = (a.x + b.x) / 2;
                            const my = (a.y + b.y) / 2;
                            ctx!.arc(mx, my, 2, 0, Math.PI * 2);
                            ctx!.fillStyle = `rgba(255, 255, 255, ${opacity * 3})`;
                            ctx!.fill();
                        }
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
