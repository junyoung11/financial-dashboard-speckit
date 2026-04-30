'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/* ──────────────────────────────────────────
   타입 정의
────────────────────────────────────────── */
type UserRole = 'admin' | 'analyst' | 'viewer';
type UserStatus = 'active' | 'inactive' | 'pending';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
  joinedAt: string;
  department: string;
  accessLevel: number;
}

/* ──────────────────────────────────────────
   데모 사용자 데이터
────────────────────────────────────────── */
const DEMO_USERS: DemoUser[] = [
  {
    id: 'U001',
    name: '김지훈',
    email: 'jihun.kim@demo.corp',
    role: 'admin',
    status: 'active',
    lastLogin: '2026-04-30 09:12',
    joinedAt: '2024-01-08',
    department: '리스크 관리팀',
    accessLevel: 5,
  },
  {
    id: 'U002',
    name: '이서연',
    email: 'seoyeon.lee@demo.corp',
    role: 'analyst',
    status: 'active',
    lastLogin: '2026-04-30 08:45',
    joinedAt: '2024-03-15',
    department: '퀀트 전략팀',
    accessLevel: 4,
  },
  {
    id: 'U003',
    name: '박민준',
    email: 'minjun.park@demo.corp',
    role: 'analyst',
    status: 'active',
    lastLogin: '2026-04-29 17:30',
    joinedAt: '2024-05-20',
    department: '글로벌 투자팀',
    accessLevel: 4,
  },
  {
    id: 'U004',
    name: '최수아',
    email: 'sua.choi@demo.corp',
    role: 'viewer',
    status: 'active',
    lastLogin: '2026-04-30 07:58',
    joinedAt: '2024-07-11',
    department: '운용 지원팀',
    accessLevel: 2,
  },
  {
    id: 'U005',
    name: '정도윤',
    email: 'doyun.jung@demo.corp',
    role: 'analyst',
    status: 'inactive',
    lastLogin: '2026-03-12 14:22',
    joinedAt: '2024-02-28',
    department: '퀀트 전략팀',
    accessLevel: 4,
  },
  {
    id: 'U006',
    name: '한아름',
    email: 'areum.han@demo.corp',
    role: 'viewer',
    status: 'pending',
    lastLogin: '—',
    joinedAt: '2026-04-28',
    department: '리서치팀',
    accessLevel: 1,
  },
  {
    id: 'U007',
    name: '윤재원',
    email: 'jaewon.yoon@demo.corp',
    role: 'analyst',
    status: 'active',
    lastLogin: '2026-04-30 09:44',
    joinedAt: '2023-11-03',
    department: '글로벌 투자팀',
    accessLevel: 4,
  },
  {
    id: 'U008',
    name: '오미래',
    email: 'mirae.oh@demo.corp',
    role: 'viewer',
    status: 'active',
    lastLogin: '2026-04-29 11:05',
    joinedAt: '2025-01-20',
    department: '운용 지원팀',
    accessLevel: 2,
  },
  {
    id: 'U009',
    name: '장현우',
    email: 'hyunwoo.jang@demo.corp',
    role: 'viewer',
    status: 'inactive',
    lastLogin: '2026-02-18 16:30',
    joinedAt: '2024-09-05',
    department: '리서치팀',
    accessLevel: 2,
  },
  {
    id: 'U010',
    name: '임지영',
    email: 'jiyoung.lim@demo.corp',
    role: 'analyst',
    status: 'pending',
    lastLogin: '—',
    joinedAt: '2026-04-29',
    department: '리스크 관리팀',
    accessLevel: 3,
  },
];

/* ──────────────────────────────────────────
   헬퍼 컴포넌트
────────────────────────────────────────── */
const ROLE_LABEL: Record<UserRole, string> = {
  admin: '관리자',
  analyst: '애널리스트',
  viewer: '뷰어',
};

const ROLE_COLOR: Record<UserRole, string> = {
  admin: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  analyst: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  viewer: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

const STATUS_LABEL: Record<UserStatus, string> = {
  active: '활성',
  inactive: '비활성',
  pending: '승인 대기',
};

const STATUS_COLOR: Record<UserStatus, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  inactive: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const ACCESS_BAR_COLOR = [
  '',
  'bg-slate-400',
  'bg-blue-400',
  'bg-blue-500',
  'bg-violet-500',
  'bg-violet-600',
];

function AccessBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={[
            'h-1.5 w-4 rounded-full',
            i <= level ? ACCESS_BAR_COLOR[level] : 'bg-slate-200 dark:bg-slate-700',
          ].join(' ')}
        />
      ))}
      <span className="ml-1 text-xs text-slate-400">Lv.{level}</span>
    </div>
  );
}

/* ──────────────────────────────────────────
   통계 카드
────────────────────────────────────────── */
function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  sub: string;
  icon: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-xl ${accent}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   메인 페이지
────────────────────────────────────────── */
export default function AdminPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');

  const filtered = DEMO_USERS.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      u.name.includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.includes(q) ||
      u.id.toLowerCase().includes(q);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const totalUsers = DEMO_USERS.length;
  const activeUsers = DEMO_USERS.filter((u) => u.status === 'active').length;
  const pendingUsers = DEMO_USERS.filter((u) => u.status === 'pending').length;
  const newThisMonth = DEMO_USERS.filter((u) => u.joinedAt >= '2026-04-01').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
              title="대시보드로 돌아가기"
            >
              ←
            </Link>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
                사용자 관리
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                관리자 전용 — 데모 데이터
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg border border-blue-500 bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600 dark:border-blue-400 dark:bg-blue-400 dark:text-slate-900 dark:hover:bg-blue-500"
              onClick={() => alert('데모 버튼입니다.')}
            >
              + 사용자 초대
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-screen-xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* 통계 카드 */}
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="전체 사용자"
            value={totalUsers}
            sub="등록된 계정 수"
            icon="👥"
            accent="bg-blue-50 dark:bg-blue-900/30"
          />
          <StatCard
            label="활성 사용자"
            value={activeUsers}
            sub="현재 접근 가능"
            icon="✅"
            accent="bg-emerald-50 dark:bg-emerald-900/30"
          />
          <StatCard
            label="승인 대기"
            value={pendingUsers}
            sub="처리 필요"
            icon="⏳"
            accent="bg-amber-50 dark:bg-amber-900/30"
          />
          <StatCard
            label="이번 달 신규"
            value={newThisMonth}
            sub="2026년 4월"
            icon="🆕"
            accent="bg-violet-50 dark:bg-violet-900/30"
          />
        </section>

        {/* 필터 & 검색 */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* 검색 */}
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="이름, 이메일, 부서 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
              />
            </div>

            {/* 역할 필터 */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')}
              className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="all">전체 역할</option>
              <option value="admin">관리자</option>
              <option value="analyst">애널리스트</option>
              <option value="viewer">뷰어</option>
            </select>

            {/* 상태 필터 */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'all')}
              className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="all">전체 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="pending">승인 대기</option>
            </select>

            <p className="whitespace-nowrap text-xs text-slate-400">
              {filtered.length} / {totalUsers}명
            </p>
          </div>
        </section>

        {/* 사용자 테이블 */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['ID', '이름 / 이메일', '부서', '역할', '접근 레벨', '상태', '마지막 로그인', '가입일', '작업'].map(
                    (col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-sm text-slate-400">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    >
                      {/* ID */}
                      <td className="px-4 py-3 font-mono text-xs text-slate-400">{user.id}</td>

                      {/* 이름/이메일 */}
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </td>

                      {/* 부서 */}
                      <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300">
                        {user.department}
                      </td>

                      {/* 역할 */}
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLOR[user.role]}`}
                        >
                          {ROLE_LABEL[user.role]}
                        </span>
                      </td>

                      {/* 접근 레벨 */}
                      <td className="px-4 py-3">
                        <AccessBar level={user.accessLevel} />
                      </td>

                      {/* 상태 */}
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLOR[user.status]}`}
                        >
                          {STATUS_LABEL[user.status]}
                        </span>
                      </td>

                      {/* 마지막 로그인 */}
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                        {user.lastLogin}
                      </td>

                      {/* 가입일 */}
                      <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                        {user.joinedAt}
                      </td>

                      {/* 작업 */}
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => alert(`[데모] ${user.name} 상세 보기`)}
                            className="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                          >
                            보기
                          </button>
                          <button
                            onClick={() => alert(`[데모] ${user.name} 편집`)}
                            className="rounded px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100 hover:text-amber-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-amber-400"
                          >
                            편집
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* 테이블 푸터 */}
          <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              총 {filtered.length}명 표시 중 · 이 데이터는 데모용 샘플입니다.
            </p>
          </div>
        </section>

        {/* 역할별 분포 요약 */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {(['admin', 'analyst', 'viewer'] as UserRole[]).map((role) => {
            const count = DEMO_USERS.filter((u) => u.role === role).length;
            const pct = Math.round((count / totalUsers) * 100);
            return (
              <div
                key={role}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${ROLE_COLOR[role]}`}
                  >
                    {ROLE_LABEL[role]}
                  </span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{count}명</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full ${
                      role === 'admin'
                        ? 'bg-violet-500'
                        : role === 'analyst'
                          ? 'bg-blue-500'
                          : 'bg-slate-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-slate-400">{pct}% 비율</p>
              </div>
            );
          })}
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-8 border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-center text-xs text-slate-400 dark:text-slate-600">
          © 2026 금융 분석 대시보드 — 관리자 전용 · 데모용 샘플 데이터
        </p>
      </footer>
    </div>
  );
}