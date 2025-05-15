import React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscription } from "@/context/subscription-context";

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

export function Header({ onToggleSidebar, className }: HeaderProps) {
  const { subscription } = useSubscription();

  return (
    <header className={cn("bg-surface border-b border-gray-800 py-3 px-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="bg-surface-dark border border-gray-700 text-white rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-secondary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-gray-400 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </div>
          </Button>
          
          <div className="h-8 w-px bg-gray-700"></div>
          
          <div className="flex items-center gap-2">
            <div className="bg-gray-700 h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium">
              {subscription?.user?.name?.substring(0, 2) || "U"}
            </div>
            <span className="text-white text-sm font-medium hidden sm:inline-block">
              {subscription?.user?.name || "User"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
