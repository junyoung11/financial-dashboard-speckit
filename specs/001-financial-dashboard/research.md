# 금융 분석 대시보드 — 리서치 결과

**작성일**: 2026-04-29

---

## 1. Chart.js + Tailwind 다크 모드 연동 방식

**결정**: ThemeContext에서 `isDark` 값을 읽어 Chart.js 옵션 객체를 동적 생성하고, `chart.update()` 또는 컴포넌트 리렌더링으로 반영한다.

**근거**:
- Chart.js는 CSS 변수나 Tailwind `dark:` 클래스를 자동 인식하지 못한다.
- React 상태로 테마를 관리하고, `useEffect`에서 `isDark` 의존성을 감지해 차트 옵션을 재생성하는 방식이 표준 패턴이다.

**구체적 구현 패턴**:
```ts
// 차트 옵션을 테마에 따라 동적으로 생성하는 순수 함수
function buildChartOptions(isDark: boolean): ChartOptions {
  return {
    plugins: {
      legend: {
        labels: { color: isDark ? '#e5e7eb' : '#111827' }
      }
    },
    scales: {
      x: { ticks: { color: isDark ? '#9ca3af' : '#374151' } },
      y: { ticks: { color: isDark ? '#9ca3af' : '#374151' } }
    }
  };
}
```

**대안 검토**: CSS 변수 기반 Chart.js 플러그인 → 설정 복잡도가 높고 SSR 환경에서 불안정하므로 기각.

---

## 2. Next.js App Router에서 ThemeProvider 설정

**결정**: `layout.tsx`에 `<html lang="ko" suppressHydrationWarning>` 적용, 클라이언트 전용 `ThemeProvider`(`'use client'`)를 자식으로 감싸는 구조를 사용한다.

**근거**:
- App Router의 RSC 환경에서 `document`/`localStorage` 접근은 클라이언트 전용 코드에서만 안전하다.
- `suppressHydrationWarning`은 서버 렌더링 시 `class="dark"` 여부를 알 수 없어 발생하는 hydration 불일치를 억제한다.

**구체적 구현 패턴**:
```tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```
```tsx
// context/ThemeContext.tsx  ('use client')
useEffect(() => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved === 'dark' || (!saved && prefersDark);
  document.documentElement.classList.toggle('dark', initial);
  setIsDark(initial);
}, []);
```

**대안 검토**: `next-themes` 라이브러리 → 기존 프로젝트 의존성 최소화 원칙에 따라 직접 구현 채택.

---

## 3. react-chartjs-2 등록 및 ref 패턴

**결정**: 각 차트 컴포넌트 파일 상단에서 필요한 Chart.js 구성 요소만 선택적으로 `ChartJS.register()`로 등록한다.

**근거**:
- react-chartjs-2 v5+ (Chart.js v4 기반)는 tree-shaking을 위해 수동 등록이 권장된다.
- 전역 등록은 번들 크기를 늘리므로 컴포넌트별 등록이 최적 패턴이다.

**구체적 구현 패턴**:
```ts
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
```

**대안 검토**: `import 'chart.js/auto'` → 전체 번들 포함으로 기각.

---

## 4. Tailwind CSS dark 모드 class 전략 설정

**결정**: `tailwind.config.ts`에 `darkMode: 'class'`를 설정하고, `document.documentElement`에 `dark` 클래스를 수동으로 토글하는 방식을 사용한다.

**근거**:
- `'media'` 전략은 시스템 설정에만 반응하므로 수동 토글 불가.
- `'class'` 전략은 `localStorage` 기반 수동 전환 + OS 자동 감지 모두 지원 가능하다.

**설정**:
```ts
// tailwind.config.ts
export default {
  darkMode: 'class',
  // ...
}
```

---

## 5. Chart.js responsive 옵션과 컨테이너 크기 연동

**결정**: 모든 차트 컴포넌트에서 `responsive: true`, `maintainAspectRatio: false`를 적용하고, 래퍼 컨테이너에 명시적 높이(`h-64`, `h-80` 등 Tailwind 클래스)를 지정한다.

**근거**:
- `maintainAspectRatio: true`(기본값) 상태에서 반응형 높이 제어가 불가능하다.
- 컨테이너에 height를 명시하고 `position: relative`를 설정하면 Chart.js가 부모 컨테이너에 맞게 자동 크기 조정된다.

**구체적 구현 패턴**:
```tsx
// ChartWrapper.tsx 내 컨테이너
<div className="relative h-64 w-full">
  <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
</div>
```

---

## 요약

| 항목 | 결정 | 비고 |
|------|------|------|
| Chart.js 다크 모드 | 순수 함수로 옵션 동적 생성 | `isDark` 의존성 useEffect |
| ThemeProvider | 클라이언트 전용 Context + suppressHydrationWarning | next-themes 미사용 |
| Chart.js 등록 | 컴포넌트별 선택적 수동 등록 | tree-shaking 최적화 |
| Tailwind dark 전략 | `darkMode: 'class'` | localStorage + OS 감지 모두 지원 |
| 차트 반응형 | `responsive: true` + `maintainAspectRatio: false` + 컨테이너 height 명시 | Tailwind 높이 유틸리티 활용 |