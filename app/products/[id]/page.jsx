'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { productService } from '@/services/productService';
import ProductDetailView from '@/components/products/ProductDetailView';
import DeleteConfirmModal from '@/components/products/DeleteConfirmModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorAlert from '@/components/common/ErrorAlert';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteConfirm = async (productId) => {
    try {
      setIsDeleting(true);
      await productService.deleteProduct(productId);
      toast.success(`Product #${productId} deleted successfully`);
      setIsDeleteModalOpen(false);
      router.push('/products');
    } catch (err) {
      console.error('Failed to delete product:', err);
      toast.error(err?.response?.data?.message || 'Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message={`Loading product #${id}...`} />;
  }

  if (error) {
    return (
      <ErrorAlert
        title="Failed to load product"
        message={error}
        onRetry={() => {
          setIsLoading(true);
          setRefreshKey((k) => k + 1);
        }}
      />
    );
  }

  return (
    <div className="py-2">
      <ProductDetailView
        product={product}
        onDelete={() => setIsDeleteModalOpen(true)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        productId={id}
        onClose={() => {
          if (!isDeleting) setIsDeleteModalOpen(false);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}