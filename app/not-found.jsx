import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
      <h1 className="text-6xl font-black text-cyan-400">404</h1>
      <h2 className="text-xl font-bold text-slate-100">Page Not Found</h2>
      <p className="text-slate-400 max-w-md text-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/products"
        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 font-semibold text-white text-sm rounded-lg transition"
      >
        Go to Products
      </Link>
    </div>
  );
}
