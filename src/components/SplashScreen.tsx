import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            // Trigger fade out
            setIsVisible(false);
            // Wait for animation to finish before calling onComplete
            setTimeout(onComplete, 1000);
        };

        // Handle autoplay failure
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Autoplay prevented:', error);
                handleEnded();
            });
        }

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="splash-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black overflow-hidden w-screen h-[100dvh] flex items-center justify-center"
                >
                    {/* Background Blur Layer (Fills screen) */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <video
                            className="w-full h-full object-cover scale-110 blur-xl opacity-50"
                            src="/videos/Video_Upgrade_Request_Fulfilled.mp4"
                            autoPlay
                            muted
                            playsInline
                            loop
                        />
                    </div>

                    {/* Foreground Content Layer (Shows full video) */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <video
                            ref={videoRef}
                            id="splash-screen-video"
                            // object-contain ensures the whole video is visible (zoomed out)
                            // scale-105 slightly zooms to hide watermark if near edges
                            className="w-full h-full object-contain scale-105 shadow-2xl"
                            src="/videos/Video_Upgrade_Request_Fulfilled.mp4"
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
