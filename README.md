# 📊 금융 분석 대시보드

> Next.js 14 + TypeScript + Tailwind CSS + Chart.js 기반의 금융 데이터 분석 데모 대시보드

---

## 개요

실시간 금융 지표 모니터링과 차트 분석을 위한 데모 대시보드 애플리케이션입니다.  
라이트/다크 모드, 반응형 UI, 다중 차트 필터링, 사용자 관리 화면을 포함합니다.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | [Next.js 14](https://nextjs.org/) (App Router) |
| 언어 | [TypeScript 5](https://www.typescriptlang.org/) |
| 스타일 | [Tailwind CSS 3](https://tailwindcss.com/) |
| 차트 | [Chart.js 4](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) |
| 상태 관리 | React Context API |
| 런타임 | Node.js 20+ |

---

## 주요 기능

### 메인 대시보드 (`/`)
- **주요 지표 현황** — 수익률, 변동성, 샤프 지수, 최대 낙폭 등 재무 지표 카드
- **지표 표시 설정** — 지표 카드 개별 토글로 화면 구성 커스터마이징
- **차트 분석** — 포트폴리오 수익률, 자산 배분, 섹터 성과, 리스크 매트릭스 등 6종 차트
- **차트별 독립 필터** — 각 차트마다 기간(1M/3M/6M/1Y) 및 자산 필터 적용
- **상세 데이터 테이블** — 차트 데이터의 표 형식 상세 보기
- **라이트/다크 모드** — 헤더 토글로 즉시 전환

### 관리자 페이지 (`/admin`)
- **사용자 통계 카드** — 전체 / 활성 / 승인 대기 / 이번 달 신규 사용자 수
- **사용자 검색 및 필터** — 이름·이메일·부서 텍스트 검색, 역할·상태 드롭다운 필터
- **사용자 관리 테이블** — 역할 뱃지, 접근 레벨 바, 상태 뱃지, 마지막 로그인 시각 표시
- **역할별 분포 시각화** — 관리자/애널리스트/뷰어 비율 프로그레스 바

---

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (ThemeProvider, 폰트)
│   ├── globals.css         # 전역 스타일 (CSS 변수, 다크 모드)
│   ├── page.tsx            # 메인 대시보드 페이지
│   └── admin/
│       └── page.tsx        # 사용자 관리 페이지
├── components/
│   ├── charts/
│   │   ├── BaseChart.tsx       # Chart.js 기반 차트 공통 래퍼
│   │   └── FinancialChart.tsx  # 금융 차트 컴포넌트 (필터 포함)
│   ├── layout/
│   │   ├── Header.tsx          # 공통 헤더 (날짜, 테마 토글, 네비게이션)
│   │   └── DashboardLayout.tsx # 대시보드 레이아웃 래퍼
│   └── ui/
│       ├── AdminHeader.tsx     # 지표 표시 설정 패널
│       ├── Badge.tsx           # 상태/역할 뱃지
│       ├── Card.tsx            # 기본 카드 컴포넌트
│       ├── DataTable.tsx       # 데이터 테이블
│       ├── EmptyState.tsx      # 빈 상태 플레이스홀더
│       ├── FilterBar.tsx       # 전역 필터 바
│       ├── IndicatorCard.tsx   # 지표 카드 (값, 변화율)
│       ├── IndicatorGrid.tsx   # 지표 카드 그리드
│       └── ThemeToggle.tsx     # 라이트/다크 모드 토글
├── context/
│   ├── AdminContext.tsx    # 지표 표시 설정 상태
│   ├── FilterContext.tsx   # 전역 필터 상태
│   └── ThemeContext.tsx    # 테마(라이트/다크) 상태
├── hooks/
│   ├── useChartData.ts     # 차트 데이터 훅
│   ├── useFilter.ts        # 필터 상태 훅
│   ├── useIndicators.ts    # 지표 데이터 훅
│   └── useTheme.ts         # 테마 훅
├── types/
│   └── index.ts            # 공통 TypeScript 타입 정의
├── constants/
│   └── index.ts            # 앱 전역 상수
└── utils/
    ├── chartDataUtils.ts   # 차트 데이터 생성 유틸리티
    ├── dateUtils.ts        # 날짜 포맷 유틸리티
    └── themeUtils.ts       # 테마 유틸리티
```

---

## 시작하기

### 사전 요구사항

- Node.js 20 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 실행
npm start
```

### 타입 검사

```bash
npm run type-check
```

---

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 금융 분석 대시보드 |
| `/admin` | 사용자 관리 (관리자 전용, 데모 데이터) |

---

## 디자인 원칙

- **컴포넌트 분리** — 단일 책임 원칙에 따른 UI/로직 분리
- **재사용성** — 공통 컴포넌트(Card, Badge, EmptyState 등) 중앙화
- **반응형 UI** — 모바일 → 태블릿 → 데스크톱 브레이크포인트 대응
- **라이트/다크 모드** — Tailwind `dark:` 클래스 일관 적용
- **확장 가능한 필터** — 차트별 독립 필터로 추가 기간/자산 옵션 확장 용이
- **한국어 UI** — 모든 사용자 인터페이스 한국어 표기

---

## 참고

이 프로젝트는 데모 목적으로 제작되었습니다.  
모든 금융 데이터는 샘플 데이터이며 실제 금융 정보와 무관합니다.

---

© 2026 금융 분석 대시보드 — 데모 프로젝트