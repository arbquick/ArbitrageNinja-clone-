import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Bell, Moon, Sun, Monitor, BarChart4, Languages, Clock, Info, AlertTriangle, Laptop } from "lucide-react";

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { subscription } = useSubscription();
  const tier = subscription?.tier || SUBSCRIPTION_TIERS.FREE;
  
  const isAdvancedSettingsAllowed = tier !== SUBSCRIPTION_TIERS.FREE;

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Settings | CryptoArb</title>
        <meta name="description" content="Configure your CryptoArb platform settings and preferences." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
          
          <Tabs defaultValue="appearance" className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-64 space-y-6">
                <Card className="bg-surface-light border-gray-800">
                  <CardContent className="p-0">
                    <TabsList className="flex flex-col h-auto p-0 bg-transparent rounded-none">
                      <TabsTrigger 
                        value="appearance" 
                        className="justify-start px-4 py-2.5 border-l-2 border-transparent data-[state=active]:border-secondary rounded-none"
                      >
                        <div className="flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          <span>Appearance</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="notifications" 
                        className="justify-start px-4 py-2.5 border-l-2 border-transparent data-[state=active]:border-secondary rounded-none"
                      >
                        <div className="flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          <span>Notifications</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="dashboard" 
                        className="justify-start px-4 py-2.5 border-l-2 border-transparent data-[state=active]:border-secondary rounded-none"
                      >
                        <div className="flex items-center">
                          <BarChart4 className="h-4 w-4 mr-2" />
                          <span>Dashboard</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="language" 
                        className="justify-start px-4 py-2.5 border-l-2 border-transparent data-[state=active]:border-secondary rounded-none"
                      >
                        <div className="flex items-center">
                          <Languages className="h-4 w-4 mr-2" />
                          <span>Language</span>
                        </div>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="advanced" 
                        className="justify-start px-4 py-2.5 border-l-2 border-transparent data-[state=active]:border-secondary rounded-none"
                        disabled={!isAdvancedSettingsAllowed}
                      >
                        <div className="flex items-center">
                          <Laptop className="h-4 w-4 mr-2" />
                          <span>Advanced</span>
                          {!isAdvancedSettingsAllowed && <Badge variant="outline" className="ml-2">Pro</Badge>}
                        </div>
                      </TabsTrigger>
                    </TabsList>
                  </CardContent>
                </Card>
                
                <Card className="bg-surface-light border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm text-gray-400">Current Plan</p>
                      <Badge 
                        variant={tier === SUBSCRIPTION_TIERS.PRO ? "purple" : 
                                tier === SUBSCRIPTION_TIERS.BASIC ? "default" : "outline"}
                      >
                        {tier.charAt(0).toUpperCase() + tier.slice(1)}
                      </Badge>
                    </div>
                    
                    <Link href="/subscription">
                      <Button variant="outline" size="sm" className="w-full">
                        Manage Subscription
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex-1">
                <TabsContent value="appearance" className="m-0">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader>
                      <CardTitle>Appearance</CardTitle>
                      <CardDescription>Customize how CryptoArb looks and feels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium mb-1">Theme</h3>
                            <p className="text-sm text-gray-400">Select your preferred theme</p>
                          </div>
                          <div className="flex items-center">
                            <Button variant="outline" size="sm" className="mr-2">
                              <Moon className="h-4 w-4 mr-2" /> Dark
                            </Button>
                            <Button variant="outline" size="sm" className="mr-2" disabled>
                              <Sun className="h-4 w-4 mr-2" /> Light
                            </Button>
                            <Button variant="outline" size="sm" disabled>
                              <Monitor className="h-4 w-4 mr-2" /> System
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Accent Color</h3>
                            <p className="text-sm text-gray-400">Choose your main accent color</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer"></div>
                            <div className="w-6 h-6 rounded-full bg-teal-500 cursor-pointer"></div>
                            <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></div>
                            <div className="w-6 h-6 rounded-full bg-orange-500 cursor-pointer"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Animation Effects</h3>
                            <p className="text-sm text-gray-400">Control parallax and visual effects</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Compact Mode</h3>
                            <p className="text-sm text-gray-400">Reduce padding and spacing throughout the UI</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Font Size</h3>
                            <p className="text-sm text-gray-400">Adjust the text size</p>
                          </div>
                          <div className="flex items-center gap-2 w-48">
                            <span className="text-xs">A</span>
                            <Slider defaultValue={[2]} min={1} max={3} step={1} />
                            <span className="text-lg">A</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                        Save Appearance Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="m-0">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Configure how you receive alerts and notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Email Notifications</h3>
                            <p className="text-sm text-gray-400">Receive important updates via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="pl-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Arbitrage Opportunities</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Trading Bot Updates</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Security Alerts</span>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-300">Marketing & Promotions</span>
                            <Switch />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Browser Notifications</h3>
                            <p className="text-sm text-gray-400">Receive real-time alerts in your browser</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Notification Sound</h3>
                            <p className="text-sm text-gray-400">Play a sound when notifications arrive</p>
                          </div>
                          <Switch />
                        </div>
                        
                        <div className="flex items-center justify-between py-4">
                          <div>
                            <h3 className="font-medium mb-1">Minimum Profit Alert</h3>
                            <p className="text-sm text-gray-400">Only notify for opportunities above this threshold</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              className="w-20 bg-surface border-gray-700" 
                              defaultValue="1.5"
                              min="0.1"
                              step="0.1"
                            />
                            <span>%</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                        Save Notification Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="dashboard" className="m-0">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader>
                      <CardTitle>Dashboard</CardTitle>
                      <CardDescription>Customize your dashboard layout and widgets</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Default Timeframe</h3>
                            <p className="text-sm text-gray-400">Set your preferred time period for charts</p>
                          </div>
                          <Select defaultValue="day">
                            <SelectTrigger className="w-32 bg-surface border-gray-700">
                              <SelectValue placeholder="Select timeframe" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="day">Day</SelectItem>
                              <SelectItem value="week">Week</SelectItem>
                              <SelectItem value="month">Month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Auto-Refresh</h3>
                            <p className="text-sm text-gray-400">Automatically refresh dashboard data</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked />
                            <Select defaultValue="30">
                              <SelectTrigger className="w-32 bg-surface border-gray-700">
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="15">15 seconds</SelectItem>
                                <SelectItem value="30">30 seconds</SelectItem>
                                <SelectItem value="60">1 minute</SelectItem>
                                <SelectItem value="300">5 minutes</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Widget Layout</h3>
                            <p className="text-sm text-gray-400">Arrange dashboard widgets</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Customize Layout
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between py-4">
                          <div>
                            <h3 className="font-medium mb-1">Default Currency</h3>
                            <p className="text-sm text-gray-400">Set your preferred display currency</p>
                          </div>
                          <Select defaultValue="usd">
                            <SelectTrigger className="w-32 bg-surface border-gray-700">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="usd">USD</SelectItem>
                              <SelectItem value="eur">EUR</SelectItem>
                              <SelectItem value="gbp">GBP</SelectItem>
                              <SelectItem value="jpy">JPY</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                        Save Dashboard Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="language" className="m-0">
                  <Card className="bg-surface-light border-gray-800">
                    <CardHeader>
                      <CardTitle>Language & Region</CardTitle>
                      <CardDescription>Set your language preferences and regional settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Interface Language</h3>
                            <p className="text-sm text-gray-400">Set your preferred display language</p>
                          </div>
                          <Select defaultValue="en">
                            <SelectTrigger className="w-40 bg-surface border-gray-700">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                              <SelectItem value="ja">Japanese</SelectItem>
                              <SelectItem value="ru">Russian</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Time Zone</h3>
                            <p className="text-sm text-gray-400">Set your local time zone</p>
                          </div>
                          <Select defaultValue="utc">
                            <SelectTrigger className="w-52 bg-surface border-gray-700">
                              <SelectValue placeholder="Select time zone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                              <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                              <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
                              <SelectItem value="cet">CET (Central European Time)</SelectItem>
                              <SelectItem value="jst">JST (Japan Standard Time)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between py-4 border-b border-gray-800">
                          <div>
                            <h3 className="font-medium mb-1">Date Format</h3>
                            <p className="text-sm text-gray-400">Choose how dates are displayed</p>
                          </div>
                          <Select defaultValue="mdy">
                            <SelectTrigger className="w-40 bg-surface border-gray-700">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between py-4">
                          <div>
                            <h3 className="font-medium mb-1">Number Format</h3>
                            <p className="text-sm text-gray-400">Choose your preferred number formatting</p>
                          </div>
                          <Select defaultValue="us">
                            <SelectTrigger className="w-40 bg-surface border-gray-700">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">1,234.56</SelectItem>
                              <SelectItem value="eu">1.234,56</SelectItem>
                              <SelectItem value="in">1,23,456.78</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                        Save Language Settings
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="advanced" className="m-0">
                  {isAdvancedSettingsAllowed ? (
                    <Card className="bg-surface-light border-gray-800">
                      <CardHeader>
                        <CardTitle>Advanced Settings</CardTitle>
                        <CardDescription>Configure technical aspects of the platform</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">API Rate Limiting</h3>
                              <p className="text-sm text-gray-400">Control API request frequency</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">Conservative</span>
                              <Slider defaultValue={[50]} className="w-32" />
                              <span className="text-gray-400">Aggressive</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between py-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Data Caching</h3>
                              <p className="text-sm text-gray-400">Cache market data to reduce API calls</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between py-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">WebSocket Connections</h3>
                              <p className="text-sm text-gray-400">Use WebSockets for real-time data</p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between py-4 border-b border-gray-800">
                            <div>
                              <h3 className="font-medium mb-1">Log Level</h3>
                              <p className="text-sm text-gray-400">Set the detail level for application logs</p>
                            </div>
                            <Select defaultValue="info">
                              <SelectTrigger className="w-32 bg-surface border-gray-700">
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="error">Error</SelectItem>
                                <SelectItem value="warn">Warning</SelectItem>
                                <SelectItem value="info">Info</SelectItem>
                                <SelectItem value="debug">Debug</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-center justify-between py-4">
                            <div>
                              <h3 className="font-medium mb-1">Performance Mode</h3>
                              <p className="text-sm text-gray-400">Optimize for performance on older devices</p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                        
                        <div className="p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/5 flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Advanced Settings Warning</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Changing these settings may affect platform performance and stability. 
                              Only modify if you understand the implications.
                            </p>
                          </div>
                        </div>
                        
                        <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                          Save Advanced Settings
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-surface-light border-gray-800 text-center p-8">
                      <CardContent className="pt-6">
                        <Info className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold mb-4">Advanced Settings Restricted</h2>
                        <p className="text-gray-400 max-w-xl mx-auto mb-6">
                          Advanced settings are only available on Basic and Pro subscription plans. Upgrade your plan to access performance tuning, API settings, and more.
                        </p>
                        <Link href="/subscription">
                          <Button className="bg-gradient-to-r from-secondary to-accent-purple text-white">
                            Upgrade Your Plan
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
