'use client';

import ErrorAlert from '@/components/common/ErrorAlert';

export default function GlobalError({ error, reset }) {
  return (
    <div className="py-12 max-w-xl mx-auto">
      <ErrorAlert
        title="Application Error"
        message={error?.message || 'An unexpected error occurred in the application.'}
        onRetry={reset}
      />
    </div>
  );
}
