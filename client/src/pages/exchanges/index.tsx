import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Link } from "wouter";
import { Plus, AlertTriangle, EyeOff, Eye, X, Check, RefreshCw, ArrowRight, Shield } from "lucide-react";
import { 
  SiBinance, 
  SiCoinbase, 
  SiKucoin, 
  SiKraken,
  SiBitfinex,
  SiHuobi,
  SiBybit
} from "react-icons/si";

type ExchangeType = {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "connected" | "syncing" | "error";
  balance: number;
  volume: number;
  lastUpdated: string;
  apiKeyPreview?: string;
  apiSecretPreview?: string;
};

const exchangeFormSchema = z.object({
  exchange: z.string({
    required_error: "Please select an exchange",
  }),
  apiKey: z.string().min(10, {
    message: "API key must be at least 10 characters",
  }),
  apiSecret: z.string().min(10, {
    message: "API secret must be at least 10 characters",
  }),
  nickname: z.string().optional(),
});

export default function Exchanges() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();
  const [showApiSecret, setShowApiSecret] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExchange, setSelectedExchange] = useState<ExchangeType | null>(null);
  
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  // Get exchange limit based on subscription tier
  const getExchangeLimit = () => {
    switch (tier) {
      case SUBSCRIPTION_TIERS.FREE:
        return 2;
      case SUBSCRIPTION_TIERS.BASIC:
        return 6;
      case SUBSCRIPTION_TIERS.PRO:
        return Infinity;
      default:
        return 2;
    }
  };
  
  const exchangeLimit = getExchangeLimit();
  
  // Sample exchange data - in a real app, this would come from an API
  const exchanges: ExchangeType[] = [
    {
      id: "exchange1",
      name: "Binance",
      icon: <SiBinance className="text-yellow-400" size={20} />,
      status: "connected",
      balance: 24567.89,
      volume: 3256.78,
      lastUpdated: "2 minutes ago",
      apiKeyPreview: "LGT8X7Y2...H4DW",
      apiSecretPreview: "P7T5M9Q3...Z2XR"
    },
    {
      id: "exchange2",
      name: "Coinbase",
      icon: <SiCoinbase className="text-blue-400" size={20} />,
      status: "connected",
      balance: 18234.56,
      volume: 2157.43,
      lastUpdated: "5 minutes ago",
      apiKeyPreview: "QW85Y1Z3...D4FV",
      apiSecretPreview: "V5F2G8H6...L3KP"
    },
    {
      id: "exchange3",
      name: "KuCoin",
      icon: <SiKucoin className="text-green-400" size={20} />,
      status: "connected",
      balance: 9876.54,
      volume: 1289.67,
      lastUpdated: "10 minutes ago",
      apiKeyPreview: "MN67B5V3...S1DQ",
      apiSecretPreview: "R9T2F5H3...W7GP"
    },
    {
      id: "exchange4",
      name: "Kraken",
      icon: <SiKraken className="text-purple-400" size={20} />,
      status: "syncing",
      balance: 7654.32,
      volume: 987.65,
      lastUpdated: "2 minutes ago",
      apiKeyPreview: "JK49H7G5...P2WF",
      apiSecretPreview: "B6N4M8K2...Q5RT"
    }
  ];
  
  const availableExchanges = [
    { value: "binance", label: "Binance", icon: <SiBinance /> },
    { value: "coinbase", label: "Coinbase", icon: <SiCoinbase /> },
    { value: "kucoin", label: "KuCoin", icon: <SiKucoin /> },
    { value: "kraken", label: "Kraken", icon: <SiKraken /> },
    { value: "bitfinex", label: "Bitfinex", icon: <SiBitfinex /> },
    { value: "huobi", label: "Huobi", icon: <SiHuobi /> },
    { value: "bybit", label: "Bybit", icon: <SiBybit /> }
  ];
  
  const isLimitReached = exchanges.length >= exchangeLimit && exchangeLimit !== Infinity;
  
  const form = useForm<z.infer<typeof exchangeFormSchema>>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues: {
      exchange: "",
      apiKey: "",
      apiSecret: "",
      nickname: "",
    },
  });
  
  const handleAddExchange = (values: z.infer<typeof exchangeFormSchema>) => {
    console.log("Adding exchange:", values);
    // In a real app, we'd make an API call to add the exchange
  };
  
  const handleEditExchange = (exchange: ExchangeType) => {
    console.log("Editing exchange:", exchange);
    // In a real app, we'd open a form pre-filled with this exchange's details
  };
  
  const handleDeleteExchange = (exchange: ExchangeType) => {
    setSelectedExchange(exchange);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteExchange = () => {
    console.log("Deleting exchange:", selectedExchange);
    // In a real app, we'd make an API call to delete the exchange
    setIsDeleteDialogOpen(false);
  };
  
  const handleRefreshExchange = (exchange: ExchangeType) => {
    console.log("Refreshing exchange:", exchange);
    // In a real app, we'd make an API call to refresh the exchange data
  };
  
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "connected":
        return {
          color: "bg-green-500",
          text: "Connected",
          textColor: "text-green-500",
        };
      case "syncing":
        return {
          color: "bg-yellow-500",
          text: "Syncing",
          textColor: "text-yellow-500",
        };
      case "error":
        return {
          color: "bg-red-500",
          text: "Error",
          textColor: "text-red-500",
        };
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Exchanges | CryptoArb</title>
        <meta name="description" content="Manage your cryptocurrency exchange API connections for arbitrage trading." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Exchange Connections</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-secondary to-accent-purple" 
                  disabled={isLimitReached}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exchange
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-surface-light border-gray-800">
                <DialogHeader>
                  <DialogTitle>Add Exchange Connection</DialogTitle>
                  <DialogDescription>
                    Connect a new exchange by entering your API credentials. Your keys are encrypted and stored securely.
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddExchange)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="exchange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exchange</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-gray-700 bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              {...field}
                            >
                              <option value="" disabled>Select an exchange</option>
                              {availableExchanges.map((exchange) => (
                                <option key={exchange.value} value={exchange.value}>
                                  {exchange.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nickname (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="My Binance Account" 
                              className="bg-surface border-gray-700" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-400">
                            A friendly name to identify this exchange connection
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your API key" 
                              className="bg-surface border-gray-700" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="apiSecret"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Secret</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type={showApiSecret ? "text" : "password"}
                                placeholder="Enter your API secret" 
                                className="bg-surface border-gray-700 pr-10" 
                                {...field} 
                              />
                            </FormControl>
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                              onClick={() => setShowApiSecret(!showApiSecret)}
                            >
                              {showApiSecret ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Alert className="bg-surface-dark border-yellow-500/50">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <AlertTitle>Important</AlertTitle>
                      <AlertDescription className="text-sm text-gray-400">
                        Only create API keys with read-only permissions. Never share your API secret with anyone.
                      </AlertDescription>
                    </Alert>
                  
                    <DialogFooter>
                      <Button type="submit" className="bg-gradient-to-r from-secondary to-accent-purple">
                        Connect Exchange
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          {exchanges.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exchanges.map((exchange) => {
                  const { color, text, textColor } = getStatusInfo(exchange.status);
                  
                  return (
                    <Card key={exchange.id} className="bg-surface-light border-gray-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center">
                              {exchange.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{exchange.name}</CardTitle>
                              <div className={`flex items-center ${textColor} text-sm`}>
                                <div className={`h-2 w-2 rounded-full ${color} mr-1`}></div>
                                {text}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => handleRefreshExchange(exchange)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-white"
                              onClick={() => handleEditExchange(exchange)}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-red-500"
                              onClick={() => handleDeleteExchange(exchange)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-gray-400 text-sm">Balance</span>
                            <span className="font-medium">
                              ${exchange.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-gray-400 text-sm">24h Volume</span>
                            <span className="font-medium">
                              ${exchange.volume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-gray-400 text-sm">API Key</span>
                            <span className="font-mono text-sm text-gray-300">
                              {exchange.apiKeyPreview}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-gray-400 text-sm">Last Updated</span>
                            <span className="text-sm text-gray-300">
                              {exchange.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => handleEditExchange(exchange)}
                        >
                          Manage Connection
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
              
              <div className="bg-surface-light border-gray-800 rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Exchange Connection Limits</h3>
                    <p className="text-gray-400">
                      You're currently using {exchanges.length} of your {exchangeLimit === Infinity ? "unlimited" : exchangeLimit} exchange connections
                    </p>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <div className="bg-surface px-4 py-2 rounded-lg flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm">All API keys are encrypted at rest</span>
                    </div>
                    
                    {tier !== SUBSCRIPTION_TIERS.PRO && (
                      <Link href="/subscription">
                        <Button variant="secondary">
                          Upgrade Plan
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="w-full bg-surface rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-gradient-to-r from-secondary to-accent-purple h-2.5 rounded-full" 
                      style={{ width: `${
                        exchangeLimit === Infinity ? 
                          Math.min(exchanges.length * 10, 100) : 
                          Math.min((exchanges.length / exchangeLimit) * 100, 100)
                      }%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <div>0</div>
                    {exchangeLimit !== Infinity && (
                      <>
                        <div>{Math.floor(exchangeLimit / 2)}</div>
                        <div>{exchangeLimit}</div>
                      </>
                    )}
                    {exchangeLimit === Infinity && (
                      <>
                        <div>5</div>
                        <div>10+</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-surface rounded-lg">
                    <h4 className="font-medium mb-1">Free Plan</h4>
                    <p className="text-3xl font-bold text-gray-400">2</p>
                    <p className="text-sm text-gray-500">Exchange Connections</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${tier === SUBSCRIPTION_TIERS.BASIC ? 'bg-gradient-to-r from-secondary/20 to-accent-purple/20 border border-secondary/50' : 'bg-surface'}`}>
                    <h4 className="font-medium mb-1">Basic Plan</h4>
                    <p className="text-3xl font-bold text-white">6</p>
                    <p className="text-sm text-gray-400">Exchange Connections</p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${tier === SUBSCRIPTION_TIERS.PRO ? 'bg-gradient-to-r from-accent-teal/20 to-secondary-dark/20 border border-accent-teal/50' : 'bg-surface'}`}>
                    <h4 className="font-medium mb-1">Pro Plan</h4>
                    <p className="text-3xl font-bold text-white">∞</p>
                    <p className="text-sm text-gray-400">Unlimited Connections</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-surface-light border-gray-800 text-center p-8">
              <CardContent className="pt-6">
                <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-surface">
                  <SiBinance className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Connect Your First Exchange</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-6">
                  Add your exchange API keys to start monitoring arbitrage opportunities.
                  We support Binance, Coinbase, KuCoin, Kraken, and many more exchanges.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-secondary to-accent-purple px-8 py-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Exchange
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-surface-light border-gray-800">
                    {/* Same dialog content as above */}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-surface-light border-gray-800">
          <DialogHeader>
            <DialogTitle>Delete Exchange Connection</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your connection to {selectedExchange?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-400">
              Deleting this connection will remove all associated API keys and settings. You will need to re-add the exchange to use it again.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteExchange}>
              Delete Connection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
