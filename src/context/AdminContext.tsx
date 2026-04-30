'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { INDICATORS } from '@/constants';
import type { AdminState } from '@/types';

const AdminContext = createContext<AdminState | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(
    Object.fromEntries(INDICATORS.map((i) => [i.id, i.isActive]))
  );

  const toggleIndicator = (id: string) =>
    setActiveMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return <AdminContext.Provider value={{ activeMap, toggleIndicator }}>{children}</AdminContext.Provider>;
}

export function useAdmin(): AdminState {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}