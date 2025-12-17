import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset state
        setVideoReady(false);
        setHasError(false);

        const handleCanPlay = () => {
            console.log("Video ready to play");
            setVideoReady(true);
        };

        const handleEnded = () => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
        };

        const handleError = (e: Event) => {
            console.error("Video error:", e);
            setHasError(true);
            // If video fails, auto-complete after delay? 
            // Or just show fallback button that calls onComplete?
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        // Force load
        video.load();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('error', handleError);
        };
    }, [onComplete]);

    const handleEnterClick = async () => {
        if (hasError) {
            // If error, just skip
            setIsVisible(false);
            onComplete();
            return;
        }

        if (videoRef.current) {
            try {
                await videoRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.error("Play failed:", err);
                // Fallback: just exit
                setIsVisible(false);
                onComplete();
            }
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
                >
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                        {/* Fallback Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a14] via-[#0d1a1a] to-[#0a0a14]" />

                        <video
                            ref={videoRef}
                            id="splash-screen-video"
                            className={`absolute inset-0 w-full h-full object-contain md:object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
                            src="/videos/video_2025-12-04_16-19-42.mp4"
                            playsInline
                            muted
                            preload="auto"
                        // No autoPlay
                        />

                        {/* Controls / Loader */}
                        <div className="relative z-20 flex flex-col items-center gap-6">

                            {/* Loading Spinner */}
                            {!videoReady && !hasError && (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                                    <span className="text-cyan-500/50 text-xs tracking-widest uppercase">Loading Experience</span>
                                </div>
                            )}

                            {/* Enter Button - Only shows when ready */}
                            {(videoReady || hasError) && !isPlaying && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={handleEnterClick}
                                    className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 text-white rounded-full font-display font-medium tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] group"
                                >
                                    <span className="group-hover:text-cyan-400 transition-colors">Enter OASIS</span>
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
