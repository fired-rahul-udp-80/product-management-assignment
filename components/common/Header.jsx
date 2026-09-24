'use client';

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

export default function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/products" className="text-xl font-extrabold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
          Product Dashboard
        </Link>

        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-600">
              Welcome, <strong className="text-slate-900 font-semibold">{user?.username || 'Admin'}</strong>
            </span>
            <button
              onClick={() => dispatch(logout())}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition shadow-2xs"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
