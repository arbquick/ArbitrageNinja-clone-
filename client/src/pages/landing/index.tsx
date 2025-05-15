import React from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Features } from "./features";
import { Pricing } from "./pricing";
import { Footer } from "./footer";
import { Helmet } from "react-helmet-async";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-dark text-white">
      <Helmet>
        <title>CryptoArb | Advanced Crypto Arbitrage Platform</title>
        <meta name="description" content="Maximize your crypto trading profits with CryptoArb's advanced arbitrage platform. Find profitable opportunities across exchanges in real-time." />
        <meta property="og:title" content="CryptoArb | Advanced Crypto Arbitrage Platform" />
        <meta property="og:description" content="Maximize your crypto trading profits with CryptoArb's advanced arbitrage platform. Find profitable opportunities across exchanges in real-time." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </Helmet>
      
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-surface to-surface-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Join thousands of traders already using CryptoArb to maximize their profits through cryptocurrency arbitrage.
          </p>
          <a 
            href="/dashboard" 
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-secondary to-accent-purple text-white text-lg font-semibold hover:shadow-glow transition-all transform hover:-translate-y-1"
          >
            Create Your Account
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
