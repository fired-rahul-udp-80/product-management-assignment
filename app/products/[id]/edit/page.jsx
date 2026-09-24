'use client';

import { use } from 'react';
import Link from 'next/link';
import ProductForm from '@/components/products/ProductForm';

/**
 * /products/[id]/edit - Edit Product page.
 *
 * Reads the dynamic id from route params.
 * Reuses the shared ProductForm with mode="edit".
 * Cancel returns to /products/[id] (product detail page).
 *
 * API calls (productService.getProductById + productService.updateProduct)
 * will be wired in the CRUD step. Structure and navigation are ready now.
 */
export default function EditProductPage({ params }) {
  const { id } = use(params);

  // Placeholder: will be replaced with productService.getProductById(id) in CRUD step
  const product = null;
  const isLoading = false;

  // This will be replaced with actual API call in CRUD step
  const handleSubmit = (formData) => {
    // TODO (CRUD step): call productService.updateProduct(id, formData)
    // then navigate to /products/id on success
    console.log('Update product payload (API not yet wired):', { id, ...formData });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Editing product <span className="font-mono text-sky-600">#{id}</span>
          </p>
        </div>
        <Link
          href={"/products/"+id}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Product
        </Link>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 text-center text-slate-500 text-sm">
          Loading product...
        </div>
      )}

      {/* Form card */}
      {!isLoading && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
          <ProductForm
            mode="edit"
            initialData={product}
            onSubmit={handleSubmit}
            isSubmitting={false}
            cancelHref={"/products/"+id}
          />
        </div>
      )}

      {/* Pending message for API integration */}
      {!isLoading && !product && (
        <p className="text-center text-xs text-slate-400">
          Product #{id} will pre-populate the form after API integration.
        </p>
      )}
    </div>
  );
}