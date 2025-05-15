import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would check if the user is logged in by making an API call
    // For now, we'll simulate a logged-in user with hardcoded mock data
    const mockUser: User = {
      id: 1,
      username: "demo_user",
      password: "hashed_password", // In a real app, we would never store the password in the client
      email: "demo@example.com",
      name: "John Doe",
      createdAt: new Date(),
      subscriptionTier: "basic",
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
    };

    // Simulate API call to check if user is logged in
    setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 500);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, we would make an API call to login
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: 1,
        username,
        password: "hashed_password", // In a real app, we would never store the password in the client
        email: "demo@example.com",
        name: "John Doe",
        createdAt: new Date(),
        subscriptionTier: "basic",
        subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setUser(mockUser);
    } catch (err) {
      setError((err as Error).message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, we would make an API call to register
      // For now, we'll simulate a successful registration
      const mockUser: User = {
        id: 1,
        username,
        password: "hashed_password", // In a real app, we would never store the password in the client
        email,
        name: username,
        createdAt: new Date(),
        subscriptionTier: "free",
      };

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setUser(mockUser);
    } catch (err) {
      setError((err as Error).message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // In a real app, we would make an API call to logout
      // For now, we'll just clear the user state
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setUser(null);
    } catch (err) {
      setError((err as Error).message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
