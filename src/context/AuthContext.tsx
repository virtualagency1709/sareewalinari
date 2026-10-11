'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, Address } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (fullName: string, email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  toggleDemoRole: () => void; // reviewer switcher
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_KEY = 'swn_user_session_v1';

const DEMO_CUSTOMER: UserProfile = {
  id: 'usr-customer-01',
  fullName: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  role: 'customer',
  phone: '+91 98765 43210',
  createdAt: '2026-01-10T12:00:00Z',
  addresses: [
    {
      id: 'addr-01',
      fullName: 'Priya Sharma',
      phone: '+91 98765 43210',
      addressLine1: 'Flat 402, Lotus Grand Residences',
      addressLine2: 'Koramangala 4th Block',
      landmark: 'Near Wipro Park',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560034',
      isDefault: true,
    },
  ],
};

const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  fullName: 'Ananya Roy (Store Director)',
  email: 'admin@sareewalinari.com',
  role: 'admin',
  phone: '+91 99887 76655',
  createdAt: '2026-01-01T12:00:00Z',
  addresses: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check Supabase session first if enabled
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const role = session.user.email?.includes('admin') ? 'admin' : 'customer';
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name || 'Valued Customer',
            role,
            addresses: [],
            createdAt: session.user.created_at,
          });
          setIsLoading(false);
          return;
        }
      });
    }

    // Otherwise check local storage
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // Default to demo customer for immediate seamless experience
        setUser(DEMO_CUSTOMER);
        localStorage.setItem(AUTH_KEY, JSON.stringify(DEMO_CUSTOMER));
      }
    } catch (e) {
      console.error('Error loading session', e);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'TestPass123!',
        });
        if (error) {
          setIsLoading(false);
          return { success: false, message: error.message };
        }
        if (data.user) {
          const role = email.includes('admin') ? 'admin' : 'customer';
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            role,
            addresses: [],
            createdAt: data.user.created_at,
          };
          setUser(profile);
          localStorage.setItem(AUTH_KEY, JSON.stringify(profile));
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn('Supabase login error:', err);
      }
    }

    // Fallback local auth
    const isMockAdmin = email.toLowerCase().includes('admin');
    const newUser: UserProfile = isMockAdmin
      ? DEMO_ADMIN
      : {
          id: `usr-${Date.now()}`,
          fullName: email.split('@')[0].replace('.', ' '),
          email,
          role: 'customer',
          addresses: [],
          createdAt: new Date().toISOString(),
        };

    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (fullName: string, email: string, password?: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || 'TestPass123!',
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, message: error.message };
        }
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName,
            role: 'customer', // public signup is ALWAYS customer
            addresses: [],
            createdAt: data.user.created_at,
          };
          setUser(profile);
          localStorage.setItem(AUTH_KEY, JSON.stringify(profile));
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: unknown) {
        console.warn('Supabase register error:', err);
      }
    }

    // Local fallback signup (always defaults to customer for security)
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName,
      email,
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  };

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0,
    };
    const updated = {
      ...user,
      addresses: [...user.addresses, newAddress],
    };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  };

  const deleteAddress = (id: string) => {
    if (!user) return;
    const updated = {
      ...user,
      addresses: user.addresses.filter((a) => a.id !== id),
    };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  };

  const toggleDemoRole = () => {
    if (!user) {
      setUser(DEMO_ADMIN);
      localStorage.setItem(AUTH_KEY, JSON.stringify(DEMO_ADMIN));
      return;
    }
    const newRole: UserProfile['role'] = user.role === 'admin' ? 'customer' : 'admin';
    const updated: UserProfile = {
      ...user,
      role: newRole,
      fullName: newRole === 'admin' ? 'Ananya Roy (Store Director)' : 'Priya Sharma',
      email: newRole === 'admin' ? 'admin@sareewalinari.com' : 'priya.sharma@example.com',
    };
    setUser(updated);
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        toggleDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
