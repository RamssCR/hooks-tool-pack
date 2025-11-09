import { describe, expect, test, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { isBrowser } from '@helpers/browser'
import { isServer } from '@helpers/process'
import { usePerformanceMark } from '@hooks/usePerformanceMark'

vi.mock('@helpers/process', () => ({
  isServer: vi.fn(() => false),
}))

vi.mock('@helpers/browser', () => ({
  isBrowser: vi.fn(() => true),
}))

describe('usePerformanceMark', () => {
  test('should mark performance when in browser environment', () => {
    const { result } = renderHook(() => usePerformanceMark('test-mark'))

    expect(result.current).toBeUndefined()
  })

  test('should not mark performance when in server environment', () => {
    ;(isServer as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(true)
    const { result } = renderHook(() => usePerformanceMark('test-mark'))

    expect(result.current).toBeUndefined()
  })

  test('should create and clear performance marks and measures', () => {
    const markName = 'test-mark'
    const measureName = 'test-measure'
    const startMark = 'start-mark'

    const { unmount } = renderHook(() =>
      usePerformanceMark(markName, { measureName, startMark }),
    )

    expect(performance.getEntriesByName(markName, 'mark').length).toBe(1)
    expect(performance.getEntriesByName(measureName, 'measure').length).toBe(0)

    unmount()

    expect(performance.getEntriesByName(markName, 'mark').length).toBe(0)
    expect(performance.getEntriesByName(measureName, 'measure').length).toBe(0)
  })

  test('should handle errors gracefully in development mode', async () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn())

    ;(isServer as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true)

    const originalMark = performance.mark
    const originalMeasure = performance.measure
    const originalClearMarks = performance.clearMarks
    const originalClearMeasures = performance.clearMeasures

    performance.mark = vi.fn().mockImplementation(() => {
      throw new Error('Mark error')
    })
    performance.measure = vi.fn().mockImplementation(() => {
      throw new Error('Measure error')
    })
    performance.clearMarks = vi.fn().mockImplementation(() => {
      throw new Error('Clear marks error')
    })
    performance.clearMeasures = vi.fn().mockImplementation(() => {
      throw new Error('Clear measures error')
    })

    const { unmount } = renderHook(() =>
      usePerformanceMark('error-mark', {
        measureName: 'error-measure',
        startMark: 'error-start',
      }),
    )

    await vi.waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Performance mark error:',
        expect.any(Error),
      )
    })

    unmount()

    await vi.waitFor(() => {
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Performance mark error:',
        expect.any(Error),
      )
    })

    performance.mark = originalMark
    performance.measure = originalMeasure
    performance.clearMarks = originalClearMarks
    performance.clearMeasures = originalClearMeasures
    consoleWarnSpy.mockRestore()
  })

  test('exits the hook if not in a browser environment', () => {
    ;(isBrowser as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      false,
    )
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn())

    const { result } = renderHook(() => usePerformanceMark('test-mark'))

    expect(result.current).toBeUndefined()
    expect(consoleWarnSpy).not.toHaveBeenCalled()
    consoleWarnSpy.mockRestore()
  })

  test('marks performance correctly but fails at removing marks and measures', async () => {
    ;(isServer as unknown as ReturnType<typeof vi.fn>).mockReturnValueOnce(
      false,
    )

    const markName = 'test-mark-fail-clear'
    const measureName = 'test-measure-fail-clear'
    const startMark = 'start-mark-fail-clear'

    const originalClearMarks = performance.clearMarks
    const originalClearMeasures = performance.clearMeasures
    performance.clearMarks = vi.fn().mockImplementation(() => {
      throw new Error('Clear marks error')
    })
    performance.clearMeasures = vi.fn().mockImplementation(() => {
      throw new Error('Clear measures error')
    })

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(vi.fn())

    const { unmount } = renderHook(() =>
      usePerformanceMark(markName, { measureName, startMark }),
    )

    expect(performance.getEntriesByName(markName, 'mark').length).toBe(1)

    unmount()

    await vi.waitFor(() => {
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        'Performance mark error:',
        expect.any(Error),
      )
    })

    performance.clearMarks = originalClearMarks
    performance.clearMeasures = originalClearMeasures
    consoleWarnSpy.mockRestore()
  })
})
