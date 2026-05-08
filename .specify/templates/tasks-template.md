# [FEATURE_NAME] 작업 목록

**작성일**: [DATE]  
**기능 디렉터리**: [FEATURE_DIR]  
**총 작업 수**: [TOTAL_TASKS]

---

## Phase 1: 프로젝트 설정

_목적: 프로젝트 초기 구조 및 의존성 설정_

- [ ] T001 프로젝트 디렉터리 구조 생성 (컴포넌트, 훅, 유틸, 타입, 상수)
- [ ] T002 TypeScript 설정 확인 및 strict 모드 활성화 (`tsconfig.json`)
- [ ] T003 Tailwind CSS 다크 모드 설정 (`tailwind.config.ts`)
- [ ] T004 Chart.js 및 react-chartjs-2 의존성 확인 (`package.json`)

---

## Phase 2: 기반 작업 (블로킹 선행 조건)

_목적: 모든 사용자 스토리에서 공통으로 사용되는 기반 컴포넌트 및 타입_

- [ ] T005 공용 TypeScript 타입 정의 (`src/types/index.ts`)
- [ ] T006 공용 상수 정의 (`src/constants/index.ts`)
- [ ] T007 [P] 테마(라이트/다크) 컨텍스트 및 훅 구현 (`src/hooks/useTheme.ts`)
- [ ] T008 [P] 기본 레이아웃 컴포넌트 구현 (`src/components/layout/`)

---

## Phase 3: 사용자 스토리 1 — [USER_STORY_1_TITLE]

_독립 테스트 기준: [INDEPENDENT_TEST_CRITERIA_1]_

- [ ] T009 [US1] [TASK_DESCRIPTION] (`[FILE_PATH]`)

---

## 최종 Phase: 완성도 및 횡단 관심사

- [ ] T[N] 반응형 UI 검증 (모바일/태블릿/데스크탑)
- [ ] T[N+1] 라이트/다크 모드 전환 검증
- [ ] T[N+2] TypeScript 타입 에러 검증 (`tsc --noEmit`)
- [ ] T[N+3] 문서 한국어 작성 검증

---

## 의존성 그래프

```
Phase 1 (설정)
    ↓
Phase 2 (기반)
    ↓
Phase 3 (US1) ──→ Phase 4 (US2) ──→ ...
    ↓
최종 Phase (완성도)
```

---

## 구현 전략

1. **MVP 우선**: Phase 1~3 완료 시 최소 동작 버전 제공
2. **점진적 납품**: 각 사용자 스토리 Phase 완료 시 독립적으로 테스트 가능
3. **병렬 실행**: [P] 마커 표시 작업은 별도 파일 대상이므로 병렬 실행 가능