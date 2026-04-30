'use client';
import { useIndicators } from '@/hooks/useIndicators';
import { IndicatorCard } from './IndicatorCard';

/** 활성 금융 지표 카드 그리드 */
export function IndicatorGrid() {
  const { active: indicators } = useIndicators();

  if (indicators.length === 0) {
    return (
      <p className="text-sm text-slate-400 dark:text-slate-500">
        표시할 지표가 없습니다. 관리자 패널에서 지표를 활성화하세요.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {indicators.map((indicator) => (
        <IndicatorCard key={indicator.id} indicator={indicator} />
      ))}
    </div>
  );
}