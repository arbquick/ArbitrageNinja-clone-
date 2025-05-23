import React from "react";
import { Zap, ArrowRight } from "lucide-react";
import { FaTwitter, FaTelegram, FaDiscord, FaGithub } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, LANGUAGES, LanguageCode } from "@/context/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { currentLanguage, setLanguage, t } = useLanguage();
  
  return (
    <footer className="bg-black py-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(47, 182, 252, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(47, 182, 252, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#2FB6FC]/5 blur-[100px]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10">
          {/* Logo & description */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-[#2FB6FC] to-[#2a63ff] rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CryptoArb</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t("footer.about")}
            </p>
            <div className="flex space-x-4 mb-8">
              <a href="https://twitter.com/cryptoarb" className="text-gray-400 hover:text-[#2FB6FC] transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="https://t.me/cryptoarb" className="text-gray-400 hover:text-[#2FB6FC] transition-colors" aria-label="Telegram">
                <FaTelegram size={20} />
              </a>
              <a href="https://discord.gg/cryptoarb" className="text-gray-400 hover:text-[#2FB6FC] transition-colors" aria-label="Discord">
                <FaDiscord size={20} />
              </a>
              <a href="https://github.com/cryptoarb" className="text-gray-400 hover:text-[#2FB6FC] transition-colors" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div className="sm:col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4 md:mb-5">{t("footer.product")}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#features" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">{t("nav.features")}</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">{t("nav.pricing")}</a></li>
              <li><a href="/api-docs" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">API</a></li>
              <li><a href="/documentation" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Documentation</a></li>
            </ul>
          </div>
          
          <div className="sm:col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4 md:mb-5">{t("footer.resources")}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="/blog" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Blog</a></li>
              <li><a href="/tutorials" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Tutorials</a></li>
              <li><a href="/support" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Support</a></li>
              <li><a href="/community" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Community</a></li>
            </ul>
          </div>
          
          <div className="sm:col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4 md:mb-5">{t("footer.company")}</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">{t("nav.about")}</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">Careers</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">{t("footer.privacy")}</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-[#2FB6FC] transition-colors inline-block">{t("footer.terms")}</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold text-lg mb-4 md:mb-5">{t("footer.subscribe")}</h4>
            <p className="text-gray-400 mb-4 text-sm">{t("footer.subscribe.desc")}</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 flex-1 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-[#2FB6FC] focus:border-[#2FB6FC] text-sm"
                aria-label="Email address"
              />
              <button 
                className="px-4 py-3 rounded-r-lg bg-[#2FB6FC] text-white flex items-center justify-center hover:bg-[#2FB6FC]/90 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-0 text-center md:text-left">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} CryptoArb. {t("footer.copyright")}</p>
            <div className="hidden md:block mx-4 w-1 h-1 rounded-full bg-gray-700"></div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-sm justify-center">
              <a href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">{t("footer.privacy")}</a>
              <a href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">{t("footer.terms")}</a>
              <a href="#contact" className="text-gray-500 hover:text-gray-300 transition-colors">{t("footer.contact")}</a>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Select 
              defaultValue={currentLanguage.code}
              onValueChange={(value) => setLanguage(value as LanguageCode)}
            >
              <SelectTrigger className="w-[180px] bg-gray-800 border border-gray-700 text-gray-400" aria-label="Select language">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border border-gray-700">
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </footer>
  );
}
