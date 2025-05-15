import React from "react";
import { Link } from "wouter";
import { ArbitrageCard } from "@/components/ui/arbitrage-card";
import { ARBITRAGE_TYPES, ArbitrageType } from "@shared/schema";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Button } from "@/components/ui/button";

export function ArbitrageOpportunities() {
  const { subscription } = useSubscription();
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;

  // In a real app, this data would come from an API
  const arbitrageOpportunities = [
    {
      id: "arb1",
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
      id: "arb2",
      type: ARBITRAGE_TYPES.TRIANGULAR,
      title: "ETH → XRP → BTC",
      profitPercentage: 2.34,
      exchangeName: "Binance",
      trades: 3,
      estProfit: 143.27,
      risk: "Medium",
      updatedSeconds: 28
    },
    {
      id: "arb3",
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
      id: "arb4",
      type: ARBITRAGE_TYPES.P2P,
      title: "USDT/USD",
      profitPercentage: 3.12,
      buyExchange: "Binance P2P",
      sellExchange: "Kraken",
      buyPrice: 0.97,
      sellPrice: 1.00,
      updatedSeconds: 60
    }
  ];

  // Filter opportunities based on subscription tier
  const filteredOpportunities = arbitrageOpportunities.filter(opp => {
    // Free tier only gets direct arbitrage
    if (tier === SUBSCRIPTION_TIERS.FREE && opp.type !== ARBITRAGE_TYPES.DIRECT) {
      return false;
    }
    
    // All other tiers get all types
    return true;
  });
  
  const handleTrade = (id: string) => {
    console.log(`Trading opportunity: ${id}`);
    // In a real app, this would navigate to a trading page or open a modal
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-lg">Live Arbitrage Opportunities</h3>
        <Link href="/arbitrage">
          <Button variant="link" className="text-sm text-secondary hover:text-blue-400 font-medium">
            View All
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredOpportunities.map((opp) => (
          <ArbitrageCard
            key={opp.id}
            type={opp.type as ArbitrageType}
            title={opp.title}
            profitPercentage={opp.profitPercentage}
            buyExchange={opp.buyExchange}
            sellExchange={opp.sellExchange}
            buyPrice={opp.buyPrice}
            sellPrice={opp.sellPrice}
            exchangeName={opp.exchangeName}
            trades={opp.trades}
            estProfit={opp.estProfit}
            risk={opp.risk}
            spotExchange={opp.spotExchange}
            spotPrice={opp.spotPrice}
            futuresExchange={opp.futuresExchange}
            futuresPrice={opp.futuresPrice}
            updatedSeconds={opp.updatedSeconds}
            onTrade={() => handleTrade(opp.id)}
          />
        ))}
      </div>
      
      {tier === SUBSCRIPTION_TIERS.FREE && (
        <div className="mt-4 p-3 bg-surface-light border border-gray-800 rounded-lg text-center">
          <span className="text-gray-400">Upgrade to </span>
          <span className="text-white font-medium">Basic or Pro</span>
          <span className="text-gray-400"> to access more arbitrage types</span>
          <Link href="/subscription">
            <Button className="ml-4 bg-gradient-to-r from-secondary to-accent-purple text-white text-sm">
              Upgrade Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
