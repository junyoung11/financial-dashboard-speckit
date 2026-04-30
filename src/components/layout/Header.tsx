'use client';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/**
 * 전역 상단 헤더 컴포넌트
 * - 서비스 타이틀
 * - 다크/라이트 모드 전환 버튼
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <svg
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-base font-semibold text-gray-900 dark:text-white">
            금융 분석 대시보드
          </span>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}