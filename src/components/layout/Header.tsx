import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/store/cartStore';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { items, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="section-container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/images/oasis-logo.jpg"
                        alt="OASIS AI"
                        className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-oasis-cyan/20 group-hover:shadow-oasis-cyan/40 transition-all"
                    />
                    <span className="font-display font-bold text-xl tracking-tight text-white">
                        OASIS <span className="text-oasis-cyan">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive(link.path) ? 'text-oasis-cyan' : 'text-text-secondary'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-text-secondary hover:text-white transition-colors"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-oasis-cyan text-bg-primary text-xs font-bold rounded-full flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </button>
                    <Link to="/portal/login" className="text-sm font-medium text-white hover:text-oasis-cyan transition-colors">
                        Client Portal
                    </Link>
                    <Link to="/contact">
                        <button className="btn-primary py-2 px-4 text-sm">
                            Get Started
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-text-secondary hover:text-white transition-colors"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-oasis-cyan text-bg-primary text-xs font-bold rounded-full flex items-center justify-center">
                                {items.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white p-2"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-bg-secondary border-b border-white/5 overflow-hidden"
                    >
                        <div className="section-container py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`text-lg font-medium ${isActive(link.path) ? 'text-oasis-cyan' : 'text-text-secondary'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/5 my-2" />
                            <Link
                                to="/portal/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-medium text-white"
                            >
                                Client Portal
                            </Link>
                            <Link
                                to="/contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="btn-primary text-center"
                            >
                                Get Started
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
