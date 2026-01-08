import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/store/cartStore';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { items, toggleCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change (backup)
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    // Handle nav click - close menu immediately and navigate
    const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault(); // Prevent default link behavior
        setIsMobileMenuOpen(false); // Close menu immediately

        // Navigate immediately - don't wait for animation
        navigate(path);
        window.scrollTo(0, 0);
    }, [navigate]);

    // Handle logo click
    const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobileMenuOpen) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            navigate('/');
            window.scrollTo(0, 0);
        }
    }, [isMobileMenuOpen, navigate]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="section-container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group" onClick={handleLogoClick}>
                    <img
                        src="/images/oasis-logo.jpg"
                        alt="OASIS AI"
                        className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-oasis-cyan/20 group-hover:shadow-oasis-cyan/40 transition-all"
                    />
                    <span className="font-display font-bold text-xl tracking-tight text-white">
                        OASIS <span className="text-oasis-cyan">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav - these work fine, no changes needed */}
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
                        className="text-white p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-[#050508] fixed inset-0 top-[72px] z-30 overflow-y-auto"
                    >
                        <div className="section-container py-8 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.path}
                                    onClick={(e) => handleNavClick(e, link.path)}
                                    className={`text-2xl font-display font-bold transition-colors min-h-[48px] flex items-center ${location.pathname === link.path ? 'text-oasis-cyan' : 'text-white/80 hover:text-white'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <hr className="border-white/10 my-2" />
                            <a
                                href="/portal/login"
                                onClick={(e) => handleNavClick(e, '/portal/login')}
                                className={`text-xl font-medium min-h-[48px] flex items-center ${location.pathname === '/portal/login' ? 'text-oasis-cyan' : 'text-white/80 hover:text-white'}`}
                            >
                                Client Portal
                            </a>
                            <a
                                href="/contact"
                                onClick={(e) => handleNavClick(e, '/contact')}
                                className="btn-primary text-center py-4 text-lg mt-4"
                            >
                                Get Started
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
