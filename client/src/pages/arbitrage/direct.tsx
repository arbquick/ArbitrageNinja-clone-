import React, { useState } from "react";
import { ArbitrageCard } from "@/components/ui/arbitrage-card";
import { ArbitrageFilters } from "@/components/ui/arbitrage-filters";
import { ProfitCalculator } from "@/components/ui/profit-calculator";
import { ARBITRAGE_TYPES } from "@shared/schema";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

export function DirectArbitrage() {
  const [minProfit, setMinProfit] = useState("0.5");
  const [currency, setCurrency] = useState("all");
  const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // In a real app, this data would come from an API call
  const directArbitrageOpportunities = [
    {
      id: "direct1",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "BTC/USDT",
      profitPercentage: 1.87,
      buyExchange: "Binance",
      sellExchange: "KuCoin",
      buyPrice: 28642.15,
      sellPrice: 29177.52,
      updatedSeconds: 12,
      network: "Ethereum",
      congestion: "medium",
      volume: 12500000,
      risk: "low"
    },
    {
      id: "direct2",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "ETH/USDT",
      profitPercentage: 1.53,
      buyExchange: "Bitcoin Market",
      sellExchange: "Coinbase",
      buyPrice: 1784.25,
      sellPrice: 1811.55,
      updatedSeconds: 23,
      network: "Arbitrum",
      congestion: "low",
      volume: 8750000,
      risk: "low"
    },
    {
      id: "direct3",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "SOL/USDT",
      profitPercentage: 2.16,
      buyExchange: "KuCoin",
      sellExchange: "Binance",
      buyPrice: 22.18,
      sellPrice: 22.66,
      updatedSeconds: 35,
      network: "Solana",
      congestion: "low",
      volume: 5250000,
      risk: "medium"
    },
    {
      id: "direct4",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "ADA/USDT",
      profitPercentage: 1.64,
      buyExchange: "Coinbase",
      sellExchange: "KuCoin",
      buyPrice: 0.4261,
      sellPrice: 0.4331,
      updatedSeconds: 48,
      network: "Cardano",
      congestion: "low",
      volume: 3100000,
      risk: "medium"
    },
    {
      id: "direct5",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "XRP/USDT",
      profitPercentage: 2.34,
      buyExchange: "Bitcoin Market",
      sellExchange: "Binance",
      buyPrice: 0.5612,
      sellPrice: 0.5743,
      updatedSeconds: 57,
      network: "BSC",
      congestion: "medium",
      volume: 6800000,
      risk: "high"
    },
    {
      id: "direct6",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "DOT/USDT",
      profitPercentage: 1.95,
      buyExchange: "KuCoin",
      sellExchange: "Bitcoin Market",
      buyPrice: 6.37,
      sellPrice: 6.49,
      updatedSeconds: 72,
      network: "Polkadot",
      congestion: "low",
      volume: 2900000,
      risk: "medium"
    }
  ];
  
  // Filter opportunities based on minimum profit
  const filteredOpportunities = directArbitrageOpportunities.filter(opp => {
    return opp.profitPercentage >= parseFloat(minProfit);
  });
  
  const handleTrade = (opportunity) => {
    console.log(`Trading opportunity: ${opportunity.id}`);
    setSelectedOpportunity(opportunity);
    // In a real app, this would open a trading modal
  };
  
  const handleFilterChange = (filters) => {
    console.log("Filters changed:", filters);
    // In a real app, this would update the filteredOpportunities
  };

  return (
    <div>
      <ArbitrageFilters 
        onFilterChange={handleFilterChange}
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpportunities.map((opp) => (
                <ArbitrageCard
                  key={opp.id}
                  type={opp.type}
                  title={opp.title}
                  profitPercentage={opp.profitPercentage}
                  buyExchange={opp.buyExchange}
                  sellExchange={opp.sellExchange}
                  buyPrice={opp.buyPrice}
                  sellPrice={opp.sellPrice}
                  updatedSeconds={opp.updatedSeconds}
                  onTrade={() => handleTrade(opp)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
              <p className="text-gray-400">No arbitrage opportunities match your filters</p>
              <Button 
                variant="link" 
                className="text-secondary mt-2"
                onClick={() => setMinProfit("0.5")}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
        
        <div>
          <ProfitCalculator 
            type={ARBITRAGE_TYPES.DIRECT}
            buyPrice={selectedOpportunity?.buyPrice || 28642.15}
            sellPrice={selectedOpportunity?.sellPrice || 29177.52}
          />
          
          {selectedOpportunity && (
            <div className="mt-4 bg-surface-light border border-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Network Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm">{selectedOpportunity.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Congestion</span>
                  <span className={`text-sm ${
                    selectedOpportunity.congestion === 'low' ? 'text-green-500' : 
                    selectedOpportunity.congestion === 'medium' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {selectedOpportunity.congestion.charAt(0).toUpperCase() + selectedOpportunity.congestion.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">24h Volume</span>
                  <span className="text-sm">${(selectedOpportunity.volume / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Risk Level</span>
                  <span className={`text-sm ${
                    selectedOpportunity.risk === 'low' ? 'text-green-500' : 
                    selectedOpportunity.risk === 'medium' ? 'text-yellow-500' : 
                    'text-red-500'
                  }`}>
                    {selectedOpportunity.risk.charAt(0).toUpperCase() + selectedOpportunity.risk.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
