import React from "react";
import { SubscriptionCard } from "@/components/ui/subscription-card";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { useSubscription } from "@/context/subscription-context";

export function Pricing() {
  const { selectTier } = useSubscription();

  // Define the features for each plan
  const freeTierFeatures = [
    { text: "2 Exchange Connections", included: true },
    { text: "Basic Market Analysis", included: true },
    { text: "Direct Arbitrage Only", included: true },
    { text: "No Trading Bot Access", included: false },
    { text: "No Advanced Arbitrage Types", included: false }
  ];

  const basicTierFeatures = [
    { text: "6 Exchange Connections", included: true },
    { text: "Full Market Analysis", included: true },
    { text: "Trading Bot Access", included: true },
    { text: "All Arbitrage Types", included: true },
    { text: "No Custom Bot Strategies", included: false }
  ];

  const proTierFeatures = [
    { text: "Unlimited Exchange Connections", included: true },
    { text: "Advanced Market Analysis", included: true },
    { text: "Premium Trading Bot", included: true },
    { text: "Custom Bot Strategies", included: true },
    { text: "Priority Support", included: true }
  ];

  return (
    <section id="pricing" className="py-20 bg-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Select the plan that best fits your trading strategy and scale as your profits grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <SubscriptionCard
            title="Free"
            price={0}
            features={freeTierFeatures}
            buttonText="Get Started Free"
            onClick={() => selectTier(SUBSCRIPTION_TIERS.FREE)}
            tierName={SUBSCRIPTION_TIERS.FREE}
          />
          
          {/* Basic Tier */}
          <SubscriptionCard
            title="Basic"
            price={15}
            features={basicTierFeatures}
            buttonText="Select Basic"
            onClick={() => selectTier(SUBSCRIPTION_TIERS.BASIC)}
            tierName={SUBSCRIPTION_TIERS.BASIC}
            isPopular={true}
          />
          
          {/* Pro Tier */}
          <SubscriptionCard
            title="Pro"
            price={25}
            features={proTierFeatures}
            buttonText="Select Pro"
            onClick={() => selectTier(SUBSCRIPTION_TIERS.PRO)}
            tierName={SUBSCRIPTION_TIERS.PRO}
          />
        </div>
      </div>
    </section>
  );
}
