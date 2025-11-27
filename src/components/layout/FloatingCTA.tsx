import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
                }`}
        >
            <Link
                to="/contact"
                className="group relative flex items-center gap-3 bg-[#00D4FF] hover:bg-[#00D4FF]/90 text-black font-bold px-6 py-4 rounded-full shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all duration-300 hover:scale-105"
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
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#161B22] hover:bg-[#8B949E] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Dismiss"
                >
                    <X className="w-4 h-4" />
                </button>
            </Link>
        </div>
    );
};
