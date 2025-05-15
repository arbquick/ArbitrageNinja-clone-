import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { LucideIcon, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

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
  
  return (
    <li>
      <Link href={!disabled ? href : "#"}>
        <a
          className={cn(
            "menu-item flex items-center gap-3 text-gray-300 px-3 py-2 rounded-lg transition-all duration-200 relative group hover:bg-surface-light hover:text-white",
            active && "active bg-surface-light text-white",
            disabled && "opacity-50 cursor-not-allowed",
            isAccount && collapsed && "mt-4"
          )}
          onClick={(e) => {
            if (disabled) e.preventDefault();
          }}
        >
          <IconComponent 
            className={cn(
              "w-5 h-5 flex-shrink-0 transition-all duration-200",
              active ? "text-secondary" : "group-hover:text-secondary",
              collapsed && "w-6 h-6"
            )} 
          />
          {!collapsed && <span className="menu-text whitespace-nowrap transition-all duration-200">{text}</span>}
          
          {/* For visual active indication */}
          {active && (
            <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-purple to-secondary rounded-r" />
          )}
          
          {/* Only show this indicator when hovering and not already active */}
          {!active && (
            <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-purple to-secondary rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          )}
          
          {disabled && collapsed && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
          )}
        </a>
      </Link>
    </li>
  );
}
