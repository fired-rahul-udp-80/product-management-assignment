'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductTable({ products = [], onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-slate-700">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-200">
          <tr>
            <th className="py-3.5 px-4">Product</th>
            <th className="py-3.5 px-4">Category</th>
            <th className="py-3.5 px-4">Price</th>
            <th className="py-3.5 px-4">Rating</th>
            <th className="py-3.5 px-4">Stock</th>
            <th className="py-3.5 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
              {/* Product thumbnail + title */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    {product.thumbnail ? (
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">
                        N/A
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate max-w-[180px]">{product.title}</p>
                    <p className="text-xs text-slate-400 font-mono">#{product.id}</p>
                  </div>
                </div>
              </td>

              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 capitalize">
                  {product.category}
                </span>
              </td>

              <td className="py-3 px-4 font-bold text-sky-600">${product.price}</td>
              <td className="py-3 px-4 text-amber-500 font-medium">★ {product.rating}</td>
              <td className="py-3 px-4 text-slate-600">{product.stock}</td>

              <td className="py-3 px-4 text-right">
                <div className="flex items-center justify-end gap-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
