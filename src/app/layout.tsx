import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { AdminProvider } from '@/context/AdminContext';
import { FilterProvider } from '@/context/FilterContext';

export const metadata: Metadata = {
  title: '금융 대시보드 만들기 - speckit',
  description: '실시간 금융 지표 및 차트 분석 대시보드',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AdminProvider>
            <FilterProvider>{children}</FilterProvider>
          </AdminProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}