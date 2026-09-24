'use client';

import Image from 'next/image';
import Link from 'next/link';
export default function ProductDetailView({ product, onDelete }) {
  if (!product) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm max-w-5xl mx-auto overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider capitalize">
            {product.category}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{product.title}</h1>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image column */}
        <div className="relative aspect-square w-full bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-center p-8">
          {product.thumbnail ? (
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          ) : (
            <div className="text-slate-400 text-sm">No Image Available</div>
          )}
        </div>

        {/* Details column */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5">
              <span className="text-xs text-sky-500 uppercase font-semibold block mb-1">Price</span>
              <span className="text-2xl font-bold text-sky-700">${product.price}</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5">
              <span className="text-xs text-amber-500 uppercase font-semibold block mb-1">Rating</span>
              <span className="text-2xl font-bold text-amber-600">★ {product.rating}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Stock</span>
              <span className="text-xl font-bold text-slate-800">{product.stock} units</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Brand</span>
              <span className="text-xl font-bold text-slate-800">{product.brand || '—'}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/products/${product.id}/edit`}
              id="product-detail-edit-btn"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-lg transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
              </svg>
              Edit Product
            </Link>

            {/* Delete button — wired to onDelete; actual delete logic will be in CRUD step */}
            <button
              id="product-detail-delete-btn"
              onClick={() => onDelete?.(product.id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-red-50 text-red-600 hover:text-red-700 text-sm font-semibold rounded-lg border border-red-200 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Reviews section — structure ready for CRUD step */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="border-t border-slate-200 px-6 py-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">
            Reviews ({product.reviews.length})
          </h2>
          <div className="space-y-3">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-700">{review.reviewerName || 'Anonymous'}</span>
                  <span className="text-xs text-amber-500">{'★'.repeat(review.rating || 0)}</span>
                </div>
                <p className="text-xs text-slate-500">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
