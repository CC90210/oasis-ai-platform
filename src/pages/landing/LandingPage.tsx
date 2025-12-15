import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Zap, Clock, TrendingUp, CheckCircle, ArrowRight, Sparkles, Brain, MessageSquare, Calendar, Mail, Database, Phone, Star, ChevronDown, ChevronUp, Target, PlayCircle } from 'lucide-react';
import { NeuralNetworkBackground } from '../../components/animations/NeuralNetworkBackground';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    const [roiInputs, setRoiInputs] = useState({
        hoursPerWeek: 10,
        hourlyRate: 50,
        missedLeads: 10,
        leadValue: 100
    });

    const calculateROI = () => {
        const monthlyTimeSavings = roiInputs.hoursPerWeek * 4 * roiInputs.hourlyRate;
        const monthlyLeadRevenue = roiInputs.missedLeads * roiInputs.leadValue;
        const totalMonthlyValue = monthlyTimeSavings + monthlyLeadRevenue;
        return {
            monthly: totalMonthlyValue,
            annual: totalMonthlyValue * 12
        };
    };

    const roi = calculateROI();

    const faqs = [
        { q: "How long does implementation take?", a: "For individual agents, we can have you up and running in 3-5 business days. Custom integration suites typically take 7-14 days depending on complexity." },
        { q: "What's included in the monthly retainer?", a: "The retainer covers server hosting, API credits (OpenAI, Anthropic, etc.), ongoing maintenance, bug fixes, and support. It ensures your AI employees keep working 24/7." },
        { q: "Can I start small and add more later?", a: "Absolutely. Many clients start with a single agent (like our Website Chat Widget) and expand to full automation suites as they see the ROI." },
        { q: "Do I need to be located near your office?", a: "Not at all! We serve clients internationally. All our services are delivered remotely via video calls, secure collaboration tools, and our client portal. Your location doesn't limit what we can do for you." },
        { q: "What industries do you work with?", a: "We specialize in HVAC, fitness, wellness, beauty, e-commerce, and professional services, but our agents can be trained for any industry." },
        { q: "Do I need technical knowledge?", a: "None at all. We handle all the technical setup, integration, and maintenance. You just tell us what you need the AI to do." },
        { q: "What happens if something breaks?", a: "Our systems have 99.9% uptime monitoring. If an issue occurs, our team is alerted immediately and typically resolves it before you even notice." }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Dynamic Particle Generation
        const container = document.getElementById('particles-container');
        if (container) {
            container.innerHTML = ''; // Clear existing
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'absolute bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(0,212,255,0.8)] animate-particle-float';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.opacity = '0';
                // Inline floating animation logic would be complex with just style, relying on tailwind classes or global css below
                // Since we don't have global CSS access easily here, we'll try to use a style block inject

                // Randomize animation
                const duration = 3 + Math.random() * 3;
                const delay = Math.random() * 4;

                particle.style.animation = `float ${duration}s ease-in-out infinite ${delay}s`;

                container.appendChild(particle);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">
            {/* DNA Helix Styles Injection */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); opacity: 0.3; }
                    25% { transform: translate(15px, -30px); opacity: 1; }
                    50% { transform: translate(-10px, -10px); opacity: 0.7; }
                    75% { transform: translate(5px, -40px); opacity: 0.9; }
                }
                @keyframes dnaFlow {
                    0%, 100% { transform: translateY(-20px) scaleY(0.9); opacity: 0.4; }
                    50% { transform: translateY(20px) scaleY(1.1); opacity: 1; }
                }
                @keyframes connectionPulse {
                    0%, 100% { opacity: 0.2; transform: scaleX(0.8); }
                    50% { opacity: 0.8; transform: scaleX(1); }
                }
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 0.8; }
                }
                 @keyframes gridShift {
                    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
                    100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
                }
            `}</style>

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
                {/* Hero Background */}
                <div className="absolute inset-0 z-0">
                    {/* Grid Background */}
                    <div className="absolute inset-0 z-0 opacity-30" style={{
                        backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                        animation: 'gridShift 20s linear infinite'
                    }} />

                    {/* Glow Orbs */}
                    <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.4)_0%,transparent_70%)] animate-[orbPulse_5s_ease-in-out_infinite]" />
                    <div className="absolute bottom-[10%] left-[-50px] w-[250px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.4)_0%,transparent_70%)] animate-[orbPulse_5s_ease-in-out_infinite_1.5s]" />

                    {/* DNA Helix */}
                    <div className="absolute inset-0 w-full h-full">
                        {[20, 35, 50, 65, 80].map((left, idx) => (
                            <div
                                key={idx}
                                className="absolute w-1 h-full bg-gradient-to-b from-transparent via-[#00D4FF] to-transparent rounded-full"
                                style={{
                                    left: `${left}%`,
                                    animation: `dnaFlow 3s ease-in-out infinite ${idx * 0.5}s`
                                }}
                            />
                        ))}

                        {/* Static Connections for visual effect */}
                        {Array.from({ length: 15 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF]/80 to-transparent left-[20%] w-[60%]"
                                style={{
                                    top: `${(i / 15) * 100}%`,
                                    animation: `connectionPulse 2s ease-in-out infinite ${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Particles Container */}
                    <div id="particles-container" className="absolute inset-0" />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
                        <Zap size={16} className="mr-2 fill-cyan-400" />
                        <span>The Future of Automation is Here</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up delay-100">
                        Scale Your Business <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                            Without Limits
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
                        Deploy intelligent automations that work 24/7. Capture leads, book appointments, and streamline operations with OASIS AI.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
                        <button
                            onClick={() => navigate('/pricing')}
                            className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] flex items-center justify-center"
                        >
                            View Automations
                            <ArrowRight className="ml-2" size={20} />
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-700 hover:border-cyan-500 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center hover:bg-cyan-500/5"
                        >
                            <PlayCircle className="mr-2" size={20} />
                            Book Demo
                        </button>
                    </div>
                </div>
            </div>
            {/* Section 2: Pain Points */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Sound Familiar?</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">The Challenges We Solve</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, text: "Drowning in repetitive admin tasks" },
                            { icon: Zap, text: "Missing leads after business hours" },
                            { icon: TrendingUp, text: "Inconsistent customer response times" },
                            { icon: Bot, text: "Can't scale without hiring more staff" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 hover:border-oasis-cyan/50 group"
                            >
                                <div className="p-3 rounded-lg bg-oasis-cyan/10 w-fit mb-4 group-hover:bg-oasis-cyan/20 transition-colors">
                                    <item.icon className="w-8 h-8 text-oasis-cyan" />
                                </div>
                                <p className="text-lg font-medium leading-relaxed whitespace-normal">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Services Overview */}
            <section className="py-24 bg-bg-primary relative overflow-hidden">
                <div className="section-container relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">What We Automate</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">AI Agents That Work 24/7</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: MessageSquare, title: "Customer Support", desc: "Instant answers to FAQs and support tickets, 24/7.", slug: "chat-widget" },
                            { icon: Target, title: "Lead Capture", desc: "Qualify and route leads from your website automatically.", slug: "lead-capture" },
                            { icon: Calendar, title: "Appointment Booking", desc: "Schedule meetings without the back-and-forth emails.", slug: "appointment-booking" },
                            { icon: Mail, title: "Email Automation", desc: "Draft and send personalized responses to common emails.", slug: "email-automation" },
                            { icon: Star, title: "Review Management", desc: "Monitor and respond to Google reviews instantly.", slug: "google-reviews" },
                            { icon: Phone, title: "Voice AI (Phone)", desc: "Handle inbound and outbound calls with natural AI voice.", slug: "voice-ai" }
                        ].map((service, index) => (
                            <Link to={`/pricing`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-8 h-full hover:shadow-oasis transition-all duration-300 group"
                                >
                                    <div className="mb-6 inline-block p-4 rounded-xl bg-bg-tertiary border border-white/10 group-hover:border-oasis-cyan/50 transition-colors">
                                        <service.icon className="w-8 h-8 text-oasis-cyan group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-oasis-cyan transition-colors">{service.title}</h3>
                                    <p className="text-text-secondary leading-relaxed mb-4">{service.desc}</p>
                                    <span className="text-oasis-cyan text-sm font-medium flex items-center">
                                        Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 4: How It Works */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">How It Works</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">From Consultation to Automation</h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="relative">
                            {/* Connector Line */}
                            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-oasis-cyan/50 to-transparent md:-translate-x-1/2" />

                            {[
                                { title: "Discovery Call", desc: "We learn your processes and identify automation opportunities.", time: "15-30 min" },
                                { title: "Custom Proposal", desc: "We design a detailed plan with fixed pricing and deliverables.", time: "2-3 days" },
                                { title: "Build & Deploy", desc: "Our team builds your agents. You approve each milestone.", time: "5-14 days" },
                                { title: "Training & Launch", desc: "We train your team and ensure a smooth handover.", time: "1 day" },
                                { title: "Ongoing Support", desc: "We monitor and optimize your agents to ensure performance.", time: "Monthly" }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`relative flex items-center gap-4 md:gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="hidden md:block flex-1" />

                                    <div className="flex-shrink-0 relative z-10">
                                        <div className="w-12 h-12 rounded-full bg-bg-primary border-2 border-oasis-cyan flex items-center justify-center font-bold text-oasis-cyan shadow-oasis">
                                            {index + 1}
                                        </div>
                                    </div>

                                    <div className="flex-1 glass-card p-6 md:p-8 border-l-4 border-l-oasis-cyan">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                            <span className="text-xs font-mono text-oasis-cyan bg-oasis-cyan/10 px-2 py-1 rounded">{step.time}</span>
                                        </div>
                                        <p className="text-text-secondary">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Pricing Preview */}
            <section className="py-24 bg-bg-primary relative">
                <div className="section-container">
                    <div className="text-center mb-20">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Simple Pricing</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">Investment That Pays for Itself</h2>
                        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                            Enterprise-grade automation at 65-75% below agency rates.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Launchpad */}
                        <div className="glass-card p-8 flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">OASIS Launchpad</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">$1,497</div>
                            <p className="text-text-secondary mb-6">Perfect for getting started with one powerful workflow.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 1 Custom AI Agent</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Website Chat Widget</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 30 Days Support</li>
                            </ul>
                            <Link to="/checkout?agent=launchpad" className="btn-secondary w-full text-center">Get Started</Link>
                        </div>

                        {/* Integration Suite */}
                        <div className="glass-card p-8 flex flex-col border-oasis-cyan relative transform md:-translate-y-4 shadow-oasis">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-oasis-cyan text-bg-primary px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>
                            <h3 className="text-2xl font-bold text-white mb-2">Integration Suite</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">$5,000</div>
                            <p className="text-text-secondary mb-6">Comprehensive automation for growing businesses.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 3-5 Custom Agents</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Voice AI + Chat</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> CRM Integration</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> 90 Days Support</li>
                            </ul>
                            <Link to="/contact" className="btn-primary w-full text-center">Book Consultation</Link>
                        </div>

                        {/* Individual Agents */}
                        <div className="glass-card p-8 flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-2">Individual Agents</h3>
                            <div className="text-3xl font-bold text-oasis-cyan mb-4">From $797</div>
                            <p className="text-text-secondary mb-6">Know exactly what you need? Pick and choose.</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Self-Checkout Available</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Specific Solutions</li>
                                <li className="flex items-center text-sm text-text-secondary"><CheckCircle className="w-4 h-4 text-oasis-cyan mr-2" /> Rapid Deployment</li>
                            </ul>
                            <Link to="/pricing" className="btn-secondary w-full text-center">Browse Agents</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6: ROI Calculator */}
            <section className="py-24 bg-bg-secondary relative">
                <div className="section-container">
                    <div className="text-center mb-16">
                        <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Calculate Your Savings</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 mb-6">See How Much AI Can Save You</h2>
                    </div>

                    <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Hours spent on admin per week: <span className="text-oasis-cyan font-bold">{roiInputs.hoursPerWeek}</span></label>
                                    <input
                                        type="range" min="0" max="40" value={roiInputs.hoursPerWeek}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, hoursPerWeek: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Your hourly rate: <span className="text-oasis-cyan font-bold">${roiInputs.hourlyRate}</span></label>
                                    <input
                                        type="range" min="25" max="200" step="5" value={roiInputs.hourlyRate}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, hourlyRate: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Leads missed per month: <span className="text-oasis-cyan font-bold">{roiInputs.missedLeads}</span></label>
                                    <input
                                        type="range" min="0" max="100" value={roiInputs.missedLeads}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, missedLeads: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-2">Average value per lead: <span className="text-oasis-cyan font-bold">${roiInputs.leadValue}</span></label>
                                    <input
                                        type="range" min="50" max="1000" step="50" value={roiInputs.leadValue}
                                        onChange={(e) => setRoiInputs({ ...roiInputs, leadValue: parseInt(e.target.value) })}
                                        className="w-full accent-oasis-cyan"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center space-y-6 bg-bg-tertiary/50 p-6 rounded-xl border border-white/5">
                                <div className="text-center">
                                    <div className="text-sm text-text-tertiary mb-1">Potential Monthly Value</div>
                                    <div className="text-4xl font-bold text-oasis-cyan">${roi.monthly.toLocaleString()}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-text-tertiary mb-1">Potential Annual Value</div>
                                    <div className="text-3xl font-bold text-white">${roi.annual.toLocaleString()}</div>
                                </div>
                                <div className="pt-4 border-t border-white/10 text-center">
                                    <p className="text-sm text-text-secondary mb-4">Most agents pay for themselves in &lt; 1 month.</p>
                                    <Link to="/contact" className="btn-primary w-full block">Get Your Custom Quote</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 7: Case Study */}
            <section className="py-24 bg-bg-primary relative">
                <div className="section-container">
                    <div className="glass-card p-8 md:p-12 border-oasis-cyan/20">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-oasis-cyan font-medium tracking-wider uppercase text-sm">Real Results</span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold mt-2 mb-6">How We Transformed an E-Commerce Brand</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Challenge:</strong> Overwhelmed support team, missed opportunities.</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Solution:</strong> 24/7 AI support + cart recovery + upsells.</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="w-1.5 h-1.5 rounded-full bg-oasis-cyan mt-2 mr-3" />
                                        <p className="text-text-secondary"><strong className="text-white">Results:</strong> 40% reduction in workload, 15% revenue increase.</p>
                                    </div>
                                </div>
                                <blockquote className="border-l-4 border-oasis-cyan pl-4 italic text-text-tertiary mb-8">
                                    "OASIS AI transformed how we handle customer interactions. What used to take hours now happens automatically."
                                </blockquote>
                                <Link to="/case-studies" className="btn-secondary">Read Full Case Study</Link>
                            </div>
                            <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden border border-white/5 group">
                                <img
                                    src="/images/case-study-ecommerce.png"
                                    alt="E-Commerce Case Study Results"
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8: FAQ */}
            <section className="py-24 bg-bg-secondary">
                <div className="section-container max-w-3xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold mb-6">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="glass-card overflow-hidden">
                                <button
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span className="font-medium text-white">{faq.q}</span>
                                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-oasis-cyan" /> : <ChevronDown className="w-5 h-5 text-text-tertiary" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-4"
                                        >
                                            <p className="text-text-secondary border-t border-white/10 pt-4">{faq.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 9: Final CTA */}
            <section className="py-32 bg-bg-secondary relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-oasis-cyan/20 rounded-full blur-[150px] animate-pulse-glow" />
                </div>

                <div className="section-container relative z-10 text-center">
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                        Ready to Build Your <br /><span className="text-oasis-cyan">AI Workforce</span>?
                    </h2>
                    <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
                        Book a free 15-minute strategy call and discover how automation can transform your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-primary text-lg px-10 py-5 shadow-oasis-strong hover:scale-105 transition-transform duration-300">
                            Book Free Strategy Call
                        </Link>
                        <a href="tel:705-440-3117" className="btn-secondary text-lg px-10 py-5">
                            Call 705-440-3117
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
