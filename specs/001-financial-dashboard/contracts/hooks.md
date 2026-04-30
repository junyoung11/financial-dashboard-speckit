# 금융 분석 대시보드 — 훅 인터페이스 계약

**작성일**: 2026-04-29

---

## 개요

이 문서는 커스텀 React 훅의 시그니처와 동작 계약을 정의한다.

---

## useTheme

**파일**: `src/hooks/useTheme.ts`

ThemeContext를 소비하여 현재 테마 상태와 전환 함수를 반환한다.

```ts
function useTheme(): {
  isDark: boolean;
  toggleTheme: () => void;
}
```

**동작**:
- `ThemeProvider` 외부에서 호출 시 에러 throw
- `toggleTheme()` 호출 시 `localStorage`에 `'theme': 'dark'|'light'` 저장
- `document.documentElement`에 `dark` 클래스를 동기적으로 토글

---

## useChartFilter

**파일**: `src/hooks/useChartFilter.ts`

특정 차트의 필터 상태를 관리한다. chartId별로 독립적인 상태를 유지한다.

```ts
function useChartFilter(
  chartId: string,
  config: ChartConfig
): {
  filter: FilterState;
  setPeriod: (period: Period) => void;
  setIndicator: (indicatorId: string) => void;
  setChartType: (type: ChartType) => void;
  resetFilter: () => void;
}
```

**동작**:
- 초기값은 `ChartConfig`의 `defaultPeriod`, `defaultIndicatorId`, `defaultType`에서 가져온다
- `setPeriod`에 `config.availablePeriods`에 없는 값 전달 시 무시
- `setIndicator`에 `config.indicatorIds`에 없는 값 전달 시 무시
- `setChartType`에 `config.availableTypes`에 없는 값 전달 시 무시
- `resetFilter()`는 config 기본값으로 초기화

---

## useChartData

**파일**: `src/hooks/useChartData.ts`

선택된 필터 상태에 맞는 차트 데이터를 반환한다.

```ts
function useChartData(
  filter: FilterState
): {
  chartData: ChartData<'line'> | ChartData<'bar'> | ChartData<'doughnut'> | null;
  isLoading: boolean;
  isEmpty: boolean;
}
```

**동작**:
- `sampleData.ts` 상수에서 `indicatorId` + `period`로 데이터 룩업
- 데이터가 없으면 `isEmpty: true`, `chartData: null` 반환
- 이 훅은 비동기 없음 (목업 데이터) → `isLoading`은 항상 `false`
- `chartType`에 따라 Chart.js 데이터 형식 변환 적용

---

## useAdminIndicators

**파일**: `src/hooks/useAdminIndicators.ts`

관리자 페이지에서 지표 활성 상태를 관리한다.

```ts
function useAdminIndicators(): {
  indicators: Indicator[];
  activeMap: Record<string, boolean>;
  toggleIndicator: (id: string) => void;
  saveChanges: () => void;
  hasUnsavedChanges: boolean;
}
```

**동작**:
- 초기값은 `DEFAULT_INDICATORS`의 `isActive` 필드
- `toggleIndicator(id)`: 해당 id의 활성 상태 반전 (메모리 상태만 변경)
- `saveChanges()`: 변경사항을 `localStorage`에 저장 후 `hasUnsavedChanges: false`
- 페이지 리로드 시 `localStorage`에서 활성 상태 복원
- 저장되지 않은 변경사항이 있을 때 `hasUnsavedChanges: true`