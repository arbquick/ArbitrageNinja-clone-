import React from "react";
import { ExchangeCard } from "@/components/ui/exchange-card";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  SiBinance, 
  SiCoinbase, 
  SiKucoin, 
  SiKraken
} from "react-icons/si";

export function ConnectedExchanges() {
  const { subscription } = useSubscription();
  
  // In a real app, this data would come from an API
  const exchangeData = [
    {
      id: "exchange1",
      name: "Binance",
      icon: <SiBinance className="text-white" />,
      status: "connected",
      balance: 24567.89,
      volume: 3256.78
    },
    {
      id: "exchange2",
      name: "Coinbase",
      icon: <SiCoinbase className="text-white" />,
      status: "connected",
      balance: 18234.56,
      volume: 2157.43
    },
    {
      id: "exchange3",
      name: "KuCoin",
      icon: <SiKucoin className="text-white" />,
      status: "connected",
      balance: 9876.54,
      volume: 1289.67
    },
    {
      id: "exchange4",
      name: "Kraken",
      icon: <SiKraken className="text-white" />,
      status: "syncing",
      balance: 7654.32,
      volume: 987.65
    }
  ];
  
  // Calculate exchange limits based on subscription tier
  const getExchangeLimit = () => {
    switch (subscription?.tier) {
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
  
  // Handle exchange actions
  const handleEditExchange = (id: string) => {
    console.log(`Edit exchange: ${id}`);
    // In a real app, this would open a modal to edit the exchange
  };
  
  const handleDeleteExchange = (id: string) => {
    console.log(`Delete exchange: ${id}`);
    // In a real app, this would show a confirmation dialog then delete
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white text-lg">Connected Exchanges</h3>
        <Link href="/exchanges">
          <Button className="text-sm text-secondary hover:text-blue-400 font-medium">
            Add Exchange
          </Button>
        </Link>
      </div>
      
      <div className="bg-surface-light rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-4 px-5 text-gray-400 font-medium">Exchange</th>
              <th className="text-left py-4 px-5 text-gray-400 font-medium">Status</th>
              <th className="text-left py-4 px-5 text-gray-400 font-medium">Balance</th>
              <th className="text-left py-4 px-5 text-gray-400 font-medium">24h Volume</th>
              <th className="text-left py-4 px-5 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exchangeData.map((exchange, index) => (
              <ExchangeCard
                key={exchange.id}
                name={exchange.name}
                icon={exchange.icon}
                status={exchange.status as any}
                balance={exchange.balance}
                volume={exchange.volume}
                onEdit={() => handleEditExchange(exchange.id)}
                onDelete={() => handleDeleteExchange(exchange.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-center">
        <div className="bg-surface-light border border-gray-800 rounded-lg inline-block px-4 py-2">
          <span className="text-gray-400 capitalize">{subscription?.tier || 'Free'} Plan: </span>
          <span className="text-white">
            {exchangeData.length}/{exchangeLimit === Infinity ? '∞' : exchangeLimit} Exchanges Used
          </span>
          {subscription?.tier !== SUBSCRIPTION_TIERS.PRO && (
            <Link href="/subscription">
              <Button variant="link" className="ml-3 text-sm text-secondary hover:text-blue-400 font-medium">
                Upgrade to Pro
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
