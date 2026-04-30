'use client';
import { useMemo } from 'react';
import { useFilter } from '@/hooks/useFilter';
import type { DataRow } from '@/types';

interface DataTableProps {
  /** 데이터를 가져올 차트 ID (FilterContext 키) */
  chartId: string;
}

/**
 * DataPoint 배열을 DataRow 배열로 변환 (전일 대비 변화량/등락률 계산)
 */
function toDataRows(data: { date: string; value: number }[]): DataRow[] {
  return data.map((point, idx) => {
    const prev = idx > 0 ? data[idx - 1].value : point.value;
    const change = point.value - prev;
    const changePercent = prev !== 0 ? (change / prev) * 100 : 0;
    return { date: point.date, value: point.value, change, changePercent };
  });
}

/** 금융 데이터 테이블 컴포넌트 */
export function DataTable({ chartId }: DataTableProps) {
  const { data, config } = useFilter(chartId);

  const rows: DataRow[] = useMemo(() => toDataRows(data), [data]);

  if (rows.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">
        데이터가 없습니다.
      </p>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      {/* 테이블 헤더 */}
      <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {config.title} - 상세 데이터
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-600 dark:text-slate-300">
                날짜
              </th>
              <th className="px-4 py-2 text-right font-semibold text-slate-600 dark:text-slate-300">
                값
              </th>
              <th className="px-4 py-2 text-right font-semibold text-slate-600 dark:text-slate-300">
                전일 대비
              </th>
              <th className="px-4 py-2 text-right font-semibold text-slate-600 dark:text-slate-300">
                등락률
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {rows.map((row, idx) => {
              const isPositive = row.change > 0;
              const isNegative = row.change < 0;
              const trendClass = isPositive
                ? 'text-red-500 dark:text-red-400'
                : isNegative
                  ? 'text-blue-500 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400';

              return (
                <tr
                  key={idx}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                >
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-300">{row.date}</td>
                  <td className="px-4 py-2 text-right font-medium text-slate-800 dark:text-slate-100">
                    {row.value.toLocaleString()}
                  </td>
                  <td className={`px-4 py-2 text-right font-medium ${trendClass}`}>
                    {isPositive ? '+' : ''}
                    {row.change.toLocaleString()}
                  </td>
                  <td className={`px-4 py-2 text-right font-medium ${trendClass}`}>
                    {isPositive ? '+' : ''}
                    {row.changePercent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}