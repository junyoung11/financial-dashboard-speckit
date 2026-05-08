# [FEATURE_NAME] 구현 계획

**작성일**: [DATE]  
**기능 디렉터리**: [FEATURE_DIR]  
**브랜치**: [BRANCH]

---

## 기술 컨텍스트

### 스택

- **프레임워크**: Next.js (기존 구조 유지)
- **언어**: TypeScript
- **UI**: React
- **스타일링**: Tailwind CSS
- **차트**: Chart.js

### 프로젝트 구조

```
financial-dashboard/
├── app/              # Next.js App Router 페이지 및 레이아웃
├── components/
│   ├── charts/       # 차트 컴포넌트
│   ├── filters/      # 필터 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── ui/           # 공용 UI 컴포넌트
├── lib/              # 유틸리티 함수, 데이터, Context (hooks/utils/context 포함)
└── public/           # 정적 자산
```

> **주의**: `src/` 서브디렉터리를 사용하지 않는다. 모든 소스 파일은 루트 레벨 디렉터리에 위치한다.

---

## 헌법 검토 (Constitution Check)

### 필수 검토 항목

- [ ] 컴포넌트 분리 원칙 준수 (원칙 3)
- [ ] 반응형 UI 구현 계획 포함 (원칙 4)
- [ ] 라이트/다크 모드 처리 계획 포함 (원칙 5)
- [ ] 차트 필터 확장 구조 적용 (원칙 6)
- [ ] 문서 한국어 작성 확인 (문서화 정책)
- [ ] TypeScript strict 모드 및 any 사용 금지 (코드 품질 기준)

### 위반 사항

없음 (위반 발견 시 ERROR로 표시)

---

## Phase 0: 리서치

**산출물**: research.md

### 해결해야 할 불명확 사항

- [NEEDS_CLARIFICATION_1]

---

## Phase 1: 설계 및 계약

**산출물**: data-model.md, contracts/, quickstart.md

### 데이터 모델

[DATA_MODEL_REFERENCE]

### 인터페이스 계약

[CONTRACTS_REFERENCE]

---

## 의존성 및 제약사항

- [DEPENDENCY_1]

---

## 위험 요소

| 위험 | 영향도 | 완화 전략 |
|-----|-------|---------|
| [RISK] | 중 | [MITIGATION] |