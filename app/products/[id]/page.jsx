'use client';

import { use } from 'react';
import ProtectedRoute from '@/components/common/ProtectedRoute';
import ProductDetailView from '@/components/products/ProductDetailView';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function ProductDetailPage({ params }) {
  // In Next.js App Router, params is a Promise or object depending on version
  const resolvedParams = use(params);

  return (
    <ProtectedRoute>
      <div className="py-4">
        <ProductDetailView product={null} />
      </div>
    </ProtectedRoute>
  );
}
