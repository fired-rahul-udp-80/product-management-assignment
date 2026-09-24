'use client';

import Link from 'next/link';
import ProductSearch from '@/components/products/ProductSearch';
import CategoryFilter from '@/components/products/CategoryFilter';
import ProductSort from '@/components/products/ProductSort';
import ProductTable from '@/components/products/ProductTable';
import ProductCard from '@/components/products/ProductCard';
import Pagination from '@/components/common/Pagination';
import DeleteConfirmModal from '@/components/products/DeleteConfirmModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/common/EmptyState';
import ErrorAlert from '@/components/common/ErrorAlert';
import { useProductParams } from '@/hooks/useProductParams';

/**
 * /products — Product Listing page.
 *
 * Layout/navigation is provided by app/products/layout.jsx (DashboardLayout + ProtectedRoute).
 * API integration (fetching real products) will be added in the CRUD step.
 */
export default function ProductsPage() {
  const { page, limit, search, category, sort, order, updateParams } = useProductParams();

  // Placeholder: products will be loaded via productService in the next CRUD step
  const products = [];
  const totalItems = 0;
  const isLoading = false;
  const error = null;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your products</p>
        </div>

        <Link
          href="/products/new"
          id="add-product-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-lg transition shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Toolbar: Search, Category Filter, Sorting */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <ProductSearch
          initialSearch={search}
          onSearch={(query) => updateParams({ search: query, page: 1 })}
        />

        <div className="flex items-center gap-3">
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

      {/* Error state */}
      {error && (
        <ErrorAlert
          title="Failed to load products"
          message={error}
          onRetry={() => {}}
        />
      )}

      {/* Loading state */}
      {isLoading && <LoadingSpinner message="Loading products..." />}

      {/* Desktop table — hidden on mobile */}
      {!isLoading && !error && (
        <>
          <div className="hidden md:block">
            <ProductTable
              products={products}
              onDelete={() => {}}
            />
          </div>

          {/* Mobile cards — hidden on desktop */}
          {products.length > 0 && (
            <div className="md:hidden space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={() => {}} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {products.length === 0 && !isLoading && (
            <EmptyState message="No products found. Add your first product to get started." />
          )}
        </>
      )}

      {/* Pagination */}
      {!isLoading && products.length > 0 && (
        <Pagination
          currentPage={page}
          totalItems={totalItems}
          pageSize={limit}
          onPageChange={(newPage) => updateParams({ page: newPage })}
          onPageSizeChange={(newSize) => updateParams({ limit: newSize, page: 1 })}
        />
      )}

      {/* Delete confirmation modal — wired in CRUD step */}
      <DeleteConfirmModal isOpen={false} onClose={() => {}} />
    </div>
  );
}
