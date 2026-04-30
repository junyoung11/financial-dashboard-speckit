import { useFilterContext } from '@/context/FilterContext';
import { CHART_CONFIGS, SAMPLE_DATA } from '@/constants';
import type { FilterState, ChartConfig, DataPoint } from '@/types';

/** 특정 차트의 필터 상태와 조작 함수를 반환하는 훅 */
export function useFilter(chartId: string): {
  filter: FilterState;
  config: ChartConfig;
  data: DataPoint[];
  setType: (type: FilterState['selectedType']) => void;
  setPeriod: (period: FilterState['selectedPeriod']) => void;
  setIndicator: (indicatorId: string) => void;
} {
  const { filters, setType, setPeriod, setIndicator } = useFilterContext();
  const filter = filters[chartId];
  const config = CHART_CONFIGS.find((c) => c.id === chartId)!;

  const dataset = SAMPLE_DATA.find(
    (d) => d.indicatorId === filter.selectedIndicatorId && d.period === filter.selectedPeriod
  );

  return {
    filter,
    config,
    data: dataset?.data ?? [],
    setType: (type) => setType(chartId, type),
    setPeriod: (period) => setPeriod(chartId, period),
    setIndicator: (id) => setIndicator(chartId, id),
  };
}