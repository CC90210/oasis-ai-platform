import React, { useEffect, useRef } from 'react';

// ============================================
// OASIS AI - REFINED DNA HELIX SYSTEM V2
// Subtle, Professional, Background Animation
// ============================================

export default function CinematicDNA() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // -- CLASSES DEFINITION INSIDE EFFECT TO AVOID EXTERNAL DEPENDENCIES --

        class Particle {
            maxX: number;
            maxY: number;
            color: any;
            x: number = 0;
            y: number = 0;
            size: number = 0;
            speedX: number = 0;
            speedY: number = 0;
            phase: number = 0;
            baseAlpha: number = 0;
            alpha: number = 0;

            constructor(maxX: number, maxY: number, color: any) {
                this.maxX = maxX;
                this.maxY = maxY;
                this.color = color;
                this.reset();
            }

            reset() {
                this.x = Math.random() * this.maxX;
                this.y = Math.random() * this.maxY;
                this.size = 1 + Math.random() * 1.5;
                this.speedX = (Math.random() - 0.5) * 0.15;
                this.speedY = (Math.random() - 0.5) * 0.15;
                this.phase = Math.random() * Math.PI * 2;
                this.baseAlpha = 0.1 + Math.random() * 0.2;
            }

            update(time: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                // Gentle floating motion
                this.x += Math.sin(time * 0.5 + this.phase) * 0.1;
                this.y += Math.cos(time * 0.3 + this.phase) * 0.1;

                // Wrap around
                if (this.x < -10) this.x = this.maxX + 10;
                if (this.x > this.maxX + 10) this.x = -10;
                if (this.y < -10) this.y = this.maxY + 10;
                if (this.y > this.maxY + 10) this.y = -10;

                // Pulsing alpha
                this.alpha = this.baseAlpha * (Math.sin(time + this.phase) * 0.3 + 0.7);
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Helix {
            x: number;
            y: number;
            rotation: number;
            length: number;
            index: number;
            config: any;
            phase: number;
            currentTime: number = 0;

            constructor(position: any, index: number, config: any) {
                this.x = position.x;
                this.y = position.y;
                this.rotation = position.rotation * (Math.PI / 180);
                this.length = position.length;
                this.index = index;
                this.config = config;
                this.phase = index * 0.5; // Offset each helix slightly
            }

            update(time: number) {
                // Simple phase update for smooth animation
                this.currentTime = time;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                const time = this.currentTime;
                const nodeCount = this.config.nodesPerHelix;
                const amplitude = this.config.waveAmplitude;
                const speed = this.config.waveSpeed;

                // Calculate all points first
                const strand1Points = [];
                const strand2Points = [];

                for (let i = 0; i < nodeCount; i++) {
                    const t = i / (nodeCount - 1);
                    const y = (t - 0.5) * this.length;
                    const wave = Math.sin(t * Math.PI * 3 + time * speed + this.phase);
                    const x = wave * amplitude;

                    strand1Points.push({ x: x, y: y, t: t });
                    strand2Points.push({ x: -x, y: y, t: t });
                }

                // Draw connecting rungs first (behind strands)
                this.drawRungs(ctx, strand1Points, strand2Points, time);

                // Draw strand 1 (cyan)
                this.drawStrand(ctx, strand1Points, this.config.colors.strand1);

                // Draw strand 2 (blue)
                this.drawStrand(ctx, strand2Points, this.config.colors.strand2);

                // Draw nodes
                this.drawNodes(ctx, strand1Points, strand2Points, time);

                ctx.restore();
            }

            drawStrand(ctx: CanvasRenderingContext2D, points: any[], color: any) {
                if (points.length < 2) return;

                // Main strand line
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
                ctx.lineWidth = this.config.strandWidth;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                // Use quadratic curves for smooth lines
                ctx.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                // Last point
                const last = points[points.length - 1];
                ctx.lineTo(last.x, last.y);

                ctx.stroke();

                // Subtle glow effect
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.3})`;
                ctx.lineWidth = this.config.strandWidth + 4;
                ctx.filter = `blur(${this.config.glowBlur}px)`;

                ctx.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }

                ctx.lineTo(last.x, last.y);
                ctx.stroke();
                ctx.filter = 'none';
            }

            drawRungs(ctx: CanvasRenderingContext2D, strand1: any[], strand2: any[], time: number) {
                const rungCount = 10;
                const step = Math.floor(strand1.length / rungCount);

                ctx.lineWidth = 0.5;

                for (let i = step; i < strand1.length - step; i += step) {
                    const p1 = strand1[i];
                    const p2 = strand2[i];

                    // Pulsing opacity
                    const pulse = Math.sin(time * 2 + i * 0.3) * 0.5 + 0.5;
                    const alpha = this.config.rungOpacity * pulse;

                    // Gradient rung
                    const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    gradient.addColorStop(0, `rgba(0, 200, 170, ${alpha})`);
                    gradient.addColorStop(0.5, `rgba(10, 180, 195, ${alpha * 0.5})`);
                    gradient.addColorStop(1, `rgba(20, 160, 220, ${alpha})`);

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            drawNodes(ctx: CanvasRenderingContext2D, strand1: any[], strand2: any[], time: number) {
                const nodeStep = 4; // Draw every 4th node

                for (let i = 0; i < strand1.length; i += nodeStep) {
                    const pulse = Math.sin(time * 1.5 + i * 0.2 + this.phase) * 0.3 + 0.7;
                    const size = this.config.nodeSize * pulse;
                    const alpha = 0.5 * pulse;

                    // Strand 1 node
                    this.drawNode(ctx, strand1[i].x, strand1[i].y, size, this.config.colors.strand1, alpha);

                    // Strand 2 node
                    this.drawNode(ctx, strand2[i].x, strand2[i].y, size, this.config.colors.strand2, alpha);
                }
            }

            drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: any, alpha: number) {
                // Soft glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
                gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class DNABackground {
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            helixes: Helix[];
            particles: Particle[];
            animationId: number | null;
            width: number = 0;
            height: number = 0;

            config = {
                // Colors - softer, more refined
                colors: {
                    strand1: { r: 0, g: 200, b: 170, a: 0.4 },    // Soft cyan
                    strand2: { r: 20, g: 160, b: 220, a: 0.4 },   // Soft blue
                    node: { r: 0, g: 220, b: 180, a: 0.6 },       // Node glow
                    particle: { r: 0, g: 180, b: 160, a: 0.3 }    // Subtle particles
                },

                // Animation - slow and smooth
                rotationSpeed: 0.0015,        // Very slow rotation
                waveSpeed: 0.8,               // Gentle wave motion
                waveAmplitude: 30,            // Moderate wave width

                // Visual - refined appearance
                strandWidth: 1.5,             // Thin, elegant lines
                nodeSize: 2.5,                // Small, subtle nodes
                glowBlur: 8,                  // Soft glow
                rungOpacity: 0.15,            // Very subtle rungs

                // Layout
                particleCount: 30,            // Minimal particles
                nodesPerHelix: 25             // Smooth curves
            };

            constructor(canvas: HTMLCanvasElement) {
                this.canvas = canvas;
                const context = this.canvas.getContext('2d');
                if (!context) throw new Error("Could not get canvas context");
                this.ctx = context;
                this.helixes = [];
                this.particles = [];
                this.animationId = null;

                // Mobile Optimization
                if (window.innerWidth < 768) {
                    this.config.particleCount = 15;
                    this.config.nodesPerHelix = 18;
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
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                this.width = window.innerWidth;
                this.height = window.innerHeight;
                this.canvas.width = this.width * dpr;
                this.canvas.height = this.height * dpr;
                this.canvas.style.width = this.width + 'px';
                this.canvas.style.height = this.height + 'px';
                this.ctx.scale(dpr, dpr);

                // Recreate helixes on resize
                if (this.helixes.length > 0) {
                    this.helixes = [];
                    this.createHelixes();
                }
            }

            bindEvents() {
                let resizeTimeout: NodeJS.Timeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => this.resize(), 150);
                });
            }

            createHelixes() {
                // Strategic positions - framing the content
                const positions = [
                    // Left side
                    { x: -20, y: this.height * 0.5, rotation: -12, length: this.height * 0.9 },
                    { x: this.width * 0.12, y: this.height * 0.3, rotation: 8, length: this.height * 0.7 },

                    // Right side  
                    { x: this.width * 0.88, y: this.height * 0.35, rotation: -10, length: this.height * 0.75 },
                    { x: this.width + 20, y: this.height * 0.55, rotation: 15, length: this.height * 0.85 },

                    // Far edges (partial visibility)
                    { x: this.width * 0.05, y: this.height * 0.8, rotation: -20, length: this.height * 0.5 },
                    { x: this.width * 0.95, y: this.height * 0.15, rotation: 18, length: this.height * 0.5 }
                ];

                positions.forEach((pos, index) => {
                    this.helixes.push(new Helix(pos, index, this.config));
                });
            }

            createParticles() {
                for (let i = 0; i < this.config.particleCount; i++) {
                    this.particles.push(new Particle(this.width, this.height, this.config.colors.particle));
                }
            }

            animate() {
                const time = performance.now() * 0.001;

                // Clear canvas
                this.ctx.clearRect(0, 0, this.width, this.height);

                // Draw particles first (behind helixes)
                this.particles.forEach(p => {
                    p.update(time);
                    p.draw(this.ctx);
                });

                // Draw helixes
                this.helixes.forEach(helix => {
                    helix.update(time);
                    helix.draw(this.ctx);
                });

                this.animationId = requestAnimationFrame(() => this.animate());
            }

            destroy() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
            }
        }

        // Initialize Background System
        const dnaSystem = new DNABackground(canvas);

        return () => {
            dnaSystem.destroy();
        };

    }, []);

    return (
        <div
            id="dna-background"
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            style={{
                opacity: 0.6 // Overall reduced opacity - background element
            }}
        >
            <canvas
                ref={canvasRef}
                id="dna-canvas"
                className="block w-full h-full"
            />
        </div>
    );
}
