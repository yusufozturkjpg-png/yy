import React, { useEffect, useState } from 'react';
import AsciiArtGenerator from './AsciiArtGenerator';

const Terminal: React.FC = () => {
  const [typedMessage, setTypedMessage] = useState('');
  const [showFooter, setShowFooter] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  // The main message to type out
  const fullMessage = "Bize sadece kod yazmayı değil, hayata farklı bir pencereden bakmayı öğrettiğiniz için teşekkür ederiz...";

  useEffect(() => {
    // Delay typing slightly to let the terminal fade in
    const timer = setTimeout(() => setStartTyping(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    if (typedMessage.length < fullMessage.length) {
      const timeout = setTimeout(() => {
        setTypedMessage(fullMessage.slice(0, typedMessage.length + 1));
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Message finished typing, show footer
      const footerTimer = setTimeout(() => {
        setShowFooter(true);
      }, 500);
      return () => clearTimeout(footerTimer);
    }
  }, [startTyping, typedMessage, fullMessage]);

  return (
    <div className="w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden bg-black/80 backdrop-blur-md border border-[#f4c430] shadow-[0_0_30px_rgba(244,196,48,0.2)] rounded-lg">
      
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-2 bg-[#f4c430]/10 border-b border-[#f4c430]/30">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-[#f4c430] text-xs font-mono opacity-80">
          teacher_day_gift.exe — bash — 80x24
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-6 overflow-y-auto font-mono text-sm sm:text-base flex flex-col items-center text-center">
        
        {/* Date Command */}
        <div className="w-full text-left mb-6 text-gray-400">
            <span className="text-green-500">student@class</span>:<span className="text-blue-500">~</span>$ ./start_celebration.sh
        </div>

        {/* ASCII Art Area */}
        <div className="mb-8">
            <AsciiArtGenerator />
        </div>

        {/* Typed Message */}
        <div className="min-h-[60px] max-w-2xl text-[#f4c430] text-lg leading-relaxed">
          {typedMessage}
          <span className="animate-pulse inline-block w-2 h-5 bg-[#f4c430] ml-1 align-middle"></span>
        </div>

        {/* Footer Celebration */}
        <div className={`mt-10 transition-all duration-1000 transform ${showFooter ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#f4c430] via-yellow-200 to-[#d4a017] drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
            ÖĞRETMENLER GÜNÜNÜZ<br/>KUTLU OLSUN!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Terminal;