import React from 'react';
import { Bot, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
    companyName?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ companyName }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto">
                <div className="bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-700/50">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Header Icon */}
                        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center border-2 border-cyan-500/20 shadow-lg shadow-cyan-500/10">
                            <Bot className="w-12 h-12 text-cyan-400" />
                        </div>

                        {/* Welcome Text */}
                        <div className="space-y-4 max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                No Active Automations Yet
                            </h1>
                            <p className="text-gray-400 text-lg">
                                Welcome to your OASIS AI portal{companyName ? `, ${companyName}` : ''}.
                                Your automated workforce is ready to be deployed.
                            </p>
                        </div>

                        {/* Action Cards */}
                        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mt-8">
                            <a
                                href="https://oasisai.ca/services"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex flex-col items-center space-y-4">
                                    <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                                        <Bot className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Browse Services</h3>
                                    <p className="text-gray-400 text-sm">Discover how our AI agents can transform your business operations.</p>
                                    <span className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                                        View Solutions <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </a>

                            <a
                                href="https://oasisai.ca/contact"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex flex-col items-center space-y-4">
                                    <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                                        <Calendar className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Schedule Consultation</h3>
                                    <p className="text-gray-400 text-sm">Book a strategy call to design your custom automation roadmap.</p>
                                    <span className="flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300">
                                        Book Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </a>
                        </div>

                        {/* Benefits List */}
                        <div className="pt-8 border-t border-gray-700/50 w-full max-w-2xl">
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                                Why Automate with OASIS AI?
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4 text-left">
                                {[
                                    '24/7 Operational Capacity',
                                    'Instant Response Times',
                                    'Zero Human Error',
                                    'Scales Infinitely',
                                    'Data-Driven Insights'
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
