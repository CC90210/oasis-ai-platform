import { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
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
            {/* Header Bar */}
            <header
                className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                        ? 'bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 py-4'
                        : 'bg-transparent py-6'
                    }`}
                style={{ zIndex: 9999 }}
            >
                <div className="section-container flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 group"
                        onClick={handleNavClick}
                    >
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
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive ? 'text-oasis-cyan' : 'text-text-secondary'
                                    }`
                                }
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
                        <NavLink
                            to="/portal/login"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors hover:text-oasis-cyan ${isActive ? 'text-oasis-cyan' : 'text-white'
                                }`
                            }
                        >
                            Client Portal
                        </NavLink>
                        <Link to="/contact">
                            <button className="btn-primary py-2 px-4 text-sm">
                                Get Started
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            onClick={toggleCart}
                            className="relative p-2 text-text-secondary hover:text-white transition-colors"
                            type="button"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-oasis-cyan text-bg-primary text-xs font-bold rounded-full flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white p-2 focus:outline-none"
                            style={{ minHeight: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            type="button"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-7 h-7" />
                            ) : (
                                <Menu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay - Rendered outside header for proper stacking */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-[#050508]"
                    style={{ zIndex: 9998, top: '72px' }}
                >
                    <div className="h-full overflow-y-auto">
                        <div className="px-6 py-8 flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={handleNavClick}
                                        className={`text-2xl font-display font-bold py-4 border-b border-white/5 transition-colors ${isActive
                                                ? 'text-oasis-cyan'
                                                : 'text-white hover:text-oasis-cyan'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className="my-4" />

                            <Link
                                to="/portal/login"
                                onClick={handleNavClick}
                                className={`text-xl font-medium py-4 ${location.pathname === '/portal/login'
                                        ? 'text-oasis-cyan'
                                        : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                Client Portal
                            </Link>

                            <Link
                                to="/contact"
                                onClick={handleNavClick}
                                className="btn-primary text-center py-4 text-lg mt-6"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
