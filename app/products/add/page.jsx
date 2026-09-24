'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { productService } from '@/services/productService';
import ProductForm from '@/components/products/ProductForm';
import { BsBack } from 'react-icons/bs';

export default function AddProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      const newProduct = await productService.addProduct(formData);
      toast.success(`Product "${newProduct.title || formData.title}" created successfully!`);
      router.push('/products');
    } catch (err) {
      console.error('Failed to create product:', err);
      toast.error(err?.response?.data?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Product</h1>
          <p className="text-slate-500 text-sm mt-0.5">Fill in the details to add a new product</p>
        </div>
        <Link
          href="/products"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
        >
          <BsBack />
          Back to Products
        </Link>
      </div>

      <div className="bg-white border border-slate-300 p-6 sm:p-8">
        <ProductForm
          mode="create"
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          cancelHref="/products"
        />
      </div>
    </div>
  );
}