'use client';

import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { store } from '@/store';
import { initializeAuth } from '@/store/slices/authSlice';

export default function ReduxProvider({ children }) {
  useEffect(() => {
    // Sync Redux auth state with stored token in localStorage upon initial client mount
    store.dispatch(initializeAuth());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
