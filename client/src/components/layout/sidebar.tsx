import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";
import { Zap } from "lucide-react";
import { SidebarMenuItem } from "./sidebar-menu-item";
import { useSubscription } from "@/context/subscription-context";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_TIERS } from "@shared/schema";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { subscription } = useSubscription();

  return (
    <aside 
      className={cn(
        "bg-surface-dark border-r border-gray-800 transition-all duration-300 flex flex-col h-full",
        collapsed ? "w-[70px] min-w-[70px] hover:w-[240px] group" : "w-[240px] min-w-[240px]",
        className
      )}
      onMouseEnter={() => collapsed && setCollapsed(false)}
      onMouseLeave={() => !collapsed && setCollapsed(true)}
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-accent-purple to-secondary rounded-lg flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          {!collapsed && <span className="text-lg font-bold text-white">CryptoArb</span>}
        </div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <ul className="px-2 space-y-1">
          <SidebarMenuItem 
            href="/dashboard" 
            icon="BarChart2" 
            text="Dashboard" 
            active={location === "/dashboard"}
            collapsed={collapsed}
          />
          <SidebarMenuItem 
            href="/arbitrage" 
            icon="ArrowLeftRight" 
            text="Arbitrage" 
            active={location === "/arbitrage"}
            collapsed={collapsed}
          />
          <SidebarMenuItem 
            href="/bot" 
            icon="Bot" 
            text="Trading Bot" 
            active={location === "/bot"}
            collapsed={collapsed}
            disabled={subscription?.tier === SUBSCRIPTION_TIERS.FREE}
          />
          <SidebarMenuItem 
            href="/market-analysis" 
            icon="PieChart" 
            text="Market Analysis" 
            active={location === "/market-analysis"}
            collapsed={collapsed}
          />
          <SidebarMenuItem 
            href="/exchanges" 
            icon="Building2" 
            text="Exchanges" 
            active={location === "/exchanges"}
            collapsed={collapsed}
          />
          
          {!collapsed && <li className="pt-6">
            <div className="px-3 mb-2 text-xs text-gray-500 uppercase">Account</div>
          </li>}
          
          <SidebarMenuItem 
            href="/profile" 
            icon="User" 
            text="Profile" 
            active={location === "/profile"}
            collapsed={collapsed}
            isAccount
          />
          <SidebarMenuItem 
            href="/settings" 
            icon="Settings" 
            text="Settings" 
            active={location === "/settings"}
            collapsed={collapsed}
            isAccount
          />
          <SidebarMenuItem 
            href="/subscription" 
            icon="Crown" 
            text="Subscription" 
            active={location === "/subscription"}
            collapsed={collapsed}
            isAccount
          />
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="bg-glass rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium">
              {subscription?.user?.name?.substring(0, 2) || "U"}
            </div>
            {!collapsed && (
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{subscription?.user?.name || "User"}</div>
                <div className="text-xs text-gray-400 capitalize">{subscription?.tier} Plan</div>
              </div>
            )}
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
    </aside>
  );
}
