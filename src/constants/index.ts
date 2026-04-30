import type { Indicator, ChartConfig, SampleDataSet, Period } from '@/types';

/** 금융 지표 목록 */
export const INDICATORS: Indicator[] = [
  { id: 'kospi', name: 'KOSPI', value: 2_734.45, change: 12.3, changePercent: 0.45, unit: 'pt', isActive: true },
  { id: 'kosdaq', name: 'KOSDAQ', value: 872.16, change: -3.21, changePercent: -0.37, unit: 'pt', isActive: true },
  { id: 'usd-krw', name: 'USD/KRW', value: 1_342.5, change: 4.5, changePercent: 0.34, unit: '원', isActive: true },
  { id: 'wti', name: 'WTI 원유', value: 78.42, change: -0.85, changePercent: -1.07, unit: 'USD', isActive: true },
  { id: 'sp500', name: 'S&P 500', value: 5_234.18, change: 28.7, changePercent: 0.55, unit: 'pt', isActive: false },
  { id: 'gold', name: '금', value: 2_312.3, change: 5.1, changePercent: 0.22, unit: 'USD', isActive: false },
];

/** 차트 구성 목록 */
export const CHART_CONFIGS: ChartConfig[] = [
  {
    id: 'chart-equity',
    title: '주식 지수',
    defaultType: 'line',
    availableTypes: ['line', 'bar', 'area'],
    indicatorIds: ['kospi', 'kosdaq', 'sp500'],
    defaultIndicatorId: 'kospi',
    availablePeriods: ['1w', '1m', '3m', '1y'],
    defaultPeriod: '1m',
  },
  {
    id: 'chart-fx',
    title: '환율',
    defaultType: 'area',
    availableTypes: ['line', 'area', 'bar'],
    indicatorIds: ['usd-krw'],
    defaultIndicatorId: 'usd-krw',
    availablePeriods: ['1w', '1m', '3m', '1y'],
    defaultPeriod: '1m',
  },
  {
    id: 'chart-commodity',
    title: '원자재',
    defaultType: 'line',
    availableTypes: ['line', 'bar'],
    indicatorIds: ['wti', 'gold'],
    defaultIndicatorId: 'wti',
    availablePeriods: ['1w', '1m', '3m', '1y'],
    defaultPeriod: '3m',
  },
];

/** 기간 레이블 매핑 */
export const PERIOD_LABELS: Record<Period, string> = {
  '1w': '1주',
  '1m': '1개월',
  '3m': '3개월',
  '1y': '1년',
};

/** 샘플 시계열 데이터 생성 헬퍼 */
function generateSeries(baseValue: number, count: number, volatility = 0.015): number[] {
  const result: number[] = [baseValue];
  for (let i = 1; i < count; i++) {
    const change = result[i - 1] * (Math.random() * volatility * 2 - volatility);
    result.push(parseFloat((result[i - 1] + change).toFixed(2)));
  }
  return result;
}

function generateDates(count: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  // 시간 정보 제거 (날짜만 사용)
  now.setHours(0, 0, 0, 0);
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

const COUNTS: Record<Period, number> = { '1w': 7, '1m': 30, '3m': 90, '1y': 252 };

function buildDataSets(indicatorId: string, base: number): SampleDataSet[] {
  return (['1w', '1m', '3m', '1y'] as Period[]).map((period) => {
    const count = COUNTS[period];
    const dates = generateDates(count);
    const values = generateSeries(base, count);
    return {
      indicatorId,
      period,
      data: dates.map((date, i) => ({ date, value: values[i] })),
    };
  });
}

/** 샘플 시계열 데이터 */
export const SAMPLE_DATA: SampleDataSet[] = [
  ...buildDataSets('kospi', 2_734.45),
  ...buildDataSets('kosdaq', 872.16),
  ...buildDataSets('usd-krw', 1_342.5),
  ...buildDataSets('wti', 78.42),
  ...buildDataSets('sp500', 5_234.18),
  ...buildDataSets('gold', 2_312.3),
];