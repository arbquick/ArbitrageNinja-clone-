import React, { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-surface/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    } border-b border-gray-800/50`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2">
              <div className="h-9 w-9 bg-gradient-to-br from-accent-purple to-secondary rounded-lg flex items-center justify-center shadow-glow-purple">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CryptoArb</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            <Button 
              href="/dashboard"
              variant="outline"
              className="px-4 py-2 rounded-md text-white bg-surface-light hover:bg-gray-700 transition-colors"
            >
              Login
            </Button>
            <Button 
              href="/dashboard"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-secondary to-accent-purple text-white hover:from-secondary-dark hover:to-accent-purple transition-colors"
            >
              Sign Up
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-dark border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-light">
              Features
            </a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-light">
              Pricing
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-light">
              About
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-surface-light">
              Contact
            </a>
            <div className="flex space-x-2 pt-2">
              <Button 
                href="/dashboard"
                variant="outline"
                className="w-full py-2"
              >
                Login
              </Button>
              <Button 
                href="/dashboard"
                className="w-full py-2"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
