import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-bg-primary border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Main Footer Grid */}
                <div className="grid md:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <img
                                src="/images/oasis-logo.jpg"
                                alt="OASIS AI"
                                className="h-8 w-auto rounded transition-transform duration-300 group-hover:scale-105"
                            />
                            <span className="font-display font-bold text-lg text-white">
                                OASIS <span className="text-oasis-cyan">AI</span>
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                            AI automation for small businesses. Work ON your business, not IN it.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="text-text-tertiary hover:text-oasis-cyan transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            {[
                                { name: 'Chat Agents', link: '/services/chat-widget' },
                                { name: 'Voice AI', link: '/services/voice-ai' },
                                { name: 'Email Automation', link: '/services/email-automation' },
                                { name: 'Review Management', link: '/services/google-reviews' },
                                { name: 'Lead Qualification', link: '/services/lead-capture' },
                                { name: 'Custom Solutions', link: '/services' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.link} className="text-text-secondary hover:text-oasis-cyan transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-text-secondary hover:text-oasis-cyan transition-colors">About Us</Link></li>
                            <li><Link to="/blog" className="text-text-secondary hover:text-oasis-cyan transition-colors">Blog</Link></li>
                            <li><Link to="/case-studies" className="text-text-secondary hover:text-oasis-cyan transition-colors">Case Studies</Link></li>
                            <li><Link to="/portal/login" className="text-text-secondary hover:text-oasis-cyan transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Mail className="w-5 h-5 text-oasis-cyan mt-0.5 shrink-0" />
                                <a href="mailto:oasisaisolutions@gmail.com" className="hover:text-oasis-cyan transition-colors break-all">
                                    oasisaisolutions@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Phone className="w-5 h-5 text-oasis-cyan mt-0.5 shrink-0" />
                                <a href="tel:705-440-3117" className="hover:text-oasis-cyan transition-colors">
                                    705-440-3117
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <MapPin className="w-5 h-5 text-oasis-cyan mt-0.5 shrink-0" />
                                <span>Toronto, ON | Montreal, QC</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-tertiary text-sm">
                        © {new Date().getFullYear()} OASIS AI Solutions. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="#" className="text-text-tertiary text-sm hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-text-tertiary text-sm hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
