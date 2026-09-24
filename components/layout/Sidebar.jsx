'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Determines if any product-related route is active
function isProductsActive(pathname) {
  return pathname === '/products' || pathname.startsWith('/products/');
}

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItemClass = (active) =>
    [
      'flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
      active
        ? 'bg-sky-50 text-sky-700'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
    ].join(' ');

  const iconClass = (active) =>
    ['transition-colors', active ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'].join(' ');

  const productsActive = isProductsActive(pathname);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-0 left-0 z-30 h-full w-64 bg-white border-r border-slate-200 flex flex-col shadow-lg',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Sidebar navigation"
      >
        {/* Brand / Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-200 flex-shrink-0">
          <Link href="/products" className="flex items-center gap-2.5" onClick={onClose}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Product Admin
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          <p className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Main Menu
          </p>

          {/* Dashboard */}
          <Link
            href="/products"
            onClick={onClose}
            className={navItemClass(productsActive)}
            aria-current={productsActive ? 'page' : undefined}
          >
            <span className="flex items-center gap-3">
              <span className={iconClass(productsActive)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
              </span>
              Dashboard
            </span>
            {productsActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />}
          </Link>

          {/* Products */}
          <Link
            href="/products"
            onClick={onClose}
            className={navItemClass(productsActive)}
            aria-current={productsActive ? 'page' : undefined}
          >
            <span className="flex items-center gap-3">
              <span className={iconClass(productsActive)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </span>
              Products
            </span>
            {productsActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />}
          </Link>
        </nav>

        {/* User / Logout section */}
        <div className="border-t border-slate-200 p-4 flex-shrink-0">
          {user && (
            <div className="flex items-center gap-3 mb-3 px-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {(user.firstName?.[0] || user.username?.[0] || 'A').toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user.firstName
                    ? `${user.firstName} ${user.lastName || ''}`.trim()
                    : user.username || 'Admin'}
                </p>
                <p className="text-xs text-slate-400 truncate">{user.email || 'Administrator'}</p>
              </div>
            </div>
          )}

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-150 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
