import { useEffect, useRef } from 'react'

/**
 * A hook that provides a throttled version of a callback function.
 * It ensures that the callback is invoked at most once in a specified delay period.
 * @param callback - The function to be throttled.
 * @param delay - The delay period in milliseconds.
 * @returns A throttled version of the callback function.
 * @example
 * const throttledFunction = useThrottle((value) => {
 *   console.log(value);
 * }, 300);
 * throttledFunction('Hello'); // Will log 'Hello' immediately, then ignore subsequent calls for 300ms.
 * throttledFunction.cancel(); // Cancels any pending execution.
 */
export const useThrottle = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number,
) => {
  const lastCallRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const trailingArgs = useRef<T | null>(null)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  /**
   * Cancels any pending throttled function calls.
   */
  const cancel = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    trailingArgs.current = null
  }

  /**
   * The throttled function that limits the execution of the callback.
   */
  const throttleFn = (...args: T) => {
    const now = Date.now()
    const timeSinceLastCall = lastCallRef.current
      ? now - lastCallRef.current
      : delay

    if (timeSinceLastCall >= delay) {
      lastCallRef.current = now
      callbackRef.current(...args)
      return
    }

    trailingArgs.current = args

    if (timeoutRef.current) return

    const remaining = delay - timeSinceLastCall
    timeoutRef.current = window.setTimeout(() => {
      if (trailingArgs.current) {
        lastCallRef.current = Date.now()
        callbackRef.current(...trailingArgs.current)
        trailingArgs.current = null
      }
      timeoutRef.current = null
    }, remaining)
  }

  useEffect(() => cancel, [])

  return Object.assign(throttleFn, { cancel })
}
