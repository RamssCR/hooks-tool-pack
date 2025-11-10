import { isBrowser } from '@helpers/browser'
import { useIsomorphicEffect } from './useIsomorphicEffect'
import { useRef } from 'react'
import { isServer } from '@helpers/process'

/**
 * An object containing configuration options for performance measurement.
 * Properties include optional names for the measure and start mark, which
 * are used to label and track performance marks within the application.
 */
export type Options = {
  measureName?: string
  startMark?: string
}

/**
 * A React hook to create performance marks using the Performance API.
 * It allows you to define custom marks and measures for profiling
 * application performance. The hook cleans up the marks and measures
 * when the component unmounts.
 * @param markName - The name of the performance mark to create.
 * @param options - Optional settings for the performance mark, including measureName and startMark.
 * @returns void
 * @example
 * const Component = () => {
 *   usePerformanceMark('component-mount', { measureName: 'mount-time', startMark: 'app-start' })
 *   return <div>My Component</div>
 * }
 */
export const usePerformanceMark = (markName: string, options?: Options) => {
  const savedOptions = useRef<Options | null>(null)
  const isDevelopment = isServer()

  useIsomorphicEffect(() => {
    savedOptions.current = options ?? null
  }, [options])

  useIsomorphicEffect(() => {
    if (!isBrowser()) return

    const { measureName, startMark } = savedOptions.current ?? {}

    try {
      performance.mark(markName)

      if (startMark && measureName) {
        performance.measure(measureName, startMark, markName)
      }
    } catch (error) {
      if (isDevelopment) {
        console.warn('Performance mark error:', error)
      }
    }

    return () => {
      try {
        performance.clearMarks(markName)
        if (measureName) {
          performance.clearMeasures(measureName)
        }
      } catch (error) {
        if (isDevelopment) {
          console.warn('Performance mark error:', error)
        }
      }
    }
  }, [markName])
}
