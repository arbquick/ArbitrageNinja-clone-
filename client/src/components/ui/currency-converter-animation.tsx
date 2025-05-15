import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Currency symbols to animate
const fiatSymbols = ['$', '£', '€', '¥', '₹', '₽', '₩', 'Fr'];
const cryptoSymbols = ['₿', 'Ξ', '◎', 'Ɖ', 'Ł', '₳', 'Ꜧ', 'Đ', 'ξ', 'Ƀ'];

interface CurrencyConverterAnimationProps {
  className?: string;
}

export function CurrencyConverterAnimation({ className }: CurrencyConverterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [symbolsInMotion, setSymbolsInMotion] = useState<React.ReactNode[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Generate new symbols at intervals
  useEffect(() => {
    if (dimensions.width === 0) return;
    
    const interval = setInterval(() => {
      generateNewSymbol();
    }, 1200); // Generate a new symbol every 1.2 seconds
    
    return () => clearInterval(interval);
  }, [dimensions]);

  // Function to generate a new currency symbol animation
  const generateNewSymbol = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const isFiat = symbolsInMotion.length % 2 === 0;
    
    // Random symbol from appropriate array
    const symbol = isFiat 
      ? fiatSymbols[Math.floor(Math.random() * fiatSymbols.length)]
      : cryptoSymbols[Math.floor(Math.random() * cryptoSymbols.length)];
    
    // Position vertically within the container
    const verticalPosition = Math.random() * 0.6 + 0.2; // 20% to 80% of the height
    
    // Random color - use brand colors
    const colors = ['#8B5CF6', '#EC4899', '#0EA5E9', '#14B8A6', '#F59E0B']; 
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const newSymbol = (
      <motion.div
        key={id}
        className="absolute text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter"
        style={{ 
          top: `${verticalPosition * 100}%`,
          color,
          y: '-50%', // Center vertically
          perspective: '1000px',
        }}
        initial={{ 
          x: isFiat ? -100 : dimensions.width + 100,
          rotateY: isFiat ? -90 : 90,
          scale: 0.5,
          opacity: 0.8
        }}
        animate={{ 
          x: isFiat ? dimensions.width / 2 : dimensions.width / 2, // Move to center
          rotateY: 0,
          scale: 1.2, 
          opacity: 1,
          transition: { 
            duration: 1.5,
            ease: "easeInOut",
          }
        }}
        exit={{ 
          x: isFiat ? dimensions.width + 100 : -100, // Exit on opposite side
          rotateY: isFiat ? 90 : -90,
          scale: 0.5,
          opacity: 0.8,
          transition: { 
            duration: 1.5,
            ease: "easeInOut",
            delay: 1.5
          }
        }}
        onAnimationComplete={() => {
          // Remove this symbol after animation completes
          setTimeout(() => {
            setSymbolsInMotion(prev => 
              prev.filter(item => 
                React.isValidElement(item) && item.key !== id
              )
            );
          }, 3000);
        }}
      >
        {symbol}
      </motion.div>
    );
    
    setSymbolsInMotion(prev => [...prev, newSymbol]);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden w-full h-64 md:h-96 ${className}`}
    >
      {/* Glowing Ring */}
      <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          className="relative w-0.5 md:w-1 h-4/5 bg-gradient-to-b from-accent-purple via-secondary to-accent-teal rounded-full"
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            boxShadow: [
              '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
              '0 0 15px rgba(139, 92, 246, 0.7), 0 0 30px rgba(139, 92, 246, 0.5)',
              '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-full opacity-10 blur-xl"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Animated Symbols */}
      {symbolsInMotion}
    </div>
  );
}