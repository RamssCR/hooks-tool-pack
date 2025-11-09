import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '@hooks/useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('debounces function calls', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebounce(fn, 300))

    act(() => {
      result.current('a')
      result.current('b')
    })

    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledWith('b')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('cleans up timeout on unmount', () => {
    const fn = vi.fn()
    const { unmount } = renderHook(() => useDebounce(fn, 500))

    unmount()
    vi.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()
  })

  test('flush immediately invokes the function', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebounce(fn, 300))

    act(() => {
      result.current('x')
      result.current.flush('y')
    })

    expect(fn).toHaveBeenCalledWith('y')
    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(300)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('cancel prevents the function from being called', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useDebounce(fn, 300))

    act(() => {
      result.current('test')
      result.current.cancel()
    })

    vi.advanceTimersByTime(300)
    expect(fn).not.toHaveBeenCalled()
  })
})
