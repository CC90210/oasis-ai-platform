import React, { useEffect, useRef } from 'react';

// ============================================
// OASIS AI - LIVING DNA HELIX ANIMATION SYSTEM
// ============================================

export default function CinematicDNA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // -- CLASSES DEFINITION INSIDE EFFECT TO AVOID EXTERNAL DEPENDENCIES --

        class Particle {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            colors: any;
            size: number;
            speedX: number;
            speedY: number;
            phase: number;
            alpha: number;
            color: any;

            constructor(x: number, y: number, colors: any) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.colors = colors;
                this.size = 1 + Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.phase = Math.random() * Math.PI * 2;
                this.alpha = 0.3 + Math.random() * 0.4;

                // Random color from palette
                const colorKeys = ['primary', 'secondary', 'accent'];
                this.color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
            }

            update(time: number, width: number, height: number) {
                this.x += this.speedX + Math.sin(time + this.phase) * 0.2;
                this.y += this.speedY + Math.cos(time + this.phase) * 0.2;

                // Wrap around screen
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const pulse = Math.sin(performance.now() * 0.003 + this.phase) * 0.3 + 0.7;

                ctx.beginPath();
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * pulse})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class FloatingStrand {
            strandIndex: number;
            fromHelix: DNAHelix;
            universe: DNAUniverse;
            isComplete: boolean;
            targetHelix: DNAHelix | null;
            progress: number;
            speed: number;
            startX: number;
            startY: number;
            x: number;
            y: number;
            controlPoints: { x: number, y: number }[];
            nodes: { t: number, offset: number, size: number }[];
            color: any;
            endX?: number;
            endY?: number;

            constructor(strandIndex: number, fromHelix: DNAHelix, universe: DNAUniverse) {
                this.strandIndex = strandIndex;
                this.fromHelix = fromHelix;
                this.universe = universe;
                this.isComplete = false;
                this.targetHelix = null;
                this.progress = 0;
                this.speed = 0.008;

                // Starting position
                this.startX = fromHelix.x;
                this.startY = fromHelix.y;
                this.x = this.startX;
                this.y = this.startY;

                // Control points for bezier curve
                this.controlPoints = this.generateControlPoints();

                // Find target helix
                this.findTarget();

                // Visual properties
                this.nodes = [];
                this.color = strandIndex === 1 ?
                    this.universe.config.colors.primary :
                    this.universe.config.colors.secondary;

                this.createNodes();
            }

            generateControlPoints() {
                const spread = 100 + Math.random() * 100;
                return [
                    { x: this.startX + (Math.random() - 0.5) * spread, y: this.startY + (Math.random() - 0.5) * spread },
                    { x: this.startX + (Math.random() - 0.5) * spread * 2, y: this.startY + (Math.random() - 0.5) * spread * 2 }
                ];
            }

            createNodes() {
                for (let i = 0; i < 10; i++) {
                    this.nodes.push({
                        t: i / 9,
                        offset: Math.random() * Math.PI * 2,
                        size: 2 + Math.random() * 2
                    });
                }
            }

            findTarget() {
                setTimeout(() => {
                    this.targetHelix = this.universe.findNearestHelix(this.x, this.y, this.fromHelix.index);
                    if (this.targetHelix) {
                        this.endX = this.targetHelix.x;
                        this.endY = this.targetHelix.y;

                        // Update control points to curve toward target
                        const midX = (this.startX + this.endX) / 2;
                        const midY = (this.startY + this.endY) / 2;
                        this.controlPoints = [
                            { x: midX + (Math.random() - 0.5) * 150, y: midY + (Math.random() - 0.5) * 150 },
                            { x: midX + (Math.random() - 0.5) * 100, y: midY + (Math.random() - 0.5) * 100 }
                        ];
                    } else {
                        // No target found, return to origin
                        this.endX = this.startX;
                        this.endY = this.startY;
                        this.targetHelix = this.fromHelix;
                    }
                }, 500 + Math.random() * 1000);
            }

            update(time: number) {
                if (this.endX === undefined || this.endY === undefined) return;

                this.progress += this.speed;

                if (this.progress >= 1) {
                    this.progress = 1;
                    this.isComplete = true;

                    // Reconnect to target helix
                    if (this.targetHelix) {
                        this.targetHelix.acceptStrand(this.strandIndex);
                    }
                }

                // Cubic bezier position
                const t = this.easeInOutCubic(this.progress);
                this.x = this.cubicBezier(t, this.startX, this.controlPoints[0].x, this.controlPoints[1].x, this.endX);
                this.y = this.cubicBezier(t, this.startY, this.controlPoints[0].y, this.controlPoints[1].y, this.endY);
            }

            easeInOutCubic(t: number) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
                const oneMinusT = 1 - t;
                return Math.pow(oneMinusT, 3) * p0 +
                    3 * Math.pow(oneMinusT, 2) * t * p1 +
                    3 * oneMinusT * Math.pow(t, 2) * p2 +
                    Math.pow(t, 3) * p3;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const time = performance.now() * 0.001;

                // Draw trail
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${0.6 * (1 - this.progress * 0.5)})`;
                ctx.lineWidth = 2;
                ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.5)`;
                ctx.shadowBlur = 10;

                // Draw curved path
                const steps = 20;
                for (let i = 0; i <= steps; i++) {
                    const t = (i / steps) * this.progress;
                    const px = this.cubicBezier(t, this.startX, this.controlPoints[0]?.x || this.startX, this.controlPoints[1]?.x || this.startX, this.endX || this.startX);
                    const py = this.cubicBezier(t, this.startY, this.controlPoints[0]?.y || this.startY, this.controlPoints[1]?.y || this.startY, this.endY || this.startY);

                    // Add wave motion
                    const wave = Math.sin(t * Math.PI * 6 + time * 3) * 10 * (1 - t);
                    const angle = Math.atan2((this.endY || 0) - this.startY, (this.endX || 0) - this.startX);
                    const perpX = wave * Math.cos(angle + Math.PI / 2);
                    const perpY = wave * Math.sin(angle + Math.PI / 2);

                    if (i === 0) ctx.moveTo(px + perpX, py + perpY);
                    else ctx.lineTo(px + perpX, py + perpY);
                }

                ctx.stroke();
                ctx.shadowBlur = 0;

                // Draw head node
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 15);
                gradient.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
                gradient.addColorStop(0.3, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class DNAHelix {
            x: number;
            y: number;
            angle: number;
            index: number;
            config: any;
            universe: DNAUniverse;
            nodes: { t: number, baseY: number, pulsePhase: number, size: number }[];
            strand1Active: boolean;
            strand2Active: boolean;
            phase: number;
            length: number;

            constructor(x: number, y: number, angle: number, index: number, config: any, universe: DNAUniverse) {
                this.x = x;
                this.y = y;
                this.angle = angle * (Math.PI / 180);
                this.index = index;
                this.config = config;
                this.universe = universe;
                this.nodes = [];
                this.strand1Active = true;
                this.strand2Active = true;
                this.phase = Math.random() * Math.PI * 2;
                this.length = 400 + Math.random() * 200;

                this.createNodes();
            }

            createNodes() {
                const nodeCount = this.config.nodesPerHelix;
                for (let i = 0; i < nodeCount; i++) {
                    const t = i / (nodeCount - 1);
                    this.nodes.push({
                        t,
                        baseY: (t - 0.5) * this.length,
                        pulsePhase: Math.random() * Math.PI * 2,
                        size: 3 + Math.random() * 2
                    });
                }
            }

            isMissingStrand() {
                return !this.strand1Active || !this.strand2Active;
            }

            acceptStrand(strandIndex: number) {
                if (strandIndex === 1) this.strand1Active = true;
                else this.strand2Active = true;
            }

            update(time: number) {
                // Random strand separation
                if (this.strand1Active && this.strand2Active) {
                    if (Math.random() < this.config.strandSeparationChance) {
                        const strandToRelease = Math.random() > 0.5 ? 1 : 2;
                        if (strandToRelease === 1) {
                            this.strand1Active = false;
                        } else {
                            this.strand2Active = false;
                        }
                        this.universe.releaseStrand(strandToRelease, this);
                    }
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                const time = performance.now() * 0.001;

                // Draw strand 1 (cyan)
                if (this.strand1Active) {
                    this.drawStrand(ctx, time, 1, this.config.colors.primary);
                }

                // Draw strand 2 (blue)
                if (this.strand2Active) {
                    this.drawStrand(ctx, time, -1, this.config.colors.secondary);
                }

                // Draw connecting rungs
                if (this.strand1Active && this.strand2Active) {
                    this.drawRungs(ctx, time);
                }

                // Draw nodes
                this.drawNodes(ctx, time);

                ctx.restore();
            }

            drawStrand(ctx: CanvasRenderingContext2D, time: number, direction: number, color: any) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
                ctx.lineWidth = 2.5;
                ctx.lineCap = 'round';
                ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
                ctx.shadowBlur = 15;

                this.nodes.forEach((node, i) => {
                    const wave = Math.sin(node.t * Math.PI * 4 + time * 2 + this.phase) * this.config.waveAmplitude;
                    const x = wave * direction;
                    const y = node.baseY;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });

                ctx.stroke();
                ctx.shadowBlur = 0;

                // Draw glow layer
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;
                ctx.lineWidth = 8;

                this.nodes.forEach((node, i) => {
                    const wave = Math.sin(node.t * Math.PI * 4 + time * 2 + this.phase) * this.config.waveAmplitude;
                    const x = wave * direction;
                    const y = node.baseY;

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                });

                ctx.stroke();
            }

            drawRungs(ctx: CanvasRenderingContext2D, time: number) {
                const rungCount = 12;
                for (let i = 0; i < rungCount; i++) {
                    const t = i / (rungCount - 1);
                    const y = (t - 0.5) * this.length;
                    const wave = Math.sin(t * Math.PI * 4 + time * 2 + this.phase) * this.config.waveAmplitude;

                    const x1 = wave;
                    const x2 = -wave;

                    // Gradient rung
                    const gradient = ctx.createLinearGradient(x1, y, x2, y);
                    gradient.addColorStop(0, `rgba(0, 212, 170, 0.6)`);
                    gradient.addColorStop(0.5, `rgba(14, 165, 233, 0.3)`);
                    gradient.addColorStop(1, `rgba(14, 165, 233, 0.6)`);

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(x1, y);
                    ctx.lineTo(x2, y);
                    ctx.stroke();
                }
            }

            drawNodes(ctx: CanvasRenderingContext2D, time: number) {
                this.nodes.forEach((node, i) => {
                    if (i % 3 !== 0) return; // Only draw every 3rd node

                    const wave = Math.sin(node.t * Math.PI * 4 + time * 2 + this.phase) * this.config.waveAmplitude;
                    const pulse = Math.sin(time * 3 + node.pulsePhase) * 0.3 + 1;

                    // Strand 1 node
                    if (this.strand1Active) {
                        this.drawNode(ctx, wave, node.baseY, node.size * pulse, this.config.colors.primary);
                    }

                    // Strand 2 node
                    if (this.strand2Active) {
                        this.drawNode(ctx, -wave, node.baseY, node.size * pulse, this.config.colors.secondary);
                    }
                });
            }

            drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: any) {
                // Outer glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
                gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(x, y, size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
                ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class DNAUniverse {
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            helixes: DNAHelix[];
            floatingStrands: FloatingStrand[];
            particles: Particle[];
            time: number;
            mouse: { x: number, y: number };
            width: number = 0;
            height: number = 0;
            animationId: number = 0;

            config = {
                helixCount: 5,
                nodesPerHelix: 20,
                helixSpacing: 300,
                rotationSpeed: 0.008,
                waveAmplitude: 40,
                waveFrequency: 0.15,
                strandSeparationChance: 0.001,
                reconnectionDistance: 200,
                particleCount: 100,
                glowIntensity: 0.8,
                colors: {
                    primary: { r: 0, g: 212, b: 170 },      // Cyan
                    secondary: { r: 14, g: 165, b: 233 },   // Blue
                    accent: { r: 168, g: 85, b: 247 },      // Purple
                    glow: { r: 0, g: 245, b: 204 }          // Bright cyan
                }
            };

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                const context = this.canvas.getContext('2d');
                if (!context) throw new Error("Could not get canvas context");
                this.ctx = context;
                this.helixes = [];
                this.floatingStrands = [];
                this.particles = [];
                this.time = 0;
                this.mouse = { x: 0, y: 0 };

                // Mobile adjustments
                if (window.innerWidth < 768) {
                    this.config.helixCount = 3;
                    this.config.particleCount = 50;
                    this.config.nodesPerHelix = 15;
                }

                this.init();
            }

            init() {
                this.resize();
                this.createHelixes();
                this.createParticles();
                this.bindEvents();
                this.animate();
            }

            resize() {
                this.width = this.canvas.width = window.innerWidth;
                this.height = this.canvas.height = window.innerHeight;
            }

            bindEvents() {
                window.addEventListener('resize', () => this.resize());
                window.addEventListener('mousemove', (e) => {
                    this.mouse.x = e.clientX;
                    this.mouse.y = e.clientY;
                });
            }

            createHelixes() {
                const positions = [
                    { x: this.width * 0.08, y: this.height * 0.5, angle: -15 },
                    { x: this.width * 0.25, y: this.height * 0.3, angle: 10 },
                    { x: this.width * 0.5, y: this.height * 0.6, angle: -5 },
                    { x: this.width * 0.75, y: this.height * 0.35, angle: 8 },
                    { x: this.width * 0.92, y: this.height * 0.55, angle: -12 }
                ];

                // If mobile/reduced
                const count = Math.min(positions.length, this.config.helixCount);

                for (let i = 0; i < count; i++) {
                    this.helixes.push(new DNAHelix(
                        positions[i].x,
                        positions[i].y,
                        positions[i].angle,
                        i,
                        this.config,
                        this
                    ));
                }
            }

            createParticles() {
                for (let i = 0; i < this.config.particleCount; i++) {
                    this.particles.push(new Particle(
                        Math.random() * this.width,
                        Math.random() * this.height,
                        this.config.colors
                    ));
                }
            }

            releaseStrand(strand: number, fromHelix: DNAHelix) {
                const floatingStrand = new FloatingStrand(strand, fromHelix, this);
                this.floatingStrands.push(floatingStrand);
            }

            findNearestHelix(x: number, y: number, excludeIndex: number) {
                let nearest = null;
                let minDist = Infinity;

                this.helixes.forEach((helix, index) => {
                    if (helix.index === excludeIndex) return;
                    if (helix.isMissingStrand()) {
                        const dist = Math.hypot(helix.x - x, helix.y - y);
                        if (dist < minDist && dist < this.config.reconnectionDistance * 5) { // Increased detection range
                            minDist = dist;
                            nearest = helix;
                        }
                    }
                });

                return nearest;
            }

            animate() {
                this.time += 0.016;
                this.ctx.clearRect(0, 0, this.width, this.height);

                // Draw background glow (can be light if CSS handles it, but let's keep it subtle)
                // this.drawBackgroundGlow(); 

                // Update and draw particles
                this.particles.forEach(p => {
                    p.update(this.time, this.width, this.height);
                    p.draw(this.ctx);
                });

                // Draw connections between helixes
                this.drawHelixConnections();

                // Update and draw helixes
                this.helixes.forEach(helix => {
                    helix.update(this.time);
                    helix.draw(this.ctx);
                });

                // Update and draw floating strands
                this.floatingStrands = this.floatingStrands.filter(strand => {
                    strand.update(this.time);
                    strand.draw(this.ctx);
                    return !strand.isComplete;
                });

                this.animationId = requestAnimationFrame(() => this.animate());
            }

            drawBackgroundGlow() {
                const gradient = this.ctx.createRadialGradient(
                    this.width * 0.3, this.height * 0.5, 0,
                    this.width * 0.3, this.height * 0.5, this.width * 0.5
                );
                gradient.addColorStop(0, 'rgba(0, 212, 170, 0.02)');
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(0, 0, this.width, this.height);

                const gradient2 = this.ctx.createRadialGradient(
                    this.width * 0.7, this.height * 0.4, 0,
                    this.width * 0.7, this.height * 0.4, this.width * 0.4
                );
                gradient2.addColorStop(0, 'rgba(14, 165, 233, 0.02)');
                gradient2.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient2;
                this.ctx.fillRect(0, 0, this.width, this.height);
            }

            drawHelixConnections() {
                this.helixes.forEach((helix1, i) => {
                    this.helixes.forEach((helix2, j) => {
                        if (i >= j) return;
                        const dist = Math.hypot(helix1.x - helix2.x, helix1.y - helix2.y);
                        if (dist < 400) {
                            const alpha = (1 - dist / 400) * 0.1;
                            this.drawConnectionLine(helix1, helix2, alpha);
                        }
                    });
                });
            }

            drawConnectionLine(h1: DNAHelix, h2: DNAHelix, alpha: number) {
                const gradient = this.ctx.createLinearGradient(h1.x, h1.y, h2.x, h2.y);
                gradient.addColorStop(0, `rgba(0, 212, 170, ${alpha})`);
                gradient.addColorStop(0.5, `rgba(14, 165, 233, ${alpha * 0.5})`);
                gradient.addColorStop(1, `rgba(168, 85, 247, ${alpha})`);

                this.ctx.beginPath();
                this.ctx.strokeStyle = gradient;
                this.ctx.lineWidth = 1;
                this.ctx.setLineDash([5, 10]);
                this.ctx.moveTo(h1.x, h1.y);

                // Bezier curve for organic feel
                const midX = (h1.x + h2.x) / 2 + Math.sin(this.time) * 20;
                const midY = (h1.y + h2.y) / 2 + Math.cos(this.time) * 20;
                this.ctx.quadraticCurveTo(midX, midY, h2.x, h2.y);

                this.ctx.stroke();
                this.ctx.setLineDash([]);
            }

            destroy() {
                cancelAnimationFrame(this.animationId);
                // remove listeners if needed, but we do that in useEffect return
            }
        }

        // Initialize Universe
        const universe = new DNAUniverse(canvas);

        return () => {
            universe.destroy();
        };

    }, []);

    return (
        <div
            id="dna-universe"
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                background: '#0a0a0a' // Dark background foundation
            }}
        >
            <canvas
                ref={canvasRef}
                id="dna-canvas"
                className="block w-full h-full"
            />

            {/* Glow Overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 50%, rgba(0, 212, 170, 0.03) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 50%, rgba(14, 165, 233, 0.03) 0%, transparent 50%)
                    `
                }}
            />
        </div>
    );
}
