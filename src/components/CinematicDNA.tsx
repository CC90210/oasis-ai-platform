import { useEffect, useRef } from 'react';

interface DNASegment {
    id: number;
    x: number;
    y: number;
    vx: number;  // velocity x
    vy: number;  // velocity y
    rotation: number;
    rotationSpeed: number;
    length: number;  // number of points (5-12)
    amplitude: number;
    phase: number;
    opacity: number;
    state: 'drifting' | 'attracting' | 'connected' | 'splitting';
    connectedTo: number | null;
    connectionProgress: number;
    lifetime: number;
    maxLifetime: number;
}

export default function CinematicDNA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const segmentsRef = useRef<DNASegment[]>([]);
    const timeRef = useRef(0);
    const idCounterRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;

        // Configuration
        const CONFIG = {
            maxSegments: 8,
            spawnInterval: 3000,  // New segment every 3 seconds
            attractionDistance: 200,
            connectionDuration: 120,  // frames
            driftSpeed: 0.3,
            minLength: 5,
            maxLength: 10,
            pointSpacing: 25
        };

        let lastSpawnTime = 0;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createSegment(x?: number, y?: number, inheritVelocity?: { vx: number, vy: number }): DNASegment {
            const id = idCounterRef.current++;
            const spawnX = x ?? (Math.random() < 0.5 ? -100 : canvas.width + 100);
            const spawnY = y ?? Math.random() * canvas.height;

            // Determine velocity - drift toward center if spawning from edge
            let vx, vy;
            if (inheritVelocity) {
                // Inherited from split - add some randomness
                vx = inheritVelocity.vx + (Math.random() - 0.5) * 0.5;
                vy = inheritVelocity.vy + (Math.random() - 0.5) * 0.5;
            } else if (spawnX < 0) {
                vx = CONFIG.driftSpeed + Math.random() * 0.2;
                vy = (Math.random() - 0.5) * 0.3;
            } else if (spawnX > canvas.width) {
                vx = -CONFIG.driftSpeed - Math.random() * 0.2;
                vy = (Math.random() - 0.5) * 0.3;
            } else {
                vx = (Math.random() - 0.5) * CONFIG.driftSpeed;
                vy = (Math.random() - 0.5) * CONFIG.driftSpeed;
            }

            return {
                id,
                x: spawnX,
                y: spawnY,
                vx,
                vy,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                length: CONFIG.minLength + Math.floor(Math.random() * (CONFIG.maxLength - CONFIG.minLength)),
                amplitude: 30 + Math.random() * 20,
                phase: Math.random() * Math.PI * 2,
                opacity: 0,  // Fade in
                state: 'drifting',
                connectedTo: null,
                connectionProgress: 0,
                lifetime: 0,
                maxLifetime: 600 + Math.random() * 400  // 10-17 seconds at 60fps
            };
        }

        function initSegments() {
            segmentsRef.current = [];
            // Start with 3-4 segments
            for (let i = 0; i < 4; i++) {
                segmentsRef.current.push(createSegment(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height
                ));
            }
        }

        function updateSegments() {
            const segments = segmentsRef.current;
            const now = performance.now();

            // Spawn new segments periodically
            if (now - lastSpawnTime > CONFIG.spawnInterval && segments.length < CONFIG.maxSegments) {
                segments.push(createSegment());
                lastSpawnTime = now;
            }

            // Update each segment
            for (let i = segments.length - 1; i >= 0; i--) {
                const seg = segments[i];

                // Fade in
                if (seg.opacity < 0.6 && seg.state !== 'splitting') {
                    seg.opacity = Math.min(0.6, seg.opacity + 0.01);
                }

                // Age
                seg.lifetime++;

                // State machine
                switch (seg.state) {
                    case 'drifting':
                        // Move
                        seg.x += seg.vx;
                        seg.y += seg.vy;
                        seg.rotation += seg.rotationSpeed;
                        seg.phase += 0.02;

                        // Check for nearby segments to attract
                        for (const other of segments) {
                            if (other.id === seg.id || other.state !== 'drifting') continue;

                            const dx = other.x - seg.x;
                            const dy = other.y - seg.y;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < CONFIG.attractionDistance && dist > 50) {
                                // Start attraction
                                seg.state = 'attracting';
                                seg.connectedTo = other.id;
                                other.state = 'attracting';
                                other.connectedTo = seg.id;
                                break;
                            }
                        }

                        // Random chance to split if old enough
                        if (seg.lifetime > 300 && Math.random() < 0.001 && segments.length < CONFIG.maxSegments) {
                            seg.state = 'splitting';
                        }
                        break;

                    case 'attracting':
                        const target = segments.find(s => s.id === seg.connectedTo);
                        if (!target) {
                            seg.state = 'drifting';
                            seg.connectedTo = null;
                            break;
                        }

                        // Move toward each other
                        const dx = target.x - seg.x;
                        const dy = target.y - seg.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        seg.x += (dx / dist) * 0.5;
                        seg.y += (dy / dist) * 0.5;
                        seg.rotation += seg.rotationSpeed;
                        seg.phase += 0.02;

                        // Check if connected
                        if (dist < 60) {
                            seg.state = 'connected';
                            seg.connectionProgress = 0;
                            if (target.state === 'attracting') {
                                target.state = 'connected';
                                target.connectionProgress = 0;
                            }
                        }
                        break;

                    case 'connected':
                        seg.phase += 0.02;
                        seg.connectionProgress++;

                        // Stay connected for a while, then break apart
                        if (seg.connectionProgress > CONFIG.connectionDuration) {
                            seg.state = 'drifting';
                            seg.connectedTo = null;
                            // Push apart
                            seg.vx = (Math.random() - 0.5) * CONFIG.driftSpeed * 2;
                            seg.vy = (Math.random() - 0.5) * CONFIG.driftSpeed * 2;
                        }
                        break;

                    case 'splitting':
                        seg.opacity -= 0.02;

                        if (seg.opacity <= 0.1) {
                            // Create two new smaller segments
                            const newSeg1 = createSegment(seg.x - 30, seg.y, { vx: -0.3, vy: seg.vy });
                            const newSeg2 = createSegment(seg.x + 30, seg.y, { vx: 0.3, vy: seg.vy });
                            newSeg1.length = Math.max(4, Math.floor(seg.length * 0.7));
                            newSeg2.length = Math.max(4, Math.floor(seg.length * 0.7));
                            newSeg1.opacity = 0.3;
                            newSeg2.opacity = 0.3;

                            segments.push(newSeg1, newSeg2);
                            segments.splice(i, 1);  // Remove original
                        }
                        break;
                }

                // Remove if out of bounds or too old
                if (seg.x < -200 || seg.x > canvas.width + 200 ||
                    seg.y < -200 || seg.y > canvas.height + 200 ||
                    seg.lifetime > seg.maxLifetime) {
                    // Fade out before removing
                    seg.opacity -= 0.02;
                    if (seg.opacity <= 0) {
                        segments.splice(i, 1);
                    }
                }
            }
        }

        function drawSegment(seg: DNASegment) {
            ctx.save();
            ctx.translate(seg.x, seg.y);
            ctx.rotate(seg.rotation);

            const points1: { x: number, y: number, depth: number }[] = [];
            const points2: { x: number, y: number, depth: number }[] = [];

            const startY = -(seg.length * CONFIG.pointSpacing) / 2;

            for (let i = 0; i < seg.length; i++) {
                const y = startY + i * CONFIG.pointSpacing;
                const p = seg.phase + i * 0.3;

                points1.push({
                    x: Math.sin(p) * seg.amplitude,
                    y,
                    depth: (Math.sin(p) + 1) / 2
                });

                points2.push({
                    x: Math.sin(p + Math.PI) * seg.amplitude,
                    y,
                    depth: (Math.sin(p + Math.PI) + 1) / 2
                });
            }

            // Draw connections
            ctx.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.3})`;
            ctx.lineWidth = 1;

            for (let i = 0; i < seg.length; i++) {
                ctx.beginPath();
                ctx.moveTo(points1[i].x, points1[i].y);
                ctx.lineTo(points2[i].x, points2[i].y);
                ctx.stroke();
            }

            // Draw strands
            const drawStrand = (points: typeof points1) => {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${seg.opacity * 0.5})`;
                ctx.lineWidth = 1.5;

                for (let i = 0; i < points.length; i++) {
                    if (i === 0) {
                        ctx.moveTo(points[i].x, points[i].y);
                    } else {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                }
                ctx.stroke();

                // Dots
                points.forEach(point => {
                    const size = 3 + point.depth * 3;
                    const dotOpacity = seg.opacity * (0.5 + point.depth * 0.5);

                    // Glow
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 212, 255, ${dotOpacity * 0.3})`;
                    ctx.fill();

                    // Core
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(0, 212, 255, ${dotOpacity})`;
                    ctx.fill();
                });
            };

            drawStrand(points1);
            drawStrand(points2);

            ctx.restore();
        }

        function drawConnectionBeam(seg1: DNASegment, seg2: DNASegment) {
            // Draw a glowing beam between connected segments
            const progress = Math.min(seg1.connectionProgress, CONFIG.connectionDuration) / CONFIG.connectionDuration;
            const opacity = Math.sin(progress * Math.PI) * 0.3;  // Fade in and out

            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.moveTo(seg1.x, seg1.y);
            ctx.lineTo(seg2.x, seg2.y);
            ctx.stroke();

            // Glow at connection point
            const midX = (seg1.x + seg2.x) / 2;
            const midY = (seg1.y + seg2.y) / 2;

            const gradient = ctx.createRadialGradient(midX, midY, 0, midX, midY, 50);
            gradient.addColorStop(0, `rgba(0, 212, 255, ${opacity})`);
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

            ctx.beginPath();
            ctx.arc(midX, midY, 50, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            updateSegments();

            const segments = segmentsRef.current;

            // Draw connection beams first (behind DNA)
            for (const seg of segments) {
                if (seg.state === 'connected' && seg.connectedTo !== null) {
                    const target = segments.find(s => s.id === seg.connectedTo);
                    if (target && seg.id < target.id) {  // Only draw once per pair
                        drawConnectionBeam(seg, target);
                    }
                }
            }

            // Draw all segments
            for (const seg of segments) {
                drawSegment(seg);
            }

            timeRef.current++;
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
                zIndex: 2
            }}
        />
    );
}
