import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Search, Download, RefreshCw, BarChart4, LineChart, ChartCandlestick, TrendingUp, TrendingDown, ArrowLeftRight, Info, Clock, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { CRYPTOCURRENCIES } from "@/lib/constants";

export default function MarketAnalysis() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  const isAdvancedAnalysisAllowed = tier !== SUBSCRIPTION_TIERS.FREE;
  
  // Market data - in a real app this would come from an API
  const marketData = [
    { 
      symbol: "BTC/USDT", 
      price: 28750.42, 
      change24h: 2.34, 
      volume24h: 12456789,
      high24h: 29100.20,
      low24h: 28120.15,
      volatility: "medium",
      arbitrageScore: 85
    },
    { 
      symbol: "ETH/USDT", 
      price: 1850.36, 
      change24h: 1.75, 
      volume24h: 8765432,
      high24h: 1875.45,
      low24h: 1820.30,
      volatility: "medium",
      arbitrageScore: 78
    },
    { 
      symbol: "SOL/USDT", 
      price: 94.28, 
      change24h: 4.12, 
      volume24h: 3456789,
      high24h: 96.52,
      low24h: 90.15,
      volatility: "high",
      arbitrageScore: 92
    },
    { 
      symbol: "XRP/USDT", 
      price: 0.564, 
      change24h: -1.23, 
      volume24h: 2345678,
      high24h: 0.578,
      low24h: 0.558,
      volatility: "low",
      arbitrageScore: 65
    },
    { 
      symbol: "ADA/USDT", 
      price: 0.432, 
      change24h: 0.87, 
      volume24h: 1987654,
      high24h: 0.438,
      low24h: 0.426,
      volatility: "low",
      arbitrageScore: 62
    }
  ];
  
  const exchangeCorrelations = [
    { exchange1: "Binance", exchange2: "Coinbase", correlation: 0.98, latency: "15ms" },
    { exchange1: "Binance", exchange2: "Kraken", correlation: 0.95, latency: "28ms" },
    { exchange1: "Coinbase", exchange2: "Kraken", correlation: 0.94, latency: "32ms" },
    { exchange1: "Binance", exchange2: "KuCoin", correlation: 0.93, latency: "42ms" },
    { exchange1: "Kraken", exchange2: "KuCoin", correlation: 0.91, latency: "53ms" }
  ];
  
  const volatilityBadge = (volatility: string) => {
    switch (volatility) {
      case "high":
        return <Badge variant="red">High</Badge>;
      case "medium":
        return <Badge variant="yellow">Medium</Badge>;
      case "low":
        return <Badge variant="green">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Market Analysis | CryptoArb</title>
        <meta name="description" content="In-depth crypto market analysis tools to discover arbitrage opportunities." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Market Analysis</h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 bg-surface-light border border-gray-800">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="correlation">Exchange Correlation</TabsTrigger>
              <TabsTrigger 
                value="arbitrage" 
                disabled={!isAdvancedAnalysisAllowed}
                className={!isAdvancedAnalysisAllowed ? "cursor-not-allowed opacity-50" : ""}
              >
                Arbitrage Heat Map
              </TabsTrigger>
              <TabsTrigger 
                value="volume" 
                disabled={!isAdvancedAnalysisAllowed}
                className={!isAdvancedAnalysisAllowed ? "cursor-not-allowed opacity-50" : ""}
              >
                Volume Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Sentiment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">Bullish</div>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      72% of top assets are gaining
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Arbitrage Potential</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-accent-purple">High</div>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <ArrowLeftRight className="mr-1 h-4 w-4 text-accent-purple" />
                      124 active opportunities
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Market Volatility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-500">Medium</div>
                    <div className="flex items-center mt-2 text-gray-400 text-sm">
                      <LineChart className="mr-1 h-4 w-4 text-yellow-500" />
                      1.8% average 24h change
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-surface-light border-gray-800 mb-6">
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle>Top Cryptocurrencies</CardTitle>
                  <div className="flex mt-2 sm:mt-0">
                    <div className="relative mr-3">
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="bg-surface border border-gray-700 pl-9 h-9 w-[200px]"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                    <Select defaultValue="price">
                      <SelectTrigger className="bg-surface border-gray-700 h-9 w-[130px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="change">24h Change</SelectItem>
                        <SelectItem value="volume">Volume</SelectItem>
                        <SelectItem value="arbitrage">Arbitrage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Symbol</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Price</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Change</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Volume</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">24h High</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">24h Low</th>
                          <th className="text-center py-3 px-4 text-gray-400 font-medium">Volatility</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Arbitrage Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketData.map((asset, index) => (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="py-3 px-4 font-medium">{asset.symbol}</td>
                            <td className="py-3 px-4 text-right">
                              ${asset.price < 1 ? asset.price.toFixed(4) : asset.price.toFixed(2)}
                            </td>
                            <td className={`py-3 px-4 text-right ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                            </td>
                            <td className="py-3 px-4 text-right">
                              ${(asset.volume24h / 1000000).toFixed(2)}M
                            </td>
                            <td className="py-3 px-4 text-right">
                              ${asset.high24h < 1 ? asset.high24h.toFixed(4) : asset.high24h.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              ${asset.low24h < 1 ? asset.low24h.toFixed(4) : asset.low24h.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              {volatilityBadge(asset.volatility)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center">
                                <span className={`font-medium ${
                                  asset.arbitrageScore > 80 ? 'text-green-500' : 
                                  asset.arbitrageScore > 65 ? 'text-yellow-500' : 'text-gray-400'
                                }`}>
                                  {asset.arbitrageScore}/100
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Price Chart</CardTitle>
                    <Select defaultValue="btcusdt">
                      <SelectTrigger className="bg-surface border-gray-700 h-9 w-[120px]">
                        <SelectValue placeholder="Select pair" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btcusdt">BTC/USDT</SelectItem>
                        <SelectItem value="ethusdt">ETH/USDT</SelectItem>
                        <SelectItem value="solusdt">SOL/USDT</SelectItem>
                        <SelectItem value="xrpusdt">XRP/USDT</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-gray-400">
                      [Price chart visualization would be here in the real application]
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Volume Distribution</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-9 px-3">1D</Button>
                      <Button variant="outline" size="sm" className="h-9 px-3 bg-surface-dark">1W</Button>
                      <Button variant="outline" size="sm" className="h-9 px-3">1M</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-gray-400">
                      [Volume chart visualization would be here in the real application]
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="correlation">
              <Card className="bg-surface-light border-gray-800 mb-6">
                <CardHeader>
                  <CardTitle>Exchange Price Correlation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Exchange Pair</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Correlation</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Price Latency</th>
                          <th className="text-right py-3 px-4 text-gray-400 font-medium">Arbitrage Potential</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exchangeCorrelations.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="py-3 px-4 font-medium">{item.exchange1} ↔ {item.exchange2}</td>
                            <td className="py-3 px-4 text-right">{item.correlation.toFixed(2)}</td>
                            <td className="py-3 px-4 text-right">{item.latency}</td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center">
                                <span className={`font-medium ${
                                  item.correlation < 0.93 ? 'text-green-500' : 
                                  item.correlation < 0.96 ? 'text-yellow-500' : 'text-red-500'
                                }`}>
                                  {item.correlation < 0.93 ? 'High' : 
                                   item.correlation < 0.96 ? 'Medium' : 'Low'}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>BTC Price Comparison</CardTitle>
                    <Select defaultValue="binance-coinbase">
                      <SelectTrigger className="bg-surface border-gray-700 h-9 w-[170px]">
                        <SelectValue placeholder="Select exchanges" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="binance-coinbase">Binance vs Coinbase</SelectItem>
                        <SelectItem value="kraken-kucoin">Kraken vs KuCoin</SelectItem>
                        <SelectItem value="coinbase-ftx">Coinbase vs FTX</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-gray-400">
                      [Exchange price comparison chart would be here in the real application]
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader>
                    <CardTitle>Correlation Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 py-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">What does correlation mean?</h3>
                        <p className="text-gray-400 text-sm">
                          Correlation measures how closely price movements between exchanges are synchronized. 
                          Lower correlation values (below 0.95) suggest higher arbitrage potential due to price discrepancies.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">How to use this data?</h3>
                        <p className="text-gray-400 text-sm">
                          Look for exchange pairs with:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-400 text-sm">
                          <li>Lower correlation values</li>
                          <li>Higher price latency</li>
                          <li>High trading volume on both exchanges</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-2">
                          These conditions create the best environment for profitable arbitrage opportunities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="arbitrage">
              {isAdvancedAnalysisAllowed ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Best Opportunity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-white">SOL/USDT</div>
                        <div className="text-2xl font-bold text-green-500">+3.42%</div>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <ArrowLeftRight className="mr-1 h-4 w-4" />
                          Binance → KuCoin
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Highest Volume Pair</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-white">BTC/USDT</div>
                        <div className="text-2xl font-bold text-white">$1.2B</div>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <BarChart4 className="mr-1 h-4 w-4" />
                          24h Trading Volume
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Top Arbitrage Pair</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xl font-bold text-white">ETH/BTC</div>
                        <div className="text-2xl font-bold text-accent-purple">92/100</div>
                        <div className="flex items-center mt-2 text-gray-400 text-sm">
                          <TrendingUp className="mr-1 h-4 w-4 text-accent-purple" />
                          Arbitrage Score
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="flex flex-row justify-between items-center">
                      <CardTitle>Arbitrage Heat Map</CardTitle>
                      <div className="flex gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="bg-surface border-gray-700 h-9 w-[130px]">
                            <SelectValue placeholder="Select exchange" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Exchanges</SelectItem>
                            <SelectItem value="binance">Binance</SelectItem>
                            <SelectItem value="coinbase">Coinbase</SelectItem>
                            <SelectItem value="kucoin">KuCoin</SelectItem>
                            <SelectItem value="kraken">Kraken</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" className="h-9">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[400px] flex items-center justify-center">
                      <div className="text-gray-400">
                        [Arbitrage heat map visualization would be here in the real application]
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-surface-light border-gray-800 p-8 text-center">
                  <CardContent className="pt-6">
                    <LineChart className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Advanced Analysis Locked</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                      The Arbitrage Heat Map is an advanced analysis tool that helps you visualize arbitrage opportunities across multiple exchanges simultaneously. This feature is available on Basic and Pro plans.
                    </p>
                    <Link href="/subscription">
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white px-8 py-2">
                        Upgrade Your Plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="volume">
              {isAdvancedAnalysisAllowed ? (
                <div className="space-y-6">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="flex flex-row justify-between items-center">
                      <CardTitle>Volume Analysis</CardTitle>
                      <div className="flex gap-2">
                        <Select defaultValue="btc">
                          <SelectTrigger className="bg-surface border-gray-700 h-9 w-[130px]">
                            <SelectValue placeholder="Select asset" />
                          </SelectTrigger>
                          <SelectContent>
                            {CRYPTOCURRENCIES.map((crypto) => (
                              <SelectItem key={crypto} value={crypto.toLowerCase()}>{crypto}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button variant="outline" size="sm" className="h-9 px-3">1D</Button>
                        <Button variant="outline" size="sm" className="h-9 px-3 bg-surface-dark">1W</Button>
                        <Button variant="outline" size="sm" className="h-9 px-3">1M</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[400px] flex items-center justify-center">
                      <div className="text-gray-400">
                        [Volume analysis chart would be here in the real application]
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Volume Distribution by Exchange</CardTitle>
                      </CardHeader>
                      <CardContent className="h-[300px] flex items-center justify-center">
                        <div className="text-gray-400">
                          [Volume distribution chart would be here in the real application]
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Trading Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Binance</span>
                            <span className="text-sm text-gray-400">$4.8B (42%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Coinbase</span>
                            <span className="text-sm text-gray-400">$2.3B (20%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-accent-purple h-2.5 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">KuCoin</span>
                            <span className="text-sm text-gray-400">$1.7B (15%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-accent-teal h-2.5 rounded-full" style={{ width: '15%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Kraken</span>
                            <span className="text-sm text-gray-400">$1.1B (10%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Others</span>
                            <span className="text-sm text-gray-400">$1.5B (13%)</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-gray-500 h-2.5 rounded-full" style={{ width: '13%' }}></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader>
                      <CardTitle>Volume-Based Arbitrage Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-800">
                              <th className="text-left py-3 px-4 text-gray-400 font-medium">Asset</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-medium">Buy Exchange</th>
                              <th className="text-left py-3 px-4 text-gray-400 font-medium">Sell Exchange</th>
                              <th className="text-right py-3 px-4 text-gray-400 font-medium">Volume Ratio</th>
                              <th className="text-right py-3 px-4 text-gray-400 font-medium">Price Gap</th>
                              <th className="text-right py-3 px-4 text-gray-400 font-medium">Opportunity</th>
                              <th className="text-right py-3 px-4 text-gray-400 font-medium">Last Updated</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 px-4 font-medium">BTC/USDT</td>
                              <td className="py-3 px-4">Binance</td>
                              <td className="py-3 px-4">Kraken</td>
                              <td className="py-3 px-4 text-right">4.2:1</td>
                              <td className="py-3 px-4 text-right text-green-500">+1.2%</td>
                              <td className="py-3 px-4 text-right">
                                <Badge variant="green">High</Badge>
                              </td>
                              <td className="py-3 px-4 text-right text-gray-400">
                                <div className="flex items-center justify-end">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>2m ago</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 px-4 font-medium">ETH/USDT</td>
                              <td className="py-3 px-4">KuCoin</td>
                              <td className="py-3 px-4">Coinbase</td>
                              <td className="py-3 px-4 text-right">1.8:1</td>
                              <td className="py-3 px-4 text-right text-green-500">+0.9%</td>
                              <td className="py-3 px-4 text-right">
                                <Badge variant="yellow">Medium</Badge>
                              </td>
                              <td className="py-3 px-4 text-right text-gray-400">
                                <div className="flex items-center justify-end">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>5m ago</span>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b border-gray-800">
                              <td className="py-3 px-4 font-medium">SOL/USDT</td>
                              <td className="py-3 px-4">Binance</td>
                              <td className="py-3 px-4">KuCoin</td>
                              <td className="py-3 px-4 text-right">3.1:1</td>
                              <td className="py-3 px-4 text-right text-green-500">+1.8%</td>
                              <td className="py-3 px-4 text-right">
                                <Badge variant="green">High</Badge>
                              </td>
                              <td className="py-3 px-4 text-right text-gray-400">
                                <div className="flex items-center justify-end">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>1m ago</span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="bg-surface-light border-gray-800 p-8 text-center">
                  <CardContent className="pt-6">
                    <BarChart4 className="h-20 w-20 text-gray-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Advanced Analysis Locked</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                      Volume Analysis helps you identify high-liquidity arbitrage opportunities by analyzing trading volumes across exchanges. This feature is available on Basic and Pro plans.
                    </p>
                    <Link href="/subscription">
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white px-8 py-2">
                        Upgrade Your Plan
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
          
          {tier === SUBSCRIPTION_TIERS.FREE && (
            <div className="mt-6 p-4 bg-surface-light rounded-lg border border-gray-700 flex items-start">
              <AlertTriangle className="text-yellow-500 h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Limited Analysis Tools</h3>
                <p className="text-sm text-gray-400 mb-3">
                  You're currently on the Free plan which includes basic market analysis. Upgrade to Basic or Pro to access advanced analysis tools including Arbitrage Heat Map and Volume Analysis.
                </p>
                <Link href="/subscription">
                  <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white text-sm">
                    Upgrade Plan
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
