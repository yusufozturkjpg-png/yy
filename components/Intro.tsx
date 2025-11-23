import React, { useEffect, useState } from 'react';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Su akıyor...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Animation loop for filling the bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random increment for organic feel
        return prev + Math.random() * 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setStatusText("Su yolunu buldu");
      
      // Wait a moment after completion before fading out
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        // Wait for fade out animation to finish before unmounting
        setTimeout(onComplete, 1000);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full bg-black transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Loading Container */}
      <div className="relative w-48 h-48 border-4 border-blue-500/30 rounded-full overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.5)]">
        {/* Water Level */}
        <div 
          className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ height: `${progress}%` }}
        >
          {/* Wave Effect using CSS pseudo-shape rotation defined in index.html */}
          <div 
            className="absolute top-0 left-1/2 w-[300%] h-[300%] bg-blue-400/40 rounded-[40%] wave-animation pointer-events-none"
            style={{ 
              marginTop: '-150%', // Center the wave vertically relative to the water top
            }} 
          />
        </div>

        {/* Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center z-10 mix-blend-overlay">
          <span className="text-4xl font-bold text-white">{Math.floor(progress)}%</span>
        </div>
      </div>

      {/* Status Text */}
      <h2 className="mt-8 text-2xl font-light tracking-widest text-blue-200 animate-pulse">
        {statusText}
      </h2>
    </div>
  );
};

export default Intro;