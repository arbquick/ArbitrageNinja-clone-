import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Arbitrage from "@/pages/arbitrage";
import Bot from "@/pages/bot";
import MarketAnalysis from "@/pages/market-analysis";
import Exchanges from "@/pages/exchanges";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import Subscription from "@/pages/subscription";
import { SubscriptionProvider } from "@/context/subscription-context";
import { AuthProvider } from "@/context/auth-context";
import { Helmet } from "react-helmet";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/arbitrage" component={Arbitrage} />
      <Route path="/bot" component={Bot} />
      <Route path="/market-analysis" component={MarketAnalysis} />
      <Route path="/exchanges" component={Exchanges} />
      <Route path="/profile" component={Profile} />
      <Route path="/settings" component={Settings} />
      <Route path="/subscription" component={Subscription} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SubscriptionProvider>
          <TooltipProvider>
            <Helmet>
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
              <title>CryptoArb | Advanced Crypto Arbitrage Platform</title>
            </Helmet>
            <Toaster />
            <Router />
          </TooltipProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
