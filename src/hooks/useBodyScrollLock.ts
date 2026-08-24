import { useEffect } from 'react';

// Locks page scroll while `active` is true (i.e. while any modal is open).
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);
}
