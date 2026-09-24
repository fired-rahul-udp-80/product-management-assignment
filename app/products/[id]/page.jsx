'use client';

import { use } from 'react';
import ProductDetailView from '@/components/products/ProductDetailView';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorAlert from '@/components/common/ErrorAlert';

/**
 * /products/[id] - Product Detail page.
 *
 * Reads the dynamic id from route params.
 * Layout + auth is provided by app/products/layout.jsx.
 * API data-fetching will be added in the CRUD step.
 */
export default function ProductDetailPage({ params }) {
  const { id } = use(params);

  // Placeholder state - will be replaced with productService.getProductById(id) in CRUD step
  const product = null;
  const isLoading = false;
  const error = null;

  if (isLoading) {
    return <LoadingSpinner message={`Loading product #${id}...`} />;
  }

  if (error) {
    return (
      <ErrorAlert
        title="Failed to load product"
        message={error}
        onRetry={() => {}}
      />
    );
  }

  return (
    <div className="py-2">
      <ProductDetailView
        product={product}
        onDelete={() => {}}
      />

      {/* Shown when product has not been loaded yet (API integration pending) */}
      {!product && !isLoading && (
        <div className="text-center py-16 text-slate-500 text-sm">
          Product #{id} data will load after API integration.
        </div>
      )}
    </div>
  );
}