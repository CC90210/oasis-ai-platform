import React from 'react';
import { ArrowLeft, Shield, FileText, CheckCircle, UserCheck, Briefcase, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LegalHubPage() {
    const documents = [
        {
            title: 'Master Services Agreement (MSA)',
            description: 'The primary agreement governing our professional services and partnership.',
            path: '/legal/master-services-agreement',
            icon: Shield,
            type: 'Public / Client'
        },
        {
            title: 'Terms of Service',
            description: 'Rules for using our website and general engagement terms.',
            path: '/legal/terms-of-service',
            icon: FileText,
            type: 'Public'
        },
        {
            title: 'Privacy Policy',
            description: 'How we handle and protect your data.',
            path: '/legal/privacy-policy',
            icon: CheckCircle,
            type: 'Public'
        },
        {
            title: 'IP Assignment Template',
            description: 'Template for intellectual property transfer upon project completion.',
            path: '/legal/ip-assignment',
            icon: Zap,
            type: 'Template'
        },
        {
            title: 'Statement of Work (SOW)',
            description: 'Template for defining specific project scopes and deliverables.',
            path: '/legal/statement-of-work',
            icon: Briefcase,
            type: 'Template'
        },
        {
            title: 'Partnership Term Sheet',
            description: 'Proposed terms for equity-based deals and strategic partnerships.',
            path: '/legal/partnership-term-sheet',
            icon: UserCheck,
            type: 'Internal / Proposed'
        },
        {
            title: 'Contractor Agreement',
            description: 'Agreement for independent contractors and subcontractors.',
            path: '/legal/contractor-agreement',
            icon: FileText,
            type: 'Internal'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="border-b border-gray-800">
                <div className="max-w-5xl mx-auto px-4 py-4">
                    <Link
                        to="/"
                        className="text-gray-400 hover:text-white flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Legal Directory</h1>
                    <p className="text-gray-400 text-lg">
                        Compliance, transparency, and protection. Review our legal documentation and templates.
                    </p>
                </div>

                {/* Document Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {documents.map((doc, index) => (
                        <Link
                            key={index}
                            to={doc.path}
                            className="group p-6 bg-gray-800/50 border border-gray-700/50 rounded-2xl hover:bg-gray-800 hover:border-purple-500/50 transition-all duration-300 flex items-start gap-4"
                        >
                            <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors">
                                <doc.icon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                        {doc.title}
                                    </h3>
                                    <span className="text-[10px] uppercase tracking-wider font-bold bg-gray-700 text-gray-400 px-2 py-1 rounded">
                                        {doc.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {doc.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-purple-500/5 border border-purple-500/10 rounded-3xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-white mb-2">Need a Custom Agreement?</h2>
                            <p className="text-gray-400">
                                For enterprise partnerships or unique project requirements, we can draft custom tailored agreements.
                            </p>
                        </div>
                        <Link to="/contact">
                            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                Contact Legal
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Disclaimer: The documents provided here are for informational and operational purposes for OASIS AI Solutions clients and partners. We recommend independent legal review for all agreements.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Last Updated: February 9, 2026
                    </p>
                </div>
            </div>
        </div>
    );
}
