import { SUBSCRIPTION_TIERS, ARBITRAGE_TYPES } from "@shared/schema";

export const EXCHANGES = {
  BINANCE: "Binance",
  COINBASE: "Coinbase",
  KUCOIN: "KuCoin",
  KRAKEN: "Kraken",
  BITFINEX: "Bitfinex",
  HUOBI: "Huobi",
  OKX: "OKX",
  BITSTAMP: "Bitstamp",
  BYBIT: "Bybit",
  GEMINI: "Gemini",
};

export const SUBSCRIPTION_FEATURES = {
  [SUBSCRIPTION_TIERS.FREE]: {
    maxExchanges: 2,
    botAccess: false,
    arbitrageTypes: [ARBITRAGE_TYPES.DIRECT],
    marketAnalysisTools: "basic",
    support: "community",
  },
  [SUBSCRIPTION_TIERS.BASIC]: {
    maxExchanges: 6,
    botAccess: true,
    arbitrageTypes: [
      ARBITRAGE_TYPES.DIRECT,
      ARBITRAGE_TYPES.TRIANGULAR,
      ARBITRAGE_TYPES.FUTURES,
      ARBITRAGE_TYPES.P2P,
    ],
    customBotStrategies: false,
    marketAnalysisTools: "standard",
    support: "email",
    price: 15,
  },
  [SUBSCRIPTION_TIERS.PRO]: {
    maxExchanges: Infinity,
    botAccess: true,
    arbitrageTypes: [
      ARBITRAGE_TYPES.DIRECT,
      ARBITRAGE_TYPES.TRIANGULAR,
      ARBITRAGE_TYPES.FUTURES,
      ARBITRAGE_TYPES.P2P,
    ],
    customBotStrategies: true,
    marketAnalysisTools: "advanced",
    support: "priority",
    price: 25,
  },
};

export const BOT_STRATEGIES = [
  {
    id: "strategy-direct",
    name: "Direct Arbitrage",
    description: "Automatically trade direct arbitrage opportunities across exchanges",
    type: ARBITRAGE_TYPES.DIRECT,
  },
  {
    id: "strategy-triangular",
    name: "Triangular Arbitrage",
    description: "Trade across three currency pairs to profit from price discrepancies",
    type: ARBITRAGE_TYPES.TRIANGULAR,
  },
  {
    id: "strategy-futures",
    name: "Futures Arbitrage",
    description: "Exploit price differences between spot and futures markets",
    type: ARBITRAGE_TYPES.FUTURES,
  },
  {
    id: "strategy-custom",
    name: "Custom Strategy",
    description: "Create your own automated trading strategy",
    type: "custom",
    proOnly: true,
  },
];

export const TIMEFRAMES = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
};

export const CRYPTOCURRENCIES = [
  "BTC",
  "ETH",
  "XRP",
  "ADA",
  "SOL",
  "DOT",
  "MATIC",
  "AVAX",
  "LTC",
  "DOGE",
  "LINK",
  "UNI",
];

export const API_ENDPOINTS = {
  USER: "/api/user",
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    LOGOUT: "/api/auth/logout",
  },
  EXCHANGES: "/api/exchanges",
  ARBITRAGE: {
    ALL: "/api/arbitrage",
    DIRECT: "/api/arbitrage/direct",
    TRIANGULAR: "/api/arbitrage/triangular",
    FUTURES: "/api/arbitrage/futures",
    P2P: "/api/arbitrage/p2p",
  },
  BOTS: "/api/bots",
  SUBSCRIPTION: "/api/subscription",
};

export const DEFAULT_CHART_COLORS = [
  "rgba(59, 130, 246, 1)", // Blue (primary)
  "rgba(139, 92, 246, 1)", // Purple (accent-purple)
  "rgba(20, 184, 166, 1)", // Teal (accent-teal)
  "rgba(249, 115, 22, 1)", // Orange
  "rgba(16, 185, 129, 1)", // Green
  "rgba(244, 63, 94, 1)", // Rose
];
