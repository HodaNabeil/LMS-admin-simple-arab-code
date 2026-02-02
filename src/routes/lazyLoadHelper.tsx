import { Loader } from '@/components/shared/loader';
import { lazy, Suspense } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoad(importFunc: () => Promise<any>) {
    const LazyComponent = lazy(importFunc);
    return (
        <Suspense fallback={<div><Loader /></div>}>
            <LazyComponent />
        </Suspense>
    );
}
