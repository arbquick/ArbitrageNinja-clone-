import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Stats } from "./stats";
import { ProfitChart } from "./profit-chart";
import { ActiveBots } from "./active-bots";
import { ArbitrageOpportunities } from "./arbitrage-opportunities";
import { ConnectedExchanges } from "./connected-exchanges";
import { NewsTicker } from "@/components/ui/news-ticker";
import { useSubscription } from "@/context/subscription-context";

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Dashboard | CryptoArb</title>
        <meta name="description" content="Monitor your crypto arbitrage performance and opportunities in real-time." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="bg-surface-light rounded-md border border-gray-700 flex items-center">
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === 'day' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setTimeframe('day')}
                >
                  Day
                </button>
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === 'week' ? 'text-white bg-surface-dark rounded-md' : 'text-gray-400'}`}
                  onClick={() => setTimeframe('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-3 py-1 text-sm ${timeframe === 'month' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setTimeframe('month')}
                >
                  Month
                </button>
              </div>
            </div>
          </div>
          
          <NewsTicker className="mb-6" />
          
          <Stats timeframe={timeframe} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <ProfitChart className="lg:col-span-2" timeframe={timeframe} />
            <ActiveBots />
          </div>
          
          <ArbitrageOpportunities />
          
          <ConnectedExchanges />
        </div>
      </main>
    </div>
  );
}
