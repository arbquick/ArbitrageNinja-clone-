import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CryptoCube } from "@/components/ui/crypto-cube";
import { useLanguage } from "@/context/language-context";

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const createParticles = () => {
    const particles = [];
    const density = isMobile ? 80 : 150;
    
    for (let i = 0; i < density; i++) {
      const size = Math.random() > 0.95 ? 2 : 1;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.5 + 0.1;
      
      particles.push(
        <div 
          key={i}
          className="absolute rounded-full"
          style={{ 
            top, 
            left, 
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Black background instead of dark blue */}
      <div className="absolute inset-0 bg-black z-0"></div>
      
      {/* Glowing elements with Bitget-style blue (#2FB6FC) */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 right-1/4 w-[30vw] h-[30vw] rounded-full bg-[#2FB6FC]/10 blur-[80px] z-1"
      ></motion.div>
      <motion.div 
        style={{ y: y2, opacity }}
        className="absolute -bottom-40 left-1/3 w-[40vw] h-[40vw] rounded-full bg-[#2FB6FC]/8 blur-[120px] z-1"
      ></motion.div>
      
      {/* Futuristic grid pattern with updated blue */}
      <div className="absolute inset-0 z-1 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}>
      </div>
      
      {/* Dot pattern background with animated parallax */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        {createParticles()}
      </div>

      {/* Main content container - improved spacing and min-height for better content visibility */}
      <div className="container relative mx-auto min-h-screen flex flex-col-reverse md:flex-row items-center justify-center z-10 px-4 md:px-6 pt-24 pb-16 md:pt-24 md:pb-0">
        {/* Left side - 3D Cube with improved positioning */}
        <motion.div 
          style={{ y: y2 }}
          className="w-full md:w-1/2 relative flex items-center justify-center pt-8 pb-8 md:pt-0 md:pb-0"
        >
          <div className="w-full max-w-md mx-auto">
            <CryptoCube mousePosition={mousePosition} />
          </div>
        </motion.div>
        
        {/* Right side - Main text and description with improved spacing and responsive adjustments */}
        <div className="w-full md:w-1/2 px-4 md:px-8 flex flex-col items-center md:items-start text-center md:text-left md:pr-4 lg:pr-6">
          {/* Main headline - Adjusted text sizes for better visibility and responsiveness */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-3 md:mb-4"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-tight">
              <span className="block mb-1">{t("hero.title")}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
                {t("hero.subtitle")}
              </span>
            </h1>
            
            {/* Added tagline - reduced text size on mobile */}
            <p className="text-base md:text-lg lg:text-xl mt-2 tracking-wide font-medium text-[#2FB6FC]">
              {t("hero.tagline")}
            </p>
          </motion.div>
          
          {/* Glass panel with description - improved spacing and width control */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="rounded-xl bg-[#111]/80 backdrop-blur-md border border-[#2FB6FC]/20 p-4 md:p-5 lg:p-6 text-white w-full mb-5 md:mb-6 relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FB6FC]/70 to-transparent"></div>
            <p className="text-xs md:text-sm leading-relaxed">
              {t("hero.description")}
            </p>
            
            {/* Key metrics with improved sizing */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-[#2FB6FC]/20">
              <div className="text-center">
                <div className="text-[#2FB6FC] text-base sm:text-lg lg:text-xl font-bold">30+</div>
                <div className="text-gray-400 text-xs">{t("metrics.exchanges")}</div>
              </div>
              <div className="text-center">
                <div className="text-[#2FB6FC] text-base sm:text-lg lg:text-xl font-bold">0.2s</div>
                <div className="text-gray-400 text-xs">{t("metrics.execution")}</div>
              </div>
              <div className="text-center">
                <div className="text-[#2FB6FC] text-base sm:text-lg lg:text-xl font-bold">24/7</div>
                <div className="text-gray-400 text-xs">{t("metrics.monitoring")}</div>
              </div>
            </div>
          </motion.div>
          
          {/* Updated CTA button - reduced size for better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-3/4 mx-auto md:mx-0"
          >
            <a 
              href="/dashboard/arbitrage" 
              className="group flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg bg-[#2FB6FC] hover:bg-[#2FB6FC]/90 hover:shadow-[0_0_25px_rgba(47,182,252,0.5)] transition-all duration-300 text-white text-sm md:text-base font-semibold w-full"
            >
              <span className="h-6 w-6 md:h-7 md:w-7 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5Z"/>
                </svg>
              </span>
              <span className="relative">
                {t("hero.cta")}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Scrolling indicator with updated blue - improved positioning */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center md:bottom-6"
      >
        <span className="text-[#2FB6FC] text-sm mb-2 hidden md:block">{t("hero.scroll")}</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-[#2FB6FC]/50 rounded-full flex justify-center"
        >
          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-3 bg-[#2FB6FC] rounded-full mt-2" 
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
