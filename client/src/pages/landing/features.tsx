import React from "react";
import { ArrowLeftRight, Triangle, LineChart, Users, Check } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Arbitrage Features</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform provides comprehensive tools to detect and execute various arbitrage strategies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 hover:border-secondary transition-all hover:shadow-glow">
            <div className="mb-4 text-secondary text-4xl">
              <ArrowLeftRight className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Direct Arbitrage</h3>
            <p className="text-gray-400">
              Identify price differences for the same asset across multiple exchanges and execute trades automatically.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 hover:border-accent-purple transition-all hover:shadow-glow-purple">
            <div className="mb-4 text-accent-purple text-4xl">
              <Triangle className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Triangular Arbitrage</h3>
            <p className="text-gray-400">
              Leverage price discrepancies between three different cryptocurrencies to make profitable trade cycles.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 hover:border-accent-teal transition-all hover:shadow-glow-teal">
            <div className="mb-4 text-accent-teal text-4xl">
              <LineChart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Futures Arbitrage</h3>
            <p className="text-gray-400">
              Exploit price differences between spot and futures markets to secure risk-free returns.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-surface rounded-xl p-6 border border-gray-800 hover:border-secondary transition-all hover:shadow-glow">
            <div className="mb-4 text-secondary text-4xl">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">P2P Arbitrage</h3>
            <p className="text-gray-400">
              Find opportunities between P2P platforms and exchanges with real-time market data analysis.
            </p>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Advanced Trading Bot</h3>
              <p className="text-gray-400 mb-6">
                Our AI-powered trading bot executes arbitrage opportunities automatically, ensuring you never miss out on profitable trades.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                    <Check className="text-green-500 h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-300">24/7 automated trading execution</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                    <Check className="text-green-500 h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-300">Customizable risk parameters</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                    <Check className="text-green-500 h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-300">Advanced AI prediction algorithms</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mt-1">
                    <Check className="text-green-500 h-3 w-3" />
                  </div>
                  <span className="ml-3 text-gray-300">Real-time performance monitoring</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              {/* Trading bot visualization */}
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="AI trading bot visualization with data analytics" 
                className="rounded-xl shadow-xl border border-gray-800" 
              />
              <div className="absolute -bottom-5 -right-5 bg-glass rounded-lg p-4 shadow-lg">
                <div className="text-sm text-gray-400">Bot Success Rate</div>
                <div className="text-2xl font-bold text-white">94.7%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
