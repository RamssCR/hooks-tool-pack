import { isBrowser } from '@helpers/browser'
import { useIsomorphicEffect } from './useIsomorphicEffect'
import { useRef } from 'react'
import { isServer } from '@helpers/process'

type Options = {
  measureName?: string
  startMark?: string
}

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
