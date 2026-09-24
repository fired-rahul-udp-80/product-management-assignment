'use client';

import Link from 'next/link';
import Image from 'next/image';

/**
 * Mobile-friendly product card shown instead of the table row on small screens.
 */
export default function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex gap-4 items-start">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
            No img
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-semibold text-slate-800 truncate">{product.title}</p>
        <p className="text-xs text-slate-500 capitalize">{product.category}</p>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-sky-600">${product.price}</span>
          <span className="text-amber-500">★ {product.rating}</span>
          <span className="text-slate-400">{product.stock} in stock</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Link
            href={`/products/${product.id}`}
            className="px-2.5 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition"
          >
            View
          </Link>
          <Link
            href={`/products/${product.id}/edit`}
            className="px-2.5 py-1 text-xs font-medium bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-md border border-sky-200 transition"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete?.(product.id)}
            className="px-2.5 py-1 text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 rounded-md border border-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
