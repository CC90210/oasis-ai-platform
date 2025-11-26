import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full glass-effect border-b border-neon/10">
            <div className="section-container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-neon text-black font-bold text-xl group-hover:shadow-neon transition-all">
                            O
                        </div>
                        <span className="text-2xl font-display font-bold tracking-tight">
                            <span className="text-white">OASIS</span>
                            <span className="text-neon ml-1">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <Link to="/services" className="text-light-gray hover:text-neon transition-colors">
                            Services
                        </Link>
                        <Link to="/about" className="text-light-gray hover:text-neon transition-colors">
                            About
                        </Link>
                        <Link to="/pricing" className="text-light-gray hover:text-neon transition-colors">
                            Pricing
                        </Link>
                        <Link to="/contact" className="text-light-gray hover:text-neon transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/portal/login" className="text-sm font-medium text-light-gray hover:text-neon transition-colors">
                            Portal Login
                        </Link>
                        <Link to="/contact">
                            <button className="bg-neon text-black font-semibold px-6 py-2 rounded-lg hover:shadow-neon transition-all hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-neon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-neon/10 glass-effect">
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/services"
                                className="text-light-gray hover:text-neon transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Services
                            </Link>
                            <Link
                                to="/about"
                                className="text-light-gray hover:text-neon transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                to="/pricing"
                                className="text-light-gray hover:text-neon transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                to="/contact"
                                className="text-light-gray hover:text-neon transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                            <Link
                                to="/portal/login"
                                className="text-light-gray hover:text-neon transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Portal Login
                            </Link>
                            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                                <button className="bg-neon text-black font-semibold px-6 py-2 rounded-lg w-full">
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
