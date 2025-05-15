import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProfitChartProps {
  timeframe: 'day' | 'week' | 'month';
  className?: string;
}

export function ProfitChart({ timeframe, className }: ProfitChartProps) {
  const [selectedExchange, setSelectedExchange] = useState('all');

  // Sample data that would come from an API in a real app
  const dayData = [
    { time: '00:00', profit: 20 },
    { time: '02:00', profit: 25 },
    { time: '04:00', profit: 18 },
    { time: '06:00', profit: 30 },
    { time: '08:00', profit: 40 },
    { time: '10:00', profit: 35 },
    { time: '12:00', profit: 50 },
    { time: '14:00', profit: 45 },
    { time: '16:00', profit: 60 },
    { time: '18:00', profit: 70 },
    { time: '20:00', profit: 65 },
    { time: '22:00', profit: 75 },
  ];

  const weekData = [
    { time: 'Mon', profit: 120 },
    { time: 'Tue', profit: 180 },
    { time: 'Wed', profit: 250 },
    { time: 'Thu', profit: 200 },
    { time: 'Fri', profit: 300 },
    { time: 'Sat', profit: 350 },
    { time: 'Sun', profit: 280 },
  ];

  const monthData = [
    { time: 'Week 1', profit: 800 },
    { time: 'Week 2', profit: 1200 },
    { time: 'Week 3', profit: 900 },
    { time: 'Week 4', profit: 1500 },
  ];

  const getDataForTimeframe = () => {
    switch(timeframe) {
      case 'day': return dayData;
      case 'week': return weekData;
      case 'month': return monthData;
      default: return dayData;
    }
  };

  const data = getDataForTimeframe();

  return (
    <div className={cn("bg-surface-light rounded-xl p-5 border border-gray-800", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-white">Profit Overview</h3>
        <div className="flex items-center gap-3">
          <Select value={selectedExchange} onValueChange={setSelectedExchange}>
            <SelectTrigger className="bg-surface-dark border border-gray-700 text-gray-400 rounded-md w-40">
              <SelectValue placeholder="Select Exchange" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exchanges</SelectItem>
              <SelectItem value="binance">Binance</SelectItem>
              <SelectItem value="coinbase">Coinbase</SelectItem>
              <SelectItem value="kucoin">KuCoin</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-sm text-gray-400 flex items-center">
            <div className="h-2 w-2 rounded-full bg-secondary mr-1"></div>
            Profit
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="gradientPurpleBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E293B', 
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#F8FAFC'
              }}
              formatter={(value) => [`$${value}`, 'Profit']}
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#3B82F6" 
              fill="url(#gradientPurpleBlue)" 
              strokeWidth={2}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#3B82F6' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
