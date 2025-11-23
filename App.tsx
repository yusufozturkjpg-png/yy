import React, { useState } from 'react';
import Intro from './components/Intro';
import MatrixBackground from './components/MatrixBackground';
import Terminal from './components/Terminal';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'main'>('intro');

  const handleIntroComplete = () => {
    setPhase('main');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Phase 1: Intro - Water Loading */}
      {phase === 'intro' && (
        <div className="absolute inset-0 z-50">
          <Intro onComplete={handleIntroComplete} />
        </div>
      )}

      {/* Phase 2 & 3: Main Interface - Leblebi Matrix & Terminal */}
      {phase === 'main' && (
        <div className="relative w-full h-full animate-[fadeIn_1s_ease-in]">
          <MatrixBackground />
          <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
            <Terminal />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;