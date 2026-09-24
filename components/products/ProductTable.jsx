'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash, HiStar } from 'react-icons/hi2';

const TABLE_HEADERS = ['IMAGE', 'TITLE', 'CATEGORY', 'PRICE', 'RATING', 'STOCK', 'ACTIONS'];

export default function ProductTable({ products = [], onDelete }) {
  if (products.length === 0) return null;

  return (
    <div className="overflow-x-auto border border-slate-300 bg-white">
      <table className="w-full text-left text-sm text-slate-700 min-w-[750px]">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            {TABLE_HEADERS.map((h) => (
              <th
                key={h}
                className="py-3 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-50/70 transition-colors">
              {/* IMAGE */}
              <td className="py-3 px-4">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-400">
                  {product.thumbnail ? (
                    <Image
                      src={product.thumbnail}
                      alt={product.title || 'Product'}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs">
                      N/A
                    </div>
                  )}
                </div>
              </td>

              {/* TITLE */}
              <td className="py-3 px-4">
                <p className="font-semibold text-slate-800 text-sm max-w-[200px] truncate" title={product.title}>
                  {product.title}
                </p>
              </td>

              {/* CATEGORY */}
              <td className="py-3 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 capitalize">
                  {product.category}
                </span>
              </td>

              {/* PRICE */}
              <td className="py-3 px-4">
                <span className="font-bold text-sky-600 text-sm">
                  ${product.price}
                </span>
              </td>

              {/* RATING */}
              <td className="py-3 px-4">
                <div className="inline-flex items-center gap-1 font-semibold text-sm text-amber-500">
                  <HiStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating ?? '—'}</span>
                </div>
              </td>

              {/* STOCK */}
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                    product.stock > 0
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  {product.stock}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/products/${product.id}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition"
                    title="View product"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/products/${product.id}/edit`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition"
                    title="Edit product"
                  >
                    <HiOutlinePencilSquare className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete?.(product.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete product"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
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