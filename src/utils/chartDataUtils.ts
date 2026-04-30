import type { DataPoint, ChartType } from '@/types';

/**
 * Chart.js용 데이터셋 변환
 */
export function toChartDataset(
  points: DataPoint[],
  label: string,
  chartType: ChartType,
  isDark: boolean,
) {
  const primaryColor = isDark ? 'rgba(99,179,237,1)' : 'rgba(49,130,206,1)';
  const fillColor = isDark ? 'rgba(99,179,237,0.2)' : 'rgba(49,130,206,0.15)';

  const base = {
    label,
    data: points.map((p) => p.value),
    borderColor: primaryColor,
    backgroundColor: chartType === 'area' || chartType === 'bar' ? fillColor : 'transparent',
    fill: chartType === 'area',
    tension: 0.3,
    pointRadius: points.length > 60 ? 0 : 3,
    pointHoverRadius: 5,
  };

  return base;
}

/**
 * DataPoint 배열에서 Chart.js labels(날짜) 추출
 */
export function extractLabels(points: DataPoint[]): string[] {
  return points.map((p) => p.date);
}

/**
 * 전일 대비 변화량·변화율 계산
 */
export function calcChange(current: number, previous: number) {
  const change = parseFloat((current - previous).toFixed(2));
  const changePercent = previous !== 0
    ? parseFloat(((change / previous) * 100).toFixed(2))
    : 0;
  return { change, changePercent };
}