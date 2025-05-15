import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_TIERS } from "@shared/schema";

export interface FeatureItem {
  text: string;
  included: boolean;
}

export interface SubscriptionCardProps {
  title: string;
  price: number;
  period?: string;
  features: FeatureItem[];
  isPopular?: boolean;
  buttonText: string;
  onClick: () => void;
  tierName: string;
  className?: string;
}

export function SubscriptionCard({
  title,
  price,
  period = "/month",
  features,
  isPopular = false,
  buttonText,
  onClick,
  tierName,
  className,
}: SubscriptionCardProps) {
  const isPro = tierName === SUBSCRIPTION_TIERS.PRO;
  const isBasic = tierName === SUBSCRIPTION_TIERS.BASIC;

  return (
    <div
      className={cn(
        "tier-card bg-surface-light rounded-xl overflow-hidden border border-gray-800 transition-all hover:transform hover:translate-y-[-5px]",
        isPopular && "relative transform scale-105 border-secondary",
        className
      )}
    >
      {isPopular && (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent-purple"></div>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-secondary to-accent-purple text-white text-sm font-medium px-4 py-1 rounded-full">
            Popular
          </div>
        </>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-end mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-400 ml-2">{period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-start ${!feature.included ? "opacity-50" : ""}`}>
              <div
                className={`flex-shrink-0 h-5 w-5 rounded-full ${
                  feature.included ? "bg-green-500/20" : "bg-red-500/20"
                } flex items-center justify-center mt-1`}
              >
                {feature.included ? (
                  <Check className="text-green-500 h-3 w-3" />
                ) : (
                  <X className="text-red-500 h-3 w-3" />
                )}
              </div>
              <span className="ml-3 text-gray-300">{feature.text}</span>
            </li>
          ))}
        </ul>
        <Button
          onClick={onClick}
          variant="default"
          className={cn(
            "w-full py-6",
            isBasic
              ? "bg-gradient-to-r from-secondary to-accent-purple text-white hover:shadow-glow transition-all"
              : isPro
              ? "bg-gradient-to-r from-accent-teal to-secondary-dark text-white hover:shadow-glow-teal transition-all"
              : "bg-surface hover:bg-surface-dark border border-gray-700 transition-colors"
          )}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
