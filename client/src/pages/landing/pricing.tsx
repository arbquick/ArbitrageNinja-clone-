import React from "react";
import { SubscriptionCard } from "@/components/ui/subscription-card";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { useSubscription } from "@/context/subscription-context";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  const { selectTier } = useSubscription();

  // Define the features for each plan
  const freeTierFeatures = [
    { text: "2 Exchange Connections", included: true },
    { text: "Basic Market Analysis", included: true },
    { text: "Direct Arbitrage Only", included: true },
    { text: "No Trading Bot Access", included: false },
    { text: "No Advanced Arbitrage Types", included: false }
  ];

  const basicTierFeatures = [
    { text: "6 Exchange Connections", included: true },
    { text: "Full Market Analysis", included: true },
    { text: "Trading Bot Access", included: true },
    { text: "All Arbitrage Types", included: true },
    { text: "No Custom Bot Strategies", included: false }
  ];

  const proTierFeatures = [
    { text: "Unlimited Exchange Connections", included: true },
    { text: "Advanced Market Analysis", included: true },
    { text: "Premium Trading Bot", included: true },
    { text: "Custom Bot Strategies", included: true },
    { text: "Priority Support", included: true }
  ];
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 * i,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-black">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-[#2FB6FC]/10 blur-[100px]"></div>
      <div className="absolute bottom-40 -left-20 w-60 h-60 rounded-full bg-[#2FB6FC]/8 blur-[80px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#2FB6FC]">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Select the plan that best fits your trading strategy and scale as your profits grow.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <div className="h-full bg-[#111]/70 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2FB6FC]/30 hover:shadow-[0_0_30px_rgba(47,182,252,0.15)]">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-300 mb-6 text-sm">Perfect for beginners looking to explore crypto arbitrage.</p>
                
                <button
            onClick={() => selectTier(SUBSCRIPTION_TIERS.FREE)}
                  className="w-full py-3 rounded-lg border border-[#2FB6FC] text-[#2FB6FC] font-medium transition-all hover:bg-[#2FB6FC]/10"
                >
                  Get Started Free
                </button>
              </div>
              
              <div className="px-6 md:px-8 pb-8">
                <p className="text-sm text-gray-400 mb-4 mt-2">Includes:</p>
                <ul className="space-y-3">
                  {freeTierFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.included ? 'bg-[#2FB6FC]/20 text-[#2FB6FC]' : 'bg-gray-800/50 text-gray-500'}`}>
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <span className="w-2 h-0.5 bg-current block" />
                        )}
                      </span>
                      <span className={`ml-2 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Basic Tier */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <div className="h-full relative bg-gradient-to-b from-[#111]/90 to-[#0D1421] backdrop-blur-md border border-[#2FB6FC]/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(47,182,252,0.2)]">
              <div className="absolute top-0 right-0 bg-[#2FB6FC] text-xs font-bold text-white px-4 py-1 rounded-bl-lg">
                POPULAR
              </div>
              
              <div className="p-6 md:p-8 pt-12">
                <h3 className="text-2xl font-bold text-white mb-2">Basic</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-4xl font-bold text-white">$15</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-300 mb-6 text-sm">For active traders seeking consistent returns.</p>
                
                <button
            onClick={() => selectTier(SUBSCRIPTION_TIERS.BASIC)}
                  className="w-full py-3 rounded-lg bg-[#2FB6FC] text-white font-medium transition-all hover:bg-[#2FB6FC]/90 hover:shadow-[0_0_20px_rgba(47,182,252,0.4)]"
                >
                  Select Basic
                </button>
              </div>
              
              <div className="px-6 md:px-8 pb-8">
                <p className="text-sm text-gray-400 mb-4 mt-2">Includes:</p>
                <ul className="space-y-3">
                  {basicTierFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.included ? 'bg-[#2FB6FC]/20 text-[#2FB6FC]' : 'bg-gray-800/50 text-gray-500'}`}>
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <span className="w-2 h-0.5 bg-current block" />
                        )}
                      </span>
                      <span className={`ml-2 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Pro Tier */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <div className="h-full bg-[#111]/70 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#2FB6FC]/30 hover:shadow-[0_0_30px_rgba(47,182,252,0.15)]">
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-4xl font-bold text-white">$25</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-300 mb-6 text-sm">For professional traders wanting maximum profits.</p>
                
                <button
            onClick={() => selectTier(SUBSCRIPTION_TIERS.PRO)}
                  className="w-full py-3 rounded-lg border border-[#2FB6FC] text-[#2FB6FC] font-medium transition-all hover:bg-[#2FB6FC]/10"
                >
                  Select Pro
                </button>
              </div>
              
              <div className="px-6 md:px-8 pb-8">
                <p className="text-sm text-gray-400 mb-4 mt-2">Includes:</p>
                <ul className="space-y-3">
                  {proTierFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.included ? 'bg-[#2FB6FC]/20 text-[#2FB6FC]' : 'bg-gray-800/50 text-gray-500'}`}>
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <span className="w-2 h-0.5 bg-current block" />
                        )}
                      </span>
                      <span className={`ml-2 text-sm ${feature.included ? 'text-gray-300' : 'text-gray-500 line-through'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            All plans include access to our web platform, mobile app, and API. 
            Upgrade, downgrade, or cancel anytime. <a href="#" className="text-[#2FB6FC] hover:underline">See full plan comparison</a>
          </p>
        </div>
      </div>
    </section>
  );
}
