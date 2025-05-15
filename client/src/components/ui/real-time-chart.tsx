import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricePoint {
  timestamp: string;
  price: number;
  volume?: number;
}

interface RealTimeChartProps {
  data: PricePoint[];
  title: string;
  symbol: string;
  currentPrice: number;
  priceChange: number;
  timeframe: string;
  chartType?: "line" | "area";
  showVolume?: boolean;
  height?: number;
  className?: string;
  onTimeframeChange?: (timeframe: string) => void;
}

export function RealTimeChart({
  data,
  title,
  symbol,
  currentPrice,
  priceChange,
  timeframe,
  chartType = "area",
  showVolume = false,
  height = 300,
  className,
  onTimeframeChange
}: RealTimeChartProps) {
  const timeframes = ["1h", "1d", "1w", "1m"];
  
  const priceFormatter = (value: number) => {
    return value >= 1000
      ? `$${value.toLocaleString()}`
      : `$${value.toFixed(2)}`;
  };
  
  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-2 border border-gray-700 rounded-md text-sm">
          <p className="text-gray-300">{`${label}`}</p>
          <p className="text-white font-medium">
            {`${priceFormatter(payload[0].value)}`}
          </p>
          {showVolume && payload[1] && (
            <p className="text-gray-400">
              {`Volume: ${Number(payload[1].value).toLocaleString()}`}
            </p>
          )}
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className={cn("bg-surface-light border-gray-800", className)}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <div className="flex items-center mt-1">
              <span className="text-xl font-bold mr-2">
                {priceFormatter(currentPrice)}
              </span>
              <span
                className={cn(
                  "text-sm",
                  priceChange >= 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </span>
            </div>
          </div>
          <div className="bg-surface rounded-md border border-gray-700 flex items-center">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant="ghost"
                size="sm"
                className={cn(
                  "px-3 py-1 h-7 rounded-none text-xs",
                  timeframe === tf
                    ? "text-white bg-surface-dark"
                    : "text-gray-400"
                )}
                onClick={() => onTimeframeChange && onTimeframeChange(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={height}>
          {chartType === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="timestamp"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
                domain={["auto", "auto"]}
                tickFormatter={priceFormatter}
              />
              <Tooltip content={customTooltip} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: "#8884d8", strokeWidth: 2, fill: "#8884d8" }}
              />
              {showVolume && (
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#82ca9d"
                  yAxisId="right"
                  strokeWidth={1}
                  dot={false}
                  style={{ opacity: 0.5 }}
                />
              )}
            </LineChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                {showVolume && (
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                )}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="timestamp"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
                domain={["auto", "auto"]}
                tickFormatter={priceFormatter}
              />
              <Tooltip content={customTooltip} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
              {showVolume && (
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                  fill="url(#colorVolume)"
                  yAxisId="right"
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}