# 금융 분석 대시보드 — 컴포넌트 인터페이스 계약

**작성일**: 2026-04-29

---

## 개요

이 문서는 주요 React 컴포넌트의 Props 인터페이스를 정의한다. 구현 시 이 계약을 준수해야 하며, Props 변경 시 이 문서도 함께 업데이트한다.

---

## UI 컴포넌트

### KpiCard

KPI 지표값, 변화량, 변화율을 카드 형태로 표시한다.

```ts
interface KpiCardProps {
  /** 표시할 금융 지표 객체 */
  indicator: Indicator;
  /** 변화량/변화율 표시 여부 (기본값: true) */
  showChange?: boolean;
  /** 추가 Tailwind 클래스 */
  className?: string;
}
```

**렌더링 규칙**:
- `change > 0`: 초록색 증가 배지 (▲)
- `change < 0`: 빨간색 감소 배지 (▼)
- `change === 0`: 회색 중립 배지 (−)
- 라이트/다크 모드 모두 대응

---

### Badge

상태 배지 컴포넌트. 증감률, 상태 라벨 등에 사용.

```ts
type BadgeVariant = 'positive' | 'negative' | 'neutral';

interface BadgeProps {
  /** 배지 유형 */
  variant: BadgeVariant;
  /** 표시 텍스트 */
  label: string;
  /** 추가 Tailwind 클래스 */
  className?: string;
}
```

---

### ThemeToggle

라이트/다크 모드 전환 버튼. ThemeContext를 직접 소비하며 Props 없음.

```ts
// Props 없음 — ThemeContext에서 isDark, toggleTheme을 직접 소비
interface ThemeToggleProps {}
```

**접근성**: `aria-label="테마 전환"`, `aria-pressed={isDark}` 적용

---

### DataTable

공용 데이터 테이블. 관리자 지표 목록 등 범용으로 사용.

```ts
interface TableColumn<T> {
  /** 열 키 (T의 keyof) */
  key: keyof T;
  /** 열 헤더 라벨 */
  label: string;
  /** 커스텀 렌더 함수 (선택) */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  /** 열 너비 클래스 (예: 'w-1/4') */
  width?: string;
}

interface DataTableProps<T> {
  /** 열 정의 배열 */
  columns: TableColumn<T>[];
  /** 행 데이터 배열 */
  rows: T[];
  /** 추가 Tailwind 클래스 */
  className?: string;
}
```

---

### EmptyState

데이터가 없을 때 표시하는 안내 컴포넌트.

```ts
interface EmptyStateProps {
  /** 메인 메시지 */
  message: string;
  /** 서브 메시지 (선택) */
  description?: string;
  /** 아이콘 (선택, React 노드) */
  icon?: React.ReactNode;
}
```

---

## 차트 컴포넌트

### ChartWrapper

차트 + 필터 UI를 통합하는 최상위 차트 래퍼.

```ts
interface ChartWrapperProps {
  /** 차트 고유 ID (FilterState 키) */
  chartId: string;
  /** 차트 구성 객체 */
  chartConfig: ChartConfig;
  /** 필터 변경 콜백 (선택, 외부 상태 동기화 필요 시) */
  onFilterChange?: (chartId: string, filter: FilterState) => void;
  /** 추가 Tailwind 클래스 */
  className?: string;
}
```

---

### LineChart

라인 또는 영역(area) 차트 컴포넌트.

```ts
interface LineChartProps {
  /** Chart.js용 데이터 객체 */
  data: ChartData<'line'>;
  /** 차트 유형 ('line' | 'area') */
  chartType: 'line' | 'area';
  /** 추가 Chart.js 옵션 (기본 옵션과 딥 머지) */
  options?: Partial<ChartOptions<'line'>>;
  /** 컨테이너 높이 클래스 (기본값: 'h-64') */
  heightClass?: string;
}
```

---

### BarChart

바 차트 컴포넌트.

```ts
interface BarChartProps {
  /** Chart.js용 데이터 객체 */
  data: ChartData<'bar'>;
  /** 추가 Chart.js 옵션 */
  options?: Partial<ChartOptions<'bar'>>;
  /** 컨테이너 높이 클래스 (기본값: 'h-64') */
  heightClass?: string;
}
```

---

### DonutChart

도넛 차트 컴포넌트.

```ts
interface DonutChartProps {
  /** Chart.js용 데이터 객체 */
  data: ChartData<'doughnut'>;
  /** 추가 Chart.js 옵션 */
  options?: Partial<ChartOptions<'doughnut'>>;
  /** 컨테이너 높이 클래스 (기본값: 'h-64') */
  heightClass?: string;
}
```

---

## 필터 컴포넌트

### PeriodFilter

기간 선택 필터.

```ts
interface PeriodFilterProps {
  /** 선택 가능한 기간 목록 */
  options: Period[];
  /** 현재 선택된 기간 */
  selected: Period;
  /** 기간 변경 콜백 */
  onChange: (period: Period) => void;
}
```

---

### IndicatorFilter

지표 선택 필터.

```ts
interface IndicatorFilterProps {
  /** 선택 가능한 지표 ID 목록 */
  indicatorIds: string[];
  /** 현재 선택된 지표 ID */
  selected: string;
  /** 지표 변경 콜백 */
  onChange: (indicatorId: string) => void;
}
```

---

### ChartTypeFilter

차트 유형 선택 필터.

```ts
interface ChartTypeFilterProps {
  /** 선택 가능한 차트 유형 목록 */
  options: ChartType[];
  /** 현재 선택된 차트 유형 */
  selected: ChartType;
  /** 차트 유형 변경 콜백 */
  onChange: (type: ChartType) => void;
}
```

---

## 레이아웃 컴포넌트

### Header

전체 헤더. 로고 + 네비게이션 + ThemeToggle 포함.

```ts
interface HeaderProps {
  /** 현재 활성 경로 (선택, 네비게이션 강조 표시용) */
  activePath?: string;
}
```

---

### DashboardLayout

대시보드 공통 레이아웃 래퍼.

```ts
interface DashboardLayoutProps {
  /** 자식 컴포넌트 */
  children: React.ReactNode;
  /** 레이아웃 제목 (선택, 페이지 헤더에 표시) */
  title?: string;
}
```

---

## 관리자 컴포넌트

### AdminIndicatorTable

관리자 페이지에서 지표 활성/비활성 토글 테이블.

```ts
interface AdminIndicatorTableProps {
  /** 전체 지표 목록 */
  indicators: Indicator[];
  /** 토글 콜백 (id: 지표 ID) */
  onToggle: (id: string) => void;
}