import { LoadingSkeleton } from '@/core/LoadingSkeleton';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
    </div>
  );
}
