interface EmptyStateProps {
  message?: string;
  description?: string;
}

/**
 * 데이터가 없거나 로딩 실패 시 표시되는 빈 상태 컴포넌트
 */
export default function EmptyState({
  message = '데이터가 없습니다',
  description = '표시할 데이터가 없습니다.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <svg
        className="mb-4 h-12 w-12 text-gray-300 dark:text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 17v-2m3 2v-4m3 4v-6M3 21h18M3 10l9-7 9 7"
        />
      </svg>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{message}</p>
      {description && (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{description}</p>
      )}
    </div>
  );
}