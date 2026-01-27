import { Loader } from '@/components/shared/loader';
import { lazy, Suspense } from 'react';

export function lazyLoad(importFunc: () => Promise<any>) {
    const LazyComponent = lazy(importFunc);
    return (
        <Suspense fallback={<div><Loader /></div>}>
            <LazyComponent />
        </Suspense>
    );
}
