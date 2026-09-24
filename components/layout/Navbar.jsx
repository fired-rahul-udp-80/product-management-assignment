'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-10">
      {/* Left: Mobile menu button + page title */}
      <div className="flex items-center gap-3">
        <button
          id="mobile-menu-btn"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Open sidebar menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <span className="text-lg font-bold text-slate-800 hidden sm:block">
          Product Admin Dashboard
        </span>
        <span className="text-base font-bold text-slate-800 sm:hidden">
          Product Admin
        </span>
      </div>

      {/* Right: User info + logout */}
      {user && (
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
            <span>Welcome,</span>
            <strong className="text-slate-900 font-semibold">
              {user.firstName
                ? `${user.firstName} ${user.lastName || ''}`.trim()
                : user.username || 'Admin'}
            </strong>
          </div>

          <button
            id="navbar-logout-btn"
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      )}
    </header>
  );
}
