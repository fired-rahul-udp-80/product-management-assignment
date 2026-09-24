'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (isAuthenticated) {
        router.push('/products');
      } else {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isMounted, router]);

  return <LoadingSpinner message="Redirecting..." />;
}
