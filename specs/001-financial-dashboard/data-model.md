# 금융 분석 대시보드 — 데이터 모델

**작성일**: 2026-04-29

---

## 개요

이 프로젝트는 외부 API 없이 클라이언트 측 목업 데이터만 사용한다. 모든 엔터티는 TypeScript 타입으로 정의되며, 샘플 데이터는 `src/constants/sampleData.ts`에 하드코딩된다.

---

## 엔터티 정의

### 1. Indicator (금융 지표)

KPI 카드 및 차트에서 표시되는 개별 금융 지표.

```ts
// src/types/index.ts
export interface Indicator {
  /** 고유 식별자 (예: 'kospi', 'usd-krw') */
  id: string;
  /** 한국어 표시명 (예: 'KOSPI') */
  name: string;
  /** 현재값 */
  value: number;
  /** 전일 대비 변화량 */
  change: number;
  /** 전일 대비 변화율 (%) */
  changePercent: number;
  /** 단위 (예: 'pt', 'USD', '원') */
  unit: string;
  /** 대시보드에 표시 여부 (관리자가 제어) */
  isActive: boolean;
}
```

**샘플 데이터 예시** (`src/constants/indicators.ts`):
```ts
export const DEFAULT_INDICATORS: Indicator[] = [
  { id: 'kospi', name: 'KOSPI', value: 2650.41, change: 12.35, changePercent: 0.47, unit: 'pt', isActive: true },
  { id: 'usd-krw', name: 'USD/KRW', value: 1348.50, change: -3.20, changePercent: -0.24, unit: '원', isActive: true },
  { id: 'wti', name: 'WTI 유가', value: 78.92, change: 0.85, changePercent: 1.09, unit: 'USD', isActive: true },
  { id: 'nasdaq', name: 'NASDAQ', value: 16420.10, change: -45.23, changePercent: -0.28, unit: 'pt', isActive: false },
];
```

---

### 2. ChartConfig (차트 구성)

각 차트 영역의 설정을 정의. 차트 제목, 지원하는 차트 유형, 기간 옵션 등을 포함한다.

```ts
export type ChartType = 'line' | 'bar' | 'area' | 'donut';
export type Period = '1w' | '1m' | '3m' | '1y';

export interface ChartConfig {
  /** 차트 고유 식별자 */
  id: string;
  /** 차트 타이틀 */
  title: string;
  /** 기본 차트 유형 */
  defaultType: ChartType;
  /** 이 차트에서 선택 가능한 차트 유형 목록 */
  availableTypes: ChartType[];
  /** 이 차트에서 선택 가능한 지표 ID 목록 */
  indicatorIds: string[];
  /** 기본 선택 지표 ID */
  defaultIndicatorId: string;
  /** 지원하는 기간 목록 */
  availablePeriods: Period[];
  /** 기본 기간 */
  defaultPeriod: Period;
}
```

**샘플 설정 예시** (`src/constants/chartConfig.ts`):
```ts
export const CHART_CONFIGS: ChartConfig[] = [
  {
    id: 'main-trend',
    title: '주요 지수 추이',
    defaultType: 'line',
    availableTypes: ['line', 'area', 'bar'],
    indicatorIds: ['kospi', 'nasdaq'],
    defaultIndicatorId: 'kospi',
    availablePeriods: ['1w', '1m', '3m', '1y'],
    defaultPeriod: '1m',
  },
  {
    id: 'forex',
    title: '환율 추이',
    defaultType: 'area',
    availableTypes: ['area', 'line'],
    indicatorIds: ['usd-krw'],
    defaultIndicatorId: 'usd-krw',
    availablePeriods: ['1w', '1m', '3m'],
    defaultPeriod: '1m',
  },
];
```

---

### 3. SampleDataSet (샘플 시계열 데이터)

차트에 표시할 날짜별 지표 값의 시계열 데이터.

```ts
export interface DataPoint {
  /** ISO 8601 날짜 문자열 (예: '2024-03-01') */
  date: string;
  /** 해당 날짜의 지표값 */
  value: number;
}

export interface SampleDataSet {
  /** 지표 ID (Indicator.id 참조) */
  indicatorId: string;
  /** 기간 (Period 참조) */
  period: Period;
  /** 시계열 데이터 배열 (날짜 오름차순) */
  data: DataPoint[];
}
```

---

### 4. FilterState (차트 필터 상태)

각 차트가 독립적으로 유지하는 필터 선택 상태. chartId를 키로 분리되어 관리된다.

```ts
export interface FilterState {
  /** 적용된 차트 ID */
  chartId: string;
  /** 선택된 기간 */
  selectedPeriod: Period;
  /** 선택된 지표 ID */
  selectedIndicatorId: string;
  /** 선택된 차트 유형 */
  selectedType: ChartType;
}

/** Context에서 여러 차트의 필터를 chartId 기반으로 독립 관리 */
export type FilterStateMap = Record<string, FilterState>;
```

---

### 5. ThemeState (테마 상태)

```ts
export interface ThemeState {
  /** 현재 테마 모드 */
  isDark: boolean;
  /** 테마 전환 핸들러 */
  toggleTheme: () => void;
}
```

---

### 6. AdminState (관리자 상태)

관리자 페이지에서 지표 활성화 여부를 관리하기 위한 상태.

```ts
export interface AdminState {
  /** 지표 ID를 키로 활성 여부를 저장 */
  activeMap: Record<string, boolean>;
  /** 특정 지표 활성/비활성 전환 */
  toggleIndicator: (id: string) => void;
}
```

---

## 엔터티 관계

```
Indicator (1) ──── (N) SampleDataSet
    │
    └── isActive → AdminState.activeMap에서 관리
    
ChartConfig
    │
    ├── indicatorIds[] → Indicator.id 참조
    └── availablePeriods[] → FilterState.selectedPeriod 제한

FilterState (chartId 기준 독립)
    ├── selectedIndicatorId → Indicator.id 참조
    ├── selectedPeriod → SampleDataSet.period 필터
    └── selectedType → 렌더링 차트 컴포넌트 결정
```

---

## 데이터 흐름

```
sampleData.ts (상수)
    │
    ▼
useChartData(chartId, filterState)
    │  (chartDataUtils.ts 순수 함수로 필터링/변환)
    ▼
ChartWrapper → {Line | Bar | Donut}Chart
    │
    ├── FilterState (useChartFilter 훅 관리)
    │       ├── PeriodFilter
    │       ├── IndicatorFilter
    │       └── ChartTypeFilter
    │
    └── ThemeState (useTheme 훅) → 차트 옵션 색상 동적 반영
```

---

## TypeScript 타입 파일 위치

| 타입 | 파일 |
|------|------|
| 모든 공용 타입 | `src/types/index.ts` |
| 지표 상수 및 기본값 | `src/constants/indicators.ts` |
| 차트 구성 상수 | `src/constants/chartConfig.ts` |
| 샘플 시계열 데이터 | `src/constants/sampleData.ts` |