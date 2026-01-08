import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Zap, Bot, Workflow, MessageSquare, Mail, Calendar, Phone, Database, Cloud, Shield, Sparkles } from 'lucide-react';

// Floating icons component - LARGER with NEON GLOW
// Hidden on mobile to prevent overlap/clutter
const FloatingIcons = () => {
    const icons = [
        { Icon: Cpu, top: '12%', left: '8%', delay: '0s', size: 'w-12 h-12', color: 'text-cyan-400', glow: 'shadow-[0_0_30px_rgba(0,212,255,0.6)]' },
        { Icon: Zap, top: '22%', right: '12%', delay: '1s', size: 'w-10 h-10', color: 'text-yellow-400', glow: 'shadow-[0_0_25px_rgba(250,204,21,0.5)]' },
        { Icon: Bot, top: '55%', left: '6%', delay: '2s', size: 'w-14 h-14', color: 'text-purple-400', glow: 'shadow-[0_0_35px_rgba(167,139,250,0.6)]' },
        { Icon: Workflow, top: '65%', right: '10%', delay: '0.5s', size: 'w-12 h-12', color: 'text-green-400', glow: 'shadow-[0_0_30px_rgba(74,222,128,0.5)]' },
        { Icon: MessageSquare, top: '35%', left: '4%', delay: '1.5s', size: 'w-10 h-10', color: 'text-pink-400', glow: 'shadow-[0_0_25px_rgba(244,114,182,0.5)]' },
        { Icon: Mail, top: '18%', right: '6%', delay: '2.5s', size: 'w-11 h-11', color: 'text-cyan-300', glow: 'shadow-[0_0_28px_rgba(103,232,249,0.5)]' },
        { Icon: Calendar, top: '78%', left: '12%', delay: '3s', size: 'w-10 h-10', color: 'text-orange-400', glow: 'shadow-[0_0_25px_rgba(251,146,60,0.5)]' },
        { Icon: Phone, top: '45%', right: '4%', delay: '1s', size: 'w-11 h-11', color: 'text-emerald-400', glow: 'shadow-[0_0_28px_rgba(52,211,153,0.5)]' },
        { Icon: Database, top: '82%', right: '15%', delay: '2s', size: 'w-9 h-9', color: 'text-blue-400', glow: 'shadow-[0_0_22px_rgba(96,165,250,0.5)]' },
        { Icon: Cloud, top: '8%', left: '20%', delay: '0.5s', size: 'w-10 h-10', color: 'text-indigo-400', glow: 'shadow-[0_0_25px_rgba(129,140,248,0.5)]' },
        { Icon: Shield, top: '72%', left: '25%', delay: '1.5s', size: 'w-9 h-9', color: 'text-teal-400', glow: 'shadow-[0_0_22px_rgba(45,212,191,0.5)]' },
        { Icon: Sparkles, top: '28%', right: '22%', delay: '2.5s', size: 'w-10 h-10', color: 'text-amber-400', glow: 'shadow-[0_0_25px_rgba(251,191,36,0.5)]' },
    ];

    // Reduced set for tablet
    const tabletIcons = icons.slice(0, 4);

    return (
        <>
            {/* Full icons - desktop only (lg+) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] hidden lg:block">
                {icons.map((item, i) => (
                    <div
                        key={i}
                        className={`absolute animate-float rounded-xl p-2 bg-white/5 backdrop-blur-sm border border-white/10 ${item.glow}`}
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            animationDelay: item.delay,
                            animationDuration: `${5 + Math.random() * 3}s`,
                        }}
                    >
                        <item.Icon className={`${item.size} ${item.color} drop-shadow-lg`} />
                    </div>
                ))}
            </div>

            {/* Reduced icons - tablet only (md to lg) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5] hidden md:block lg:hidden">
                {tabletIcons.map((item, i) => (
                    <div
                        key={i}
                        className={`absolute animate-float rounded-xl p-2 bg-white/5 backdrop-blur-sm border border-white/10 ${item.glow}`}
                        style={{
                            top: item.top,
                            left: item.left,
                            right: item.right,
                            animationDelay: item.delay,
                            animationDuration: `${5 + Math.random() * 3}s`,
                        }}
                    >
                        <item.Icon className={`w-8 h-8 ${item.color} drop-shadow-lg`} />
                    </div>
                ))}
            </div>

            {/* Mobile: No floating icons - clean interface */}
        </>
    );
};

const ImmersiveHero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);

    return (
        <section className="relative w-full min-h-[100vh] min-h-[100dvh] overflow-hidden flex items-center justify-center" id="hero" ref={heroRef}>
            {/* No background - uses global StarField */}

            {/* Floating Tech Icons */}
            <FloatingIcons />

            {/* Content */}
            <div className="relative z-[10] text-center max-w-[900px] px-5 flex flex-col items-center hero-content">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full text-[#00D4FF] text-sm font-medium mb-7 backdrop-blur-md animate-[badgeFloat_3s_ease-in-out_infinite] shadow-[0_0_20px_rgba(0,212,255,0.3)]">
                    <span className="text-base">⚡</span>
                    <span>The Future of Automation is Here</span>
                </div>

                <h1 className="font-display text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.1] mb-6 text-white">
                    <span className="block">Scale Your Business</span>
                    <span className="block bg-gradient-to-br from-[#00D4FF] via-[#00FFD4] to-[#00D4FF] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientShift_4s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(0,212,255,0.4)]">
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
                        className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-[15px] bg-white/5 text-white border border-white/20 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-[#00D4FF] hover:text-[#00D4FF] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                    >
                        <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Book Demo</span>
                    </Link>
                </div>

                {/* Stats Counter (Social Proof) - Mobile responsive */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 pt-8 border-t border-gray-800/50 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">500+</div>
                        <div className="text-xs sm:text-sm text-gray-500">Automations Deployed</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gray-800" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">50K+</div>
                        <div className="text-xs sm:text-sm text-gray-500">Hours Saved</div>
                    </div>
                    <div className="hidden sm:block w-px h-12 bg-gray-800" />
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">99.9%</div>
                        <div className="text-xs sm:text-sm text-gray-500">Uptime</div>
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
