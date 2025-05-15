import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type NetworkCongestion = "low" | "medium" | "high";

export interface Network {
  id: string;
  name: string;
  congestion: NetworkCongestion;
  gasPrice: number;
  transactionTime: string;
  isActive: boolean;
}

interface NetworkStatusProps {
  className?: string;
  onNetworkSelect?: (networkId: string) => void;
}

export function NetworkStatus({ className, onNetworkSelect }: NetworkStatusProps) {
  const [networks, setNetworks] = useState<Network[]>([
    {
      id: "ethereum",
      name: "Ethereum",
      congestion: "high",
      gasPrice: 45,
      transactionTime: "3-5 min",
      isActive: true
    },
    {
      id: "binance",
      name: "Binance",
      congestion: "low",
      gasPrice: 5,
      transactionTime: "5-10 sec",
      isActive: true
    },
    {
      id: "solana",
      name: "Solana",
      congestion: "low",
      gasPrice: 0.00025,
      transactionTime: "2-3 sec",
      isActive: true
    },
    {
      id: "polygon",
      name: "Polygon",
      congestion: "medium",
      gasPrice: 80,
      transactionTime: "30-60 sec",
      isActive: true
    },
    {
      id: "arbitrum",
      name: "Arbitrum",
      congestion: "low",
      gasPrice: 0.1,
      transactionTime: "10-15 sec",
      isActive: true
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  // Simulate network updates every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      updateNetworkStatus();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const updateNetworkStatus = () => {
    // This would be an actual API call in a real application
    // Here we're just simulating random changes to the network data
    setNetworks(prev => 
      prev.map(network => {
        const random = Math.random();
        let congestion: NetworkCongestion = network.congestion;
        
        if (random < 0.3) {
          congestion = "low";
        } else if (random < 0.7) {
          congestion = "medium";
        } else {
          congestion = "high";
        }
        
        const gasPrice = congestion === "low" 
          ? network.gasPrice * 0.8 + Math.random() * 5
          : congestion === "medium"
            ? network.gasPrice * 1.1 + Math.random() * 10
            : network.gasPrice * 1.5 + Math.random() * 20;
            
        return {
          ...network,
          congestion,
          gasPrice: Number(gasPrice.toFixed(2)),
          isActive: Math.random() > 0.05 // 5% chance of network being down
        };
      })
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    updateNetworkStatus();
    
    // Simulate loading
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId);
    if (onNetworkSelect) {
      onNetworkSelect(networkId);
    }
  };

  const getStatusIndicator = (congestion: NetworkCongestion, isActive: boolean) => {
    if (!isActive) {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    
    switch (congestion) {
      case "low":
        return <div className="h-3 w-3 bg-green-500 rounded-full status-low"></div>;
      case "medium":
        return <div className="h-3 w-3 bg-yellow-500 rounded-full status-medium"></div>;
      case "high":
        return <div className="h-3 w-3 bg-red-500 rounded-full status-high"></div>;
      default:
        return <div className="h-3 w-3 bg-gray-500 rounded-full"></div>;
    }
  };

  const getStatusText = (congestion: NetworkCongestion, isActive: boolean) => {
    if (!isActive) return "Offline";
    
    switch (congestion) {
      case "low": return "Low congestion";
      case "medium": return "Medium congestion";
      case "high": return "High congestion";
      default: return "Unknown";
    }
  };

  return (
    <div className={cn("rounded-lg border border-gray-800 bg-surface overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-surface-dark">
        <h3 className="text-sm font-medium text-white">Network Status</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "spin")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh network status</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="divide-y divide-gray-800">
        {networks.map((network) => (
          <div 
            key={network.id}
            className={cn(
              "px-4 py-3 flex items-center transition-colors duration-200 cursor-pointer hover:bg-surface-dark",
              selectedNetwork === network.id && "bg-surface-dark/50"
            )}
            onClick={() => handleNetworkSelect(network.id)}
          >
            <div className="flex-1 flex items-center gap-3">
              <div className="flex items-center justify-center">
                {getStatusIndicator(network.congestion, network.isActive)}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-white">{network.name}</h4>
                <p className="text-xs text-gray-400">{getStatusText(network.congestion, network.isActive)}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs text-gray-300">
                <Clock className="h-3 w-3" />
                <span>{network.isActive ? network.transactionTime : "N/A"}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {network.isActive ? `${network.gasPrice} Gwei` : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-4 py-3 border-t border-gray-800 bg-surface-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-400">High</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}