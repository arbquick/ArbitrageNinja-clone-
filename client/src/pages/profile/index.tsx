import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { useSubscription } from "@/context/subscription-context";
import { SUBSCRIPTION_TIERS } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowUpRight, CheckCircle, Shield, Key, AlertTriangle, User } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Profile() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user } = useAuth();
  const { subscription } = useSubscription();
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const securityForm = useForm<z.infer<typeof securityFormSchema>>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (values: z.infer<typeof profileFormSchema>) => {
    // In a real app, we would make an API call to update the profile
    console.log(values);
  };

  const onSecuritySubmit = (values: z.infer<typeof securityFormSchema>) => {
    // In a real app, we would make an API call to update the password
    console.log(values);
  };

  const getSubscriptionBadge = () => {
    switch (subscription?.tier) {
      case SUBSCRIPTION_TIERS.PRO:
        return <Badge variant="purple" className="ml-2">Pro</Badge>;
      case SUBSCRIPTION_TIERS.BASIC:
        return <Badge variant="default" className="ml-2">Basic</Badge>;
      default:
        return <Badge variant="outline" className="ml-2">Free</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface text-white">
      <Helmet>
        <title>Profile | CryptoArb</title>
        <meta name="description" content="Manage your CryptoArb profile settings and account information." />
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 bg-surface overflow-hidden flex flex-col">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        
        <div className="p-6 overflow-y-auto" style={{ height: "calc(100vh - 57px)" }}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-surface-light border-gray-800 md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account information and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="mb-6 bg-surface border border-gray-800">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                        <div className="flex items-center gap-6">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xl bg-secondary text-white">
                              {user?.name?.substring(0, 2) || "JD"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <Button variant="outline" size="sm">
                              Change Avatar
                            </Button>
                            <p className="text-sm text-gray-400 mt-2">
                              JPG, GIF or PNG. Max size 2MB.
                            </p>
                          </div>
                        </div>
                        
                        <FormField
                          control={profileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  className="bg-surface border-gray-700" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your email" 
                                  className="bg-surface border-gray-700" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                              <FormDescription className="text-gray-400">
                                This email will be used for important notifications.
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-gradient-to-r from-secondary to-accent-purple">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Form {...securityForm}>
                      <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                        <FormField
                          control={securityForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="bg-surface border-gray-700" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="bg-surface border-gray-700" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securityForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••" 
                                  className="bg-surface border-gray-700" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="p-4 border border-gray-700 rounded-lg bg-surface flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white">Password Security</h4>
                            <p className="text-sm text-gray-400 mt-1">
                              Use a strong password that includes uppercase letters, numbers, and symbols. 
                              Never reuse passwords across different platforms.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-gradient-to-r from-secondary to-accent-purple">
                            Update Password
                          </Button>
                        </div>
                      </form>
                    </Form>
                    
                    <div className="mt-8 pt-6 border-t border-gray-800">
                      <h3 className="font-medium text-lg mb-4">Two-Factor Authentication</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-400">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                        </div>
                        <Button variant="outline">
                          {false ? "Manage 2FA" : "Enable 2FA"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg mb-3">Email Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Arbitrage Opportunities</p>
                              <p className="text-sm text-gray-400">Receive notifications when high-profit opportunities are detected</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Bot Activity</p>
                              <p className="text-sm text-gray-400">Receive updates on your trading bot performance</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Security Alerts</p>
                              <p className="text-sm text-gray-400">Get notified about important security events</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Marketing & Promotions</p>
                              <p className="text-sm text-gray-400">Receive updates about new features and special offers</p>
                            </div>
                            <input type="checkbox" className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-800">
                        <h3 className="font-medium text-lg mb-3">Display Settings</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Dark Mode</p>
                              <p className="text-sm text-gray-400">Switch between dark and light mode</p>
                            </div>
                            <input type="checkbox" defaultChecked className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="font-medium">Compact View</p>
                              <p className="text-sm text-gray-400">Show more data with less spacing</p>
                            </div>
                            <input type="checkbox" className="toggle-checkbox toggle rounded-full p-1 h-6 w-12 appearance-none transition duration-300 ease-in-out bg-gray-700 cursor-pointer relative" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-gradient-to-r from-secondary to-accent-purple">
                          Save Preferences
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="bg-surface-light border-gray-800">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-lg bg-secondary text-white">
                        {user?.name?.substring(0, 2) || "JD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{user?.name || "John Doe"}</h3>
                      <p className="text-gray-400 text-sm">{user?.username || "john_doe"}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Subscription</span>
                      <span className="font-medium flex items-center">
                        {subscription?.tier ? subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1) : "Free"}
                        {getSubscriptionBadge()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Member Since</span>
                      <span className="font-medium">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Jan 1, 2023"}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                      <span className="text-gray-400">Email</span>
                      <span className="font-medium">{user?.email || "john@example.com"}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-400">Plan Expires</span>
                      <span className="font-medium">
                        {subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : "Never"}
                      </span>
                    </div>
                  </div>
                  
                  <Link href="/subscription">
                    <Button className="w-full mt-6 bg-gradient-to-r from-secondary to-accent-purple">
                      Manage Subscription
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="bg-surface-light border-gray-800">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Account Protection</p>
                        <div className="flex items-center text-sm text-gray-400">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> 
                          Password protected
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <AlertTriangle className="h-3 w-3 mr-1 text-yellow-500" /> 
                          2FA not enabled
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Key className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">API Keys</p>
                        <p className="text-sm text-gray-400">
                          Manage exchange API keys and access
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-accent-purple" />
                      <div>
                        <p className="font-medium">Privacy Settings</p>
                        <p className="text-sm text-gray-400">
                          Control your data and privacy preferences
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      This action is irreversible and will permanently delete all your data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
