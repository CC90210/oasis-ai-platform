import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            setIsVisible(false);
            setTimeout(onComplete, 1000);
        };

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    const handleManualPlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden w-screen h-[100dvh] flex items-center justify-center"
                    onClick={handleManualPlay} // Allow clicking anywhere to play if blocked
                >
                    {/* Background Blur Layer (Mobile Only - Fills screen) */}
                    <div className="absolute inset-0 z-0 overflow-hidden opacity-40 md:hidden">
                        <video
                            className="w-full h-full object-cover blur-2xl scale-110"
                            playsInline
                        />
                    </div>

                    {/* Foreground Content Layer */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-0 md:p-0">
                        <video
                            ref={videoRef}
                            id="splash-screen-video"
                            // Mobile: object-contain (show full logo), max-h-full
                            // Desktop: object-cover (fill screen), w-full, h-full
                            className="w-full h-full object-contain md:object-cover shadow-2xl md:shadow-none"
                            src="/videos/video_2025-12-04_16-19-42.mp4"
                            playsInline
                            muted
                            preload="auto"
                        >
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Button Fallback (Only shows if autoplay failed and not playing) */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/20">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleManualPlay();
                                    }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white/20 transition-all"
                                >
                                    Enter OASIS
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
