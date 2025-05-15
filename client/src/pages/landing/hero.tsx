import React, { useRef, useEffect } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { ParallaxContainer } from "@/components/ui/parallax-container";

export function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stats to fade in
    const animateStats = () => {
      const stats = statsRef.current?.querySelectorAll('.animate-float-up');
      if (stats) {
        stats.forEach((stat, index) => {
          setTimeout(() => {
            (stat as HTMLElement).style.opacity = '1';
          }, 300 * (index + 1));
        });
      }
    };

    animateStats();
  }, []);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() > 0.8 ? 2 : 1;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const delay = `${Math.random() * 3}s`;
      
      stars.push(
        <div 
          key={i}
          className={`absolute h-${size} w-${size} bg-white rounded-full animate-pulse`}
          style={{ 
            top, 
            left, 
            animationDelay: delay,
            width: `${size}px`,
            height: `${size}px`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <ParallaxContainer
      layers={[
        // Background gradient layer
        {
          zIndex: 1,
          translateYMultiplier: 0,
          className: "opacity-80",
          children: (
            <div className="w-full h-full bg-gradient-to-b from-surface-dark via-surface to-surface-light"></div>
          )
        },
        // Stars/particles layer
        {
          zIndex: 2,
          translateYMultiplier: 0.4,
          children: (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-50">
              {createStars()}
              <div className="absolute h-2 w-2 bg-accent-purple rounded-full top-1/2 left-1/4 animate-pulse-slow"></div>
              <div className="absolute h-2 w-2 bg-accent-teal rounded-full top-1/3 left-3/4 animate-pulse-slow"></div>
            </div>
          )
        },
        // Content layer
        {
          zIndex: 4,
          translateYMultiplier: 0.1,
          children: (
            <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-200">
                Unlock Crypto Arbitrage <br />Opportunities in Real-Time
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl">
                CryptoArb's advanced algorithms detect profitable arbitrage opportunities across multiple exchanges, helping you maximize your trading profits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <a 
                  href="/dashboard" 
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-secondary to-accent-purple text-white text-lg font-semibold hover:shadow-glow transition-all transform hover:-translate-y-1"
                >
                  Start Trading Now
                </a>
                <a 
                  href="#features" 
                  className="px-8 py-4 rounded-lg bg-surface-light text-white text-lg font-semibold border border-gray-700 hover:border-secondary transition-all transform hover:-translate-y-1"
                >
                  Learn More
                </a>
              </div>
              
              {/* Floating Platform Preview */}
              <div className="relative w-full max-w-5xl mx-auto" ref={statsRef}>
                {/* A cryptocurrency dashboard image */}
                <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Futuristic crypto arbitrage dashboard visualization" 
                    className="w-full h-auto" 
                  />
                </div>
                
                {/* Floating Stats Cards */}
                <div className="absolute -top-10 -left-10 bg-glass rounded-lg p-4 shadow-glow animate-float-up opacity-0" style={{ animationDelay: "0.3s" }}>
                  <div className="text-sm text-gray-400">Daily Opportunities</div>
                  <div className="text-2xl font-bold text-white">2,587+</div>
                </div>
                
                <div className="absolute top-1/3 -right-5 bg-glass rounded-lg p-4 shadow-glow-purple animate-float-up opacity-0" style={{ animationDelay: "0.6s" }}>
                  <div className="text-sm text-gray-400">Average Profit</div>
                  <div className="text-2xl font-bold text-white">1.8-3.2%</div>
                </div>
                
                <div className="absolute -bottom-5 left-1/4 bg-glass rounded-lg p-4 shadow-glow-teal animate-float-up opacity-0" style={{ animationDelay: "0.9s" }}>
                  <div className="text-sm text-gray-400">Supported Exchanges</div>
                  <div className="text-2xl font-bold text-white">20+</div>
                </div>
              </div>
            </div>
          )
        }
      ]}
    />
  );
}
