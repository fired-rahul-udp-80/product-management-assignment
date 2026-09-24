'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailView({ product }) {
  if (!product) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{product.category}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{product.title}</h1>
        </div>
        <Link
          href="/products"
          className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
              priority
            />
          ) : (
            <span className="text-slate-600">No Image</span>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-medium">Price</span>
              <span className="text-2xl font-bold text-cyan-400">${product.price}</span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-medium">Rating</span>
              <span className="text-2xl font-bold text-amber-400">★ {product.rating}</span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-medium">Stock</span>
              <span className="text-lg font-semibold text-slate-200">{product.stock} units</span>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              <span className="text-xs text-slate-500 block uppercase font-medium">Brand</span>
              <span className="text-lg font-semibold text-slate-200">{product.brand || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
