import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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

    // Double-check closure on route change to prevent "stuck" menus
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="section-container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
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
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => `text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive ? 'text-oasis-cyan' : 'text-text-secondary'}`}
                        >
                            {link.name}
                        </NavLink>
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
                    <NavLink to="/portal/login" className={({ isActive }) => `text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive ? 'text-oasis-cyan' : 'text-white'}`}>
                        Client Portal
                    </NavLink>
                    <NavLink to="/contact">
                        <button className="btn-primary py-2 px-4 text-sm">
                            Get Started
                        </button>
                    </NavLink>
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
                        className="text-white p-2 focus:outline-none"
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
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#050508] fixed inset-0 top-[72px] z-30 overflow-y-auto"
                    >
                        <div className="section-container py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) => `text-2xl font-display font-bold transition-colors ${isActive ? 'text-oasis-cyan' : 'text-white/80'}`}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <hr className="border-white/10 my-2" />
                            <NavLink
                                to="/portal/login"
                                onClick={closeMenu}
                                className={({ isActive }) => `text-xl font-medium ${isActive ? 'text-oasis-cyan' : 'text-white/80'}`}
                            >
                                Client Portal
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className="btn-primary text-center py-4 text-lg mt-4"
                            >
                                Get Started
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
