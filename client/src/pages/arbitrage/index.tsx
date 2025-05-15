import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DirectArbitrage } from "./direct";
import { TriangularArbitrage } from "./triangular";
import { FuturesArbitrage } from "./futures";
import { P2PArbitrage } from "./p2p";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";

export default function Arbitrage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  const isBasicOrPro = tier === SUBSCRIPTION_TIERS.BASIC || tier === SUBSCRIPTION_TIERS.PRO;

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Arbitrage | CryptoArb</title>
        <meta name="description" content="Explore and execute various crypto arbitrage strategies across exchanges." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Arbitrage Opportunities</h1>
          </div>
          
          <Tabs defaultValue="direct" className="w-full">
            <TabsList className="mb-8 bg-surface-light border border-gray-800">
              <TabsTrigger value="direct">Direct</TabsTrigger>
              <TabsTrigger 
                value="triangular" 
                disabled={!isBasicOrPro}
                className={!isBasicOrPro ? "cursor-not-allowed opacity-50" : ""}
              >
                Triangular
              </TabsTrigger>
              <TabsTrigger 
                value="futures" 
                disabled={!isBasicOrPro}
                className={!isBasicOrPro ? "cursor-not-allowed opacity-50" : ""}
              >
                Futures
              </TabsTrigger>
              <TabsTrigger 
                value="p2p" 
                disabled={!isBasicOrPro}
                className={!isBasicOrPro ? "cursor-not-allowed opacity-50" : ""}
              >
                P2P
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="direct">
              <DirectArbitrage />
            </TabsContent>
            
            <TabsContent value="triangular">
              {isBasicOrPro ? (
                <TriangularArbitrage />
              ) : (
                <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
                  <h3 className="text-xl font-semibold mb-4">Upgrade to Access Triangular Arbitrage</h3>
                  <p className="text-gray-400 mb-6">
                    Triangular arbitrage allows you to exploit price discrepancies between three different cryptocurrencies to generate profit.
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent-purple text-white font-medium hover:shadow-glow transition-all">
                    Upgrade to Basic or Pro
                  </button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="futures">
              {isBasicOrPro ? (
                <FuturesArbitrage />
              ) : (
                <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
                  <h3 className="text-xl font-semibold mb-4">Upgrade to Access Futures Arbitrage</h3>
                  <p className="text-gray-400 mb-6">
                    Futures arbitrage helps you capitalize on price differences between spot and futures markets.
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent-purple text-white font-medium hover:shadow-glow transition-all">
                    Upgrade to Basic or Pro
                  </button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="p2p">
              {isBasicOrPro ? (
                <P2PArbitrage />
              ) : (
                <div className="bg-surface-light rounded-xl p-6 border border-gray-800 text-center">
                  <h3 className="text-xl font-semibold mb-4">Upgrade to Access P2P Arbitrage</h3>
                  <p className="text-gray-400 mb-6">
                    P2P arbitrage lets you profit from price differences between peer-to-peer platforms and centralized exchanges.
                  </p>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-secondary to-accent-purple text-white font-medium hover:shadow-glow transition-all">
                    Upgrade to Basic or Pro
                  </button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
