import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { LucideIcon, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarMenuItemProps {
  href: string;
  icon: string;
  text: string;
  active: boolean;
  collapsed: boolean;
  isAccount?: boolean;
  disabled?: boolean;
}

export function SidebarMenuItem({
  href,
  icon,
  text,
  active,
  collapsed,
  isAccount = false,
  disabled = false,
}: SidebarMenuItemProps) {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Circle;
  
  // Animation variants
  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.05,
      } 
    },
    hover: { 
      scale: 1.05,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      } 
    }
  };
  
  const indicatorVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0 
    },
    visible: { 
      scaleY: 1,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: 0.1
      } 
    }
  };
  
  const iconVariants = {
    initial: { 
      scale: 1 
    },
    hover: { 
      scale: 1.15,
      rotate: 5,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      } 
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      x: -10,
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.1,
        duration: 0.2
      } 
    }
  };

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={itemVariants}
    >
      <Link href={!disabled ? href : "#"}>
        <a
          className={cn(
            "menu-item flex items-center gap-3 text-gray-300 px-3 py-2 rounded-lg transition-colors relative group overflow-hidden",
            active ? "bg-opacity-20 bg-secondary" : "hover:bg-surface-light",
            disabled && "opacity-50 cursor-not-allowed",
            isAccount && collapsed && "mt-4"
          )}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          <motion.div
            variants={iconVariants}
            className="flex items-center justify-center"
          >
            <IconComponent className="w-5 h-5 flex-shrink-0" />
          </motion.div>
          
          <AnimatePresence>
            {!collapsed && (
              <motion.span 
                className="menu-text whitespace-nowrap"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {text}
              </motion.span>
            )}
          </AnimatePresence>
          
          {/* For visual active indication */}
          {active && (
            <motion.span 
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-purple to-secondary rounded-r" 
              initial="hidden"
              animate="visible"
              variants={indicatorVariants}
            />
          )}
          
          {/* Only show this indicator when hovering and not already active */}
          {!active && (
            <motion.span 
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-purple to-secondary rounded-r opacity-0 group-hover:opacity-100" 
              variants={indicatorVariants}
            />
          )}
          
          {/* Show tooltip for collapsed menu */}
          {collapsed && (
            <div className="absolute left-full ml-2 z-50 transform -translate-y-1/2 top-1/2 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.3 }}
                className="bg-surface-dark text-white text-sm py-1 px-2 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100"
              >
                {text}
                {disabled && <span className="text-red-400 ml-1">(Locked)</span>}
              </motion.div>
            </div>
          )}
          
          {disabled && collapsed && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" 
            />
          )}
        </a>
      </Link>
    </motion.li>
  );
}
