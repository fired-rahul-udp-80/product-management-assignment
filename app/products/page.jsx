'use client';

import ProtectedRoute from '@/components/common/ProtectedRoute';
import ProductSearch from '@/components/products/ProductSearch';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductSort from '@/components/products/ProductSort';
import ProductTable from '@/components/products/ProductTable';
import Pagination from '@/components/common/Pagination';
import ProductFormModal from '@/components/products/ProductFormModal';
import DeleteConfirmModal from '@/components/products/DeleteConfirmModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorAlert from '@/components/common/ErrorAlert';
import { useProductParams } from '@/hooks/useProductParams';

export default function ProductsPage() {
  const { page, limit, search, category, sort, order, updateParams } = useProductParams();

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Products Listing</h1>
            <p className="text-slate-400 text-sm">Manage dashboard products, search, filter and paginate</p>
          </div>

          <button
            onClick={() => {}}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 font-semibold text-white text-sm rounded-lg transition"
          >
            + Add Product
          </button>
        </div>

        {/* Toolbar: Search, Category Filter, Sorting */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <ProductSearch
            initialSearch={search}
            onSearch={(query) => updateParams({ search: query, page: 1 })}
          />

          <div className="flex items-center space-x-3">
            <CategoryFilter
              selectedCategory={category}
              onSelectCategory={(cat) => updateParams({ category: cat, page: 1 })}
            />
            <ProductSort
              sortBy={sort}
              order={order}
              onSortChange={(field, dir) => updateParams({ sort: field, order: dir, page: 1 })}
            />
          </div>
        </div>

        {/* Product Table Placeholder */}
        <ProductTable
          products={[]}
          onEdit={() => {}}
          onDelete={() => {}}
        />

        {/* Empty state illustration placeholder */}
        <EmptyState message="No products match your criteria yet." />

        {/* Pagination Controls */}
        <Pagination
          currentPage={page}
          totalItems={0}
          pageSize={limit}
          onPageChange={(newPage) => updateParams({ page: newPage })}
          onPageSizeChange={(newSize) => updateParams({ limit: newSize, page: 1 })}
        />

        {/* Modal dialog placeholders */}
        <ProductFormModal isOpen={false} onClose={() => {}} />
        <DeleteConfirmModal isOpen={false} onClose={() => {}} />
      </div>
    </ProtectedRoute>
  );
}
