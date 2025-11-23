import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Matrix configuration
    const fontSize = 14;
    // Calculate columns based on width
    const columns = Math.floor(window.innerWidth / fontSize);
    
    // An array of drops - one per column
    // drops[i] = y coordinate of the drop
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random negative heights
    }

    const draw = () => {
      // Black BG with slight opacity for trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Leblebi Colors
      const colors = ['#f4c430', '#d4a017', '#e5b73b'];

      for (let i = 0; i < drops.length; i++) {
        // Randomize leblebi characteristics
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the Leblebi (Circle)
        const radius = fontSize / 2.5;
        ctx.beginPath();
        ctx.arc(x + fontSize / 2, y + fontSize / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fill();

        // Add a slight glow occasionally
        if (Math.random() > 0.98) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#f4c430';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Reset drop to top randomly after it has crossed the screen
        // Adding randomness to the reset to make drops scattered
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none"
    />
  );
};

export default MatrixBackground;