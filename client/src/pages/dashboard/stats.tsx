import React from "react";
import { TrendingUp, Lightbulb, CheckCircle, Building2 } from "lucide-react";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";

interface StatsProps {
  timeframe: 'day' | 'week' | 'month';
}

export function Stats({ timeframe }: StatsProps) {
  const { subscription } = useSubscription();
  
  // In a real app, these would come from API calls
  const statsData = {
    day: {
      profit: 429.38,
      profitChange: 12.3,
      opportunities: 187,
      opportunitiesChange: 8.7,
      successRate: 94.7,
      successRateChange: 1.2,
    },
    week: {
      profit: 2873.45,
      profitChange: 9.8,
      opportunities: 1245,
      opportunitiesChange: 5.4,
      successRate: 92.3,
      successRateChange: 0.7,
    },
    month: {
      profit: 12487.92,
      profitChange: 15.2,
      opportunities: 5320,
      opportunitiesChange: 12.8,
      successRate: 91.5,
      successRateChange: -0.3,
    }
  };
  
  const data = statsData[timeframe];
  
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
  const activeExchanges = 4; // This would come from an API call in a real app
  const isLimitReached = activeExchanges >= exchangeLimit && exchangeLimit !== Infinity;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Profit */}
      <div className="bg-surface-light rounded-xl p-5 border border-gray-800 hover:border-secondary transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Total Profit ({timeframe})</div>
            <div className="text-2xl font-bold text-white">${data.profit.toFixed(2)}</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <div className="flex items-center">
          <div className={`text-sm flex items-center ${data.profitChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <i className={`fas fa-arrow-${data.profitChange >= 0 ? 'up' : 'down'} mr-1`}></i>
            {Math.abs(data.profitChange)}%
          </div>
          <div className="text-gray-400 text-xs ml-2">vs previous {timeframe}</div>
        </div>
      </div>
      
      {/* Opportunities Found */}
      <div className="bg-surface-light rounded-xl p-5 border border-gray-800 hover:border-accent-purple transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Opportunities Found</div>
            <div className="text-2xl font-bold text-white">{data.opportunities}</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-purple-500" />
          </div>
        </div>
        <div className="flex items-center">
          <div className={`text-sm flex items-center ${data.opportunitiesChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <i className={`fas fa-arrow-${data.opportunitiesChange >= 0 ? 'up' : 'down'} mr-1`}></i>
            {Math.abs(data.opportunitiesChange)}%
          </div>
          <div className="text-gray-400 text-xs ml-2">vs previous {timeframe}</div>
        </div>
      </div>
      
      {/* Success Rate */}
      <div className="bg-surface-light rounded-xl p-5 border border-gray-800 hover:border-accent-teal transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Success Rate</div>
            <div className="text-2xl font-bold text-white">{data.successRate}%</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-teal-500/20 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-teal-500" />
          </div>
        </div>
        <div className="flex items-center">
          <div className={`text-sm flex items-center ${data.successRateChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            <i className={`fas fa-arrow-${data.successRateChange >= 0 ? 'up' : 'down'} mr-1`}></i>
            {Math.abs(data.successRateChange)}%
          </div>
          <div className="text-gray-400 text-xs ml-2">vs previous {timeframe}</div>
        </div>
      </div>
      
      {/* Active Exchanges */}
      <div className="bg-surface-light rounded-xl p-5 border border-gray-800 hover:border-secondary transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Active Exchanges</div>
            <div className="text-2xl font-bold text-white">
              {activeExchanges}/{exchangeLimit === Infinity ? '∞' : exchangeLimit}
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <div className="flex items-center">
          {isLimitReached ? (
            <>
              <div className="text-yellow-500 text-sm flex items-center">
                <i className="fas fa-info-circle mr-1"></i>
                Limit Reached
              </div>
              <div className="text-gray-400 text-xs ml-2">Upgrade for more</div>
            </>
          ) : (
            <div className="text-gray-400 text-sm">
              {exchangeLimit - activeExchanges} slots available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
