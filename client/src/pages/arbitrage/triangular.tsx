import React, { useState } from "react";
import { ArbitrageCard } from "@/components/ui/arbitrage-card";
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

export function TriangularArbitrage() {
  const [exchange, setExchange] = useState("all");
  const [minProfit, setMinProfit] = useState("1.0");
  
  // In a real app, this data would come from an API
  const triangularArbitrageOpportunities = [
    {
      id: "tri1",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "ETH → XRP → BTC",
      profitPercentage: 2.34,
      exchangeName: "Binance",
      trades: 3,
      estProfit: 143.27,
      risk: "Medium",
      updatedSeconds: 28
    },
    {
      id: "tri2",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "BTC → LTC → XMR",
      profitPercentage: 1.76,
      exchangeName: "Kraken",
      trades: 3,
      estProfit: 98.45,
      risk: "Low",
      updatedSeconds: 42
    },
    {
      id: "tri3",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "USDT → SOL → ETH",
      profitPercentage: 2.89,
      exchangeName: "Binance",
      trades: 3,
      estProfit: 187.62,
      risk: "Medium",
      updatedSeconds: 63
    },
    {
      id: "tri4",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "BTC → DOT → ETH",
      profitPercentage: 1.95,
      exchangeName: "Kucoin",
      trades: 3,
      estProfit: 112.33,
      risk: "Medium",
      updatedSeconds: 82
    },
    {
      id: "tri5",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "USDT → ADA → DOT",
      profitPercentage: 3.12,
      exchangeName: "Binance",
      trades: 3,
      estProfit: 215.78,
      risk: "High",
      updatedSeconds: 107
    }
  ];
  
  // Filter opportunities based on minimum profit and exchange
  const filteredOpportunities = triangularArbitrageOpportunities.filter(opp => {
    if (exchange !== 'all' && opp.exchangeName.toLowerCase() !== exchange) {
      return false;
    }
    return opp.profitPercentage >= parseFloat(minProfit);
  });
  
  const handleTrade = (id: string) => {
    console.log(`Trading opportunity: ${id}`);
    // In a real app, this would open a trading modal
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-1 max-w-md relative">
          <Input
            type="text"
            placeholder="Search triangular pairs..."
            className="bg-surface-dark border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-secondary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex gap-3">
          <Select value={exchange} onValueChange={setExchange}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 w-40">
              <SelectValue placeholder="Select Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              <SelectItem value="binance">Binance</SelectItem>
              <SelectItem value="kucoin">Kucoin</SelectItem>
              <SelectItem value="kraken">Kraken</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center bg-surface-dark border border-gray-700 rounded-lg px-3">
            <label htmlFor="min-profit" className="text-gray-400 text-sm mr-2">Min Profit:</label>
            <Input
              id="min-profit"
              type="number"
              value={minProfit}
              onChange={(e) => setMinProfit(e.target.value)}
              className="border-0 bg-transparent text-white w-16 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              min="0"
              step="0.1"
            />
            <span className="text-gray-400">%</span>
          </div>
          
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" /> 
            Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOpportunities.map((opp) => (
          <ArbitrageCard
            key={opp.id}
            type={opp.type}
            title={opp.title}
            profitPercentage={opp.profitPercentage}
            exchangeName={opp.exchangeName}
            trades={opp.trades}
            estProfit={opp.estProfit}
            risk={opp.risk}
            updatedSeconds={opp.updatedSeconds}
            onTrade={() => handleTrade(opp.id)}
          />
        ))}
      </div>
    </div>
  );
}
