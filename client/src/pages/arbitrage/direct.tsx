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

export function DirectArbitrage() {
  const [minProfit, setMinProfit] = useState("0.5");
  const [currency, setCurrency] = useState("all");
  
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
      updatedSeconds: 12
    },
    {
      id: "direct2",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "ETH/USDT",
      profitPercentage: 1.53,
      buyExchange: "Kraken",
      sellExchange: "Coinbase",
      buyPrice: 1784.25,
      sellPrice: 1811.55,
      updatedSeconds: 23
    },
    {
      id: "direct3",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "SOL/USDT",
      profitPercentage: 2.16,
      buyExchange: "Bitfinex",
      sellExchange: "Binance",
      buyPrice: 22.18,
      sellPrice: 22.66,
      updatedSeconds: 35
    },
    {
      id: "direct4",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "ADA/USDT",
      profitPercentage: 1.64,
      buyExchange: "Huobi",
      sellExchange: "OKX",
      buyPrice: 0.4261,
      sellPrice: 0.4331,
      updatedSeconds: 48
    },
    {
      id: "direct5",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "XRP/USDT",
      profitPercentage: 2.34,
      buyExchange: "Bitstamp",
      sellExchange: "Binance",
      buyPrice: 0.5612,
      sellPrice: 0.5743,
      updatedSeconds: 57
    },
    {
      id: "direct6",
      type: ARBITRAGE_TYPES.DIRECT,
      title: "DOT/USDT",
      profitPercentage: 1.95,
      buyExchange: "Kucoin",
      sellExchange: "Kraken",
      buyPrice: 6.37,
      sellPrice: 6.49,
      updatedSeconds: 72
    }
  ];
  
  // Filter opportunities based on minimum profit
  const filteredOpportunities = directArbitrageOpportunities.filter(opp => {
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
            placeholder="Search pairs, exchanges..."
            className="bg-surface-dark border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-secondary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex gap-3">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 w-40">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Pairs</SelectItem>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
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
      
      {filteredOpportunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
              onTrade={() => handleTrade(opp.id)}
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
  );
}
