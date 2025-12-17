import { useEffect, useRef } from 'react';

export const useHeroAnimation = () => {
    // Refs to store animation state
    const refs = useRef({
        mouse: { x: 0, y: 0 },
        scrollY: 0,
        isVisible: true,
        animationFrameId: 0,
        lastFrameTime: 0,
        cleanupFunctions: [] as (() => void)[],

        // Canvas contexts
        starsCtx: null as CanvasRenderingContext2D | null,
        particlesMidCtx: null as CanvasRenderingContext2D | null,
        dnaCtx: null as CanvasRenderingContext2D | null,
        particlesNearCtx: null as CanvasRenderingContext2D | null,

        // Data arrays
        stars: [] as any[],
        particlesMid: [] as any[],
        particlesNear: [] as any[],
    });

    useEffect(() => {
        const state = refs.current;

        // Initialize Mouse Tracking
        const handleMouseMove = (e: MouseEvent) => {
            state.mouse.x = e.clientX;
            state.mouse.y = e.clientY;

            const cursorGlow = document.getElementById('cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.left = e.clientX + 'px';
                cursorGlow.style.top = e.clientY + 'px';
                cursorGlow.style.opacity = '1';
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) {
                state.mouse.x = e.touches[0].clientX;
                state.mouse.y = e.touches[0].clientY;
            }
        };

        const handleMouseLeave = () => {
            const cursorGlow = document.getElementById('cursor-glow');
            if (cursorGlow) cursorGlow.style.opacity = '0';
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('touchmove', handleTouchMove);

        // Initialize Scroll Effects
        const handleScroll = () => {
            state.scrollY = window.scrollY;

            const heroContent = document.querySelector('.hero-content') as HTMLElement;
            const scrollIndicator = document.querySelector('.scroll-indicator') as HTMLElement;

            if (heroContent) {
                const opacity = Math.max(0, 1 - state.scrollY / 500);
                const translateY = state.scrollY * 0.3;
                heroContent.style.opacity = opacity.toString();
                heroContent.style.transform = `translateY(${translateY}px)`;
            }

            if (scrollIndicator) {
                scrollIndicator.style.opacity = Math.max(0, 1 - state.scrollY / 100).toString();
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Visibility Check (Performance)
        const checkVisibility = () => {
            const splashVideo = document.getElementById('splash-screen-video');
            // Visible only if: document not hidden AND splash screen video is NOT in DOM
            state.isVisible = !document.hidden && !splashVideo;
        };

        // Use IntersectionObserver specifically for the hero section
        const heroSection = document.getElementById('hero');
        let observer: IntersectionObserver | null = null;

        if (heroSection) {
            observer = new IntersectionObserver((entries) => {
                const splashVideo = document.getElementById('splash-screen-video');
                state.isVisible = entries[0].isIntersecting && !document.hidden && !splashVideo;
            }, { threshold: 0 });
            observer.observe(heroSection);
        }

        // Poll for splash screen removal (to start animation when it ends)
        const splashInterval = setInterval(checkVisibility, 500);

        document.addEventListener('visibilitychange', checkVisibility);


        // ==========================================
        // INITIALIZERS
        // ==========================================

        const initStarsDistant = () => {
            const canvas = document.getElementById('stars-distant') as HTMLCanvasElement;
            if (!canvas) return;
            state.starsCtx = canvas.getContext('2d');

            const generate = () => {
                state.stars = [];
                // Optimized counts
                const isMobile = window.innerWidth < 768;
                const area = window.innerWidth * window.innerHeight;

                const count = isMobile
                    ? Math.min(Math.floor(area / 25000), 50)
                    : Math.min(Math.floor(area / 20000), 150);

                for (let i = 0; i < count; i++) {
                    state.stars.push({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        size: Math.random() * 2 + 0.5,
                        brightness: Math.random(),
                        twinkleSpeed: Math.random() * 0.02 + 0.005,
                        twinklePhase: Math.random() * Math.PI * 2,
                        color: Math.random() > 0.8 ? 'rgba(0, 212, 255, ' : 'rgba(255, 255, 255, '
                    });
                }
            };

            const resize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                generate();
            };

            window.addEventListener('resize', resize);
            resize(); // Initial call
            state.cleanupFunctions.push(() => window.removeEventListener('resize', resize));
        };

        const initParticlesMid = () => {
            const canvas = document.getElementById('particles-mid') as HTMLCanvasElement;
            if (!canvas) return;
            state.particlesMidCtx = canvas.getContext('2d');

            const generate = () => {
                state.particlesMid = [];
                const isMobile = window.innerWidth < 768;
                const area = window.innerWidth * window.innerHeight;

                const count = isMobile
                    ? Math.min(Math.floor(area / 80000), 15)
                    : Math.min(Math.floor(area / 60000), 40);

                for (let i = 0; i < count; i++) {
                    state.particlesMid.push({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() - 0.5) * 0.3,
                        speedY: (Math.random() - 0.5) * 0.3,
                        opacity: Math.random() * 0.5 + 0.2,
                        pulseSpeed: Math.random() * 0.01 + 0.005,
                        pulsePhase: Math.random() * Math.PI * 2
                    });
                }
            };

            const resize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                generate();
            };

            window.addEventListener('resize', resize);
            resize();
            state.cleanupFunctions.push(() => window.removeEventListener('resize', resize));
        };

        const initDNAHelix = () => {
            const canvas = document.getElementById('dna-helix') as HTMLCanvasElement;
            if (!canvas) return;
            state.dnaCtx = canvas.getContext('2d');

            const resize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };

            window.addEventListener('resize', resize);
            resize();
            state.cleanupFunctions.push(() => window.removeEventListener('resize', resize));
        };

        const initParticlesNear = () => {
            const canvas = document.getElementById('particles-near') as HTMLCanvasElement;
            if (!canvas) return;
            state.particlesNearCtx = canvas.getContext('2d');

            const generate = () => {
                state.particlesNear = [];
                const isMobile = window.innerWidth < 768;
                const area = window.innerWidth * window.innerHeight;

                const count = isMobile
                    ? Math.min(Math.floor(area / 150000), 8)
                    : Math.min(Math.floor(area / 120000), 20);

                for (let i = 0; i < count; i++) {
                    state.particlesNear.push({
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        size: Math.random() * 4 + 2,
                        speedX: (Math.random() - 0.5) * 0.5,
                        speedY: (Math.random() - 0.5) * 0.5,
                        opacity: Math.random() * 0.3 + 0.1
                    });
                }
            };

            const resize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                generate();
            };

            window.addEventListener('resize', resize);
            resize();
            state.cleanupFunctions.push(() => window.removeEventListener('resize', resize));
        };

        // Initialize all layers
        initStarsDistant();
        initParticlesMid();
        initDNAHelix();
        initParticlesNear();


        // ==========================================
        // RENDER LOOP
        // ==========================================

        const animate = () => {
            state.animationFrameId = requestAnimationFrame(animate);

            const time = performance.now();
            const elapsed = time - state.lastFrameTime;

            // Limit to 30fps (approx 33ms per frame) - or 24fps on mobile
            const isMobile = window.innerWidth < 768;
            const fpsInterval = isMobile ? 41 : 33;

            if (elapsed < fpsInterval) return;

            state.lastFrameTime = time - (elapsed % fpsInterval);

            if (state.isVisible) {
                // DRAW STARTS
                if (state.starsCtx && state.starsCtx.canvas) {
                    const ctx = state.starsCtx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    state.stars.forEach(star => {
                        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
                        const opacity = 0.3 + (twinkle + 1) * 0.35 * star.brightness;

                        const parallaxX = (state.mouse.x - window.innerWidth / 2) * 0.01;
                        const parallaxY = (state.mouse.y - window.innerHeight / 2) * 0.01;

                        const x = star.x + parallaxX;
                        const y = star.y + parallaxY;

                        ctx.beginPath();
                        ctx.arc(x, y, star.size, 0, Math.PI * 2);
                        ctx.fillStyle = star.color + opacity + ')';
                        ctx.fill();

                        if (star.brightness > 0.7 && star.size > 1.5) {
                            // Simplified glow
                            ctx.beginPath();
                            ctx.arc(x, y, star.size + 1, 0, Math.PI * 2);
                            ctx.fillStyle = star.color + (opacity * 0.3) + ')';
                            ctx.fill();
                        }
                    });
                }

                // DRAW MID PARTICLES
                if (state.particlesMidCtx && state.particlesMidCtx.canvas) {
                    const ctx = state.particlesMidCtx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    state.particlesMid.forEach(particle => {
                        particle.x += particle.speedX;
                        particle.y += particle.speedY;

                        if (particle.x < -10) particle.x = ctx.canvas.width + 10;
                        if (particle.x > ctx.canvas.width + 10) particle.x = -10;
                        if (particle.y < -10) particle.y = ctx.canvas.height + 10;
                        if (particle.y > ctx.canvas.height + 10) particle.y = -10;

                        const parallaxX = (state.mouse.x - window.innerWidth / 2) * 0.02;
                        const parallaxY = (state.mouse.y - window.innerHeight / 2) * 0.02;

                        const x = particle.x + parallaxX;
                        const y = particle.y + parallaxY;

                        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulsePhase);
                        const size = particle.size * (1 + pulse * 0.2);
                        const opacity = particle.opacity * (0.8 + pulse * 0.2);

                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.fill();
                    });
                }

                // DRAW DNA HELIX (FULL HEIGHT)
                if (state.dnaCtx && state.dnaCtx.canvas) {
                    const ctx = state.dnaCtx;
                    const width = ctx.canvas.width;
                    const height = ctx.canvas.height;

                    ctx.clearRect(0, 0, width, height);

                    const centerX = width / 2;
                    const amplitude = Math.min(width * 0.15, 180);
                    // Increased spacing for performance (was 25)
                    const pointSpacing = window.innerWidth < 768 ? 60 : 40;
                    const totalPoints = Math.ceil(height / pointSpacing) + 10;
                    const startY = -50;

                    const strand1Points: any[] = [];
                    const strand2Points: any[] = [];

                    for (let i = 0; i < totalPoints; i++) {
                        const y = startY + i * pointSpacing;
                        const phase = time * 0.001 + i * 0.15;

                        const x1 = centerX + Math.sin(phase) * amplitude;
                        const depth1 = (Math.sin(phase) + 1) / 2;

                        const x2 = centerX + Math.sin(phase + Math.PI) * amplitude;
                        const depth2 = (Math.sin(phase + Math.PI) + 1) / 2;

                        strand1Points.push({ x: x1, y, depth: depth1 });
                        strand2Points.push({ x: x2, y, depth: depth2 });
                    }

                    ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
                    ctx.lineWidth = 1;

                    // Draw connections (simplified)
                    ctx.beginPath();
                    for (let i = 0; i < totalPoints; i++) {
                        if (strand1Points[i] && strand2Points[i]) {
                            ctx.moveTo(strand1Points[i].x, strand1Points[i].y);
                            ctx.lineTo(strand2Points[i].x, strand2Points[i].y);
                        }
                    }
                    ctx.stroke();

                    const drawStrand = (points: any, offset: number) => {
                        // Draw line
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
                        ctx.lineWidth = 2;

                        if (points.length > 0) {
                            ctx.moveTo(points[0].x, points[0].y);
                            for (let i = 1; i < points.length; i++) {
                                ctx.lineTo(points[i].x, points[i].y);
                            }
                            ctx.stroke();
                        }

                        // Draw points (simplified - no gradients)
                        points.forEach((point: any) => {
                            const size = 3 + point.depth * 3;
                            const opacity = 0.4 + point.depth * 0.6;

                            ctx.beginPath();
                            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(0, 212, 255, ${opacity})`;
                            ctx.fill();
                        });
                    };

                    drawStrand(strand1Points, 0);
                    drawStrand(strand2Points, Math.PI);
                }

                // DRAW NEAR PARTICLES
                if (state.particlesNearCtx && state.particlesNearCtx.canvas) {
                    const ctx = state.particlesNearCtx;
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                    state.particlesNear.forEach(particle => {
                        particle.x += particle.speedX;
                        particle.y += particle.speedY;

                        if (particle.x < -20) particle.x = ctx.canvas.width + 20;
                        if (particle.x > ctx.canvas.width + 20) particle.x = -20;
                        if (particle.y < -20) particle.y = ctx.canvas.height + 20;
                        if (particle.y > ctx.canvas.height + 20) particle.y = -20;

                        const parallaxX = (state.mouse.x - window.innerWidth / 2) * 0.05;
                        const parallaxY = (state.mouse.y - window.innerHeight / 2) * 0.05;

                        const x = particle.x + parallaxX;
                        const y = particle.y + parallaxY;

                        ctx.beginPath();
                        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
                        // Removed expensive blur filter
                        ctx.fill();
                    });
                }
            }

            // Request next frame is handled at start of function now
        };

        state.animationFrameId = requestAnimationFrame(animate);

        // CLEANUP
        return () => {
            cancelAnimationFrame(state.animationFrameId);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', checkVisibility);
            if (observer) observer.disconnect();

            state.cleanupFunctions.forEach(fn => fn());
            clearInterval(splashInterval);
        };
    }, []);
};
