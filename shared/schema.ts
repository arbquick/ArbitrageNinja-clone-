import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  subscriptionTier: text("subscription_tier").default("free").notNull(),
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
});

// Exchange API keys schema
export const exchangeApiKeys = pgTable("exchange_api_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  exchangeName: text("exchange_name").notNull(),
  apiKey: text("api_key").notNull(),
  apiSecret: text("api_secret").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Arbitrage opportunities schema
export const arbitrageOpportunities = pgTable("arbitrage_opportunities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // direct, triangular, futures, p2p
  buyExchange: text("buy_exchange").notNull(),
  sellExchange: text("sell_exchange").notNull(),
  asset: text("asset").notNull(),
  profitPercentage: doublePrecision("profit_percentage").notNull(),
  buyPrice: doublePrecision("buy_price").notNull(),
  sellPrice: doublePrecision("sell_price").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  isActive: boolean("is_active").default(true),
});

// Trading bot schema
export const tradingBots = pgTable("trading_bots", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // direct, triangular, futures, p2p
  config: text("config").notNull(), // JSON configuration
  isActive: boolean("is_active").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastExecuted: timestamp("last_executed"),
});

// Subscription tiers schema
export const subscriptionTiers = pgTable("subscription_tiers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  price: doublePrecision("price").notNull(),
  maxExchanges: integer("max_exchanges").notNull(),
  features: text("features").notNull(), // JSON array of features
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertExchangeApiKeySchema = createInsertSchema(exchangeApiKeys).omit({
  id: true,
  createdAt: true,
});

export const insertArbitrageOpportunitySchema = createInsertSchema(arbitrageOpportunities).omit({
  id: true,
  timestamp: true,
});

export const insertTradingBotSchema = createInsertSchema(tradingBots).omit({
  id: true,
  createdAt: true,
  lastExecuted: true,
});

export const insertSubscriptionTierSchema = createInsertSchema(subscriptionTiers).omit({
  id: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type ExchangeApiKey = typeof exchangeApiKeys.$inferSelect;
export type InsertExchangeApiKey = z.infer<typeof insertExchangeApiKeySchema>;

export type ArbitrageOpportunity = typeof arbitrageOpportunities.$inferSelect;
export type InsertArbitrageOpportunity = z.infer<typeof insertArbitrageOpportunitySchema>;

export type TradingBot = typeof tradingBots.$inferSelect;
export type InsertTradingBot = z.infer<typeof insertTradingBotSchema>;

export type SubscriptionTier = typeof subscriptionTiers.$inferSelect;
export type InsertSubscriptionTier = z.infer<typeof insertSubscriptionTierSchema>;

// Subscription tier names
export const SUBSCRIPTION_TIERS = {
  FREE: 'free',
  BASIC: 'basic',
  PRO: 'pro',
} as const;

export type SubscriptionTierName = typeof SUBSCRIPTION_TIERS[keyof typeof SUBSCRIPTION_TIERS];

// Arbitrage types
export const ARBITRAGE_TYPES = {
  DIRECT: 'direct',
  TRIANGULAR: 'triangular',
  FUTURES: 'futures',
  P2P: 'p2p',
} as const;

export type ArbitrageType = typeof ARBITRAGE_TYPES[keyof typeof ARBITRAGE_TYPES];
