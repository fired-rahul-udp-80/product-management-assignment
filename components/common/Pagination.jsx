'use client';

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange }) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-sm text-slate-600">
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-white border border-slate-300 rounded px-2 py-1 text-slate-800 focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
        >
           
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-slate-500">
          Showing page {currentPage} - {totalPages} of {totalItems}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-2xs transition"
        >
          Previous
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 bg-white border border-slate-300 text-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 shadow-2xs transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
