/* eslint-disable react/display-name */
import React, { lazy, Suspense } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  fallback: React.ReactNode | null;
}
const loadable = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  { fallback = null }: Props = { fallback: null },
): any => {
  const LazyComponent = lazy(importFunc);

  return (props: any): any => (
      <Suspense fallback={fallback}>
          <LazyComponent {...props} />
      </Suspense>
  );
};

export default loadable;

/* eslint-enable @typescript-eslint/no-explicit-any */
