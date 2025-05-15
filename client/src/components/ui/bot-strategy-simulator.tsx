import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ARBITRAGE_TYPES } from "@shared/schema";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { BarChart3, Gauge, ArrowUpCircle, ArrowDownCircle, AlertCircle } from "lucide-react";

interface BotStrategySimulatorProps {
  className?: string;
  onConfigChange?: (config: BotConfig) => void;
}

export interface BotConfig {
  tradingPair: string;
  tradeAmount: number;
  maxSlippage: number;
  minProfitThreshold: number;
  tradingFeeRate: number;
  useDynamicThresholds: boolean;
  autoRebalance: boolean;
  riskLevel: "low" | "medium" | "high";
}

export function BotStrategySimulator({ className, onConfigChange }: BotStrategySimulatorProps) {
  const [config, setConfig] = useState<BotConfig>({
    tradingPair: "BTC/USDT",
    tradeAmount: 1000,
    maxSlippage: 0.5,
    minProfitThreshold: 1.2,
    tradingFeeRate: 0.1,
    useDynamicThresholds: true,
    autoRebalance: true,
    riskLevel: "medium"
  });

  const [simulationResults, setSimulationResults] = useState({
    estimatedProfit: 0,
    successRate: 0,
    avgTradesPerDay: 0,
    riskScore: 0,
    warnings: [] as string[]
  });

  // Run simulation whenever config changes
  useEffect(() => {
    // In a real app, this would call an API to run a backtest
    // Here we're just generating some values based on the config
    const runSimulation = () => {
      // Calculate risk score (0-100)
      const riskMultiplier = 
        config.riskLevel === "low" ? 0.6 : 
        config.riskLevel === "medium" ? 1.0 : 1.5;
      
      const riskScore = Math.min(
        Math.floor(
          (config.tradeAmount / 500) * riskMultiplier * 
          (config.minProfitThreshold / 0.5) * 
          (1 / (config.maxSlippage || 0.1)) * 
          (config.useDynamicThresholds ? 0.8 : 1.2) * 
          (config.autoRebalance ? 0.9 : 1.1) * 
          10
        ), 
        100
      );
      
      // Calculate estimated profit (as % per month)
      const baseProfit = 
        config.riskLevel === "low" ? 3 + Math.random() * 5 : 
        config.riskLevel === "medium" ? 5 + Math.random() * 10 : 
        8 + Math.random() * 15;
      
      const adjustedProfit = baseProfit * 
        (config.minProfitThreshold / 1.2) * 
        (1 - config.tradingFeeRate / 0.2) * 
        (config.useDynamicThresholds ? 1.2 : 0.9) * 
        (config.autoRebalance ? 1.1 : 0.95);
      
      // Calculate success rate
      const baseSuccessRate = 
        config.riskLevel === "low" ? 92 + Math.random() * 5 : 
        config.riskLevel === "medium" ? 85 + Math.random() * 8 : 
        75 + Math.random() * 12;
      
      const adjustedSuccessRate = Math.min(
        baseSuccessRate * 
        (1 - config.minProfitThreshold / 30) * 
        (config.maxSlippage + 0.5) / 1.5 * 
        (config.useDynamicThresholds ? 1.05 : 0.95),
        99.5
      );
      
      // Calculate average trades per day
      const baseTradesPerDay = 
        config.riskLevel === "low" ? 2 + Math.random() * 3 : 
        config.riskLevel === "medium" ? 5 + Math.random() * 5 : 
        8 + Math.random() * 8;
      
      const adjustedTradesPerDay = baseTradesPerDay * 
        (config.minProfitThreshold > 2 ? 0.6 : 1) * 
        (config.minProfitThreshold < 0.8 ? 1.5 : 1) * 
        (config.useDynamicThresholds ? 1.2 : 0.8);
      
      // Check for warnings
      const warnings: string[] = [];
      
      if (config.tradeAmount > 5000 && config.riskLevel === "high") {
        warnings.push("High risk strategy with large trade amount");
      }
      
      if (config.minProfitThreshold < 0.8) {
        warnings.push("Very low profit threshold may result in losses after fees");
      }
      
      if (config.maxSlippage > 1.5) {
        warnings.push("High slippage tolerance increases risk of unfavorable trades");
      }
      
      if (!config.useDynamicThresholds && config.riskLevel === "high") {
        warnings.push("Fixed thresholds with high risk strategy not recommended");
      }

      setSimulationResults({
        estimatedProfit: Math.max(0, adjustedProfit),
        successRate: Math.max(50, adjustedSuccessRate),
        avgTradesPerDay: Math.max(1, adjustedTradesPerDay),
        riskScore: Math.max(10, riskScore),
        warnings
      });
    };

    runSimulation();
    
    if (onConfigChange) {
      onConfigChange(config);
    }
  }, [config, onConfigChange]);

  const handleConfigChange = (key: keyof BotConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const getRiskColor = (score: number) => {
    if (score < 40) return "text-green-500";
    if (score < 70) return "text-yellow-500";
    return "text-red-500";
  };

  const tradingPairs = [
    "BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT", 
    "ADA/USDT", "DOT/USDT", "BNB/USDT", "DOGE/USDT"
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-surface-light border-gray-800">
          <CardHeader>
            <CardTitle>Bot Configuration</CardTitle>
            <CardDescription>Adjust parameters to simulate performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm text-gray-400">Trading Pair</label>
              </div>
              <Select 
                value={config.tradingPair} 
                onValueChange={(value) => handleConfigChange('tradingPair', value)}
              >
                <SelectTrigger className="bg-surface-dark border border-gray-700 text-white">
                  <SelectValue placeholder="Select pair" />
                </SelectTrigger>
                <SelectContent>
                  {tradingPairs.map(pair => (
                    <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm text-gray-400">Trade Amount (USDT)</label>
                <span className="text-sm font-medium">{formatCurrency(config.tradeAmount)}</span>
              </div>
              <Slider 
                value={[config.tradeAmount]} 
                onValueChange={(value) => handleConfigChange('tradeAmount', value[0])}
                min={100}
                max={10000}
                step={100}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$100</span>
                <span>$10,000</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm text-gray-400">Min. Profit Threshold</label>
                <span className="text-sm font-medium">{formatPercentage(config.minProfitThreshold)}</span>
              </div>
              <Slider 
                value={[config.minProfitThreshold]} 
                onValueChange={(value) => handleConfigChange('minProfitThreshold', value[0])}
                min={0.2}
                max={5}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.2%</span>
                <span>5%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm text-gray-400">Max Slippage</label>
                <span className="text-sm font-medium">{formatPercentage(config.maxSlippage)}</span>
              </div>
              <Slider 
                value={[config.maxSlippage]} 
                onValueChange={(value) => handleConfigChange('maxSlippage', value[0])}
                min={0.1}
                max={2}
                step={0.1}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.1%</span>
                <span>2%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <label className="text-sm text-gray-400">Trading Fee Rate</label>
                <span className="text-sm font-medium">{formatPercentage(config.tradingFeeRate)}</span>
              </div>
              <Slider 
                value={[config.tradingFeeRate]} 
                onValueChange={(value) => handleConfigChange('tradingFeeRate', value[0])}
                min={0}
                max={0.5}
                step={0.05}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>0.5%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Risk Level</label>
                  <Badge 
                    variant={
                      config.riskLevel === "low" ? "green" : 
                      config.riskLevel === "medium" ? "yellow" : "red"
                    }
                  >
                    {config.riskLevel.charAt(0).toUpperCase() + config.riskLevel.slice(1)}
                  </Badge>
                </div>
                <Select 
                  value={config.riskLevel} 
                  onValueChange={(value: "low" | "medium" | "high") => handleConfigChange('riskLevel', value)}
                >
                  <SelectTrigger className="bg-surface-dark border border-gray-700 text-white">
                    <SelectValue placeholder="Risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Dynamic Thresholds</label>
                  <Switch 
                    checked={config.useDynamicThresholds}
                    onCheckedChange={(checked) => handleConfigChange('useDynamicThresholds', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-400">Auto Rebalance</label>
                  <Switch 
                    checked={config.autoRebalance}
                    onCheckedChange={(checked) => handleConfigChange('autoRebalance', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-surface-light border-gray-800">
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>Estimated performance based on historical data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1 flex items-center">
                    <ArrowUpCircle className="w-4 h-4 mr-1 text-green-500" />
                    Est. Monthly Profit
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatPercentage(simulationResults.estimatedProfit)}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    ≈ {formatCurrency(config.tradeAmount * (simulationResults.estimatedProfit / 100))} per month
                  </div>
                </div>
                
                <div className="bg-surface rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1 flex items-center">
                    <Gauge className="w-4 h-4 mr-1 text-blue-500" />
                    Success Rate
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {simulationResults.successRate.toFixed(1)}%
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Based on similar market conditions
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1 text-purple-500" />
                    Avg. Trades
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {simulationResults.avgTradesPerDay.toFixed(1)}/day
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    ≈ {Math.round(simulationResults.avgTradesPerDay * 30)} trades per month
                  </div>
                </div>
                
                <div className="bg-surface rounded-lg p-4">
                  <div className="text-gray-400 text-sm mb-1 flex items-center">
                    <AlertCircle className={`w-4 h-4 mr-1 ${getRiskColor(simulationResults.riskScore)}`} />
                    Risk Score
                  </div>
                  <div className={`text-2xl font-bold ${getRiskColor(simulationResults.riskScore)}`}>
                    {simulationResults.riskScore}/100
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    {simulationResults.riskScore < 40 ? "Conservative strategy" :
                     simulationResults.riskScore < 70 ? "Balanced risk/reward" :
                     "Aggressive strategy"}
                  </div>
                </div>
              </div>
              
              {simulationResults.warnings.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="text-yellow-500 text-sm font-medium mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Warnings
                  </div>
                  <ul className="space-y-1">
                    {simulationResults.warnings.map((warning, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button 
                className="w-full bg-gradient-to-r from-secondary to-accent-purple hover:opacity-90 transition-opacity"
              >
                Launch Bot with These Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}