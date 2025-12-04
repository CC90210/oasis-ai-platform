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
                    <video
                        ref={videoRef}
                        id="splash-screen-video"
                        // object-cover: Fills the screen completely.
                        // scale-105 (mobile): Minimal zoom to hide watermark without losing too much content.
                        // md:scale-110 (desktop): Larger zoom for wider screens.
                        className="w-full h-full object-cover object-center scale-105 md:scale-110"
                        src="/videos/video_2025-12-04_16-19-42.mp4"
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                    >
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
