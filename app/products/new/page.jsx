'use client';

import Link from 'next/link';
import ProductForm from '@/components/products/ProductForm';

/**
 * /products/new - Add Product page.
 *
 * Uses the shared ProductForm with mode="create".
 * API call (productService.addProduct) will be wired in the CRUD step.
 * For now, the form structure, validation, and navigation are ready.
 */
export default function NewProductPage() {
  // This will be replaced with actual API call in CRUD step
  const handleSubmit = (formData) => {
    // TODO (CRUD step): call productService.addProduct(formData)
    // then navigate to /products on success
    console.log('Add product payload (API not yet wired):', formData);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Product</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fill in the details to add a new product</p>
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

      {/* Form card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8">
        <ProductForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={false}
          cancelHref="/products"
        />
      </div>
    </div>
  );
}