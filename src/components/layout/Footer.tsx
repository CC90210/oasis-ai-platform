import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer style={{ background: '#0A0A0F', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                                OASIS <span className="text-[#00D4FF]">AI</span>
                            </span>
                        </Link>
                        <p className="text-[#94A3B8] text-sm mb-6 leading-relaxed">
                            AI automation for small businesses. Work ON your business, not IN it.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="text-[#64748B] hover:text-[#00D4FF] transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm">
                            {['AI Chatbots', 'Voice AI', 'Workflow Automation', 'CRM Integration'].map((item) => (
                                <li key={item}>
                                    <Link to="/services" className="text-[#9CA3AF] hover:text-[#00D4FF] transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="text-[#9CA3AF] hover:text-[#00D4FF] transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="text-[#9CA3AF] hover:text-[#00D4FF] transition-colors">Our Process</Link></li>
                            <li><Link to="/case-studies" className="text-[#9CA3AF] hover:text-[#00D4FF] transition-colors">Case Studies</Link></li>
                            <li><Link to="/portal/login" className="text-[#9CA3AF] hover:text-[#00D4FF] transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3 text-[#9CA3AF]">
                                <Mail className="w-5 h-5 text-[#00D4FF] mt-0.5 shrink-0" />
                                <a href="mailto:oasisaisolutions@gmail.com" className="hover:text-[#00D4FF] transition-colors break-all">
                                    oasisaisolutions@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-[#9CA3AF]">
                                <Phone className="w-5 h-5 text-[#00D4FF] mt-0.5 shrink-0" />
                                <a href="tel:705-440-3117" className="hover:text-[#00D4FF] transition-colors">
                                    705-440-3117
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-[#9CA3AF]">
                                <MapPin className="w-5 h-5 text-[#00D4FF] mt-0.5 shrink-0" />
                                <span>Toronto, ON | Montreal, QC</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[#64748B] text-sm">
                        © {new Date().getFullYear()} OASIS AI Solutions. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="#" className="text-[#64748B] text-sm hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-[#64748B] text-sm hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
