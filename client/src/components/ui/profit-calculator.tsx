import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BadgePercent, TrendingUp, Zap, DollarSign, SendHorizontal, AlertCircle } from "lucide-react";
import { ArbitrageType, ARBITRAGE_TYPES } from "@shared/schema";

interface NetworkInfo {
  name: string;
  congestion: "low" | "medium" | "high";
  gasPrice: number;
  transactionTime: string;
  color: string;
}

interface ProfitCalculatorProps {
  type: ArbitrageType;
  buyPrice?: number;
  sellPrice?: number;
  className?: string;
}

export function ProfitCalculator({ type, buyPrice = 0, sellPrice = 0, className }: ProfitCalculatorProps) {
  const [amount, setAmount] = useState<number>(1000);
  const [slippage, setSlippage] = useState<number>(0.5);
  const [gasLimit, setGasLimit] = useState<number>(200000);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("ethereum");
  const [includeGas, setIncludeGas] = useState<boolean>(true);
  const [results, setResults] = useState({
    grossProfit: 0,
    gasCost: 0,
    netProfit: 0,
    roi: 0,
    profitable: false
  });

  // Simulated network data - in a real app, this would be fetched from an API
  const networks: Record<string, NetworkInfo> = {
    ethereum: {
      name: "Ethereum",
      congestion: "medium",
      gasPrice: 35,
      transactionTime: "15-30 seconds",
      color: "text-blue-500"
    },
    bsc: {
      name: "Binance Smart Chain",
      congestion: "low",
      gasPrice: 5,
      transactionTime: "5-10 seconds",
      color: "text-yellow-500"
    },
    polygon: {
      name: "Polygon",
      congestion: "low",
      gasPrice: 50,
      transactionTime: "2-5 seconds",
      color: "text-purple-500"
    },
    arbitrum: {
      name: "Arbitrum",
      congestion: "low",
      gasPrice: 0.25,
      transactionTime: "< 1 second",
      color: "text-blue-400"
    },
    optimism: {
      name: "Optimism",
      congestion: "medium",
      gasPrice: 0.15,
      transactionTime: "1-3 seconds",
      color: "text-red-500"
    }
  };

  const calculateProfit = () => {
    // Basic profit calculation depends on the arbitrage type
    let priceSpread = 0;
    let grossProfit = 0;
    
    switch (type) {
      case ARBITRAGE_TYPES.DIRECT:
        priceSpread = sellPrice - buyPrice;
        grossProfit = (amount / buyPrice) * priceSpread;
        break;
      case ARBITRAGE_TYPES.TRIANGULAR:
        // Simulate triangular arbitrage with a 1.2% profit
        grossProfit = amount * 0.012;
        break;
      case ARBITRAGE_TYPES.FUTURES:
        // Simulate futures arbitrage with a 0.9% profit
        grossProfit = amount * 0.009;
        break;
      case ARBITRAGE_TYPES.P2P:
        // Simulate P2P arbitrage with a 1.5% profit
        grossProfit = amount * 0.015;
        break;
      default:
        grossProfit = 0;
    }
    
    // Apply slippage
    grossProfit = grossProfit * (1 - slippage / 100);
    
    // Calculate gas cost (simplified)
    const selectedNetworkInfo = networks[selectedNetwork];
    const gasCost = includeGas ? (gasLimit * selectedNetworkInfo.gasPrice) / 1000000 : 0;
    
    // Calculate net profit and ROI
    const netProfit = grossProfit - gasCost;
    const roi = (netProfit / amount) * 100;
    
    setResults({
      grossProfit,
      gasCost,
      netProfit,
      roi,
      profitable: netProfit > 0
    });
  };

  // Recalculate when inputs change
  useEffect(() => {
    calculateProfit();
  }, [amount, slippage, gasLimit, selectedNetwork, includeGas, buyPrice, sellPrice, type]);

  const getCongestionColor = (congestion: string) => {
    switch (congestion) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className={`bg-surface-light border-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BadgePercent className="mr-2 h-5 w-5 text-secondary" />
          Profit Calculator
        </CardTitle>
        <CardDescription>
          Calculate potential profits and costs for {type.toLowerCase().replace('_', ' ')} arbitrage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Investment Amount (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="pl-9 bg-surface border-gray-700"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Network</label>
            <Select 
              value={selectedNetwork}
              onValueChange={setSelectedNetwork}
            >
              <SelectTrigger className="bg-surface border-gray-700">
                <SelectValue placeholder="Select network" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(networks).map(([key, network]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center">
                      <span className={network.color}>{network.name}</span>
                      <span className={`ml-2 text-xs ${getCongestionColor(network.congestion)}`}>
                        {network.congestion.charAt(0).toUpperCase() + network.congestion.slice(1)} Congestion
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Slippage Tolerance</label>
              <span className="text-sm text-secondary">{slippage}%</span>
            </div>
            <Slider 
              value={[slippage]} 
              min={0} 
              max={5} 
              step={0.1}
              onValueChange={([val]) => setSlippage(val)} 
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Gas Limit</label>
              <span className="text-sm text-secondary">{gasLimit.toLocaleString()}</span>
            </div>
            <Slider 
              value={[gasLimit]} 
              min={50000} 
              max={500000} 
              step={10000}
              onValueChange={([val]) => setGasLimit(val)} 
              disabled={!includeGas}
            />
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="includeGas" 
              checked={includeGas}
              onChange={() => setIncludeGas(!includeGas)}
              className="form-checkbox h-4 w-4 mr-2"
            />
            <label htmlFor="includeGas" className="text-sm text-gray-300">Include gas costs in calculation</label>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-surface-dark rounded-lg p-3">
              <div className="text-sm text-gray-400 mb-1">Gross Profit</div>
              <div className="text-lg font-bold">${results.grossProfit.toFixed(2)}</div>
            </div>
            <div className="bg-surface-dark rounded-lg p-3">
              <div className="text-sm text-gray-400 mb-1">Gas Cost</div>
              <div className="text-lg font-bold">${results.gasCost.toFixed(2)}</div>
            </div>
          </div>
          
          <div className={`rounded-lg p-4 ${results.profitable ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'}`}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Net Profit</span>
              <span className={`text-sm font-bold ${results.profitable ? 'text-green-400' : 'text-red-400'}`}>
                ${results.netProfit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">ROI</span>
              <span className={`text-sm font-bold ${results.profitable ? 'text-green-400' : 'text-red-400'}`}>
                {results.roi.toFixed(2)}%
              </span>
            </div>
          </div>
          
          {!results.profitable && (
            <div className="flex items-start mt-3 p-3 bg-surface-dark rounded border border-yellow-500/30">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                This opportunity is not profitable after considering gas costs and slippage. 
                Consider increasing your investment amount or looking for opportunities with larger price spreads.
              </p>
            </div>
          )}
          
          <div className="flex items-center mt-4 space-x-2">
            <div className={`text-xs px-2 py-0.5 rounded ${networks[selectedNetwork].congestion === 'low' ? 'bg-green-900/20 text-green-400' : networks[selectedNetwork].congestion === 'medium' ? 'bg-yellow-900/20 text-yellow-400' : 'bg-red-900/20 text-red-400'}`}>
              {networks[selectedNetwork].congestion.toUpperCase()} CONGESTION
            </div>
            <div className="text-xs px-2 py-0.5 rounded bg-surface text-gray-400">
              <span className="font-bold">{networks[selectedNetwork].transactionTime}</span> Tx Time
            </div>
            <div className="text-xs px-2 py-0.5 rounded bg-surface text-gray-400">
              <span className="font-bold">{networks[selectedNetwork].gasPrice}</span> Gwei
            </div>
          </div>
        </div>
        
        <Button 
          className={`w-full ${results.profitable ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-surface'}`}
          disabled={!results.profitable}
        >
          <SendHorizontal className="mr-2 h-4 w-4" />
          {results.profitable ? 'Execute Trade' : 'Not Profitable'}
        </Button>
      </CardContent>
    </Card>
  );
}