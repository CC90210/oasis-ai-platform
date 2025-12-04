import React, { useEffect, useRef } from 'react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleEnded = () => {
            onComplete();
        };

        // Handle autoplay failure
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn('Autoplay prevented:', error);
                // If autoplay is blocked, we should probably show the content immediately
                // or show a "Play" button. Given the "Non-Skippable" constraint, 
                // falling back to showing content is the safest UX to avoid a stuck screen.
                onComplete();
            });
        }

        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);

    return (
        <div
            id="splash-screen"
            className="fixed inset-0 z-[9999] bg-black overflow-hidden w-screen h-screen"
        >
            <video
                ref={videoRef}
                id="splash-screen-video"
                className="w-full h-full object-cover"
                src="/videos/video_2025-12-04_13-07-15.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default SplashScreen;
