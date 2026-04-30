'use client';
import { useTheme } from '@/context/ThemeContext';
import { useFilter } from '@/hooks/useFilter';
import { FilterBar } from '@/components/ui/FilterBar';
import { BaseChart } from './BaseChart';

interface FinancialChartProps {
  /** 차트 고유 식별자 (FilterContext의 key로 사용) */
  chartId: string;
  /** 차트 색상 */
  color?: string;
}

/** FinancialChart: 필터 컨트롤과 BaseChart를 조합한 금융 차트 */
export function FinancialChart({ chartId, color = '#3b82f6' }: FinancialChartProps) {
  const { isDark } = useTheme();
  const { filter, config, data, setType, setPeriod } = useFilter(chartId);

  /** 선택된 지표 ID를 차트 레이블로 사용 */
  const label = filter.selectedIndicatorId;

  return (
    <div className="flex flex-col gap-3">
      {/* 차트 헤더: 제목 + 필터 컨트롤 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {config.title}
        </h3>
        <FilterBar
          filter={filter}
          availablePeriods={config.availablePeriods}
          onTypeChange={setType}
          onPeriodChange={setPeriod}
        />
      </div>

      {/* 차트 영역 */}
      {data.length === 0 ? (
        <div className="flex h-56 items-center justify-center text-sm text-slate-400 dark:text-slate-500">
          표시할 데이터가 없습니다.
        </div>
      ) : (
        <BaseChart
          data={data}
          type={filter.selectedType}
          label={label}
          isDark={isDark}
          color={color}
        />
      )}
    </div>
  );
}