import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

/** 기본 카드 컴포넌트 - 라이트/다크 모드 공통 */
export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
      )}
      {children}
    </div>
  );
}