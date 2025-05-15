import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArbitrageType, ARBITRAGE_TYPES } from "@shared/schema";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { AlertTriangle, DollarSign, ArrowUpCircle, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ArbitrageProfitCalculatorProps {
  type: ArbitrageType;
  buyPrice?: number;
  sellPrice?: number;
  exchangeName?: string;
  spotPrice?: number;
  futuresPrice?: number;
  className?: string;
  onExecuteTrade?: () => void;
}

export function ArbitrageProfitCalculator({
  type,
  buyPrice = 0,
  sellPrice = 0,
  exchangeName,
  spotPrice,
  futuresPrice,
  className,
  onExecuteTrade
}: ArbitrageProfitCalculatorProps) {
  const { subscription } = useSubscription();
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(1000);
  const [slippage, setSlippage] = useState<number>(0.5);
  const [results, setResults] = useState({
    estimatedProfit: 0,
    fees: 0,
    netProfit: 0,
    roi: 0,
    profitable: false
  });

  const isBotEnabled = subscription?.tier !== SUBSCRIPTION_TIERS.FREE;

  useEffect(() => {
    calculateProfit();
  }, [amount, slippage, buyPrice, sellPrice, spotPrice, futuresPrice, type]);

  const calculateProfit = () => {
    let estimatedProfit = 0;
    const fees = amount * 0.002; // 0.2% trading fee

    switch (type) {
      case ARBITRAGE_TYPES.DIRECT:
        estimatedProfit = amount * ((sellPrice - buyPrice) / buyPrice);
        break;
      case ARBITRAGE_TYPES.TRIANGULAR:
        // Simplified triangular arbitrage calculation
        estimatedProfit = amount * 0.015; // 1.5% example return
        break;
      case ARBITRAGE_TYPES.FUTURES:
        if (spotPrice && futuresPrice) {
          estimatedProfit = amount * ((futuresPrice - spotPrice) / spotPrice);
        }
        break;
      case ARBITRAGE_TYPES.P2P:
        estimatedProfit = amount * ((sellPrice - buyPrice) / buyPrice);
        break;
    }

    // Apply slippage
    estimatedProfit *= (1 - slippage / 100);
    
    const netProfit = estimatedProfit - fees;
    const roi = (netProfit / amount) * 100;

    setResults({
      estimatedProfit,
      fees,
      netProfit,
      roi,
      profitable: netProfit > 0
    });
  };

  const handleExecuteTrade = () => {
    if (!isBotEnabled) {
      toast({
        title: "Bot Access Required",
        description: "Upgrade to Basic or Pro plan to enable automated trading.",
        variant: "destructive"
      });
      return;
    }

    if (!results.profitable) {
      toast({
        title: "Trade Not Profitable",
        description: "This trade would result in a loss after fees and slippage.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trade Executed",
      description: "Your trade has been sent to the trading bot for execution.",
    });

    onExecuteTrade?.();
  };

  return (
    <Card className={cn("bg-surface-light border-gray-800", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-secondary" />
          Profit Calculator
        </CardTitle>
        <CardDescription>
          Calculate potential profits for {type.toLowerCase().replace('_', ' ')} arbitrage
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Trade Amount</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="bg-surface border-gray-700"
                min={0}
              />
              <span className="text-sm text-gray-400">USDT</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium">Slippage Tolerance</label>
              <span className="text-sm text-secondary">{slippage}%</span>
            </div>
            <Slider
              value={[slippage]}
              min={0.1}
              max={2}
              step={0.1}
              onValueChange={(values) => setSlippage(values[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Est. Profit</div>
              <div className="text-lg font-bold text-white">
                ${results.estimatedProfit.toFixed(2)}
              </div>
            </div>
            
            <div className="bg-surface p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Trading Fees</div>
              <div className="text-lg font-bold text-white">
                ${results.fees.toFixed(2)}
              </div>
            </div>
          </div>

          <div className={cn(
            "p-4 rounded-lg",
            results.profitable ? "bg-green-900/20 border border-green-500/30" : "bg-red-900/20 border border-red-500/30"
          )}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">Net Profit</span>
              <span className={cn(
                "font-bold",
                results.profitable ? "text-green-400" : "text-red-400"
              )}>
                ${results.netProfit.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">ROI</span>
              <span className={cn(
                "font-bold",
                results.profitable ? "text-green-400" : "text-red-400"
              )}>
                {results.roi.toFixed(2)}%
              </span>
            </div>
          </div>

          {!results.profitable && (
            <div className="flex items-start gap-2 p-3 bg-surface rounded-lg border border-yellow-500/30">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                This opportunity is not profitable after considering fees and slippage.
                Consider adjusting your trade amount or waiting for better opportunities.
              </p>
            </div>
          )}

          <Button
            className={cn(
              "w-full",
              results.profitable
                ? "bg-gradient-to-r from-secondary to-accent-purple"
                : "bg-surface"
            )}
            onClick={handleExecuteTrade}
            disabled={!results.profitable}
          >
            {isBotEnabled ? (
              <>
                <Bot className="mr-2 h-4 w-4" />
                Execute Trade with Bot
              </>
            ) : (
              "Upgrade for Bot Trading"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}