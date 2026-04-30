import { useMemo } from 'react';
import { INDICATORS } from '@/constants';
import { useAdmin } from '@/context/AdminContext';
import type { Indicator } from '@/types';

/** 관리자 활성화 상태를 반영한 지표 목록을 반환하는 훅 */
export function useIndicators(): { active: Indicator[]; all: Indicator[] } {
  const { activeMap } = useAdmin();

  return useMemo(() => {
    const all = INDICATORS.map((ind) => ({ ...ind, isActive: activeMap[ind.id] ?? ind.isActive }));
    const active = all.filter((ind) => ind.isActive);
    return { active, all };
  }, [activeMap]);
}