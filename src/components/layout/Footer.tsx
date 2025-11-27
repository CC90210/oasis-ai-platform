import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-charcoal border-t border-neon/10">
            <div className="section-container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-4 group">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI Solutions"
                                className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                            />
                            <span className="text-2xl font-display font-bold">
                                <span className="text-white">OASIS</span>
                                <span className="text-neon ml-1">AI Solutions</span>
                            </span>
                        </Link>
                        <p className="text-neon text-sm font-medium mb-3">
                            Work on your business, not in your business.
                        </p>
                        <p className="text-light-gray mb-4 max-w-md text-sm">
                            Enterprise-grade AI automation for businesses of any size. Custom-engineered solutions that transform how you work.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-light-gray">
                                <Mail className="w-4 h-4 text-neon" />
                                <a href="mailto:oasisaisolutions@gmail.com" className="hover:text-neon transition-colors">
                                    oasisaisolutions@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-light-gray">
                                <Phone className="w-4 h-4 text-neon" />
                                <a href="tel:705-440-3117" className="hover:text-neon transition-colors">
                                    705-440-3117
                                </a>
                            </div>
                            <div className="flex items-center gap-2 text-light-gray">
                                <MapPin className="w-4 h-4 text-neon" />
                                <span>Toronto, ON | Montreal, QC</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-display font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/services" className="text-light-gray hover:text-neon transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-light-gray hover:text-neon transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/pricing" className="text-light-gray hover:text-neon transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-light-gray hover:text-neon transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-display font-bold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/case-studies" className="text-light-gray hover:text-neon transition-colors">
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link to="/portal/login" className="text-light-gray hover:text-neon transition-colors">
                                    Client Portal
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:oasisaisolutions@gmail.com" className="text-light-gray hover:text-neon transition-colors">
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-neon/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-light-gray text-sm text-center md:text-left">
                            © {new Date().getFullYear()} OASIS AI Solutions. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-light-gray hover:text-neon transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-light-gray hover:text-neon transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
