import { Twitter, Linkedin, Github, Mail, MapPin, Globe, Instagram, Disc } from 'lucide-react';
// Note: Lucide React usually exports 'Disc' or 'Gamepad2' for Discord, but often just 'Github' etc. 
// Let me verify the icon name. Common one is 'MessageSquare' or similar if specific brand icon missing, but Lucide has 'Gamepad2' or I might need to check available icons. 
// Actually, I'll check if 'Discord' is available in lucide-react. It might not be in older versions or might be named differently.
// Let's assume standard 'Discord' might not be there, but I'll try 'MessageCircle' as fallback or check imports.
// Wait, I can see the previous file content had Twitter, Linkedin etc.
// Let's try adding `MessageCircle` as a generic community icon if `Discord` isn't there, OR better yet, let me check the file content first or just try to import it.
// Actually, standard Lucide package often doesn't have brand icons except a few. 
// However, looking at the previous file content: `import { Twitter, Linkedin, Github... }`
// Any chance `Discord` is there? 
// I will try to import `MessageCircle` as a safe bet for "Community" or "Discord" if the specific icon isn't guaranteed. 
// User wants a Discord link. 
// Let's look at `Footer.tsx` again to be sure what I can standardly use.
// I'll stick to adding `MessageCircle` (often used for chat/discord) or I can try `Gamepad2`.
// BETTER PLAN: I will check `node_modules` or just use a generic icon if I am not sure, BUT `lucide-react` does have `MessageCircle`. 
// actually, I will use `MessageCircle` and maybe style it or just label it.
// Wait, I will use `MessageCircle` for now.

import { Twitter, Linkedin, Github, Mail, MapPin, Globe, Instagram, MessageCircle } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="relative z-50 bg-bg-secondary border-t border-white/5 pt-20 pb-10">
            <div className="section-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
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
                            <a href="https://www.instagram.com/oasisaisolutions?igsh=MWtjYWk3bHdreXYxYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/Conaugh90210" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/conaugh-mckenna-a82471352" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://github.com/CC90210/oasis-ai-platform" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-oasis-cyan/20 hover:text-oasis-cyan transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://discord.gg/pprh394E" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-lg hover:bg-[#5865F2]/20 hover:text-[#5865F2] transition-colors" title="Join our Discord">
                                <MessageCircle className="w-5 h-5" />
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

                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Mail className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                <a href="mailto:oasisaisolutions@gmail.com" className="hover:text-white transition-colors break-all">oasisaisolutions@gmail.com</a>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <MapPin className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
                                <span className="break-words">Montreal & Ontario, Canada</span>
                            </li>
                            <li className="flex items-start gap-3 text-text-secondary">
                                <Globe className="w-5 h-5 text-oasis-cyan flex-shrink-0 mt-1" />
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
