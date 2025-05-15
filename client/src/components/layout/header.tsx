import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, Menu, X, Settings, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSubscription } from "@/context/subscription-context";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface HeaderProps {
  onToggleSidebar: () => void;
  className?: string;
}

export function Header({ onToggleSidebar, className }: HeaderProps) {
  const { subscription } = useSubscription();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New arbitrage opportunity",
      description: "BTC/USDT on Binance and KuCoin",
      time: "5 min ago",
      type: "opportunity",
      read: false
    },
    {
      id: 2,
      title: "Market alert",
      description: "ETH price increased by 5% in the last hour",
      time: "15 min ago",
      type: "alert",
      read: false
    },
    {
      id: 3,
      title: "Bot transaction completed",
      description: "Successful trade: SOL/USDT +2.3%",
      time: "30 min ago",
      type: "transaction",
      read: false
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // In a real app, this would trigger a search action
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "opportunity": return <Bell className="h-4 w-4 text-green-500" />;
      case "alert": return <Info className="h-4 w-4 text-yellow-500" />;
      case "transaction": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

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
              placeholder="Search for opportunities, markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={cn(
                "bg-surface-dark border border-gray-700 text-white rounded-lg pl-9 pr-4 py-2 transition-all duration-300",
                isSearchActive ? "w-80" : "w-64",
                "focus:border-secondary focus:shadow-glow"
              )}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <Search 
              className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors duration-300",
                isSearchActive ? "text-secondary" : "text-gray-400"
              )} 
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-gray-400 hover:text-white"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs pulse-animation">
                    {unreadCount}
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 bg-surface border border-gray-700 text-white shadow-lg rounded-lg overflow-hidden slide-up">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification, index) => (
                      <div 
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-3 px-4 py-3 hover:bg-surface-dark transition-colors duration-200 border-b border-gray-700 cursor-pointer",
                          notification.read ? "opacity-70" : "opacity-100 bg-opacity-50 bg-secondary/5"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="p-2 rounded-full bg-surface-dark flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <span className="text-xs text-gray-400">{notification.time}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{notification.description}</p>
                        </div>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-secondary flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-gray-400">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              
              <div className="px-4 py-3 border-t border-gray-700">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs"
                  onClick={() => console.log("View all notifications")}
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="h-8 w-px bg-gray-700"></div>
          
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <div className="bg-gradient-to-br from-primary/80 to-secondary h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border border-gray-700 shadow-md">
                  {subscription?.user?.name?.substring(0, 2) || "U"}
                </div>
                <span className="text-white text-sm font-medium hidden sm:inline-block">
                  {subscription?.user?.name || "User"}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-surface border border-gray-700 text-white shadow-lg rounded-lg overflow-hidden slide-up">
              <div className="p-4 border-b border-gray-700 bg-gradient-to-br from-surface-dark to-surface">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary/80 to-secondary h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium border border-gray-700 shadow-md">
                    {subscription?.user?.name?.substring(0, 2) || "U"}
                  </div>
                  <div>
                    <h4 className="font-medium">{subscription?.user?.name || "User"}</h4>
                    <p className="text-xs text-gray-400">{subscription?.user?.email || "user@example.com"}</p>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-surface-dark rounded-md border border-gray-700 text-xs">
                  <div className="flex justify-between items-center">
                    <span>Subscription:</span>
                    <span className="font-medium text-secondary">{subscription?.tier || "Free"}</span>
                  </div>
                  {subscription?.expiresAt && (
                    <div className="flex justify-between items-center mt-1">
                      <span>Expires:</span>
                      <span className="font-medium">{new Date(subscription.expiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-surface-dark transition-colors duration-200 flex items-center gap-2">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <span>Settings</span>
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-surface-dark transition-colors duration-200 flex items-center gap-2">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
