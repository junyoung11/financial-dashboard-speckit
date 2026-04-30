/**
 * OS 다크 모드 감지
 */
export function getSystemDark(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * localStorage에서 테마 로드 (없으면 OS 기본값)
 */
export function loadTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return getSystemDark();
}

/**
 * localStorage에 테마 저장
 */
export function saveTheme(isDark: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/**
 * Chart.js 다크/라이트 공통 색상 팔레트
 */
export function getChartColors(isDark: boolean) {
  return {
    gridColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
    tickColor: isDark ? '#A0AEC0' : '#718096',
    tooltipBg: isDark ? '#2D3748' : '#FFFFFF',
    tooltipText: isDark ? '#E2E8F0' : '#1A202C',
    borderColor: isDark ? 'rgba(99,179,237,1)' : 'rgba(49,130,206,1)',
    fillColor: isDark ? 'rgba(99,179,237,0.2)' : 'rgba(49,130,206,0.15)',
  };
}