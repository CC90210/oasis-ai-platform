import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = ['Services', 'Pricing', 'Case Studies', 'Blog', 'About', 'Contact'];

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
                            OASIS <span className="text-oasis-cyan">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase().replace(' ', '-')}`}
                                className="text-sm font-medium text-text-secondary hover:text-oasis-cyan transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-oasis-cyan transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link
                            to="/portal/login"
                            className="text-sm font-medium text-text-tertiary hover:text-white transition-colors"
                        >
                            Portal Login
                        </Link>
                        <Link to="/contact">
                            <button className="btn-primary px-6 py-2.5 text-sm shadow-oasis">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-text-secondary hover:text-oasis-cyan transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-6 border-t border-white/5 animate-fade-in-up">
                        <div className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item}
                                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                                    className="text-lg font-medium text-text-secondary hover:text-oasis-cyan transition-colors px-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item}
                                </Link>
                            ))}
                            <div className="h-px bg-white/5 my-2" />
                            <Link
                                to="/portal/login"
                                className="text-text-tertiary hover:text-white px-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Portal Login
                            </Link>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full mt-4 btn-primary py-3 font-semibold">
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
