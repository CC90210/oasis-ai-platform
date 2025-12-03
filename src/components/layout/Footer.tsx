import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail, MapPin, Globe } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="relative z-50 bg-bg-secondary border-t border-white/5 pt-20 pb-10">
            <div className="section-container">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <img src="/images/oasis-logo.jpg" alt="OASIS AI" className="w-10 h-10 rounded-xl shadow-lg shadow-oasis-cyan/20 group-hover:shadow-oasis-cyan/40 transition-all" />
                            <span className="font-display font-bold text-xl tracking-tight text-white">
                                OASIS <span className="text-oasis-cyan">AI</span>
                            </span>
                        </Link>
                        <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                            Empowering businesses with intelligent automation solutions.
                            We build the digital workforce of tomorrow, today.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><Link to="/services" className="text-text-secondary hover:text-oasis-cyan transition-colors">Services</Link></li>
                            <li><Link to="/pricing" className="text-text-secondary hover:text-oasis-cyan transition-colors">Pricing</Link></li>
                            <li><Link to="/case-studies" className="text-text-secondary hover:text-oasis-cyan transition-colors">Case Studies</Link></li>
                            <li><Link to="/blog" className="text-text-secondary hover:text-oasis-cyan transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="text-text-secondary hover:text-oasis-cyan transition-colors">Contact</Link></li>
                            <li><Link to="/portal/login" className="text-text-secondary hover:text-oasis-cyan transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Mail className="w-5 h-5 text-oasis-cyan flex-shrink-0" />
                                <a href="mailto:oasisaisolutions@gmail.com" className="hover:text-white transition-colors">oasisaisolutions@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <MapPin className="w-5 h-5 text-oasis-cyan flex-shrink-0" />
                                <span>Montreal & Ontario, Canada</span>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Globe className="w-5 h-5 text-oasis-cyan flex-shrink-0" />
                                <span>Serving Clients Worldwide</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-tertiary text-sm">
                        © {new Date().getFullYear()} OASIS AI Solutions. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-text-tertiary">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
