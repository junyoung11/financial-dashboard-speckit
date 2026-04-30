'use client';
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CHART_CONFIGS } from '@/constants';
import type { FilterState, FilterStateMap, ChartType, Period } from '@/types';

interface FilterContextValue {
  filters: FilterStateMap;
  setType: (chartId: string, type: ChartType) => void;
  setPeriod: (chartId: string, period: Period) => void;
  setIndicator: (chartId: string, indicatorId: string) => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

function buildInitialFilters(): FilterStateMap {
  return Object.fromEntries(
    CHART_CONFIGS.map((c) => [
      c.id,
      {
        chartId: c.id,
        selectedPeriod: c.defaultPeriod,
        selectedIndicatorId: c.defaultIndicatorId,
        selectedType: c.defaultType,
      } satisfies FilterState,
    ])
  );
}

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterStateMap>(buildInitialFilters);

  const patch = useCallback((chartId: string, partial: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, [chartId]: { ...prev[chartId], ...partial } })), []);

  const setType = useCallback((chartId: string, type: ChartType) => patch(chartId, { selectedType: type }), [patch]);
  const setPeriod = useCallback((chartId: string, period: Period) => patch(chartId, { selectedPeriod: period }), [patch]);
  const setIndicator = useCallback((chartId: string, indicatorId: string) => patch(chartId, { selectedIndicatorId: indicatorId }), [patch]);

  return <FilterContext.Provider value={{ filters, setType, setPeriod, setIndicator }}>{children}</FilterContext.Provider>;
}

export function useFilterContext(): FilterContextValue {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be used within FilterProvider');
  return ctx;
}