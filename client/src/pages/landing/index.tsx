import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Layers, TrendingUp, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParallaxContainer, ParallaxLayer } from '@/components/ui/parallax-container';
import { CurrencyConverterAnimation } from '@/components/ui/currency-converter-animation';
import { CurrencyAnimation3D } from '@/components/ui/currency-animation-3d';
import { cn } from '@/lib/utils';
// Define subscription tiers locally since we're having import issues
const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  BASIC: 'basic',
  PRO: 'pro',
} as const;

export default function LandingPage() {
  // Animation variants
  const fadeInUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  // Feature list with animations
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-accent-purple" />,
      title: 'Real-time Arbitrage Opportunities',
      description: 'Identify profit opportunities across multiple exchanges with live market data and smart analysis.'
    },
    {
      icon: <Layers className="h-6 w-6 text-accent-teal" />,
      title: 'Multiple Arbitrage Types',
      description: 'Explore direct, triangular, futures, and P2P arbitrage strategies to maximize your trading efficiency.'
    },
    {
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      title: 'Automated Trading Bots',
      description: 'Deploy configurable bots to execute trades automatically based on your risk tolerance and strategy.'
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: 'Secure Exchange Integration',
      description: 'Connect your exchange accounts with read-only API keys for maximum security of your assets.'
    }
  ];
  
  // Subscription tier data
  const tiers = [
    {
      name: 'Free',
      price: 0,
      description: 'Basic arbitrage scanning for beginners',
      features: [
        'Connect up to 2 exchanges',
        'Direct arbitrage opportunities',
        'Basic market analysis tools',
        'Email support'
      ],
      limitedFeatures: [
        'No trading bot access',
        'Limited arbitrage types'
      ],
      tier: SUBSCRIPTION_TIERS.FREE,
      cta: 'Get Started Free',
      ctaLink: '/dashboard',
      popular: false
    },
    {
      name: 'Basic',
      price: 15,
      description: 'Advanced tools for serious traders',
      features: [
        'Connect up to 6 exchanges',
        'All arbitrage opportunity types',
        'Trading bot access',
        'Advanced market analysis',
        'Priority email support'
      ],
      tier: SUBSCRIPTION_TIERS.BASIC,
      cta: 'Start Basic Plan',
      ctaLink: '/subscription',
      popular: true
    },
    {
      name: 'Pro',
      price: 25,
      description: 'Maximum profit for professional traders',
      features: [
        'Unlimited exchange connections',
        'All arbitrage opportunity types',
        'Advanced trading bot strategies',
        'Premium market analysis tools',
        'Priority 24/7 support',
        'Custom bot strategies'
      ],
      tier: SUBSCRIPTION_TIERS.PRO,
      cta: 'Upgrade to Pro',
      ctaLink: '/subscription',
      popular: false
    }
  ];
  
  // Parallax layers for the hero section
  const parallaxLayers: ParallaxLayer[] = [
    {
      zIndex: 1,
      translateYMultiplier: 0.2,
      children: (
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark to-black opacity-50" />
      ),
      className: "w-full h-full"
    },
    {
      zIndex: 2,
      translateYMultiplier: 0.5,
      children: (
        <div className="grid grid-cols-12 h-full items-center">
          <div className="col-span-12 md:col-span-6 px-6 md:px-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUpVariant}>
                <Badge
                  variant="outline"
                  className="px-4 py-1 text-xs bg-glass border-accent-purple/50 text-accent-purple"
                >
                  Welcome to the Future of Crypto Arbitrage
                </Badge>
              </motion.div>
              
              <motion.h1
                variants={fadeInUpVariant}
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-purple via-secondary to-accent-teal"
              >
                Maximize Profits with Intelligent Crypto Arbitrage
              </motion.h1>
              
              <motion.p variants={fadeInUpVariant} className="text-gray-300 text-lg md:text-xl">
                Connect multiple exchanges, discover real-time opportunities, and execute trades with custom automated bots.
              </motion.p>
              
              <motion.div variants={fadeInUpVariant} className="pt-4 flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-accent-purple to-secondary hover:opacity-90">
                  <Link href="/dashboard">
                    <a className="flex items-center gap-2">
                      Start Trading <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
                
                <Button variant="outline" size="lg" className="rounded-full text-white border-gray-600 hover:bg-surface-light">
                  <Link href="#features">
                    <a>Learn More</a>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="hidden md:block col-span-6 h-full">
            <CurrencyAnimation3D className="h-full" />
          </div>
        </div>
      ),
      className: "container mx-auto h-full"
    }
  ];
  
  return (
    <div className="bg-surface-dark">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen">
        <ParallaxContainer
          className="w-full h-full overflow-hidden"
          layers={parallaxLayers}
        />
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUpVariant}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Powerful Arbitrage Trading Features
            </motion.h2>
            
            <motion.p
              variants={fadeInUpVariant}
              className="text-gray-400 max-w-3xl mx-auto"
            >
              Our platform provides everything you need to identify, analyze and execute profitable crypto arbitrage trades across multiple exchanges.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUpVariant}
                className="bg-glass rounded-xl p-6 border border-gray-800"
              >
                <div className="bg-surface-light rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Animated Demonstration Section */}
      <section className="py-24 px-6 bg-surface-light">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUpVariant}
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
              >
                Watch Your Crypto <span className="text-accent-purple">Transform</span> Into Profits
              </motion.h2>
              
              <motion.p
                variants={fadeInUpVariant}
                className="text-gray-400 mb-6"
              >
                Our advanced algorithms identify price differences across exchanges, allowing you to profit from market inefficiencies with minimal risk.
              </motion.p>
              
              <motion.div variants={fadeInUpVariant}>
                <ul className="space-y-3">
                  {[
                    'Analyze price differences in real-time',
                    'Automatically calculate profit after fees',
                    'Execute trades at the optimal moment',
                    'Monitor your performance with detailed analytics'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent-teal mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div variants={fadeInUpVariant} className="mt-8">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-accent-purple to-secondary hover:opacity-90">
                  <Link href="/dashboard">
                    <a className="flex items-center gap-2">
                      Start Trading Now <ArrowRight className="h-4 w-4" />
                    </a>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-surface-dark p-6 rounded-2xl border border-gray-800 relative"
            >
              <CurrencyConverterAnimation className="max-h-96" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUpVariant}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Choose Your Trading Plan
            </motion.h2>
            
            <motion.p
              variants={fadeInUpVariant}
              className="text-gray-400 max-w-3xl mx-auto"
            >
              From casual traders to arbitrage professionals, we offer plans to match your trading volume and strategy needs.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "bg-glass rounded-xl overflow-hidden border relative",
                  tier.popular
                    ? "border-accent-purple shadow-glow scale-105 md:scale-110 z-10"
                    : "border-gray-800"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-accent-purple text-white text-xs font-semibold py-1 text-center">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tier.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    {tier.price > 0 && <span className="text-gray-400 ml-1">/month</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-accent-teal mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                    
                    {tier.limitedFeatures?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-5 w-5 flex items-center justify-center mt-0.5 flex-shrink-0 text-gray-500">×</div>
                        <span className="text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={cn(
                      "w-full rounded-full",
                      tier.popular
                        ? "bg-gradient-to-r from-accent-purple to-secondary hover:opacity-90"
                        : "bg-surface-light hover:bg-gray-800"
                    )}
                  >
                    <Link href={tier.ctaLink}>
                      <a>{tier.cta}</a>
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-surface-light to-surface-dark">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Award className="h-16 w-16 mx-auto mb-6 text-accent-purple" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Making Profits Through Arbitrage?
            </h2>
            
            <p className="text-gray-400 mb-8 text-lg">
              Join thousands of traders who are already maximizing their returns with our powerful arbitrage platform.
            </p>
            
            <Button size="lg" className="rounded-full bg-gradient-to-r from-accent-purple to-secondary hover:opacity-90 px-8">
              <Link href="/dashboard">
                <a className="flex items-center gap-2">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </a>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-black">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-br from-accent-purple to-secondary rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CryptoArb</span>
            </div>
            
            <div className="flex gap-8">
              <Link href="/dashboard">
                <a className="text-gray-400 hover:text-white transition-colors">Dashboard</a>
              </Link>
              <Link href="#features">
                <a className="text-gray-400 hover:text-white transition-colors">Features</a>
              </Link>
              <Link href="#pricing">
                <a className="text-gray-400 hover:text-white transition-colors">Pricing</a>
              </Link>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-10 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} CryptoArb. All rights reserved.</p>
            <p className="mt-2">
              Disclaimer: Cryptocurrency arbitrage trading involves risk. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}