import React from "react";
import { Zap } from "lucide-react";
import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Footer() {
  return (
    <footer className="bg-surface-dark py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 bg-gradient-to-br from-accent-purple to-secondary rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">CryptoArb</span>
            </div>
            <p className="text-gray-400 mb-4">
              Advanced cryptocurrency arbitrage platform for traders seeking to maximize their profits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTelegram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaDiscord size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© {new Date().getFullYear()} CryptoArb. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Select defaultValue="english">
              <SelectTrigger className="w-[180px] bg-surface border border-gray-700 text-gray-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="chinese">Chinese</SelectItem>
                <SelectItem value="russian">Russian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
