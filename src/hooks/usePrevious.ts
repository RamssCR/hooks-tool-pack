import { useEffect, useRef } from 'react'

/**
 * Hook to store the previous value of a prop or state.
 * @param value - The current value to track.
 * @returns The previous value or null if not available.
 * @example
 * const [count, setCount] = useState(0);
 * const previousCount = usePrevious(count);
 * // previousCount will hold the value of count from the previous render.
 */
export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref?.current
}
