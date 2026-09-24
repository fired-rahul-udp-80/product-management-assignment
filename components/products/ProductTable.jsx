'use client';

import Link from 'next/link';

export default function ProductTable({ products = [], onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-xl">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
          <tr>
            <th className="py-3.5 px-4 font-semibold">ID</th>
            <th className="py-3.5 px-4 font-semibold">Title</th>
            <th className="py-3.5 px-4 font-semibold">Category</th>
            <th className="py-3.5 px-4 font-semibold">Price</th>
            <th className="py-3.5 px-4 font-semibold">Rating</th>
            <th className="py-3.5 px-4 font-semibold">Stock</th>
            <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
              <td className="py-3 px-4 text-slate-400 font-mono">#{product.id}</td>
              <td className="py-3 px-4 font-medium text-slate-100">{product.title}</td>
              <td className="py-3 px-4 text-slate-400">{product.category}</td>
              <td className="py-3 px-4 font-semibold text-cyan-400">${product.price}</td>
              <td className="py-3 px-4 text-amber-400">★ {product.rating}</td>
              <td className="py-3 px-4 text-slate-400">{product.stock}</td>
              <td className="py-3 px-4 text-right space-x-2">
                <Link
                  href={`/products/${product.id}`}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition"
                >
                  View
                </Link>
                <button
                  onClick={() => onEdit(product)}
                  className="px-2.5 py-1 text-xs bg-cyan-950 hover:bg-cyan-900 text-cyan-300 rounded border border-cyan-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="px-2.5 py-1 text-xs bg-red-950 hover:bg-red-900 text-red-300 rounded border border-red-800 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
