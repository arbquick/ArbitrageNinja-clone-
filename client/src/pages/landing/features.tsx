import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeftRight, Triangle, LineChart, Users, Check, ChevronRight, BarChart4, Activity, Zap, Shield, Cpu } from "lucide-react";

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="features" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Black background instead of blue gradient */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Grid pattern with updated Bitget blue */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}>
      </div>
      
      {/* Glowing orbs with updated blue */}
      <motion.div style={{ y: y1 }} className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-[#2FB6FC]/10 blur-[100px]"></motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-40 -left-20 w-60 h-60 rounded-full bg-[#2FB6FC]/8 blur-[80px]"></motion.div>
      
      <div className="container relative mx-auto px-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
              Powerful Arbitrage Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our platform provides comprehensive tools to detect and execute various arbitrage strategies.
          </p>
        </motion.div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <motion.div
            custom={0}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-[#111]/80 rounded-xl p-6 border border-[#2FB6FC]/20 hover:border-[#2FB6FC]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(47,182,252,0.2)] overflow-hidden"
          >
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FB6FC]/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="mb-4 text-[#2FB6FC] text-4xl relative z-10">
              <ArrowLeftRight className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white relative z-10">Direct Arbitrage</h3>
            <p className="text-gray-300 relative z-10">
              Identify price differences for the same asset across multiple exchanges and execute trades automatically.
            </p>
            
            {/* Corner decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 border-r-2 border-b-2 border-[#2FB6FC]/20 rounded-br-3xl"></div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div
            custom={1}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-[#111]/80 rounded-xl p-6 border border-[#2FB6FC]/20 hover:border-[#2FB6FC]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(47,182,252,0.2)] overflow-hidden"
          >
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FB6FC]/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="mb-4 text-[#2FB6FC] text-4xl relative z-10">
              <Triangle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white relative z-10">Triangular Arbitrage</h3>
            <p className="text-gray-300 relative z-10">
              Leverage price discrepancies between three different cryptocurrencies to make profitable trade cycles.
            </p>
            
            {/* Corner decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 border-r-2 border-b-2 border-[#2FB6FC]/20 rounded-br-3xl"></div>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div
            custom={2}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-[#111]/80 rounded-xl p-6 border border-[#2FB6FC]/20 hover:border-[#2FB6FC]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(47,182,252,0.2)] overflow-hidden"
          >
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FB6FC]/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="mb-4 text-[#2FB6FC] text-4xl relative z-10">
              <LineChart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white relative z-10">Futures Arbitrage</h3>
            <p className="text-gray-300 relative z-10">
              Exploit price differences between spot and futures markets to secure risk-free returns.
            </p>
            
            {/* Corner decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 border-r-2 border-b-2 border-[#2FB6FC]/20 rounded-br-3xl"></div>
          </motion.div>
          
          {/* Feature 4 */}
          <motion.div
            custom={3}
            variants={featureVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-[#111]/80 rounded-xl p-6 border border-[#2FB6FC]/20 hover:border-[#2FB6FC]/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(47,182,252,0.2)] overflow-hidden"
          >
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2FB6FC]/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            
            <div className="mb-4 text-[#2FB6FC] text-4xl relative z-10">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white relative z-10">P2P Arbitrage</h3>
            <p className="text-gray-300 relative z-10">
              Find opportunities between P2P platforms and exchanges with real-time market data analysis.
            </p>
            
            {/* Corner decoration */}
            <div className="absolute -top-10 -right-10 w-20 h-20 border-r-2 border-b-2 border-[#2FB6FC]/20 rounded-br-3xl"></div>
          </motion.div>
        </div>
        
        <div ref={botRef} className="mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl md:text-4xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
                  Advanced Trading Bot
                </span>
              </h3>
              <p className="text-gray-300 mb-8">
                Our AI-powered trading bot executes arbitrage opportunities automatically, ensuring you never miss out on profitable trades.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start group">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#2FB6FC]/20 flex items-center justify-center mt-1 group-hover:bg-[#2FB6FC]/30 transition-colors">
                    <Check className="text-[#2FB6FC] h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-200">24/7 automated trading execution</span>
                </li>
                <li className="flex items-start group">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#2FB6FC]/20 flex items-center justify-center mt-1 group-hover:bg-[#2FB6FC]/30 transition-colors">
                    <Check className="text-[#2FB6FC] h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-200">Customizable risk parameters</span>
                </li>
                <li className="flex items-start group">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#2FB6FC]/20 flex items-center justify-center mt-1 group-hover:bg-[#2FB6FC]/30 transition-colors">
                    <Check className="text-[#2FB6FC] h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-200">Advanced AI prediction algorithms</span>
                </li>
                <li className="flex items-start group">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#2FB6FC]/20 flex items-center justify-center mt-1 group-hover:bg-[#2FB6FC]/30 transition-colors">
                    <Check className="text-[#2FB6FC] h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-200">Real-time performance monitoring</span>
                </li>
              </ul>
              
              <motion.button
                className="mt-8 group flex items-center text-white bg-[#2FB6FC] px-6 py-3 rounded-lg hover:shadow-[0_0_20px_rgba(47,182,252,0.4)] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Bot Features</span>
                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
            
            {/* Replaced image with interactive bot visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-[400px]"
            >
              {/* Trading bot terminal interface */}
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-[#2FB6FC]/30 shadow-[0_0_30px_rgba(47,182,252,0.15)] bg-[#0A0A0A]">
                {/* Terminal header */}
                <div className="h-8 bg-[#111] border-b border-[#2FB6FC]/20 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-400 text-xs mx-auto">QuickArb Bot Terminal</div>
                </div>
                
                {/* Terminal content */}
                <div className="p-4 h-[calc(100%-2rem)] overflow-hidden font-mono text-sm">
                  {/* Animated text lines */}
                  <TerminalLine delay={0.5} text=">> Initializing QuickArb Bot v2.3.7..." />
                  <TerminalLine delay={1.1} text=">> Connecting to exchange APIs..." />
                  <TerminalLine delay={1.7} text=">> Connected to: Binance, Kraken, Coinbase, Kucoin, Huobi, OKX" />
                  <TerminalLine delay={2.3} text=">> Loading market data for BTC, ETH, XRP, SOL, AVAX..." />
                  <TerminalLine delay={2.9} text=">> Market data loaded successfully" />
                  <TerminalLine delay={3.5} text=">> Starting arbitrage scan..." />
                  <TerminalLine delay={4.1} className="text-green-500" text=">> OPPORTUNITY FOUND: ETH/USDT - Binance → Kucoin (0.82% profit)" />
                  <TerminalLine delay={4.7} text=">> Executing trade..." />
                  <TerminalLine delay={5.3} className="text-[#2FB6FC]" text=">> Trade executed successfully" />
                  <TerminalLine delay={5.9} text=">> Profit secured: $73.52" />
                  <TerminalLine delay={6.5} text=">> Continuing scan..." />
                </div>
                
                {/* Animated blinking cursor */}
                <motion.div 
                  className="absolute bottom-4 left-[120px] w-2 h-4 bg-[#2FB6FC]"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                
                {/* Data visualization overlay */}
                <div className="absolute top-0 right-0 bottom-0 w-40 border-l border-[#2FB6FC]/20 bg-black/40 backdrop-blur-sm">
                  <div className="p-2 text-center">
                    <div className="text-[#2FB6FC] text-xs font-semibold">Market Activity</div>
                    <MarketGraph />
                  </div>
                  <div className="p-2 border-t border-[#2FB6FC]/20">
                    <div className="text-[#2FB6FC] text-xs font-semibold text-center mb-2">Exchange Status</div>
                    <div className="space-y-1.5">
                      <StatusItem name="Binance" isActive={true} />
                      <StatusItem name="Kraken" isActive={true} />
                      <StatusItem name="Coinbase" isActive={true} />
                      <StatusItem name="Kucoin" isActive={true} />
                      <StatusItem name="OKX" isActive={false} />
                    </div>
                  </div>
                </div>
                
                {/* Scan line animation */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#2FB6FC]/60 to-transparent"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              
              {/* Floating stat cards */}
              <motion.div 
                className="absolute -bottom-5 -right-5 bg-[#111]/90 rounded-lg p-4 border border-[#2FB6FC]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(47,182,252,0.2)]"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-gray-300 flex items-center">
                  <Activity className="h-4 w-4 text-[#2FB6FC] mr-2" />
                  <span>Bot Success Rate</span>
                </div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">94.7%</div>
                
                {/* Mini chart */}
                <div className="mt-1 h-2 bg-black/50 rounded-full overflow-hidden">
                  <div className="h-full w-[94.7%] bg-gradient-to-r from-[#2FB6FC] to-[#2FB6FC]/70 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-2 -left-2 bg-[#111]/90 rounded-lg p-4 border border-[#2FB6FC]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(47,182,252,0.2)]"
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="text-sm text-gray-300 flex items-center">
                  <Zap className="h-4 w-4 text-[#2FB6FC] mr-2" />
                  <span>Execution Speed</span>
                </div>
                <div className="text-2xl font-bold text-white">0.2<span className="text-sm font-normal text-gray-400">sec</span></div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 right-[30%] bg-[#111]/90 rounded-lg p-3 border border-[#2FB6FC]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(47,182,252,0.2)]"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 text-[#2FB6FC] text-sm">
                  <Shield className="h-4 w-4" />
                  <span>Bank-Grade Security</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-2/3 -right-2 bg-[#111]/90 rounded-lg p-3 border border-[#2FB6FC]/30 backdrop-blur-sm shadow-[0_0_15px_rgba(47,182,252,0.2)]"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 text-[#2FB6FC] text-sm">
                  <Cpu className="h-4 w-4" />
                  <span>Advanced AI Logic</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Terminal line component with typing animation
const TerminalLine = ({ delay, text, className = "text-gray-300" }) => (
  <motion.div
    className={`mb-1 ${className}`}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    viewport={{ once: true }}
  >
    {text}
  </motion.div>
);

// Status item component
const StatusItem = ({ name, isActive }) => (
  <div className="flex items-center justify-between text-xs">
    <span className="text-gray-400">{name}</span>
    <span className={`flex items-center ${isActive ? 'text-green-500' : 'text-red-500'}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'} mr-1`}></span>
      {isActive ? 'Online' : 'Offline'}
    </span>
  </div>
);

// Simple market graph component
const MarketGraph = () => (
  <div className="mt-2 h-[60px] flex items-end space-x-1">
    {[40, 38, 45, 30, 55, 48, 60, 55, 70, 50, 65, 58].map((height, i) => (
      <motion.div 
        key={i}
        className="w-2 bg-[#2FB6FC]/80 rounded-t"
        initial={{ height: 0 }}
        whileInView={{ height: `${height}%` }}
        transition={{ delay: 0.5 + (i * 0.05), duration: 0.5 }}
        viewport={{ once: true }}
      />
    ))}
  </div>
);
