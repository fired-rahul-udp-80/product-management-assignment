'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { productService } from '@/services/productService';
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
import { PiPlus } from 'react-icons/pi';

export default function ProductsPage() {
  const { page, limit, search, category, sort, order, updateParams } = useProductParams();

  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch product categories once for the category filter
  useEffect(() => {
    let isMounted = true;
    async function loadCategories() {
      try {
        const data = await productService.getCategories();
        if (isMounted && Array.isArray(data)) {
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    loadCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products whenever search, category, page, limit, sort, or order changes
  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      try {
        const skip = Math.max(0, (page - 1) * limit);
        let data;

        if (search && search.trim()) {
          data = await productService.searchProducts({
            q: search.trim(),
            limit,
            skip,
            sortBy: sort || undefined,
            order: order || 'asc',
          });
        } else if (category) {
          data = await productService.getProductsByCategory(category, {
            limit,
            skip,
            sortBy: sort || undefined,
            order: order || 'asc',
          });
        } else {
          data = await productService.getProducts({
            limit,
            skip,
            sortBy: sort || undefined,
            order: order || 'asc',
          });
        }

        if (!isCancelled) {
          setProducts(data?.products || []);
          setTotalItems(data?.total || 0);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error fetching products:', err);
          setError(
            err?.response?.data?.message ||
            err?.message ||
            'Failed to load products. Please check your connection and try again.'
          );
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [page, limit, search, category, sort, order, refreshKey]);

  // Trigger delete modal
  const handleDeleteClick = (id) => {
    setSelectedDeleteId(id);
    setDeleteModalOpen(true);
  };

  // Perform Delete API Call
  const handleConfirmDelete = async (id) => {
    try {
      setIsDeleting(true);
      await productService.deleteProduct(id);
      toast.success(`Product #${id} deleted successfully`);

      // Update local state without requiring full reload
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setTotalItems((prev) => Math.max(0, prev - 1));
      setDeleteModalOpen(false);
      setSelectedDeleteId(null);
    } catch (err) {
      console.error('Failed to delete product:', err);
      toast.error(err?.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and view your product catalog</p>
        </div>

        <Link
          href="/products/add"
          id="add-product-btn"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-lg transition shadow-sm"
        >
          <PiPlus/>
          Add Product
        </Link>
      </div>

      {/* Toolbar: Search, Category Filter, Sorting */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 bg-white border border-slate-300">
        <ProductSearch
          initialSearch={search}
          onSearch={(query) => updateParams({ search: query, page: 1 })}
        />

        <div className="flex items-center gap-3">
          <CategoryFilter
            categories={categories}
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
          onRetry={() => {
            setIsLoading(true);
            setRefreshKey((k) => k + 1);
          }}
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
              onDelete={handleDeleteClick}
            />
          </div>

          {/* Mobile cards — hidden on desktop */}
          {products.length > 0 && (
            <div className="md:hidden space-y-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onDelete={handleDeleteClick} />
              ))}
            </div>
          )}

          {/* Empty state */}
          {products.length === 0 && (
            <EmptyState message="No products found. Add your first product or try a different filter." />
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

      {/* Delete confirmation modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        productId={selectedDeleteId}
        onClose={() => {
          if (!isDeleting) {
            setDeleteModalOpen(false);
            setSelectedDeleteId(null);
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
