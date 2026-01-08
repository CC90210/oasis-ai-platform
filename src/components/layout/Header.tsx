import { useState, useEffect } from 'react';
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // CRITICAL: Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Services', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Case Studies', path: '/case-studies' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    // Close menu handler
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                    ? 'bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 py-4'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="section-container flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group" onClick={handleLinkClick}>
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

            {/* Mobile Menu - Full Screen Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[72px] z-40 bg-[#050508]">
                    <div className="h-full overflow-y-auto">
                        <div className="section-container py-8 flex flex-col gap-4">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={handleLinkClick}
                                        className={`text-2xl font-display font-bold py-3 transition-colors ${isActive
                                                ? 'text-oasis-cyan'
                                                : 'text-white/90 hover:text-white active:text-oasis-cyan'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <hr className="border-white/10 my-4" />

                            <Link
                                to="/portal/login"
                                onClick={handleLinkClick}
                                className={`text-xl font-medium py-3 ${location.pathname === '/portal/login'
                                        ? 'text-oasis-cyan'
                                        : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                Client Portal
                            </Link>

                            <Link
                                to="/contact"
                                onClick={handleLinkClick}
                                className="btn-primary text-center py-4 text-lg mt-4"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
