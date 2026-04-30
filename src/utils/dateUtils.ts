import type { Period } from '@/types';

/**
 * 기간 코드로부터 시작일 계산
 */
export function getStartDateByPeriod(period: Period, endDate = new Date()): Date {
  const date = new Date(endDate);
  switch (period) {
    case '1w':
      date.setDate(date.getDate() - 7);
      break;
    case '1m':
      date.setMonth(date.getMonth() - 1);
      break;
    case '3m':
      date.setMonth(date.getMonth() - 3);
      break;
    case '1y':
      date.setFullYear(date.getFullYear() - 1);
      break;
  }
  return date;
}

/**
 * Date → 'YYYY-MM-DD' 포맷 문자열 변환
 */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 기간 내 날짜 배열 생성 (일 단위)
 */
export function getDateRange(period: Period, endDate = new Date()): string[] {
  const start = getStartDateByPeriod(period, endDate);
  const dates: string[] = [];
  const cursor = new Date(start);
  while (cursor <= endDate) {
    dates.push(formatDate(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}