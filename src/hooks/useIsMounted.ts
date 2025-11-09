import { useEffect, useState } from 'react'

/**
 * Hook to determine if a component is currently mounted.
 * @returns A boolean indicating whether the component is mounted.
 * @example
 * const isMounted = useIsMounted();
 * isMounted
 *   ? // Safe to perform operations that require the component to be mounted.
 *   : // Component is unmounted, avoid performing such operations.
 */
export const useIsMounted = (): boolean => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  return isMounted
}
