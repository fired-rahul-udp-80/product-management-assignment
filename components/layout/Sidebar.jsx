'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// react-icons — Heroicons 2 outline set (matches existing dashboard style)
import {
  HiOutlineSquares2X2,
  HiOutlineCube,
  HiOutlineQueueList,
  HiOutlinePlusCircle,
  HiOutlineArrowRightOnRectangle,
  HiChevronDown,
} from 'react-icons/hi2';

// ─── Menu definition ──────────────────────────────────────────────────────────
const SideMenu = [
  {
    title: 'Dashboard',
    href: '/products',
    icon: HiOutlineSquares2X2,
  },
  {
    title: 'Product',
    href: '/products',
    icon: HiOutlineCube,
    children: [
      {
        title: 'All Products',
        href: '/products',
        icon: HiOutlineQueueList,
      },
      {
        title: 'Add / Edit Product',
        href: '/products/add',
        icon: HiOutlinePlusCircle,
      },
    ],
  },
];

// ─── Active detection ─────────────────────────────────────────────────────────
function isItemActive(pathname, item) {
  if (item.children) {
    return item.children.some((c) => isItemActive(pathname, c));
  }
  if (item.href === '/products') {
    return pathname === '/products' || pathname.startsWith('/products/');
  }
  return pathname === item.href || pathname.startsWith(item.href + '/');
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // Auto-open parent if a child route is currently active
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {};
    SideMenu.forEach((item, i) => {
      if (item.children && isItemActive(pathname, item)) initial[i] = true;
    });
    return initial;
  });

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleMenu = (index) => {
    setOpenMenus((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const navBase =
    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group w-full text-left';
  const activeClass = 'bg-sky-50 text-sky-700';
  const inactiveClass = 'text-slate-600 hover:bg-slate-100 hover:text-slate-900';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

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
              <HiOutlineCube className="w-4 h-4 text-white" />
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

          {SideMenu.map((item, index) => {
            const active = isItemActive(pathname, item);
            const childrenOpen = openMenus[index];
            const Icon = item.icon;

            // Parent with children — collapsible
            if (item.children) {
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleMenu(index)}
                    className={[navBase, active ? activeClass : inactiveClass].join(' ')}
                    aria-expanded={childrenOpen}
                  >
                    <Icon
                      className={[
                        'w-5 h-5 flex-shrink-0',
                        active ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors',
                      ].join(' ')}
                    />
                    <span className="flex-1 text-left">{item.title}</span>
                    <HiChevronDown
                      className={[
                        'w-4 h-4 flex-shrink-0 transition-transform duration-200',
                        childrenOpen ? 'rotate-180' : '',
                        active ? 'text-sky-500' : 'text-slate-400',
                      ].join(' ')}
                    />
                  </button>

                  {/* Sub-menu items */}
                  {childrenOpen && (
                    <div className="ml-4 mt-0.5 pl-3 border-l border-slate-200 space-y-0.5">
                      {item.children.map((child, ci) => {
                        const ChildIcon = child.icon;
                        const childActive =
                          child.href === '/products'
                            ? pathname === '/products'
                            : pathname === child.href ||
                              pathname.startsWith(child.href + '/');

                        return (
                          <Link
                            key={ci}
                            href={child.href}
                            onClick={onClose}
                            className={[
                              'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 group',
                              childActive
                                ? 'bg-sky-50 text-sky-700'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800',
                            ].join(' ')}
                            aria-current={childActive ? 'page' : undefined}
                          >
                            <ChildIcon
                              className={[
                                'w-4 h-4 flex-shrink-0',
                                childActive
                                  ? 'text-sky-500'
                                  : 'text-slate-400 group-hover:text-slate-600 transition-colors',
                              ].join(' ')}
                            />
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Simple link item (no children)
            return (
              <Link
                key={index}
                href={item.href}
                onClick={onClose}
                className={[navBase, active ? activeClass : inactiveClass].join(' ')}
                aria-current={active ? 'page' : undefined}
              >
                <Icon
                  className={[
                    'w-5 h-5 flex-shrink-0',
                    active ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600 transition-colors',
                  ].join(' ')}
                />
                <span className="flex-1">{item.title}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0" />
                )}
              </Link>
            );
          })}
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
                <p className="text-xs text-slate-400 truncate">
                  {user.email || 'Administrator'}
                </p>
              </div>
            </div>
          )}

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-150 group"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5 text-red-400 group-hover:text-red-600 transition-colors flex-shrink-0" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}