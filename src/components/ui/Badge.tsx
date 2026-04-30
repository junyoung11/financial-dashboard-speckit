import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

/**
 * 상승/하락/중립 상태를 표현하는 뱃지 컴포넌트
 */
export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variantClass = {
    positive: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    negative: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClass} ${className}`}
    >
      {children}
    </span>
  );
}