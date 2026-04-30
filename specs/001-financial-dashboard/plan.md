# 금융 분석 대시보드 데모 구현 계획

**작성일**: 2026-04-29  
**기능 디렉터리**: specs/001-financial-dashboard  
**브랜치**: master

---

## 기술 컨텍스트

### 스택

- **프레임워크**: Next.js 14+ (App Router, 기존 구조 유지)
- **언어**: TypeScript (strict 모드)
- **UI**: React 18+
- **스타일링**: Tailwind CSS (dark class 전략, `class` 기반)
- **차트**: Chart.js + react-chartjs-2
- **상태 관리**: React Context API + 커스텀 훅

### 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx                  # 대시보드 메인 페이지 (/)
│   ├── layout.tsx                # 루트 레이아웃 (ThemeProvider 포함)
│   └── admin/
│       └── page.tsx              # 관리자 페이지 (/admin)
├── components/
│   ├── charts/
│   │   ├── LineChart.tsx         # 라인/영역 차트 컴포넌트
│   │   ├── BarChart.tsx          # 바 차트 컴포넌트
│   │   ├── DonutChart.tsx        # 도넛 차트 컴포넌트
│   │   └── ChartWrapper.tsx      # 차트 + 필터 통합 래퍼
│   ├── filters/
│   │   ├── PeriodFilter.tsx      # 기간 필터 (1주/1개월/3개월/1년)
│   │   ├── IndicatorFilter.tsx   # 지표 필터
│   │   └── ChartTypeFilter.tsx   # 차트 유형 필터
│   ├── layout/
│   │   ├── Header.tsx            # 전체 헤더 (테마 토글 포함)
│   │   ├── AdminHeader.tsx       # 관리자 전용 헤더
│   │   └── DashboardLayout.tsx   # 대시보드 레이아웃
│   └── ui/
│       ├── KpiCard.tsx           # KPI 지표 카드
│       ├── ThemeToggle.tsx       # 라이트/다크 전환 버튼
│       ├── Badge.tsx             # 상태 배지 (증감률 등)
│       ├── DataTable.tsx         # 공용 데이터 테이블
│       └── EmptyState.tsx        # 데이터 없음 안내 컴포넌트
├── hooks/
│   ├── useTheme.ts               # 테마 상태 관리 훅
│   ├── useChartFilter.ts         # 차트 필터 상태 훅
│   ├── useIndicators.ts          # 지표 목록 상태 훅 (활성/비활성 포함)
│   └── useChartData.ts           # 필터 기반 차트 데이터 변환 훅
├── context/
│   ├── ThemeContext.tsx           # 테마 Context
│   └── IndicatorContext.tsx       # 지표 활성 상태 Context
├── utils/
│   ├── chartDataUtils.ts         # 차트 데이터 변환 순수 함수
│   ├── dateUtils.ts              # 기간 필터 날짜 계산 유틸
│   └── themeUtils.ts             # 테마 관련 유틸 (OS 감지 등)
├── types/
│   └── index.ts                  # 전역 TypeScript 타입 정의
└── constants/
    ├── chartConfig.ts            # 차트 구성 상수
    ├── indicators.ts             # 지표 목록 상수
    └── sampleData.ts             # 샘플(목업) 금융 데이터
```

---

## 헌법 검토 (Constitution Check)

### 필수 검토 항목

- [x] 컴포넌트 분리 원칙 준수 (원칙 3) — 페이지/레이아웃/공용UI/도메인 디렉터리 명확히 분리
- [x] 반응형 UI 구현 계획 포함 (원칙 4) — Tailwind 반응형 접두사 + 반응형 그리드 적용 계획
- [x] 라이트/다크 모드 처리 계획 포함 (원칙 5) — ThemeContext + Tailwind dark: 접두사 + localStorage 저장
- [x] 차트 필터 확장 구조 적용 (원칙 6) — Context 중앙 관리 + 순수 함수 데이터 변환
- [x] 문서 한국어 작성 확인 (문서화 정책) — 모든 문서 및 JSDoc 한국어 작성
- [x] TypeScript strict 모드 및 any 사용 금지 (코드 품질 기준) — strict: true 설정 확인

### 위반 사항

없음

---

## Phase 0: 리서치

**산출물**: research.md

### 해결해야 할 불명확 사항

1. **Chart.js + Tailwind 다크 모드 연동 방식**: Chart.js 옵션에서 동적으로 색상 변경하는 패턴 확인
2. **Next.js App Router에서 ThemeProvider 설정**: `layout.tsx`에서 `suppressHydrationWarning` 처리 방식
3. **react-chartjs-2 버전별 API 차이**: 등록 방식(ChartJS.register) 및 ref 활용 패턴 확인
4. **Tailwind CSS dark 모드 class 전략 설정**: `tailwind.config.ts`의 `darkMode: 'class'` 확인 및 적용
5. **Chart.js responsive 옵션과 컨테이너 크기 연동**: `maintainAspectRatio: false` 사용 패턴 확인

---

## Phase 1: 설계 및 계약

**산출물**: data-model.md, contracts/, quickstart.md

### 데이터 모델

→ 상세 내용: `specs/001-financial-dashboard/data-model.md` 참조

주요 엔터티:
- **Indicator** (지표): id, name, value, change, changePercent, unit, isActive
- **ChartConfig** (차트 구성): id, title, type, availableTypes, indicatorIds, availablePeriods, defaultPeriod
- **SampleDataSet** (샘플 데이터): id, indicatorId, period, data: [{date, value}]
- **FilterState** (필터 상태): chartId, selectedPeriod, selectedIndicator, selectedType
- **ThemeState** (테마 상태): mode: 'light' | 'dark'

### 인터페이스 계약

→ 상세 내용: `specs/001-financial-dashboard/contracts/` 참조

주요 컴포넌트 인터페이스:
- `KpiCardProps`: indicator, showChange, className
- `ChartWrapperProps`: chartId, chartConfig, onFilterChange
- `FilterProps`: options, selected, onChange
- `ThemeToggleProps`: 없음 (Context에서 직접 소비)
- `DataTableProps`: columns, rows, className
- `AdminIndicatorTableProps`: indicators, onToggle

---

## 의존성 및 제약사항

- **기존 프로젝트 구조 유지**: 기존 Next.js 프로젝트의 파일을 불필요하게 덮어쓰지 않는다
- **chart.js / react-chartjs-2**: 기존 설치 버전 확인 후 활용 (신규 설치 최소화)
- **Tailwind CSS**: 기존 `tailwind.config.ts`에 `darkMode: 'class'` 설정 추가 필요
- **샘플 데이터**: 외부 API 없이 `constants/sampleData.ts`에 하드코딩된 목업 데이터 사용
- **인증 없음**: 관리자 페이지는 별도 인증 없이 `/admin` 경로로 직접 접근
- **세션 범위 상태**: 관리자의 지표 토글 상태는 localStorage 또는 Context 세션 내에서만 유지

---

## 위험 요소

| 위험 | 영향도 | 완화 전략 |
|-----|-------|---------|
| Chart.js 다크 모드 전환 시 색상 미반영 | 높음 | ThemeContext 변경 감지 → Chart.js 옵션 동적 업데이트 + `chart.update()` 호출 |
| SSR과 localStorage 불일치 (hydration 오류) | 높음 | `suppressHydrationWarning` 적용, 클라이언트 전용 테마 초기화 |
| 차트 필터 독립성 미보장 (상태 공유 오염) | 중간 | chartId 기반 독립 FilterState 슬라이스, Context에서 chartId로 구분 관리 |
| 반응형 차트 레이아웃 깨짐 | 중간 | `responsive: true` + `maintainAspectRatio: false` + 컨테이너 height 명시 |
| 모바일에서 필터 UI 오버플로우 | 낮음 | 스크롤 가능한 수평 탭 형태 적용 (`overflow-x: auto`) |