import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/store/cartStore';

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { items, toggleCart } = useCart();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    // Toggle menu
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    // Close menu and navigate
    const handleNavClick = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    return (
        <>
            {/* Header Bar - with iOS safe area support */}
            <header
                className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                        ? 'bg-[#050508]/95 backdrop-blur-xl border-b border-white/10'
                        : 'bg-transparent'
                    }`}
                style={{
                    zIndex: 9999,
                    paddingTop: 'max(env(safe-area-inset-top, 0px), 12px)',
                    paddingBottom: '12px'
                }}
            >
                <div className="section-container flex items-center justify-between">
                    {/* Logo - Fixed spacing for mobile */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
                        onClick={handleNavClick}
                    >
                        <img
                            src="/images/oasis-logo.jpg"
                            alt="OASIS AI"
                            className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl object-cover shadow-lg shadow-oasis-cyan/20 group-hover:shadow-oasis-cyan/40 transition-all flex-shrink-0"
                        />
                        <span className="font-display font-bold text-base sm:text-lg lg:text-xl tracking-tight text-white whitespace-nowrap">
                            OASIS <span className="text-oasis-cyan">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Nav - Hidden on mobile/tablet */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-oasis-cyan hover:bg-white/5 ${isActive ? 'text-oasis-cyan' : 'text-text-secondary'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Actions - Hidden on mobile/tablet */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-text-secondary hover:text-white transition-colors rounded-lg hover:bg-white/5"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-oasis-cyan text-bg-primary text-xs font-bold rounded-full flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <NavLink
                            to="/portal/login"
                            className={({ isActive }) =>
                                `px-4 py-2 text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive ? 'text-oasis-cyan' : 'text-white'
                                }`
                            }
                        >
                            Client Portal
                        </NavLink>
                        <Link to="/contact">
                            <button className="btn-primary py-2 px-4 text-sm btn-lift">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Actions - Proper spacing */}
                    <div className="flex items-center gap-1 sm:gap-2 lg:hidden">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-text-secondary hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                            type="button"
                            aria-label="Shopping cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {items.length > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-oasis-cyan text-bg-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white p-2 rounded-lg hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                            type="button"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Full screen slide-in panel */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0" style={{ zIndex: 9998 }}>
                    {/* Backdrop with blur */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={handleNavClick}
                    />

                    {/* Slide-in Menu Panel - Fixed positioning from top */}
                    <div
                        className="absolute top-0 right-0 w-[85vw] max-w-[320px] h-full bg-[#0a0a0f] border-l border-gray-800 overflow-y-auto animate-slide-in-right flex flex-col"
                        style={{ paddingTop: '60px' }}
                    >
                        {/* Menu Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-800/50">
                            <span className="text-white font-bold text-lg">Menu</span>
                            <button
                                onClick={handleNavClick}
                                className="p-2 text-gray-400 hover:text-white transition rounded-lg hover:bg-white/5"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-4 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={handleNavClick}
                                        className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${isActive
                                            ? 'bg-oasis-cyan/10 text-oasis-cyan border border-oasis-cyan/20'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Action Buttons */}
                        <div className="p-4 border-t border-gray-800/50 space-y-3">
                            <Link
                                to="/portal/login"
                                onClick={handleNavClick}
                                className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${location.pathname === '/portal/login'
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-800/50 hover:bg-gray-800 text-gray-200 hover:text-white border border-gray-700/50'
                                    }`}
                            >
                                <User className="w-5 h-5" />
                                Client Portal
                            </Link>

                            <Link
                                to="/contact"
                                onClick={handleNavClick}
                                className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/20"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Contact Info at Bottom */}
                        <div className="p-4 mt-auto">
                            <div className="text-center text-sm text-gray-500">
                                <p>Questions? Contact us</p>
                                <a
                                    href="mailto:oasisaisolutions@gmail.com"
                                    className="text-oasis-cyan hover:text-cyan-300 transition"
                                >
                                    oasisaisolutions@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSS for slide animation */}
            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
            `}</style>
        </>
    );
};
