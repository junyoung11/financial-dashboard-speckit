'use client';
import type { FilterState, Period } from '@/types';
import { PERIOD_LABELS } from '@/constants';

interface FilterBarProps {
  filter: FilterState;
  availablePeriods?: Period[];
  onTypeChange: (type: FilterState['selectedType']) => void;
  onPeriodChange: (period: FilterState['selectedPeriod']) => void;
}

const TYPES: { value: FilterState['selectedType']; label: string }[] = [
  { value: 'line', label: '선' },
  { value: 'bar', label: '막대' },
  { value: 'area', label: '영역' },
];

const DEFAULT_PERIODS: Period[] = ['1w', '1m', '3m', '1y'];

/** 차트 타입 및 기간 선택 필터 바 */
export function FilterBar({ filter, availablePeriods = DEFAULT_PERIODS, onTypeChange, onPeriodChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* 차트 타입 */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {TYPES.map(({ value, label }: { value: FilterState['selectedType']; label: string }) => (
          <button
            key={value}
            onClick={() => onTypeChange(value)}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              filter.selectedType === value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 기간 선택 */}
      <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {availablePeriods.map((period: Period) => (
          <button
            key={period}
            onClick={() => onPeriodChange(period)}
            className={`px-3 py-1 text-xs font-medium transition-colors ${
              filter.selectedPeriod === period
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {PERIOD_LABELS[period]}
          </button>
        ))}
      </div>
    </div>
  );
}
