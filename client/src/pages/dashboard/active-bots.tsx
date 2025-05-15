import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Link } from "wouter";

interface BotData {
  id: string;
  name: string;
  status: 'active' | 'scanning' | 'paused' | 'error';
  profit: number;
  percentChange: number;
}

export function ActiveBots({ className }: { className?: string }) {
  const { subscription } = useSubscription();
  
  // Mock data - in a real app, this would come from an API
  const bots: BotData[] = [
    {
      id: "bot1",
      name: "BTC-ETH Direct",
      status: "active",
      profit: 87.45,
      percentChange: 2.3
    },
    {
      id: "bot2",
      name: "XRP Triangle",
      status: "active",
      profit: 132.19,
      percentChange: 4.7
    },
    {
      id: "bot3",
      name: "SOL-AVAX-MATIC",
      status: "scanning",
      profit: 0,
      percentChange: 0
    }
  ];
  
  const isBotAccessAllowed = subscription?.tier !== SUBSCRIPTION_TIERS.FREE;

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <div className="flex items-center text-green-500 text-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Active
          </div>
        );
      case 'scanning':
        return (
          <div className="flex items-center text-yellow-500 text-sm">
            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse mr-2"></div>
            Scanning
          </div>
        );
      case 'paused':
        return (
          <div className="flex items-center text-gray-400 text-sm">
            <div className="h-2 w-2 bg-gray-400 rounded-full mr-2"></div>
            Paused
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-500 text-sm">
            <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
            Error
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-surface-light rounded-xl p-5 border border-gray-800", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-white">Active Trading Bots</h3>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
      
      {isBotAccessAllowed ? (
        <div className="space-y-4">
          {bots.map((bot) => (
            <div key={bot.id} className="bg-surface rounded-lg p-3 border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-white">{bot.name}</div>
                {getStatusIndicator(bot.status)}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-400">Profit Today: <span className="text-white">${bot.profit.toFixed(2)}</span></div>
                <div className={bot.percentChange > 0 ? "text-green-500" : "text-gray-400"}>
                  {bot.percentChange > 0 ? "+" : ""}{bot.percentChange}%
                </div>
              </div>
            </div>
          ))}
          
          <Link href="/bot">
            <Button className="w-full py-2 mt-2 rounded-lg bg-surface border border-gray-700 text-gray-300 text-sm hover:bg-surface-dark transition-colors">
              <i className="fas fa-plus mr-2"></i> Add New Bot
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-surface rounded-lg p-4 border border-gray-800 text-center">
          <p className="text-gray-400 mb-4">Trading Bot access is only available on Basic and Pro plans</p>
          <Link href="/subscription">
            <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white hover:shadow-glow transition-all">
              Upgrade Plan
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
