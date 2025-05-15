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

export function FuturesArbitrage() {
  const [asset, setAsset] = useState("all");
  const [minProfit, setMinProfit] = useState("0.8");
  
  // In a real app, this data would come from an API
  const futuresArbitrageOpportunities = [
    {
      id: "futures1",
      type: ARBITRAGE_TYPES.FUTURES,
      title: "BTC-PERP",
      profitPercentage: 1.21,
      spotExchange: "Binance",
      spotPrice: 28642.15,
      futuresExchange: "Binance Futures",
      futuresPrice: 28988.73,
      updatedSeconds: 18
    },
    {
      id: "futures2",
      type: ARBITRAGE_TYPES.FUTURES,
      title: "ETH-PERP",
      profitPercentage: 0.96,
      spotExchange: "Coinbase",
      spotPrice: 1784.25,
      futuresExchange: "Bybit",
      futuresPrice: 1801.38,
      updatedSeconds: 37
    },
    {
      id: "futures3",
      type: ARBITRAGE_TYPES.FUTURES,
      title: "SOL-PERP",
      profitPercentage: 0.94,
      spotExchange: "Coinbase",
      spotPrice: 22.17,
      futuresExchange: "Binance",
      futuresPrice: 22.38,
      updatedSeconds: 45
    },
    {
      id: "futures4",
      type: ARBITRAGE_TYPES.FUTURES,
      title: "XRP-PERP",
      profitPercentage: 1.28,
      spotExchange: "Kraken",
      spotPrice: 0.5612,
      futuresExchange: "OKX",
      futuresPrice: 0.5684,
      updatedSeconds: 62
    },
    {
      id: "futures5",
      type: ARBITRAGE_TYPES.FUTURES,
      title: "ADA-PERP",
      profitPercentage: 1.67,
      spotExchange: "Binance",
      spotPrice: 0.4261,
      futuresExchange: "Bybit",
      futuresPrice: 0.4332,
      updatedSeconds: 78
    }
  ];
  
  // Filter opportunities based on minimum profit and asset
  const filteredOpportunities = futuresArbitrageOpportunities.filter(opp => {
    if (asset !== 'all' && !opp.title.toLowerCase().includes(asset.toLowerCase())) {
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
            placeholder="Search futures contracts..."
            className="bg-surface-dark border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-secondary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex gap-3">
          <Select value={asset} onValueChange={setAsset}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 w-40">
              <SelectValue placeholder="Select Asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assets</SelectItem>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="sol">SOL</SelectItem>
              <SelectItem value="ada">ADA</SelectItem>
              <SelectItem value="xrp">XRP</SelectItem>
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
            spotExchange={opp.spotExchange}
            spotPrice={opp.spotPrice}
            futuresExchange={opp.futuresExchange}
            futuresPrice={opp.futuresPrice}
            updatedSeconds={opp.updatedSeconds}
            onTrade={() => handleTrade(opp.id)}
          />
        ))}
      </div>
      
      {filteredOpportunities.length === 0 && (
        <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
          <p className="text-gray-400">No futures arbitrage opportunities match your filters</p>
          <Button 
            variant="link" 
            className="text-secondary mt-2"
            onClick={() => {
              setMinProfit("0.5");
              setAsset("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-surface-light rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">Understanding Futures Arbitrage</h3>
        <p className="text-gray-400 mb-4">
          Futures arbitrage involves exploiting price differences between spot markets and futures contracts of the same cryptocurrency. The price of a futures contract may trade at a premium or discount to the spot price due to market expectations, funding rates, and liquidity differences.
        </p>
        <div className="bg-surface p-3 rounded-lg border border-gray-700">
          <div className="flex items-center text-sm mb-2">
            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-gray-300">Low Risk: 0.5% - 1.0% profit</span>
          </div>
          <div className="flex items-center text-sm mb-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
            <span className="text-gray-300">Medium Risk: 1.0% - 1.5% profit</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-gray-300">High Risk: 1.5%+ profit (potential price manipulation)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
