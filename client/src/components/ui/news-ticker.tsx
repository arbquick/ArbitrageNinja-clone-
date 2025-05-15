import React, { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  url?: string;
  timestamp: string;
}

interface NewsFeed {
  items: NewsItem[];
  lastUpdated: Date;
  isLoading?: boolean;
}

interface NewsTickerProps {
  className?: string;
}

export function NewsTicker({ className }: NewsTickerProps) {
  const [newsFeed, setNewsFeed] = useState<NewsFeed>({
    items: [],
    lastUpdated: new Date(),
    isLoading: true
  });

  // Function to fetch news - in a real app, this would call an API
  const fetchNews = async () => {
    setNewsFeed(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mocked news data
    const newsItems: NewsItem[] = [
      {
        id: "1",
        title: "Bitcoin breaks $80,000 for the first time",
        source: "CoinDesk",
        url: "#",
        timestamp: "5 min ago"
      },
      {
        id: "2",
        title: "Ethereum upgrades to 2.0 complete, gas fees drop 90%",
        source: "CryptoNews",
        url: "#",
        timestamp: "12 min ago"
      },
      {
        id: "3",
        title: "SEC approves new crypto regulations framework",
        source: "Bloomberg",
        url: "#",
        timestamp: "27 min ago"
      },
      {
        id: "4",
        title: "Major exchange reports 43% increase in arbitrage profits",
        source: "CoinTelegraph",
        url: "#",
        timestamp: "32 min ago"
      },
      {
        id: "5",
        title: "New cross-chain bridge reduces transfer times to under 1 minute",
        source: "DeFi Today",
        url: "#",
        timestamp: "45 min ago"
      },
      {
        id: "6",
        title: "Flash crashes on three exchanges create arbitrage opportunities",
        source: "Crypto Insider",
        url: "#",
        timestamp: "55 min ago"
      }
    ];
    
    setNewsFeed({
      items: newsItems,
      lastUpdated: new Date(),
      isLoading: false
    });
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchNews();
    
    // Set up periodic refresh (every 5 minutes in a real app)
    const intervalId = setInterval(fetchNews, 300000);
    
    return () => clearInterval(intervalId);
  }, []);

  // For ticker animation
  const tickerContent = [...newsFeed.items, ...newsFeed.items]; // Duplicate for seamless loop

  return (
    <div className={`bg-surface-light border border-gray-800 rounded-lg overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-2 px-4 border-b border-gray-800">
        <div className="flex items-center">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded mr-2">LIVE</span>
          <h3 className="text-sm font-medium">Crypto News</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs" 
          onClick={fetchNews}
          disabled={newsFeed.isLoading}
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${newsFeed.isLoading ? 'animate-spin' : ''}`} />
          {newsFeed.isLoading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>
      
      <div className="relative h-9 overflow-hidden bg-surface">
        {newsFeed.isLoading ? (
          <div className="flex items-center justify-center h-full">
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm text-gray-400">Loading latest news...</span>
          </div>
        ) : (
          <div className="ticker-container whitespace-nowrap inline-block animate-ticker">
            {tickerContent.map((item, index) => (
              <div key={`${item.id}-${index}`} className="inline-block px-4">
                <a 
                  href={item.url || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-sm hover:text-secondary transition-colors"
                >
                  <span className="text-xs text-gray-400 mr-2">{item.source}</span>
                  <span>{item.title}</span>
                  <span className="text-xs text-gray-400 ml-2">{item.timestamp}</span>
                  <ArrowUpRight className="h-3 w-3 ml-1" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-ticker {
            animation: ticker 60s linear infinite;
          }
        `
      }} />
    </div>
  );
}