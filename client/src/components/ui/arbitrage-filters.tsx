import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Filter, SlidersHorizontal, RefreshCw, ArrowDownUp, Grid3X3, List, Eye, Settings } from "lucide-react";
import { CRYPTOCURRENCIES, TIMEFRAMES } from "@/lib/constants";

interface ArbitrageFiltersProps {
  onFilterChange?: (filters: any) => void;
  className?: string;
}

export function ArbitrageFilters({ onFilterChange, className }: ArbitrageFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("profitDesc");
  const [minProfit, setMinProfit] = useState<number>(0.5);
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [riskLevel, setRiskLevel] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>(TIMEFRAMES.DAY);
  
  // Simulated exchanges for demo
  const exchanges = [
    { id: "binance", name: "Binance" },
    { id: "coinbase", name: "Coinbase" },
    { id: "kucoin", name: "KuCoin" },
    { id: "bitcoin", name: "Bitcoin Market" },
    { id: "bitcoincash", name: "Bitcoin Cash Market" },
    { id: "bitwarden", name: "Bit Exchange" },
    { id: "bitex", name: "BitEx" }
  ];
  
  // Simulated networks for demo
  const networks = [
    { id: "ethereum", name: "Ethereum", color: "blue" },
    { id: "bsc", name: "BSC", color: "yellow" },
    { id: "polygon", name: "Polygon", color: "purple" },
    { id: "arbitrum", name: "Arbitrum", color: "lightblue" },
    { id: "optimism", name: "Optimism", color: "red" },
    { id: "solana", name: "Solana", color: "green" }
  ];
  
  const sortOptions = [
    { value: "profitDesc", label: "Profit (High to Low)" },
    { value: "profitAsc", label: "Profit (Low to High)" },
    { value: "volumeDesc", label: "Volume (High to Low)" },
    { value: "volumeAsc", label: "Volume (Low to High)" },
    { value: "timeDesc", label: "Newest First" },
    { value: "timeAsc", label: "Oldest First" }
  ];
  
  const riskOptions = [
    { value: "all", label: "All Risk Levels" },
    { value: "low", label: "Low Risk" },
    { value: "medium", label: "Medium Risk" },
    { value: "high", label: "High Risk" }
  ];
  
  const toggleExchange = (exchangeId: string) => {
    setSelectedExchanges((prev) => {
      if (prev.includes(exchangeId)) {
        return prev.filter(id => id !== exchangeId);
      } else {
        return [...prev, exchangeId];
      }
    });
  };
  
  const toggleCoin = (coinId: string) => {
    setSelectedCoins((prev) => {
      if (prev.includes(coinId)) {
        return prev.filter(id => id !== coinId);
      } else {
        return [...prev, coinId];
      }
    });
  };
  
  const toggleNetwork = (networkId: string) => {
    setSelectedNetworks((prev) => {
      if (prev.includes(networkId)) {
        return prev.filter(id => id !== networkId);
      } else {
        return [...prev, networkId];
      }
    });
  };
  
  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange({
        minProfit,
        selectedExchanges,
        selectedCoins,
        selectedNetworks,
        riskLevel,
        sortBy,
        viewMode,
        timeframe
      });
    }
  };
  
  const handleResetFilters = () => {
    setMinProfit(0.5);
    setSelectedExchanges([]);
    setSelectedCoins([]);
    setSelectedNetworks([]);
    setRiskLevel("all");
    setSortBy("profitDesc");
    setTimeframe(TIMEFRAMES.DAY);
    
    if (onFilterChange) {
      onFilterChange({
        minProfit: 0.5,
        selectedExchanges: [],
        selectedCoins: [],
        selectedNetworks: [],
        riskLevel: "all",
        sortBy: "profitDesc",
        viewMode,
        timeframe: TIMEFRAMES.DAY
      });
    }
  };
  
  return (
    <Card className={`bg-surface-light border-gray-800 ${className}`}>
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Arbitrage Filters
        </CardTitle>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] h-9 text-xs bg-surface border-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <ArrowDownUp className="h-3 w-3 mr-2 text-gray-400" />
                      <span className="text-xs">{option.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[100px] h-9 text-xs bg-surface border-gray-700">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TIMEFRAMES.HOUR}>Last Hour</SelectItem>
                <SelectItem value={TIMEFRAMES.DAY}>Last Day</SelectItem>
                <SelectItem value={TIMEFRAMES.WEEK}>Last Week</SelectItem>
                <SelectItem value={TIMEFRAMES.MONTH}>Last Month</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center gap-1 rounded-md overflow-hidden border border-gray-700">
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="icon" 
                className="h-9 w-9 rounded-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"} 
                size="icon" 
                className="h-9 w-9 rounded-none"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div>
              <span className="text-xs text-gray-400 mr-2">Min Profit:</span>
              <Badge variant="outline" className="text-secondary">
                {minProfit}%
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="h-9 text-xs" onClick={handleResetFilters}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            <Button className="h-9 text-xs bg-secondary" onClick={handleApplyFilters}>
              <Eye className="h-3 w-3 mr-1" />
              Apply
            </Button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-6 space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="bg-surface border border-gray-800 mb-4">
                <TabsTrigger value="basic">Basic Filters</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Profit</label>
                  <div className="flex items-center gap-4">
                    <Slider 
                      className="flex-grow" 
                      value={[minProfit]} 
                      min={0.1} 
                      max={10} 
                      step={0.1} 
                      onValueChange={(values) => setMinProfit(values[0])} 
                    />
                    <Input 
                      type="number" 
                      value={minProfit} 
                      onChange={(e) => setMinProfit(parseFloat(e.target.value) || 0.1)} 
                      className="w-20 bg-surface border-gray-700" 
                      min={0.1}
                      max={10}
                      step={0.1}
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Risk Level</label>
                  <div className="flex flex-wrap gap-2">
                    {riskOptions.map(option => (
                      <Button 
                        key={option.value}
                        variant={riskLevel === option.value ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setRiskLevel(option.value)}
                        className="text-xs"
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Top Cryptocurrencies</label>
                  <div className="flex flex-wrap gap-2">
                    {CRYPTOCURRENCIES.slice(0, 8).map(crypto => (
                      <Button 
                        key={crypto.id}
                        variant={selectedCoins.includes(crypto.id) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleCoin(crypto.id)}
                        className="text-xs"
                      >
                        {crypto.symbol}
                      </Button>
                    ))}
                    <Button variant="ghost" size="sm" className="text-xs">
                      +{CRYPTOCURRENCIES.length - 8} more
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Exchanges</label>
                  <div className="flex flex-wrap gap-2">
                    {exchanges.map(exchange => (
                      <Button 
                        key={exchange.id}
                        variant={selectedExchanges.includes(exchange.id) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleExchange(exchange.id)}
                        className="text-xs"
                      >
                        {exchange.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Networks</label>
                  <div className="flex flex-wrap gap-2">
                    {networks.map(network => (
                      <Button 
                        key={network.id}
                        variant={selectedNetworks.includes(network.id) ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleNetwork(network.id)}
                        className={`text-xs`}
                      >
                        <span className={`h-2 w-2 rounded-full bg-${network.color}-500 mr-1`}></span>
                        {network.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Advanced Criteria</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Min Volume (USD)</label>
                      <Input className="bg-surface border-gray-700" defaultValue="10000" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Max Slippage (%)</label>
                      <Input className="bg-surface border-gray-700" defaultValue="1.5" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Max Gas (USD)</label>
                      <Input className="bg-surface border-gray-700" defaultValue="20" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Display Settings</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Show gas costs in calculations</span>
                      <input type="checkbox" defaultChecked className="toggle-checkbox h-5 w-9" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Auto-refresh opportunities</span>
                      <input type="checkbox" defaultChecked className="toggle-checkbox h-5 w-9" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Display network congestion</span>
                      <input type="checkbox" defaultChecked className="toggle-checkbox h-5 w-9" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Show profitability analysis</span>
                      <input type="checkbox" defaultChecked className="toggle-checkbox h-5 w-9" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Refresh Interval</label>
                  <Select defaultValue="30">
                    <SelectTrigger className="bg-surface border-gray-700">
                      <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}