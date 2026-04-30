'use client';
import { useAdmin } from '@/context/AdminContext';
import { INDICATORS } from '@/constants';

/** 관리자 패널: 지표 활성/비활성 토글 UI */
export function AdminHeader() {
  const { activeMap, toggleIndicator } = useAdmin();

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-bold text-slate-700 dark:text-slate-200">
        지표 표시 설정
      </h2>
      <div className="flex flex-wrap gap-2">
        {INDICATORS.map((indicator) => {
          const isActive = activeMap[indicator.id] ?? indicator.isActive;
          return (
            <button
              key={indicator.id}
              onClick={() => toggleIndicator(indicator.id)}
              aria-pressed={isActive}
              className={[
                'rounded-full border px-5 py-0.5 text-m font-medium transition-colors',
                isActive
                  ? 'border-blue-500 bg-blue-500 text-white dark:border-blue-400 dark:bg-blue-400 dark:text-slate-900'
                  : 'border-slate-300 bg-white text-slate-500 hover:border-blue-400 hover:text-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-blue-400 dark:hover:text-blue-400',
              ].join(' ')}
            >
              {indicator.name}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
        버튼을 클릭하여 대시보드에 표시할 지표를 선택하세요.
      </p>
    </section>
  );
}