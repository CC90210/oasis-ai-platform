import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: 'rgba(10, 10, 15, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <img
                            src="/images/oasis-logo.jpg"
                            alt="OASIS AI"
                            className="h-10 w-auto rounded-lg transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="font-display font-bold text-xl tracking-tight text-white">
                            OASIS <span className="text-[#00D4FF]">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {['Services', 'Pricing', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className="text-sm font-medium text-[#E2E8F0] hover:text-[#00D4FF] transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4FF] transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/portal/login"
                            className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
                        >
                            Portal Login
                        </Link>
                        <Link to="/contact">
                            <button
                                className="btn-primary px-6 py-2.5 text-sm"
                                style={{
                                    background: 'linear-gradient(135deg, #00D4FF 0%, #00A3CC 100%)',
                                    color: '#0A0A0F',
                                    boxShadow: '0 4px 20px rgba(0, 212, 255, 0.2)'
                                }}
                            >
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#E2E8F0] hover:text-[#00D4FF] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-white/5 animate-fade-in-up">
                        <div className="flex flex-col gap-4">
                            {['Services', 'Pricing', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase()}`}
                                    className="text-lg font-medium text-[#E2E8F0] hover:text-[#00D4FF] transition-colors px-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="h-px bg-white/5 my-2" />
                            <Link
                                to="/portal/login"
                                className="text-[#94A3B8] hover:text-white px-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Portal Login
                            </Link>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                                <button
                                    className="w-full mt-4 btn-primary py-3 font-semibold"
                                    style={{
                                        background: 'linear-gradient(135deg, #00D4FF 0%, #00A3CC 100%)',
                                        color: '#0A0A0F'
                                    }}
                                >
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
