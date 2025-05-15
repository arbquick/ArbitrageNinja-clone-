import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { Zap, ChevronRight, ChevronLeft } from "lucide-react";
import { SidebarMenuItem } from "./sidebar-menu-item";
import { useSubscription } from "@/context/subscription-context";
import { Button } from "@/components/ui/button";
// Define subscription tiers locally since we're having import issues
const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  BASIC: 'basic',
  PRO: 'pro',
} as const;
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [hovering, setHovering] = useState(false);
  const { subscription } = useSubscription();
  const isMobile = useIsMobile();

  // Variables for responsive behavior
  const isExpanded = (!collapsed || hovering) && !isMobile;
  const sidebarWidth = isExpanded ? "w-[240px]" : "w-[70px]";
  
  // Animation variants
  const sidebarVariants = {
    expanded: { width: 240, transition: { duration: 0.3, ease: "easeOut" } },
    collapsed: { width: 70, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  const textVariants = {
    expanded: { 
      opacity: 1, 
      x: 0,
      display: "block",
      transition: { duration: 0.2, delay: 0.1 } 
    },
    collapsed: { 
      opacity: 0, 
      x: -20,
      transitionEnd: { display: "none" },
      transition: { duration: 0.2 } 
    }
  };

  const iconVariants = {
    expanded: { scale: 1, transition: { duration: 0.2 } },
    collapsed: { scale: 1.2, transition: { duration: 0.2 } }
  };

  return (
    <motion.aside 
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      className={cn(
        "bg-surface-dark border-r border-gray-800 flex flex-col h-full",
        "transition-all duration-300 ease-in-out",
        "fixed z-50 top-0 left-0 h-full",
        className
      )}
      onMouseEnter={() => !isMobile && setHovering(true)}
      onMouseLeave={() => !isMobile && setHovering(false)}
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <motion.div 
            variants={iconVariants}
            className="h-8 w-8 bg-gradient-to-br from-accent-purple to-secondary rounded-lg flex items-center justify-center"
          >
            <Zap className="h-4 w-4 text-white" />
          </motion.div>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.span 
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="text-lg font-bold text-white whitespace-nowrap"
              >
                CryptoArb
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "p-0 h-8 w-8 rounded-full text-gray-400 hover:text-white hover:bg-gray-800",
            !isExpanded && "hidden"
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="px-2 space-y-1">
          <SidebarMenuItem 
            href="/dashboard" 
            icon="BarChart2" 
            text="Dashboard" 
            active={location === "/dashboard"}
            collapsed={!isExpanded}
          />
          <SidebarMenuItem 
            href="/arbitrage" 
            icon="ArrowLeftRight" 
            text="Arbitrage" 
            active={location === "/arbitrage"}
            collapsed={!isExpanded}
          />
          <SidebarMenuItem 
            href="/bot" 
            icon="Bot" 
            text="Trading Bot" 
            active={location === "/bot"}
            collapsed={!isExpanded}
            disabled={subscription?.tier === SUBSCRIPTION_TIERS.FREE}
          />
          <SidebarMenuItem 
            href="/market-analysis" 
            icon="PieChart" 
            text="Market Analysis" 
            active={location === "/market-analysis"}
            collapsed={!isExpanded}
          />
          <SidebarMenuItem 
            href="/exchanges" 
            icon="Building2" 
            text="Exchanges" 
            active={location === "/exchanges"}
            collapsed={!isExpanded}
          />
          
          <AnimatePresence>
            {isExpanded && (
              <motion.li 
                className="pt-6"
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
              >
                <div className="px-3 mb-2 text-xs text-gray-500 uppercase">Account</div>
              </motion.li>
            )}
          </AnimatePresence>
          
          <SidebarMenuItem 
            href="/profile" 
            icon="User" 
            text="Profile" 
            active={location === "/profile"}
            collapsed={!isExpanded}
            isAccount
          />
          <SidebarMenuItem 
            href="/settings" 
            icon="Settings" 
            text="Settings" 
            active={location === "/settings"}
            collapsed={!isExpanded}
            isAccount
          />
          <SidebarMenuItem 
            href="/subscription" 
            icon="Crown" 
            text="Subscription" 
            active={location === "/subscription"}
            collapsed={!isExpanded}
            isAccount
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="bg-glass rounded-lg p-3">
          <div className="flex items-center gap-3">
            <motion.div 
              variants={iconVariants}
              className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium"
            >
              {subscription?.user?.name?.substring(0, 2) || "U"}
            </motion.div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="flex-1"
                  variants={textVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                >
                  <div className="text-sm font-medium text-white whitespace-nowrap">{subscription?.user?.name || "User"}</div>
                  <div className="text-xs text-gray-400 capitalize">{subscription?.tier} Plan</div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-white"
              onClick={() => window.location.href = "/"}
            >
              <i className="fas fa-arrow-right-from-bracket"></i>
            </Button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
