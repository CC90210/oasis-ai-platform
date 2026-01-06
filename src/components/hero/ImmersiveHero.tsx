import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import CinematicDNA from '../CinematicDNA';
import { Cpu, Zap, Bot, Workflow, MessageSquare, Mail, Calendar, Phone } from 'lucide-react';

// Floating icons component
const FloatingIcons = () => {
    const icons = [
        { Icon: Cpu, top: '15%', left: '10%', delay: '0s', size: 'w-8 h-8' },
        { Icon: Zap, top: '25%', right: '15%', delay: '1s', size: 'w-6 h-6' },
        { Icon: Bot, top: '60%', left: '8%', delay: '2s', size: 'w-7 h-7' },
        { Icon: Workflow, top: '70%', right: '12%', delay: '0.5s', size: 'w-8 h-8' },
        { Icon: MessageSquare, top: '40%', left: '5%', delay: '1.5s', size: 'w-5 h-5' },
        { Icon: Mail, top: '20%', right: '8%', delay: '2.5s', size: 'w-6 h-6' },
        { Icon: Calendar, top: '80%', left: '15%', delay: '3s', size: 'w-5 h-5' },
        { Icon: Phone, top: '50%', right: '5%', delay: '1s', size: 'w-6 h-6' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]">
            {icons.map((item, i) => (
                <div
                    key={i}
                    className="absolute animate-float opacity-20"
                    style={{
                        top: item.top,
                        left: item.left,
                        right: item.right,
                        animationDelay: item.delay,
                        animationDuration: '6s',
                    }}
                >
                    <item.Icon className={`${item.size} text-[#00D4FF]`} />
                </div>
            ))}
        </div>
    );
};

const ImmersiveHero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    return (
        <section className="relative w-full min-h-[100vh] min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#050508]" id="hero" ref={heroRef}>
            {/* Background Elements */}
            {/* Background Elements - Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white/20 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: Math.random() * 0.5 + 0.1,
                        }}
                    />
                ))}

                {/* Subtle gradient glow instead of orbs */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#00D4FF]/5 to-transparent opacity-30" />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none z-[2]"
                style={{
                    backgroundImage: `
                    linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Floating Tech Icons */}
            <FloatingIcons />

            {/* Animated Particles/Circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00D4FF] rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Rotating Rings */}
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 border border-[#00D4FF]/10 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute -right-20 bottom-0 w-80 h-80 border border-purple-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            </div>

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

                {/* Stats Counter (Social Proof) */}
                <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-gray-800/50 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#00D4FF]">500+</div>
                        <div className="text-sm text-gray-500">Automations Deployed</div>
                    </div>
                    <div className="w-px h-12 bg-gray-800" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#00D4FF]">50K+</div>
                        <div className="text-sm text-gray-500">Hours Saved</div>
                    </div>
                    <div className="w-px h-12 bg-gray-800" />
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#00D4FF]">99.9%</div>
                        <div className="text-sm text-gray-500">Uptime</div>
                    </div>
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
