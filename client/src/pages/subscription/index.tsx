import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SubscriptionCard, FeatureItem } from "@/components/ui/subscription-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { useSubscription } from "@/context/subscription-context";
import { useAuth } from "@/context/auth-context";
import { Check, X, AlertTriangle, CreditCard, Shield, Timer, RefreshCw } from "lucide-react";

export default function Subscription() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription, selectTier, isLoading } = useSubscription();
  const { user } = useAuth();
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const currentTier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  // Define the features for each plan
  const freeTierFeatures: FeatureItem[] = [
    { text: "2 Exchange Connections", included: true },
    { text: "Basic Market Analysis", included: true },
    { text: "Direct Arbitrage Only", included: true },
    { text: "No Trading Bot Access", included: false },
    { text: "No Advanced Arbitrage Types", included: false }
  ];

  const basicTierFeatures: FeatureItem[] = [
    { text: "6 Exchange Connections", included: true },
    { text: "Full Market Analysis", included: true },
    { text: "Trading Bot Access", included: true },
    { text: "All Arbitrage Types", included: true },
    { text: "No Custom Bot Strategies", included: false }
  ];

  const proTierFeatures: FeatureItem[] = [
    { text: "Unlimited Exchange Connections", included: true },
    { text: "Advanced Market Analysis", included: true },
    { text: "Premium Trading Bot", included: true },
    { text: "Custom Bot Strategies", included: true },
    { text: "Priority Support", included: true }
  ];
  
  const handleSelectTier = async (tier: string) => {
    if (tier === currentTier) return;
    
    if (tier === SUBSCRIPTION_TIERS.FREE) {
      // Downgrade to free immediately
      await selectTier(tier as any);
    } else {
      // For paid tiers, open payment dialog
      setSelectedPlan(tier);
      setIsPaymentDialogOpen(true);
    }
  };
  
  const handlePaymentSuccess = async () => {
    if (selectedPlan) {
      await selectTier(selectedPlan as any);
      setIsPaymentDialogOpen(false);
      setSelectedPlan(null);
    }
  };
  
  const getSubscriptionStatus = () => {
    if (!subscription?.expiresAt) return null;
    
    const today = new Date();
    const expiryDate = new Date(subscription.expiresAt);
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      expiryFormatted: expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      daysLeft,
      isExpiringSoon: daysLeft <= 7
    };
  };
  
  const subscriptionStatus = getSubscriptionStatus();

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Subscription | CryptoArb</title>
        <meta name="description" content="Manage your CryptoArb subscription and upgrade to unlock premium features." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Subscription</h1>
          </div>
          
          {subscription && currentTier !== SUBSCRIPTION_TIERS.FREE && subscriptionStatus && (
            <Card className="bg-surface-light border-gray-800 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2 flex items-center">
                      Current Plan: 
                      <Badge 
                        variant={currentTier === SUBSCRIPTION_TIERS.PRO ? "purple" : "default"}
                        className="ml-2"
                      >
                        {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
                      </Badge>
                    </h2>
                    <div className="flex items-center text-gray-400">
                      <Timer className="h-4 w-4 mr-2" />
                      <span>Renews on {subscriptionStatus.expiryFormatted}</span>
                      {subscriptionStatus.isExpiringSoon && (
                        <Badge variant="outline" className="ml-2 text-yellow-400 border-yellow-400">
                          {subscriptionStatus.daysLeft} days left
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 md:mt-0">
                    <Button variant="outline" className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Payment Method
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Billing History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Free Tier */}
            <SubscriptionCard
              title="Free"
              price={0}
              features={freeTierFeatures}
              buttonText={currentTier === SUBSCRIPTION_TIERS.FREE ? "Current Plan" : "Downgrade"}
              onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.FREE)}
              tierName={SUBSCRIPTION_TIERS.FREE}
              className={currentTier === SUBSCRIPTION_TIERS.FREE ? "border-2 border-secondary" : ""}
            />
            
            {/* Basic Tier */}
            <SubscriptionCard
              title="Basic"
              price={15}
              period="month"
              features={basicTierFeatures}
              buttonText={currentTier === SUBSCRIPTION_TIERS.BASIC ? "Current Plan" : currentTier === SUBSCRIPTION_TIERS.PRO ? "Downgrade" : "Upgrade"}
              onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.BASIC)}
              tierName={SUBSCRIPTION_TIERS.BASIC}
              isPopular={true}
              className={currentTier === SUBSCRIPTION_TIERS.BASIC ? "border-2 border-secondary" : ""}
            />
            
            {/* Pro Tier */}
            <SubscriptionCard
              title="Pro"
              price={25}
              period="month"
              features={proTierFeatures}
              buttonText={currentTier === SUBSCRIPTION_TIERS.PRO ? "Current Plan" : "Upgrade"}
              onClick={() => handleSelectTier(SUBSCRIPTION_TIERS.PRO)}
              tierName={SUBSCRIPTION_TIERS.PRO}
              className={currentTier === SUBSCRIPTION_TIERS.PRO ? "border-2 border-secondary" : ""}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-surface-light border-gray-800">
              <CardHeader>
                <CardTitle>Plan Comparison</CardTitle>
                <CardDescription>Compare features across subscription tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="text-left py-3 font-medium">Feature</th>
                      <th className="text-center py-3 font-medium">Free</th>
                      <th className="text-center py-3 font-medium">Basic</th>
                      <th className="text-center py-3 font-medium">Pro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Exchange Connections</td>
                      <td className="text-center">2</td>
                      <td className="text-center">6</td>
                      <td className="text-center">Unlimited</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Arbitrage Types</td>
                      <td className="text-center">Direct Only</td>
                      <td className="text-center">All Types</td>
                      <td className="text-center">All Types</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Trading Bot</td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Custom Bot Strategies</td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3">Advanced Market Analysis</td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                    </tr>
                    <tr>
                      <td className="py-3">Priority Support</td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><X size={18} className="mx-auto text-red-500" /></td>
                      <td className="text-center"><Check size={18} className="mx-auto text-green-500" /></td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
            <Card className="bg-surface-light border-gray-800">
              <CardHeader>
                <CardTitle>Subscription FAQ</CardTitle>
                <CardDescription>Common questions about our subscription plans</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">How do I change my subscription?</h3>
                  <p className="text-sm text-gray-400">
                    You can upgrade or downgrade your subscription at any time from this page.
                    Upgrades take effect immediately, while downgrades will be applied at the end of your billing cycle.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">When will I be charged?</h3>
                  <p className="text-sm text-gray-400">
                    Your card will be charged immediately upon upgrading and then on a monthly recurring basis.
                    You can cancel at any time to prevent future charges.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">How secure is my payment information?</h3>
                  <p className="text-sm text-gray-400">
                    We use industry-standard encryption and never store your full card details on our servers.
                    All payments are processed through secure payment processors compliant with PCI DSS standards.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Can I get a refund?</h3>
                  <p className="text-sm text-gray-400">
                    If you're not satisfied with your subscription within the first 7 days, you can request a refund.
                    Please contact our support team for assistance.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-400">
                      Your subscription is protected by our secure payment system.
                      We use industry-leading encryption to keep your data safe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Simple mock payment dialog - in a real app, this would be more sophisticated */}
      {isPaymentDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface-light border border-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Complete Your Subscription</h2>
            <p className="text-gray-400 mb-6">
              You're upgrading to the {selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)} plan at 
              ${selectedPlan === SUBSCRIPTION_TIERS.BASIC ? "15" : "25"}/month.
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-1">Card Number</label>
                <input 
                  type="text" 
                  placeholder="4242 4242 4242 4242" 
                  className="w-full p-2 bg-surface border border-gray-700 rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY" 
                    className="w-full p-2 bg-surface border border-gray-700 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123" 
                    className="w-full p-2 bg-surface border border-gray-700 rounded"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-400">
                This is a simulation. No actual payment will be processed in this demo.
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsPaymentDialogOpen(false);
                  setSelectedPlan(null);
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-secondary to-accent-purple"
                onClick={handlePaymentSuccess}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Complete Subscription"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}