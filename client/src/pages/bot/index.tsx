import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RealTimeChart } from "@/components/ui/real-time-chart";
import { BotStrategySimulator } from "@/components/ui/bot-strategy-simulator";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS, ARBITRAGE_TYPES } from "@shared/schema";
import { Bot, Play, Pause, Plus, Trash2, Settings, AlertTriangle, Clock, Activity, ArrowUpCircle, DollarSign, LineChart } from "lucide-react";
import { Link } from "wouter";
import { BOT_STRATEGIES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export default function BotPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  const isBotAccessAllowed = tier !== SUBSCRIPTION_TIERS.FREE;

  // Active bots data - in a real app this would come from an API
  const activeBots = [
    {
      id: "bot1",
      name: "BTC-ETH Direct Arbitrage",
      strategy: ARBITRAGE_TYPES.DIRECT,
      status: "active",
      profit: 287.45,
      percentChange: 3.2,
      trades: 42,
      successRate: 94.5,
      lastTrade: "12 min ago",
      exchanges: ["Binance", "Coinbase"]
    },
    {
      id: "bot2",
      name: "XRP Triangular Bot",
      strategy: ARBITRAGE_TYPES.TRIANGULAR,
      status: "active",
      profit: 132.19,
      percentChange: 4.7,
      trades: 28,
      successRate: 92.8,
      lastTrade: "24 min ago",
      exchanges: ["Binance"]
    },
    {
      id: "bot3",
      name: "SOL-AVAX Futures Arbitrage",
      strategy: ARBITRAGE_TYPES.FUTURES,
      status: "paused",
      profit: 64.87,
      percentChange: 1.8,
      trades: 16,
      successRate: 93.2,
      lastTrade: "3 hr ago",
      exchanges: ["Binance", "FTX"]
    }
  ];

  // Bot performance data for charts (in a real app, this would come from an API)
  const performanceData = [
    { day: 'Mon', profit: 42.5 },
    { day: 'Tue', profit: 56.3 },
    { day: 'Wed', profit: 48.7 },
    { day: 'Thu', profit: 61.2 },
    { day: 'Fri', profit: 58.9 },
    { day: 'Sat', profit: 64.5 },
    { day: 'Sun', profit: 59.8 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="green" className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>Active</Badge>;
      case 'paused':
        return <Badge variant="yellow" className="flex items-center gap-1"><Pause className="w-3 h-3" />Paused</Badge>;
      case 'error':
        return <Badge variant="red" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Trading Bot | CryptoArb</title>
        <meta name="description" content="Configure and monitor your automated crypto arbitrage trading bots." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Trading Bot</h1>
          </div>
          
          {isBotAccessAllowed ? (
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="mb-6 bg-surface-light border border-gray-800">
                <TabsTrigger value="active">Active Bots</TabsTrigger>
                <TabsTrigger value="create">Create Bot</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">${activeBots.reduce((sum, bot) => sum + bot.profit, 0).toFixed(2)}</div>
                      <div className="flex items-center mt-2 text-green-500 text-sm">
                        <ArrowUpCircle className="mr-1 h-4 w-4" />
                        +{(activeBots.reduce((sum, bot) => sum + bot.percentChange * bot.profit, 0) / activeBots.reduce((sum, bot) => sum + bot.profit, 0)).toFixed(2)}%
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Trades</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">{activeBots.reduce((sum, bot) => sum + bot.trades, 0)}</div>
                      <div className="flex items-center mt-2 text-gray-400 text-sm">
                        <Clock className="mr-1 h-4 w-4" />
                        Last: {activeBots.sort((a, b) => a.lastTrade.localeCompare(b.lastTrade))[0].lastTrade}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">
                        {(activeBots.reduce((sum, bot) => sum + bot.successRate, 0) / activeBots.length).toFixed(1)}%
                      </div>
                      <div className="flex items-center mt-2 text-gray-400 text-sm">
                        <Activity className="mr-1 h-4 w-4" />
                        Across all bots
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mb-6">
                  {activeBots.length > 0 ? (
                    <div className="space-y-4">
                      {activeBots.map((bot) => (
                        <Card key={bot.id} className="bg-surface-light border-gray-800">
                          <CardContent className="p-6">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-white text-lg">{bot.name}</h3>
                                  {getStatusBadge(bot.status)}
                                </div>
                                <div className="text-sm text-gray-400 mb-2">
                                  Strategy: <span className="text-gray-300 capitalize">{bot.strategy}</span> • 
                                  Exchanges: <span className="text-gray-300">{bot.exchanges.join(", ")}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-3 items-center">
                                <div className="bg-surface p-2 rounded-md min-w-[100px] text-center">
                                  <div className="text-xs text-gray-400">Profit</div>
                                  <div className="text-white font-medium">${bot.profit.toFixed(2)}</div>
                                </div>
                                
                                <div className="bg-surface p-2 rounded-md min-w-[100px] text-center">
                                  <div className="text-xs text-gray-400">Trades</div>
                                  <div className="text-white font-medium">{bot.trades}</div>
                                </div>
                                
                                <div className="bg-surface p-2 rounded-md min-w-[100px] text-center">
                                  <div className="text-xs text-gray-400">Success</div>
                                  <div className="text-white font-medium">{bot.successRate}%</div>
                                </div>
                                
                                <div className="flex gap-2">
                                  {bot.status === 'active' ? (
                                    <Button variant="outline" size="icon" className="h-9 w-9">
                                      <Pause className="h-4 w-4" />
                                    </Button>
                                  ) : (
                                    <Button variant="outline" size="icon" className="h-9 w-9">
                                      <Play className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button variant="outline" size="icon" className="h-9 w-9">
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  <Button variant="destructive" size="icon" className="h-9 w-9">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="bg-surface-light border-gray-800">
                      <CardContent className="p-12 text-center">
                        <Bot className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Active Bots</h3>
                        <p className="text-gray-400 mb-6">You don't have any trading bots running. Create a new bot to start automated trading.</p>
                        <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                          <Plus className="mr-2 h-4 w-4" /> Create Your First Bot
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div className="text-center">
                  <Button className="bg-surface hover:bg-surface-dark border border-gray-700 transition-colors">
                    <Plus className="mr-2 h-4 w-4" /> Add New Bot
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="create">
                <Card className="bg-surface-light border-gray-800 mb-6">
                  <CardHeader>
                    <CardTitle>Bot Strategy Simulator</CardTitle>
                    <CardDescription>Configure and test your trading bot strategy before deployment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BotStrategySimulator 
                      onConfigChange={(config) => console.log("Bot config updated:", config)}
                    />
                  </CardContent>
                </Card>
                
                <div className="hidden grid-cols-1 lg:grid-cols-5 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-surface-light border-gray-800 mb-6">
                      <CardHeader>
                        <CardTitle>Bot Strategies</CardTitle>
                        <CardDescription>Select a strategy for your trading bot</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {BOT_STRATEGIES.map((strategy) => (
                          <div 
                            key={strategy.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              (strategy.proOnly && tier !== SUBSCRIPTION_TIERS.PRO) 
                                ? 'border-gray-700 opacity-50' 
                                : 'border-gray-600 hover:border-secondary hover:bg-surface'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium">{strategy.name}</h3>
                              {strategy.proOnly && tier !== SUBSCRIPTION_TIERS.PRO && (
                                <Badge variant="secondary">Pro Only</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{strategy.description}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Suggested Settings</CardTitle>
                        <CardDescription>Recommended configs based on strategy</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 border border-green-500/20 rounded-lg bg-green-500/5">
                            <div className="flex items-center text-green-500 mb-1">
                              <LineChart className="h-4 w-4 mr-2" />
                              <span className="font-medium">Conservative</span>
                            </div>
                            <p className="text-sm text-gray-400">Lower risk, steady profits (0.5-1.5%)</p>
                          </div>
                          
                          <div className="p-3 border border-blue-500/20 rounded-lg bg-blue-500/5">
                            <div className="flex items-center text-blue-500 mb-1">
                              <LineChart className="h-4 w-4 mr-2" />
                              <span className="font-medium">Balanced</span>
                            </div>
                            <p className="text-sm text-gray-400">Moderate risk/reward (1.0-2.5%)</p>
                          </div>
                          
                          <div className="p-3 border border-purple-500/20 rounded-lg bg-purple-500/5">
                            <div className="flex items-center text-purple-500 mb-1">
                              <LineChart className="h-4 w-4 mr-2" />
                              <span className="font-medium">Aggressive</span>
                            </div>
                            <p className="text-sm text-gray-400">Higher risk, higher potential returns (2.0%+)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Bot Configuration</CardTitle>
                        <CardDescription>Configure your trading bot parameters</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="text-sm font-medium">Bot Name</label>
                            <Input placeholder="My Trading Bot" className="bg-surface border-gray-700" />
                          </div>
                          
                          <div className="space-y-3">
                            <label className="text-sm font-medium">Strategy Type</label>
                            <Select defaultValue="direct">
                              <SelectTrigger className="bg-surface border-gray-700">
                                <SelectValue placeholder="Select strategy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="direct">Direct Arbitrage</SelectItem>
                                <SelectItem value="triangular">Triangular Arbitrage</SelectItem>
                                <SelectItem value="futures">Futures Arbitrage</SelectItem>
                                <SelectItem value="custom" disabled={tier !== SUBSCRIPTION_TIERS.PRO}>Custom Strategy (Pro)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-3">
                            <label className="text-sm font-medium">Trading Pairs</label>
                            <Select defaultValue="btc-usdt">
                              <SelectTrigger className="bg-surface border-gray-700">
                                <SelectValue placeholder="Select pairs" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="btc-usdt">BTC/USDT</SelectItem>
                                <SelectItem value="eth-usdt">ETH/USDT</SelectItem>
                                <SelectItem value="sol-usdt">SOL/USDT</SelectItem>
                                <SelectItem value="xrp-usdt">XRP/USDT</SelectItem>
                                <SelectItem value="ada-usdt">ADA/USDT</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-3">
                            <label className="text-sm font-medium">Exchanges</label>
                            <Select defaultValue="binance">
                              <SelectTrigger className="bg-surface border-gray-700">
                                <SelectValue placeholder="Select exchanges" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="binance">Binance</SelectItem>
                                <SelectItem value="coinbase">Coinbase</SelectItem>
                                <SelectItem value="kucoin">KuCoin</SelectItem>
                                <SelectItem value="kraken">Kraken</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button variant="outline" className="w-full">
                              <Plus className="h-4 w-4 mr-2" /> Add Exchange
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Minimum Profit Threshold (%)</label>
                              <span className="text-sm text-gray-400">1.2%</span>
                            </div>
                            <Slider defaultValue={[1.2]} min={0.1} max={5} step={0.1} />
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Per-Trade Amount</label>
                              <span className="text-sm text-gray-400">$100</span>
                            </div>
                            <Slider defaultValue={[100]} min={10} max={1000} step={10} />
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Maximum Daily Trades</label>
                              <span className="text-sm text-gray-400">25</span>
                            </div>
                            <Slider defaultValue={[25]} min={1} max={100} step={1} />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch id="advanced" />
                            <label htmlFor="advanced" className="text-sm font-medium">Enable Advanced Risk Management</label>
                          </div>
                          
                          <div className="pt-4">
                            <Button className="w-full bg-gradient-to-r from-secondary to-accent-purple">
                              Create and Start Bot
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Total Profit</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">$484.51</div>
                      <div className="flex items-center mt-2 text-green-500 text-sm">
                        <ArrowUpCircle className="mr-1 h-4 w-4" />
                        +3.2% from last week
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Average Profit per Trade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-white">$5.64</div>
                      <div className="flex items-center mt-2 text-gray-400 text-sm">
                        <DollarSign className="mr-1 h-4 w-4" />
                        Across 86 trades
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Best Performing Bot</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-white truncate">BTC-ETH Direct Arbitrage</div>
                      <div className="flex items-center mt-2 text-green-500 text-sm">
                        <ArrowUpCircle className="mr-1 h-4 w-4" />
                        $287.45 (59% of total)
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <RealTimeChart
                    data={[
                      { timestamp: "May 1", price: 42.5, volume: 12000 },
                      { timestamp: "May 2", price: 56.3, volume: 15000 },
                      { timestamp: "May 3", price: 48.7, volume: 13500 },
                      { timestamp: "May 4", price: 61.2, volume: 16200 },
                      { timestamp: "May 5", price: 58.9, volume: 14800 },
                      { timestamp: "May 6", price: 64.5, volume: 17400 },
                      { timestamp: "May 7", price: 59.8, volume: 15300 },
                      { timestamp: "May 8", price: 67.2, volume: 18100 },
                      { timestamp: "May 9", price: 72.6, volume: 19500 },
                      { timestamp: "May 10", price: 68.4, volume: 17900 },
                      { timestamp: "May 11", price: 74.1, volume: 20200 },
                      { timestamp: "May 12", price: 79.5, volume: 21800 },
                      { timestamp: "May 13", price: 76.3, volume: 20500 },
                      { timestamp: "May 14", price: 82.7, volume: 22600 },
                    ]}
                    title="Daily Profit"
                    symbol="Profit"
                    currentPrice={82.7}
                    priceChange={8.5}
                    timeframe="1d"
                    chartType="area"
                    showVolume={true}
                    height={300}
                    className="bg-surface-light border-gray-800"
                    onTimeframeChange={(tf) => console.log("Timeframe changed to", tf)}
                  />
                  
                  <RealTimeChart
                    data={[
                      { timestamp: "May 1", price: 91.2, volume: 6 },
                      { timestamp: "May 2", price: 92.8, volume: 8 },
                      { timestamp: "May 3", price: 90.5, volume: 5 },
                      { timestamp: "May 4", price: 93.4, volume: 9 },
                      { timestamp: "May 5", price: 94.7, volume: 12 },
                      { timestamp: "May 6", price: 92.1, volume: 7 },
                      { timestamp: "May 7", price: 91.8, volume: 6 },
                      { timestamp: "May 8", price: 93.5, volume: 10 },
                      { timestamp: "May 9", price: 95.2, volume: 14 },
                      { timestamp: "May 10", price: 94.8, volume: 11 },
                      { timestamp: "May 11", price: 93.9, volume: 9 },
                      { timestamp: "May 12", price: 95.7, volume: 15 },
                      { timestamp: "May 13", price: 96.2, volume: 16 },
                      { timestamp: "May 14", price: 97.1, volume: 18 },
                    ]}
                    title="Trade Success Rate"
                    symbol="Success %"
                    currentPrice={97.1}
                    priceChange={1.6}
                    timeframe="1d"
                    chartType="line"
                    showVolume={true}
                    height={300}
                    className="bg-surface-light border-gray-800"
                    onTimeframeChange={(tf) => console.log("Timeframe changed to", tf)}
                  />
                </div>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader>
                    <CardTitle>Recent Trades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Bot Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Strategy</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Pair</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Profit</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Time</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-800">
                            <td className="py-3 px-4">BTC-ETH Direct</td>
                            <td className="py-3 px-4 capitalize">direct</td>
                            <td className="py-3 px-4">BTC/USDT</td>
                            <td className="py-3 px-4 text-green-500">+$6.42</td>
                            <td className="py-3 px-4">12 min ago</td>
                            <td className="py-3 px-4"><Badge variant="green">Success</Badge></td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-3 px-4">XRP Triangular</td>
                            <td className="py-3 px-4 capitalize">triangular</td>
                            <td className="py-3 px-4">XRP→ETH→BTC</td>
                            <td className="py-3 px-4 text-green-500">+$8.17</td>
                            <td className="py-3 px-4">24 min ago</td>
                            <td className="py-3 px-4"><Badge variant="green">Success</Badge></td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-3 px-4">BTC-ETH Direct</td>
                            <td className="py-3 px-4 capitalize">direct</td>
                            <td className="py-3 px-4">ETH/USDT</td>
                            <td className="py-3 px-4 text-green-500">+$4.28</td>
                            <td className="py-3 px-4">38 min ago</td>
                            <td className="py-3 px-4"><Badge variant="green">Success</Badge></td>
                          </tr>
                          <tr className="border-b border-gray-800">
                            <td className="py-3 px-4">SOL-AVAX Futures</td>
                            <td className="py-3 px-4 capitalize">futures</td>
                            <td className="py-3 px-4">SOL-PERP</td>
                            <td className="py-3 px-4 text-red-500">-$2.19</td>
                            <td className="py-3 px-4">1 hr ago</td>
                            <td className="py-3 px-4"><Badge variant="red">Failed</Badge></td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">XRP Triangular</td>
                            <td className="py-3 px-4 capitalize">triangular</td>
                            <td className="py-3 px-4">XRP→BTC→ETH</td>
                            <td className="py-3 px-4 text-green-500">+$5.36</td>
                            <td className="py-3 px-4">1 hr ago</td>
                            <td className="py-3 px-4"><Badge variant="green">Success</Badge></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card className="bg-surface-light border-gray-800 mb-6">
                      <CardHeader>
                        <CardTitle>Global Bot Settings</CardTitle>
                        <CardDescription>Configure settings that apply to all bots</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Trading Hours</h3>
                              <p className="text-sm text-gray-400">Restrict bot operation to specific hours</p>
                            </div>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Emergency Stop</h3>
                              <p className="text-sm text-gray-400">Stop all bots if account balance drops below threshold</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Email Notifications</h3>
                              <p className="text-sm text-gray-400">Receive email alerts for important bot events</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Trading Signals</h3>
                              <p className="text-sm text-gray-400">Subscribe to premium trading signals</p>
                            </div>
                            <Switch disabled={tier !== SUBSCRIPTION_TIERS.PRO} />
                          </div>
                          
                          {tier !== SUBSCRIPTION_TIERS.PRO && (
                            <div className="bg-surface p-4 rounded-lg border border-gray-700">
                              <div className="flex items-start">
                                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                                <div>
                                  <h4 className="font-medium mb-1">Pro Features Locked</h4>
                                  <p className="text-sm text-gray-400">Some advanced bot features require a Pro subscription.</p>
                                  <Link href="/subscription">
                                    <Button className="mt-3 bg-gradient-to-r from-secondary to-accent-purple text-white text-sm">
                                      Upgrade to Pro
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <Button className="w-full">Save Global Settings</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Card className="bg-surface-light border-gray-800 mb-6">
                      <CardHeader>
                        <CardTitle>API Rate Limits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Binance</span>
                              <span className="text-sm text-gray-400">120/1200</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Coinbase</span>
                              <span className="text-sm text-gray-400">45/100</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-500 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">KuCoin</span>
                              <span className="text-sm text-gray-400">12/120</span>
                            </div>
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Require 2FA for Bot Changes</label>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">IP Restrictions</label>
                            <Switch />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-medium">Auto-Logout</label>
                            <Switch defaultChecked />
                          </div>
                          
                          <Button variant="outline" className="w-full">
                            View Security Log
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="bg-surface-light rounded-xl p-12 border border-gray-800 text-center">
              <Bot className="h-24 w-24 text-gray-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Bot Access Restricted</h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Trading Bot access is only available on Basic ($15/month) and Pro ($25/month) plans. Upgrade your subscription to create and manage automated trading bots that execute arbitrage opportunities 24/7.
              </p>
              <Link href="/subscription">
                <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white px-8 py-6 text-lg">
                  Upgrade Your Subscription
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
