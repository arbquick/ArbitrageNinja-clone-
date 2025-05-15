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
import { Search, SlidersHorizontal, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function P2PArbitrage() {
  const [currency, setCurrency] = useState("all");
  const [minProfit, setMinProfit] = useState("2.0");
  const [paymentMethod, setPaymentMethod] = useState("all");
  
  // In a real app, this data would come from an API
  const p2pArbitrageOpportunities = [
    {
      id: "p2p1",
      type: ARBITRAGE_TYPES.P2P,
      title: "USDT/USD",
      profitPercentage: 3.12,
      buyExchange: "Binance P2P",
      sellExchange: "Kraken",
      buyPrice: 0.97,
      sellPrice: 1.00,
      updatedSeconds: 60,
      paymentMethod: "Bank Transfer"
    },
    {
      id: "p2p2",
      type: ARBITRAGE_TYPES.P2P,
      title: "BTC/USD",
      profitPercentage: 2.45,
      buyExchange: "LocalBitcoins",
      sellExchange: "Coinbase",
      buyPrice: 28100.50,
      sellPrice: 28788.75,
      updatedSeconds: 85,
      paymentMethod: "Cash"
    },
    {
      id: "p2p3",
      type: ARBITRAGE_TYPES.P2P,
      title: "ETH/USD",
      profitPercentage: 2.81,
      buyExchange: "Paxful",
      sellExchange: "Binance",
      buyPrice: 1745.32,
      sellPrice: 1794.37,
      updatedSeconds: 120,
      paymentMethod: "PayPal"
    },
    {
      id: "p2p4",
      type: ARBITRAGE_TYPES.P2P,
      title: "USDC/USD",
      profitPercentage: 2.25,
      buyExchange: "Binance P2P",
      sellExchange: "Coinbase",
      buyPrice: 0.978,
      sellPrice: 1.00,
      updatedSeconds: 155,
      paymentMethod: "Bank Transfer"
    },
    {
      id: "p2p5",
      type: ARBITRAGE_TYPES.P2P,
      title: "XRP/USD",
      profitPercentage: 3.57,
      buyExchange: "Paxful",
      sellExchange: "Kraken",
      buyPrice: 0.542,
      sellPrice: 0.561,
      updatedSeconds: 210,
      paymentMethod: "Venmo"
    }
  ];
  
  // Filter opportunities based on minimum profit, currency, and payment method
  const filteredOpportunities = p2pArbitrageOpportunities.filter(opp => {
    if (currency !== 'all' && !opp.title.toLowerCase().includes(currency.toLowerCase())) {
      return false;
    }
    if (paymentMethod !== 'all' && opp.paymentMethod !== paymentMethod) {
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">P2P Arbitrage</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-md">
              <p>P2P arbitrage involves buying crypto on peer-to-peer platforms and selling on exchanges (or vice versa) to profit from price differences. Always verify payment methods and be aware of potential counterparty risks.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-1 max-w-md relative">
          <Input
            type="text"
            placeholder="Search P2P opportunities..."
            className="bg-surface-dark border border-gray-700 text-white rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:border-secondary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 w-32">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Currencies</SelectItem>
              <SelectItem value="usdt">USDT</SelectItem>
              <SelectItem value="btc">BTC</SelectItem>
              <SelectItem value="eth">ETH</SelectItem>
              <SelectItem value="usdc">USDC</SelectItem>
              <SelectItem value="xrp">XRP</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 w-40">
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
              <SelectItem value="PayPal">PayPal</SelectItem>
              <SelectItem value="Venmo">Venmo</SelectItem>
              <SelectItem value="Credit Card">Credit Card</SelectItem>
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
            buyExchange={opp.buyExchange}
            sellExchange={opp.sellExchange}
            buyPrice={opp.buyPrice}
            sellPrice={opp.sellPrice}
            updatedSeconds={opp.updatedSeconds}
            onTrade={() => handleTrade(opp.id)}
          />
        ))}
      </div>
      
      {filteredOpportunities.length === 0 && (
        <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
          <p className="text-gray-400">No P2P arbitrage opportunities match your filters</p>
          <Button 
            variant="link" 
            className="text-secondary mt-2"
            onClick={() => {
              setMinProfit("1.0");
              setCurrency("all");
              setPaymentMethod("all");
            }}
          >
            Reset filters
          </Button>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-surface-light rounded-xl border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">P2P Arbitrage Risks & Tips</h3>
        <div className="text-gray-400 space-y-2">
          <p>P2P arbitrage typically offers higher profit margins but comes with additional risks:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Always verify counterparty reputation and reviews</li>
            <li>Be aware of payment processing times</li>
            <li>Consider chargeback risks with certain payment methods</li>
            <li>Factor in platform fees when calculating profit margins</li>
            <li>Start with smaller amounts to test transaction flow</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
