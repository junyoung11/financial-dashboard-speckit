'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { IndicatorGrid } from '@/components/ui/IndicatorGrid';
import { FinancialChart } from '@/components/charts/FinancialChart';
import { DataTable } from '@/components/ui/DataTable';
import { AdminHeader } from '@/components/ui/AdminHeader';
import { CHART_CONFIGS } from '@/constants';

/** 현재 날짜를 한국어 형식으로 반환 (예: 2026년 4월 30일 목요일) */
function useCurrentDate() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      setDateStr(
        now.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'short',
        }),
      );
    }
    update();
    // 자정이 지나면 날짜 갱신 (1분 간격 체크)
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return dateStr;
}

/**
 * 금융 분석 대시보드 메인 페이지
 *
 * 레이아웃 구조:
 * - 상단: 헤더 (제목 + 실시간 날짜 + 테마 토글 + 관리자 링크)
 * - 지표 요약 카드 그리드
 * - 차트 섹션 (2열 그리드, 각 차트 독립 필터)
 * - 데이터 테이블 (첫 번째 차트 기준)
 */
export default function DashboardPage() {
  const [primaryChartId] = CHART_CONFIGS.map((c) => c.id);
  const currentDate = useCurrentDate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              금융 데이터 분석 플랫폼
            </h1>
            {currentDate && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{currentDate}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
            >
              👥 관리자
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="mx-auto max-w-screen-xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* 지표 표시 설정 */}
        <section>
          <AdminHeader />
        </section>

        {/* 지표 요약 카드 */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            주요 지표 현황
          </h2>
          <IndicatorGrid />
        </section>

        {/* 차트 섹션 */}
        <section className="mt-8">
          {/* 섹션 제목 (카드 밖) */}
          <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
            차트 분석
          </h2>

          {/* 카드 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {CHART_CONFIGS.map((config) => (
                <FinancialChart key={config.id} chartId={config.id} />
              ))}
            </div>

          </div>
        </section>

        {/* 데이터 테이블 */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            상세 데이터
          </h2>
          <DataTable chartId={primaryChartId} />
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-8 border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          © 2026 금융 분석 대시보드 — 금융 데이터 분석 플랫폼(데모용)
        </p>
      </footer>
    </div>
  );
}