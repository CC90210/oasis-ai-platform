import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import CinematicDNA from '../CinematicDNA';

const ImmersiveHero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    return (
        <section className="relative w-full min-h-[100vh] min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#050508]" id="hero" ref={heroRef}>
            {/* Cinematic DNA - small segments that drift, connect, split */}
            <CinematicDNA />

            {/* Content */}
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
        </section>
    );
};

export default ImmersiveHero;
