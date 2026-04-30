'use client';
import { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type ChartType as CJSChartType,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import type { ChartType, DataPoint } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  Legend,
);

interface BaseChartProps {
  /** 시계열 데이터 포인트 배열 */
  data: DataPoint[];
  /** 차트 유형 */
  type: ChartType;
  /** 데이터셋 라벨 */
  label: string;
  /** 현재 다크 모드 여부 */
  isDark: boolean;
  /** 차트 고유 색상 (hex 또는 rgb) */
  color?: string;
}

/** react-chartjs-2 ChartType으로 매핑 (area → line + fill) */
function toCJSType(type: ChartType): CJSChartType {
  return type === 'bar' ? 'bar' : 'line';
}

/** 다크/라이트 모드에 맞는 그리드 색상 */
function gridColor(isDark: boolean) {
  return isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
}

/** 다크/라이트 모드에 맞는 레이블 색상 */
function labelColor(isDark: boolean) {
  return isDark ? '#94a3b8' : '#64748b';
}

/** BaseChart: Chart.js 래퍼 컴포넌트 */
export function BaseChart({ data, type, label, isDark, color = '#3b82f6' }: BaseChartProps) {
  const chartRef = useRef<ChartJS | null>(null);

  /** 다크 모드 전환 시 차트 업데이트 */
  useEffect(() => {
    chartRef.current?.update();
  }, [isDark]);

  const labels = data.map((d) => d.date);
  const values = data.map((d) => d.value);
  const isArea = type === 'area';

  const chartData: ChartData = {
    labels,
    datasets: [
      {
        label,
        data: values,
        borderColor: color,
        backgroundColor: isArea ? `${color}33` : color,
        fill: isArea,
        tension: isArea || type === 'line' ? 0.3 : 0,
        pointRadius: data.length > 30 ? 0 : 3,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  // ChartOptions<'line'>로 타입 지정 — line/bar/area 모두 호환
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 400 },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#e2e8f0' : '#1e293b',
        bodyColor: isDark ? '#94a3b8' : '#64748b',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y?.toLocaleString() ?? ''}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: labelColor(isDark),
          maxRotation: 0,
          maxTicksLimit: 8,
          font: { size: 11 },
        },
        grid: { color: gridColor(isDark) },
      },
      y: {
        ticks: {
          color: labelColor(isDark),
          font: { size: 11 },
          callback: (val) => Number(val).toLocaleString(),
        },
        grid: { color: gridColor(isDark) },
      },
    },
  };

  return (
    <div className="relative h-56 w-full">
      <Chart
        ref={chartRef as React.RefObject<ChartJS>}
        type={toCJSType(type)}
        data={chartData}
        options={options as ChartOptions}
      />
    </div>
  );
}