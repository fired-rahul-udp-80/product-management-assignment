'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { productService } from '@/services/productService';
import ProductForm from '@/components/products/ProductForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorAlert from '@/components/common/ErrorAlert';

export default function EditProductPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      try {
        const data = await productService.getProductById(id);
        if (isMounted) {
          setProduct(data);
          setError(null);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load product:', err);
          setError(err?.response?.data?.message || err?.message || 'Failed to load product details');
          setIsLoading(false);
        }
      }
    }

    if (id) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [id, refreshKey]);

  // Handle Edit/Update API call
  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      await productService.updateProduct(id, formData);
      toast.success(`Product #${id} updated successfully!`);
      router.push('/products');
    } catch (err) {
      console.error('Failed to update product:', err);
      toast.error(err?.response?.data?.message || 'Failed to update product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Edit Product</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Editing product <span className="font-mono text-sky-600">#{id}</span>
          </p>
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

      {/* Error state */}
      {error && (
        <ErrorAlert
          title="Failed to load product"
          message={error}
          onRetry={() => {
            setIsLoading(true);
            setRefreshKey((k) => k + 1);
          }}
        />
      )}

      {/* Loading state */}
      {isLoading && <LoadingSpinner message={`Loading product #${id}...`} />}

      {/* Form card */}
      {!isLoading && !error && product && (
        <div className="bg-white border border-slate-300 p-6 sm:p-8">
          <ProductForm
            mode="edit"
            initialData={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            cancelHref="/products"
          />
        </div>
      )}
    </div>
  );
}