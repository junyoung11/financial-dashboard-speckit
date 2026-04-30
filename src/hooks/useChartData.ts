import { useMemo } from 'react';
import type { DataPoint, ChartType } from '@/types';

interface ChartDataset {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
    pointRadius: number;
  }[];
}

const COLORS = {
  blue: { border: '#3B82F6', bg: 'rgba(59,130,246,0.15)' },
  green: { border: '#10B981', bg: 'rgba(16,185,129,0.15)' },
  orange: { border: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
};

/** DataPoint 배열을 Chart.js 형식으로 변환 */
export function useChartData(
  data: DataPoint[],
  label: string,
  chartType: ChartType,
  colorKey: keyof typeof COLORS = 'blue'
): ChartDataset {
  return useMemo(() => {
    const color = COLORS[colorKey];
    return {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label,
          data: data.map((d) => d.value),
          borderColor: color.border,
          backgroundColor: chartType === 'area' ? color.bg : chartType === 'bar' ? color.bg : 'transparent',
          fill: chartType === 'area',
          tension: chartType === 'line' || chartType === 'area' ? 0.4 : 0,
          pointRadius: data.length > 60 ? 0 : 3,
        },
      ],
    };
  }, [data, label, chartType, colorKey]);
}