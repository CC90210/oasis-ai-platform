import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCTA = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px down
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isDismissed) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 z-40" // Moved to left to avoid conflict with chat widget
                >
                    <Link
                        to="/contact"
                        className="group relative flex items-center gap-3 bg-oasis-cyan hover:bg-oasis-cyan/90 text-bg-primary font-bold px-6 py-4 rounded-full shadow-oasis hover:shadow-oasis-strong transition-all duration-300 hover:scale-105"
                    >
                        <Phone className="w-5 h-5 animate-pulse" />
                        <span className="hidden sm:inline">Book Free Call</span>

                        {/* Dismiss button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsDismissed(true);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-bg-tertiary hover:bg-text-secondary text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
                            aria-label="Dismiss"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
