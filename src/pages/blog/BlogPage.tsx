import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const BlogPage = () => {
    return (
        <div className="min-h-screen bg-bg-primary font-sans text-text-primary flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-oasis-cyan/10 rounded-full blur-[120px] animate-pulse-glow" />
            </div>

            <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block p-4 rounded-full bg-oasis-cyan/10 mb-8"
                >
                    <BookOpen className="w-12 h-12 text-oasis-cyan" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display font-bold mb-6"
                >
                    Blog & <span className="text-oasis-cyan">Resources</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-12"
                >
                    We're busy writing in-depth guides on how to automate your business. Check back soon for tutorials, case studies, and industry insights.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block px-8 py-4 rounded-full border border-oasis-cyan/30 bg-oasis-cyan/5 text-oasis-cyan font-medium"
                >
                    Coming Soon
                </motion.div>
            </div>
        </div>
    );
};

export default BlogPage;
