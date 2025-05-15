import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SUBSCRIPTION_TIERS, SubscriptionTierName, User } from "@shared/schema";
import { useAuth } from "./auth-context";
import { apiRequest } from "@/lib/queryClient";
import { SUBSCRIPTION_FEATURES } from "@/lib/constants";

interface SubscriptionContextType {
  subscription: {
    tier: SubscriptionTierName;
    features: {
      maxExchanges: number;
      botAccess: boolean;
      arbitrageTypes: string[];
      marketAnalysisTools: string;
      support: string;
      customBotStrategies?: boolean;
      price?: number;
    };
    expiresAt?: Date;
    user?: User;
  } | null;
  isLoading: boolean;
  error: string | null;
  selectTier: (tier: SubscriptionTierName) => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscription: null,
  isLoading: false,
  error: null,
  selectTier: async () => {},
});

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider = ({ children }: SubscriptionProviderProps) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionContextType["subscription"]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the user's current subscription from the API
    // For now, we'll use a default subscription based on the user's state
    if (user) {
      setSubscription({
        tier: user.subscriptionTier as SubscriptionTierName || SUBSCRIPTION_TIERS.FREE,
        features: SUBSCRIPTION_FEATURES[user.subscriptionTier as SubscriptionTierName || SUBSCRIPTION_TIERS.FREE],
        expiresAt: user.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : undefined,
        user
      });
    } else {
      // Default to free tier when no user is logged in
      setSubscription({
        tier: SUBSCRIPTION_TIERS.FREE,
        features: SUBSCRIPTION_FEATURES[SUBSCRIPTION_TIERS.FREE]
      });
    }
  }, [user]);

  const selectTier = async (tier: SubscriptionTierName) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, we would make an API call to update the user's subscription
      // For now, we'll just update the state
      if (user) {
        // Simulate API call
        // await apiRequest("POST", "/api/subscription", { tier });
        
        // Update local state
        setSubscription({
          tier,
          features: SUBSCRIPTION_FEATURES[tier],
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          user
        });
      } else {
        // If no user is logged in, we'll just update the local state for demo purposes
        setSubscription({
          tier,
          features: SUBSCRIPTION_FEATURES[tier]
        });
      }
    } catch (err) {
      setError((err as Error).message || "Failed to update subscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ subscription, isLoading, error, selectTier }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
