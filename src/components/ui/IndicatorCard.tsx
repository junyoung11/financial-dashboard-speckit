'use client';
import type { Indicator } from '@/types';
import { Card } from './Card';

interface IndicatorCardProps {
  indicator: Indicator;
}

/** 등락률에 따른 색상 클래스 반환 */
function getTrendColor(change: number): string {
  if (change > 0) return 'text-red-500 dark:text-red-400';
  if (change < 0) return 'text-blue-500 dark:text-blue-400';
  return 'text-slate-500 dark:text-slate-400';
}

/** 등락 방향 기호 반환 */
function getTrendSymbol(change: number): string {
  if (change > 0) return '▲';
  if (change < 0) return '▼';
  return '–';
}

/** 단일 금융 지표 카드 컴포넌트 */
export function IndicatorCard({ indicator }: IndicatorCardProps) {
  const { name, value, change, changePercent, unit } = indicator;
  const trendColor = getTrendColor(change);

  return (
    <Card>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{name}</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {value.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{unit}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <span>{getTrendSymbol(change)}</span>
          <span>{Math.abs(change).toLocaleString()}</span>
          <span>({changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%)</span>
        </div>
      </div>
    </Card>
  );
}