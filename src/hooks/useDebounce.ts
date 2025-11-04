import { useCallback, useEffect, useRef } from 'react'

/**
 * Custom hook to debounce a function call.
 * This hook returns a debounced version of the provided function,
 * which delays its execution until after a specified delay period
 * has passed since the last time it was invoked.
 * @param callback - The function to be debounced.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the provided function.
 * @example
 * const debouncedFunction = useDebounce((value) => {
 *   console.log(value);
 * }, 300);
 * debouncedFunction('Hello'); // Will log 'Hello' after 300ms if not called again within that time.
 * debouncedFunction.cancel(); // Cancels the pending execution.
 * debouncedFunction.flush(); // Immediately invokes the function if there's a pending execution.
 */
export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const timeoutRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  /**
   * Cancels any pending debounced function calls.
   */
  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  /**
   * Immediately invokes the debounced function if there's a pending execution.
   */
  const flush = useCallback(
    (...args: T) => {
      cancel()
      callbackRef.current(...args)
    },
    [cancel],
  )

  /**
   * The debounced function that delays the execution of the callback.
   */
  const debounceFn = useCallback(
    (...args: T) => {
      cancel()
      timeoutRef.current = window.setTimeout(
        () => callbackRef.current(...args),
        delay,
      )
    },
    [cancel, delay],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => cancel, [cancel])

  return Object.assign(debounceFn, { cancel, flush })
}
