/**
 * 금융 분석 대시보드 전역 TypeScript 타입 정의
 */
import type { ReactNode } from 'react';

/** 차트 유형 */
export type ChartType = 'line' | 'bar' | 'area' | 'donut';

/** 기간 필터 옵션 */
export type Period = '1w' | '1m' | '3m' | '1y';

/** 금융 지표 */
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

/** 차트 구성 */
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

/** 시계열 데이터 포인트 */
export interface DataPoint {
  /** ISO 8601 날짜 문자열 (예: '2024-03-01') */
  date: string;
  /** 해당 날짜의 지표값 */
  value: number;
}

/** 샘플 시계열 데이터셋 */
export interface SampleDataSet {
  /** 지표 ID (Indicator.id 참조) */
  indicatorId: string;
  /** 기간 (Period 참조) */
  period: Period;
  /** 시계열 데이터 배열 (날짜 오름차순) */
  data: DataPoint[];
}

/** 차트 필터 상태 */
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

/** 여러 차트의 필터를 chartId 기반으로 독립 관리 */
export type FilterStateMap = Record<string, FilterState>;

/** 테마 상태 */
export interface ThemeState {
  /** 현재 다크 모드 여부 */
  isDark: boolean;
  /** 테마 전환 핸들러 */
  toggleTheme: () => void;
}

/** 관리자 상태 */
export interface AdminState {
  /** 지표 ID를 키로 활성 여부를 저장 */
  activeMap: Record<string, boolean>;
  /** 특정 지표 활성/비활성 전환 */
  toggleIndicator: (id: string) => void;
}

/** 데이터 테이블 행 */
export interface DataRow {
  /** 날짜 문자열 */
  date: string;
  /** 값 */
  value: number;
  /** 전일 대비 변화량 */
  change: number;
  /** 전일 대비 변화율 (%) */
  changePercent: number;
}

/** DataTable 컬럼 정의 */
export interface TableColumn<T> {
  /** 컬럼 고유 키 */
  key: keyof T | string;
  /** 컬럼 헤더 표시명 */
  label: string;
  /** 셀 렌더 함수 (선택적, 기본값: string 변환) */
  render?: (value: unknown, row: T) => ReactNode;
  /** 컬럼 정렬 */
  align?: 'left' | 'center' | 'right';
}