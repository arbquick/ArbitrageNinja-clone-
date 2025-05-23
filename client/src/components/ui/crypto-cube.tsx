import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CryptoCubeProps {
  mousePosition: { x: number; y: number };
}

export const CryptoCube: React.FC<CryptoCubeProps> = ({ mousePosition }) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement effect
  useEffect(() => {
    const cube = cubeRef.current;
    const container = containerRef.current;
    if (!cube || !container) return;
    
    // Get container bounds for relative mouse position
    const bounds = container.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    // Calculate relative mouse position from center
    const relativeX = (mousePosition.x - centerX) / (bounds.width / 2);
    const relativeY = (mousePosition.y - centerY) / (bounds.height / 2);
    
    // Apply rotation based on mouse position (limited range)
    const rotationY = relativeX * 15; // Increased rotation amount
    const rotationX = -relativeY * 15;
    
    cube.style.transform = `
      perspective(1200px)
      rotateY(${rotationY}deg)
      rotateX(${rotationX}deg)
    `;
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="relative mx-auto w-full h-full max-w-md flex items-center justify-center"
      style={{ minHeight: '400px' }}
    >
      {/* Updated glow color to match Bitget blue */}
      <div className="absolute w-80 h-80 rounded-full bg-[#2FB6FC]/20 blur-[60px]"></div>
      <div className="absolute w-60 h-60 rounded-full bg-[#2FB6FC]/10 blur-[45px] -translate-x-10 translate-y-10"></div>
      
      {/* Main container with 3D effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-80 h-80 z-10"
      >
        {/* 3D Cube */}
        <div 
          ref={cubeRef}
          className="absolute inset-0 w-64 h-64 m-auto"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Main cube face (front) */}
          <div 
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/40 shadow-[0_0_40px_rgba(47,182,252,0.4)] backdrop-blur-sm"
            style={{ transform: 'translateZ(32px)' }}
          >
            {/* Logo and name */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="w-20 h-20 rounded-xl bg-[#2FB6FC]/20 backdrop-blur-md flex items-center justify-center border border-[#2FB6FC]/40 shadow-[0_0_15px_rgba(47,182,252,0.3)]">
                <svg 
                  width="40" 
                  height="40" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 9H7L10 5L16 11L19 8H21" stroke="#2FB6FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3V8H16" stroke="#2FB6FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 15H7L10 19L16 13L19 16H21" stroke="#2FB6FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 21V16H16" stroke="#2FB6FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            
            {/* Updated circuit pattern */}
            <div 
              className="absolute inset-0 rounded-xl opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25px 25px, rgba(47, 182, 252, 0.4) 2px, transparent 0),
                  linear-gradient(to right, rgba(47, 182, 252, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(47, 182, 252, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px, 20px 20px, 20px 20px'
              }}
            ></div>
            
            {/* Enhanced reflections */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#2FB6FC]/20 to-transparent rounded-t-xl"></div>
          </div>
          
          {/* Updated cube sides */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/20 shadow-lg"
               style={{ transform: 'rotateY(90deg) translateZ(32px)', opacity: 0.9 }}></div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/20 shadow-lg"
               style={{ transform: 'rotateY(-90deg) translateZ(32px)', opacity: 0.9 }}></div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/20 shadow-lg"
               style={{ transform: 'rotateX(90deg) translateZ(32px)', opacity: 0.9 }}></div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/20 shadow-lg"
               style={{ transform: 'rotateX(-90deg) translateZ(32px)', opacity: 0.9 }}></div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/90 to-[#111]/90 border border-[#2FB6FC]/20 shadow-lg"
               style={{ transform: 'rotateY(180deg) translateZ(32px)', opacity: 0.9 }}></div>
        </div>
        
        {/* Updated Bitcoin coin */}
        <div className="absolute top-0 right-0 animate-float z-20" style={{ animationDuration: '6s' }}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F7931A] to-[#EB8C00] flex items-center justify-center border-4 border-[#F7931A]/50 shadow-[0_0_30px_rgba(247,147,26,0.6)]">
            <div className="w-16 h-16 rounded-full bg-[#F7931A] flex items-center justify-center transform -rotate-12">
              <span className="text-white text-3xl font-bold">₿</span>
            </div>
          </div>
          {/* Coin shine effect */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-t from-transparent via-[#F7931A]/40 to-transparent" style={{ transform: 'translateY(-4px)' }}></div>
          {/* Connection highlight */}
          <div className="absolute top-full left-1/2 w-1 h-16 bg-gradient-to-b from-[#F7931A]/60 to-transparent"></div>
        </div>
        
        {/* Updated Ethereum coin */}
        <div className="absolute bottom-0 left-10 animate-float z-20" style={{ animationDuration: '7s', animationDelay: '0.5s' }}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#627EEA] to-[#3C5CEA] flex items-center justify-center border-4 border-[#627EEA]/50 shadow-[0_0_30px_rgba(98,126,234,0.6)]">
            <div className="w-16 h-16 rounded-full bg-[#627EEA] flex items-center justify-center transform -rotate-6">
              <span className="text-white text-3xl font-bold">Ξ</span>
            </div>
          </div>
          {/* Coin shine effect */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-t from-transparent via-[#627EEA]/40 to-transparent" style={{ transform: 'translateY(-4px)' }}></div>
          {/* Connection highlight */}
          <div className="absolute bottom-full left-1/2 w-1 h-16 bg-gradient-to-b from-transparent to-[#627EEA]/60"></div>
        </div>
        
        {/* Updated USDT coin */}
        <div className="absolute right-10 bottom-16 animate-float z-20" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#26A17B] to-[#1A8462] flex items-center justify-center border-4 border-[#26A17B]/50 shadow-[0_0_30px_rgba(38,161,123,0.6)]">
            <div className="w-14 h-14 rounded-full bg-[#26A17B] flex items-center justify-center transform -rotate-6">
              <span className="text-white text-2xl font-bold">₮</span>
            </div>
          </div>
          {/* Coin shine effect */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-t from-transparent via-[#26A17B]/40 to-transparent" style={{ transform: 'translateY(-3px)' }}></div>
          {/* Connection highlight */}
          <div className="absolute -right-6 bottom-1/2 w-16 h-1 bg-gradient-to-r from-transparent to-[#26A17B]/60"></div>
        </div>
        
        {/* Enhanced connection lines with animations and glow effect */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-70" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FB6FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="line-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FB6FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="line-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2FB6FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2FB6FC" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <line 
            x1="50%" y1="50%" x2="85%" y2="15%" 
            stroke="url(#line-gradient-1)" 
            strokeWidth="2"
            strokeDasharray="6,3"
            filter="url(#glow)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="18" dur="3s" repeatCount="indefinite" />
          </line>
          <line 
            x1="50%" y1="50%" x2="20%" y2="80%" 
            stroke="url(#line-gradient-2)" 
            strokeWidth="2"
            strokeDasharray="6,3"
            filter="url(#glow)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="18" dur="3s" repeatCount="indefinite" />
          </line>
          <line 
            x1="50%" y1="50%" x2="80%" y2="70%" 
            stroke="url(#line-gradient-3)" 
            strokeWidth="2"
            strokeDasharray="6,3"
            filter="url(#glow)"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="18" dur="3s" repeatCount="indefinite" />
          </line>
        </svg>
        
        {/* Animated data flow particles */}
        <div className="absolute inset-0 w-full h-full opacity-60">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ 
                top: `${50 + (Math.random() * 30 - 15)}%`, 
                left: `${50 + (Math.random() * 30 - 15)}%`,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0] 
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 rounded-full bg-[#2FB6FC] shadow-[0_0_5px_#2FB6FC]"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}; 