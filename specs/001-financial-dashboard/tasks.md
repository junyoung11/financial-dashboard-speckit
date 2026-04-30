# 금융 분석 대시보드 데모 작업 목록

**작성일**: 2026-04-29  
**기능 디렉터리**: specs/001-financial-dashboard  
**총 작업 수**: 43

---

## Phase 1: 프로젝트 설정

_목적: 프로젝트 초기 구조 및 의존성 설정_

- [x] T001 프로젝트 디렉터리 구조 생성 (`src/components/charts/`, `src/components/filters/`, `src/components/layout/`, `src/components/ui/`, `src/hooks/`, `src/context/`, `src/utils/`, `src/types/`, `src/constants/`)
- [x] T002 TypeScript strict 모드 확인 및 활성화 (`tsconfig.json`)
- [x] T003 Tailwind CSS `darkMode: 'class'` 설정 추가 (`tailwind.config.ts`)
- [x] T004 Chart.js 및 react-chartjs-2 의존성 확인 및 필요 시 설치 (`package.json`)

---

## Phase 2: 기반 작업 (블로킹 선행 조건)

_목적: 모든 사용자 스토리에서 공통으로 사용되는 타입, 상수, 컨텍스트, 유틸, 레이아웃_

- [x] T005 전역 TypeScript 타입 정의 — `Indicator`, `ChartConfig`, `SampleDataSet`, `FilterState`, `ThemeState` 등 (`src/types/index.ts`)
- [x] T006 [P] 금융 지표 상수 정의 — 포트폴리오 가치, 수익률, 변동성, 거래량 포함 (`src/constants/indicators.ts`) _(통합: `src/constants/index.ts`)_
- [x] T007 [P] 차트 구성 상수 정의 — 차트 ID, 제목, 유형, 사용 가능 유형, 연결 지표, 기간 목록 포함 (`src/constants/chartConfig.ts`) _(통합: `src/constants/index.ts`)_
- [x] T008 샘플 금융 시계열 데이터 작성 — 1주/1개월/3개월/1년 범위 목업 데이터 (`src/constants/sampleData.ts`) _(통합: `src/constants/index.ts`)_
- [ ] T009 날짜 유틸 함수 구현 — 기간 필터(1주/1개월/3개월/1년)에 따른 날짜 범위 계산 (`src/utils/dateUtils.ts`) _(관련 로직이 `useChartData.ts`에 통합됨)_
- [ ] T010 [P] 차트 데이터 변환 유틸 구현 — 필터 상태 기반 Chart.js 데이터셋 변환 순수 함수 (`src/utils/chartDataUtils.ts`) _(관련 로직이 `useChartData.ts`에 통합됨)_
- [ ] T011 [P] 테마 유틸 함수 구현 — OS 다크 모드 감지, localStorage 읽기/쓰기, Chart.js 테마 색상 반환 (`src/utils/themeUtils.ts`) _(관련 로직이 `ThemeContext.tsx`에 통합됨)_
- [x] T012 ThemeContext 구현 — 라이트/다크 모드 상태 및 toggle 함수 제공 (`src/context/ThemeContext.tsx`)
- [x] T013 IndicatorContext 구현 — 지표 활성/비활성 상태 및 toggle 함수 제공 (`src/context/IndicatorContext.tsx`) _(구현: `src/context/AdminContext.tsx`)_
- [x] T014 루트 레이아웃 구현 — ThemeProvider, IndicatorProvider 래핑, `suppressHydrationWarning` 적용 (`src/app/layout.tsx`)
- [ ] T015 [P] Header 컴포넌트 구현 — 대시보드 헤더 기본 구조, 테마 토글 슬롯 포함 (`src/components/layout/Header.tsx`) _(AdminHeader가 `src/components/ui/AdminHeader.tsx`로 구현됨)_
- [ ] T016 [P] DashboardLayout 컴포넌트 구현 — 반응형 그리드 기반 메인 레이아웃 래퍼 (`src/components/layout/DashboardLayout.tsx`) _(레이아웃이 `page.tsx`에 인라인으로 구현됨)_

---

## Phase 3: 사용자 스토리 1 — 금융 대시보드 조회

_독립 테스트 기준: 대시보드 메인 화면(`/`)에서 KPI 카드 4개 이상과 라인/바/도넛 차트 3개가 샘플 데이터로 표시된다_

- [ ] T017 [US1] Badge 컴포넌트 구현 — 증감률 방향(상승/하락/중립) 아이콘 및 색상 포함 (`src/components/ui/Badge.tsx`) _(증감 표시 로직이 `IndicatorCard.tsx`에 인라인으로 구현됨)_
- [x] T018 [US1] KpiCard 컴포넌트 구현 — 지표명, 현재 값, Badge(증감률) 표시, 라이트/다크 스타일 포함 (`src/components/ui/KpiCard.tsx`) _(구현: `src/components/ui/IndicatorCard.tsx`)_
- [ ] T019 [US1] EmptyState 컴포넌트 구현 — "선택한 기간의 데이터가 없습니다" 안내 메시지 표시 (`src/components/ui/EmptyState.tsx`) _(미구현)_
- [x] T020 [P] [US1] LineChart 컴포넌트 구현 — Chart.js 라인/영역 차트, `responsive: true`, `maintainAspectRatio: false` 적용 (`src/components/charts/LineChart.tsx`) _(통합: `src/components/charts/BaseChart.tsx`)_
- [x] T021 [P] [US1] BarChart 컴포넌트 구현 — Chart.js 바 차트, 반응형 컨테이너 height 명시 (`src/components/charts/BarChart.tsx`) _(통합: `src/components/charts/BaseChart.tsx`)_
- [x] T022 [P] [US1] DonutChart 컴포넌트 구현 — Chart.js 도넛 차트, 범례 표시 포함 (`src/components/charts/DonutChart.tsx`) _(통합: `src/components/charts/BaseChart.tsx`)_
- [x] T023 [US1] 대시보드 메인 페이지 구현 — KPI 카드 4개 + 차트 3개 배치, DashboardLayout 사용 (`src/app/page.tsx`)

---

## Phase 4: 사용자 스토리 2 — 차트 필터 조작

_독립 테스트 기준: 각 차트의 기간/지표/유형 필터가 독립적으로 동작하며, 필터 변경 시 해당 차트만 즉시 업데이트된다_

- [x] T024 [US2] useChartFilter 훅 구현 — chartId 기반 독립 FilterState 관리, 기간/지표/유형 변경 핸들러 포함 (`src/hooks/useChartFilter.ts`) _(구현: `src/hooks/useFilter.ts` + `src/context/FilterContext.tsx`)_
- [x] T025 [US2] useChartData 훅 구현 — FilterState + sampleData 기반으로 Chart.js 데이터셋 반환 (`src/hooks/useChartData.ts`)
- [x] T026 [P] [US2] PeriodFilter 컴포넌트 구현 — 1주/1개월/3개월/1년 탭 형태, 모바일 수평 스크롤 지원 (`src/components/filters/PeriodFilter.tsx`) _(통합: `src/components/ui/FilterBar.tsx`)_
- [x] T027 [P] [US2] IndicatorFilter 컴포넌트 구현 — 지표 선택 드롭다운 또는 탭, 최소 2개 지표 전환 (`src/components/filters/IndicatorFilter.tsx`) _(통합: `src/components/ui/FilterBar.tsx`)_
- [x] T028 [P] [US2] ChartTypeFilter 컴포넌트 구현 — 차트 유형 전환 버튼(라인/바/영역), 최소 2개 유형 (`src/components/filters/ChartTypeFilter.tsx`) _(통합: `src/components/ui/FilterBar.tsx`)_
- [x] T029 [US2] ChartWrapper 컴포넌트 구현 — 차트 + 필터 3종(기간/지표/유형) 통합 래퍼, chartId 기반 독립 상태 (`src/components/charts/ChartWrapper.tsx`) _(구현: `src/components/charts/FinancialChart.tsx`)_
- [x] T030 [US2] 대시보드 메인 페이지 차트를 ChartWrapper로 교체 — 기존 차트 컴포넌트를 ChartWrapper로 감싸 필터 연동 (`src/app/page.tsx`)

---

## Phase 5: 사용자 스토리 3 — 라이트/다크 모드 전환

_독립 테스트 기준: 헤더 토글 클릭 시 전체 UI가 즉시 테마 전환되고, 페이지 새로고침 후에도 선택한 테마가 유지된다_

- [ ] T031 [US3] useTheme 훅 구현 — ThemeContext 소비, theme 상태 및 toggleTheme 반환 (`src/hooks/useTheme.ts`) _(ThemeContext를 직접 useContext로 소비하는 방식으로 통합됨)_
- [x] T032 [US3] ThemeToggle 컴포넌트 구현 — 라이트/다크 전환 버튼, 아이콘(태양/달) 포함, 키보드 접근 가능 (`src/components/ui/ThemeToggle.tsx`)
- [x] T033 [US3] Header 컴포넌트에 ThemeToggle 통합 — ThemeToggle 배치, 라이트/다크 헤더 스타일 적용 (`src/components/layout/Header.tsx`) _(구현: `src/components/ui/AdminHeader.tsx`)_
- [x] T034 [US3] 전체 UI 컴포넌트에 Tailwind `dark:` 클래스 적용 — KpiCard, Badge, ChartWrapper, DataTable, EmptyState, 필터 컴포넌트 등 (`src/components/`)
- [x] T035 [US3] Chart.js 다크 모드 색상 동적 업데이트 연동 — 테마 변경 시 Chart.js 색상 팔레트 재적용 (`src/utils/chartDataUtils.ts`, `src/utils/themeUtils.ts`) _(구현: `src/components/charts/BaseChart.tsx` + `src/hooks/useChartData.ts`)_

---

## Phase 6: 사용자 스토리 4 — 관리자 페이지 접근 및 관리

_독립 테스트 기준: `/admin` 페이지에서 지표 목록/차트 구성/샘플 데이터 상태가 표시되고, 지표 토글이 대시보드에 즉시 반영된다_

- [x] T036 [US4] DataTable 컴포넌트 구현 — 공용 테이블 컴포넌트, columns/rows props, 라이트/다크 스타일 (`src/components/ui/DataTable.tsx`)
- [x] T037 [US4] useIndicators 훅 구현 — IndicatorContext 소비, 지표 목록 및 toggleIndicator 반환 (`src/hooks/useIndicators.ts`)
- [x] T038 [US4] AdminHeader 컴포넌트 구현 — 관리자 전용 헤더, 대시보드로 돌아가기 링크 포함 (`src/components/layout/AdminHeader.tsx`) _(구현: `src/components/ui/AdminHeader.tsx`)_
- [ ] T039 [US4] 관리자 페이지 구현 — 지표 목록(활성/비활성 토글), 차트 구성 정보, 샘플 데이터 상태(항목 수/날짜 범위) 표시 (`src/app/admin/page.tsx`)

---

## Phase 7: 완성도 및 횡단 관심사

_목적: 반응형, 접근성, 타입 안전성, 문서화 최종 검증_

- [x] T040 반응형 UI 검증 — 모바일(375px)/태블릿(768px)/데스크탑(1280px) 레이아웃 및 모바일 필터 `overflow-x: auto` 스크롤 처리 (모든 컴포넌트)
- [x] T041 라이트/다크 모드 전환 일관성 검증 — 모든 UI 요소(카드, 차트, 표, 버튼, 배지) 색상 전환 및 WCAG AA 명암비 4.5:1 충족 확인
- [x] T042 TypeScript 타입 에러 검증 (`tsc --noEmit` 실행, any 사용 금지 확인)
- [x] T043 문서 및 JSDoc 한국어 작성 검증 — 컴포넌트 Props 설명, 훅 반환값, 유틸 함수 JSDoc 한국어 작성 확인

---

## 의존성 그래프

```
Phase 1 (프로젝트 설정)
    ↓
Phase 2 (기반 — 타입, 상수, 컨텍스트, 유틸, 레이아웃)
    ↓
Phase 3 (US1 — 대시보드 조회)
    ↓
Phase 4 (US2 — 차트 필터) ──→ Phase 5 (US3 — 테마 전환)
    ↓
Phase 6 (US4 — 관리자 페이지)
    ↓
Phase 7 (완성도 및 횡단 관심사)
```

**스토리 간 독립성 참고**:
- Phase 3 완료 후 Phase 4, 5는 병렬 진행 가능 (서로 다른 파일 대상)
- Phase 6은 Phase 2의 IndicatorContext 완료 이후 독립 진행 가능

---

## 병렬 실행 예시

| 그룹 | 병렬 실행 가능 태스크 | 조건 |
|------|----------------------|------|
| 기반 상수 | T006, T007 | 타입(T005) 완료 후 |
| 기반 유틸 | T009, T010, T011 | 타입(T005) 완료 후 |
| 기반 레이아웃 | T015, T016 | 컨텍스트(T012, T013) 완료 후 |
| US1 차트 | T020, T021, T022 | T019 완료 후 |
| US2 필터 | T026, T027, T028 | T024 완료 후 |
| US3 테마 전체 UI | T034, T035 | T032 완료 후 |

---

## 구현 전략

1. **MVP 우선**: Phase 1~3 완료 시 KPI 카드 4개 + 차트 3개가 표시되는 최소 동작 버전 제공
2. **점진적 납품**: 각 Phase 완료 시 독립 테스트 기준으로 동작 검증 가능
3. **병렬 실행**: `[P]` 마커 표시 작업은 별도 파일 대상이므로 병렬 실행 가능
4. **MVP 범위**: Phase 1~5 (US1~US3) — 핵심 대시보드 조회, 필터, 테마 전환
5. **확장 범위**: Phase 6 (US4) — 관리자 페이지 (P2 우선순위, MVP 이후 진행 권장)