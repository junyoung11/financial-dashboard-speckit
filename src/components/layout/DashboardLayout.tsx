'use client';
import type { ReactNode } from 'react';
import Header from '@/components/layout/Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * 대시보드 전역 레이아웃 컴포넌트
 * - 상단 헤더 + 본문 영역 구성
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}