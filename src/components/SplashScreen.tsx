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
            setTimeout(onComplete, 800);
        };

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    const handleManualPlay = () => {
        if (videoRef.current) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="fixed inset-0 z-[9999] bg-black w-screen h-[100dvh] flex items-center justify-center overflow-hidden"
                    onClick={handleManualPlay}
                >
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <video
                            ref={videoRef}
                            id="splash-screen-video"
                            className="w-full h-full object-cover"
                            src="/videos/video_2025-12-04_16-19-42.mp4"
                            playsInline
                            muted
                            preload="auto"
                            // Optimize rendering hint
                            style={{ willChange: 'transform, opacity' }}
                        >
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Button Fallback */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm transition-all duration-300">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleManualPlay();
                                    }}
                                    className="px-8 py-3 bg-white/10 border border-white/20 hover:bg-white/20 text-white rounded-full font-display font-medium tracking-wide uppercase transition-all transform hover:scale-105 backdrop-blur-md shadow-[0_0_30px_rgba(0,212,255,0.2)]"
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
