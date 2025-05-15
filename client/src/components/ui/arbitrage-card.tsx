import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArbitrageType, ARBITRAGE_TYPES } from "@shared/schema";

interface ArbitrageCardProps {
  type: ArbitrageType;
  title: string;
  profitPercentage: number;
  buyExchange?: string;
  sellExchange?: string;
  buyPrice?: number;
  sellPrice?: number;
  exchangeName?: string;
  trades?: number;
  estProfit?: number;
  risk?: string;
  spotExchange?: string;
  spotPrice?: number;
  futuresExchange?: string;
  futuresPrice?: number;
  updatedSeconds: number;
  onTrade: () => void;
  className?: string;
}

export function ArbitrageCard({
  type,
  title,
  profitPercentage,
  buyExchange,
  sellExchange,
  buyPrice,
  sellPrice,
  exchangeName,
  trades,
  estProfit,
  risk,
  spotExchange,
  spotPrice,
  futuresExchange,
  futuresPrice,
  updatedSeconds,
  onTrade,
  className,
}: ArbitrageCardProps) {
  // Determine badge color based on arbitrage type
  const getBadgeVariant = () => {
    switch (type) {
      case ARBITRAGE_TYPES.DIRECT:
        return "green";
      case ARBITRAGE_TYPES.TRIANGULAR:
        return "purple";
      case ARBITRAGE_TYPES.FUTURES:
        return "default"; // blue
      case ARBITRAGE_TYPES.P2P:
        return "teal";
      default:
        return "default";
    }
  };

  // Format the updated time text
  const getUpdatedText = () => {
    if (updatedSeconds < 60) {
      return `Updated ${updatedSeconds} sec ago`;
    } else {
      return `Updated ${Math.floor(updatedSeconds / 60)} min ago`;
    }
  };

  return (
    <div className={cn(
      "arbitrage-card bg-surface-light rounded-xl p-4 border border-gray-800 transition-all hover:transform hover:translate-y-[-5px] hover:shadow-lg",
      className
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Badge variant={getBadgeVariant()} className="mr-2 capitalize">
            {type}
          </Badge>
          <div className="text-white font-medium">{title}</div>
        </div>
        <div className="text-green-500 font-medium">+{profitPercentage.toFixed(2)}%</div>
      </div>

      {/* Render content based on arbitrage type */}
      {type === ARBITRAGE_TYPES.DIRECT && (
        <>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div>Buy: <span className="text-white">{buyExchange}</span></div>
            <div>${buyPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div>Sell: <span className="text-white">{sellExchange}</span></div>
            <div>${sellPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </>
      )}

      {type === ARBITRAGE_TYPES.TRIANGULAR && (
        <>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div>Exchange: <span className="text-white">{exchangeName}</span></div>
            <div>{trades} trades</div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div>Est. Profit: <span className="text-white">${estProfit?.toFixed(2)}</span></div>
            <div>{risk} risk</div>
          </div>
        </>
      )}

      {type === ARBITRAGE_TYPES.FUTURES && (
        <>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div>Spot: <span className="text-white">{spotExchange}</span></div>
            <div>${spotPrice?.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div>Futures: <span className="text-white">{futuresExchange}</span></div>
            <div>${futuresPrice?.toFixed(2)}</div>
          </div>
        </>
      )}

      {type === ARBITRAGE_TYPES.P2P && (
        <>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <div>Buy: <span className="text-white">{buyExchange}</span></div>
            <div>${buyPrice?.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div>Sell: <span className="text-white">{sellExchange}</span></div>
            <div>${sellPrice?.toFixed(2)}</div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{getUpdatedText()}</div>
        <Button 
          size="sm" 
          onClick={onTrade}
          className="px-3 py-1 rounded-md bg-gradient-to-r from-secondary to-accent-purple text-white"
        >
          Trade
        </Button>
      </div>
    </div>
  );
}
