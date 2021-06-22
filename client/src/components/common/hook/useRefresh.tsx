import { useCallback } from 'react';
import { useRouter } from 'next/router';

export function useRefresh() {
  const router = useRouter();

  return useCallback(() => router.replace(router.asPath), [router.asPath]);
}
