import { HelpCircle, Mail, MessageCircle, Phone } from 'lucide-react';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-[#050505] p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <HelpCircle className="w-8 h-8 text-cyan-500" />
                        Support Center
                    </h1>
                    <p className="text-gray-400 mt-2">Get help with your automations and account.</p>
                </header>

                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <a href="mailto:support@oasisai.work" className="group bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-xl hover:border-cyan-500/30 transition">
                        <Mail className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition" />
                        <h3 className="text-lg font-bold text-white mb-2">Email Support</h3>
                        <p className="text-gray-500 text-sm mb-4">Get a response within 24 hours.</p>
                        <span className="text-cyan-400 text-sm font-medium">support@oasisai.work →</span>
                    </a>

                    <div className="group bg-[#0a0a0f] border border-[#1a1a2e] p-6 rounded-xl hover:border-green-500/30 transition cursor-pointer">
                        <MessageCircle className="w-8 h-8 text-green-500 mb-4 group-hover:scale-110 transition" />
                        <h3 className="text-lg font-bold text-white mb-2">Live Chat</h3>
                        <p className="text-gray-500 text-sm mb-4">Chat with our engineering team.</p>
                        <span className="text-green-400 text-sm font-medium">Start Chat →</span>
                    </div>
                </div>

                <div className="bg-[#0a0a0f] border border-[#1a1a2e] rounded-xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6">Send us a message</h3>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                                <select className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition">
                                    <option>Technical Issue</option>
                                    <option>Billing Question</option>
                                    <option>Feature Request</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Priority</label>
                                <select className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg p-3 text-white focus:border-cyan-500 focus:outline-none transition">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea
                                rows={6}
                                className="w-full bg-[#151520] border border-[#2a2a3e] rounded-lg p-4 text-white focus:border-cyan-500 focus:outline-none transition"
                                placeholder="Describe your issue in detail..."
                            ></textarea>
                        </div>
                        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-cyan-900/20">
                            Submit Ticket
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
