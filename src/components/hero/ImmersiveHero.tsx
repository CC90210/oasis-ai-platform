import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';

const ImmersiveHero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    useHeroAnimation();

    return (
        <section className="relative w-full min-h-[100vh] min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#050508]" id="hero" ref={heroRef}>
            {/* Layer 0: Background with Noise */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(0,212,255,0.05)_0%,transparent_40%),radial-gradient(ellipse_at_20%_90%,rgba(0,100,200,0.05)_0%,transparent_40%),linear-gradient(180deg,#050508_0%,#0A0A0F_100%)]">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20400%20400%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]"></div>
            </div>

            {/* Layer 1: Distant Stars */}
            <canvas id="stars-distant" className="absolute inset-0 w-full h-full pointer-events-none z-[1]" />

            {/* Layer 2: Mid-field Particles */}
            <canvas id="particles-mid" className="absolute inset-0 w-full h-full pointer-events-none z-[2]" />

            {/* Layer 3: DNA Helix */}
            <canvas id="dna-helix" className="absolute inset-0 w-full h-full pointer-events-none z-[3] md:scale-100 scale-150 origin-center" />

            {/* Layer 4: Foreground Particles */}
            <canvas id="particles-near" className="absolute inset-0 w-full h-full pointer-events-none z-[4]" />

            {/* Layer 5: Ambient Glows */}
            <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
                <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.3),transparent_70%)] -top-[200px] -right-[100px] animate-[glowPulse_8s_ease-in-out_infinite]" />
                <div className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,150,255,0.3),transparent_70%)] -bottom-[100px] -left-[100px] animate-[glowPulse_8s_ease-in-out_infinite_2.5s]" />
                <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.2),transparent_70%)] top-[40%] left-[60%] animate-[glowPulse_8s_ease-in-out_infinite_5s]" />
            </div>

            {/* Layer 6: Content */}
            <div className="relative z-[10] text-center max-w-[900px] px-5 flex flex-col items-center hero-content">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full text-[#00D4FF] text-sm font-medium mb-7 backdrop-blur-md animate-[badgeFloat_3s_ease-in-out_infinite]">
                    <span className="text-base">⚡</span>
                    <span>The Future of Automation is Here</span>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.1] mb-6 text-white">
                    <span className="block">Scale Your Business</span>
                    <span className="block bg-gradient-to-br from-[#00D4FF] via-[#00FFD4] to-[#00D4FF] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientShift_4s_ease-in-out_infinite]">
                        Without Limits
                    </span>
                </h1>

                <p className="text-base md:text-xl text-[#94A3B8] max-w-[600px] leading-[1.7] mb-10">
                    Deploy intelligent automations that work 24/7. Capture leads, book appointments, and streamline operations with OASIS AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 flex-wrap justify-center w-full max-w-[340px] sm:max-w-none">
                    <Link
                        to="/pricing"
                        className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-[15px] bg-gradient-to-br from-[#00D4FF] to-[#00A3CC] text-[#0A0A0F] shadow-[0_4px_20px_rgba(0,212,255,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,212,255,0.5)] overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-500 group-hover:translate-x-full" />
                        <span>View Automations</span>
                        <svg className="w-5 h-5 stroke-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <Link
                        to="/contact"
                        className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-[15px] bg-white/5 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-[#00D4FF] hover:text-[#00D4FF] hover:-translate-y-1"
                    >
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Book Demo</span>
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 animate-[scrollBounce_2s_ease-in-out_infinite] pointer-events-none scroll-indicator">
                    <div className="w-[26px] h-[40px] border-2 border-white/30 rounded-[13px] relative">
                        <div className="w-1 h-2 bg-[#00D4FF] rounded-sm absolute top-2 left-1/2 -translate-x-1/2 animate-[scrollWheel_1.5s_ease-in-out_infinite]" />
                    </div>
                    <span className="text-xs text-[#94A3B8] tracking-widest uppercase">Scroll to explore</span>
                </div>
            </div>

            {/* Layer 7: Cursor Glow */}
            <div id="cursor-glow" className="fixed w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.15),transparent_70%)] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[6] opacity-0 transition-opacity duration-300 blur-[40px]" />
        </section>
    );
};

export default ImmersiveHero;
