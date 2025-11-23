import React, { useEffect, useState, useRef } from 'react';

// Characters sorted by density (dark to light)
const DENSITY_CHARS = "@%#*+=-:. ";

const AsciiArtGenerator: React.FC = () => {
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const processImage = () => {
      const img = new Image();
      // Use the requested file name. 
      // Ensure image_0.png exists in the public/ root folder.
      img.src = 'image_0.png'; 
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Determine resolution based on screen width
        // Mobile needs fewer characters to fit in the pre tag
        const isMobile = window.innerWidth < 640;
        const widthResolution = isMobile ? 40 : 80;
        
        // Calculate height maintaining aspect ratio
        // Note: Characters are roughly 2x taller than wide, so we divide height by 2
        const aspectRatio = img.height / img.width;
        const heightResolution = Math.floor(widthResolution * aspectRatio * 0.55);

        canvas.width = widthResolution;
        canvas.height = heightResolution;

        // Draw image to small canvas
        ctx.drawImage(img, 0, 0, widthResolution, heightResolution);

        // Get pixel data
        const imageData = ctx.getImageData(0, 0, widthResolution, heightResolution);
        const data = imageData.data;

        let asciiStr = "";

        for (let y = 0; y < heightResolution; y++) {
          for (let x = 0; x < widthResolution; x++) {
            const offset = (y * widthResolution + x) * 4;
            const r = data[offset];
            const g = data[offset + 1];
            const b = data[offset + 2];

            // Calculate brightness
            const avg = (r + g + b) / 3;
            
            // Map brightness to character
            const charIndex = Math.floor((avg / 255) * (DENSITY_CHARS.length - 1));
            asciiStr += DENSITY_CHARS[charIndex];
          }
          asciiStr += "\n";
        }

        setAsciiArt(asciiStr);
        setIsLoading(false);
      };

      img.onerror = () => {
        console.error("Failed to load image_0.png. Using fallback.");
        setIsError(true);
        setIsLoading(false);
      };
    };

    processImage();
  }, []);

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-48 w-full border border-dashed border-gray-700 rounded p-4">
            <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-gray-500 text-xs">Processing Visual Data...</span>
        </div>
    );
  }

  if (isError) {
    // Fallback if image_0.png is missing or CORS error
    return (
      <div className="flex flex-col items-center border border-yellow-600/50 p-4 rounded bg-yellow-900/10">
        {/* Placeholder visualization */}
        <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mb-4 border-2 border-[#f4c430]">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#f4c430]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </div>
        <p className="text-red-400 text-xs mb-2">[Error: image_0.png not found]</p>
        <p className="text-gray-400 text-xs max-w-md">
            Please ensure <code>image_0.png</code> is placed in the project root.
            Displaying system default.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center animate-[fadeIn_2s_ease-out]">
        <canvas ref={canvasRef} className="hidden" />
        <pre 
            className="font-mono text-[8px] sm:text-[10px] md:text-xs leading-[0.6] sm:leading-[0.6] tracking-tighter text-[#f4c430] whitespace-pre select-none pointer-events-none"
            style={{ 
                textShadow: '0 0 5px rgba(244, 196, 48, 0.5)'
            }}
        >
            {asciiArt}
        </pre>
    </div>
  );
};

export default AsciiArtGenerator;