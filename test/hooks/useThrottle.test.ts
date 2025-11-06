import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useThrottle } from '@hooks/useThrottle'

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('calls function immediately and throttles subsequent calls', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(500)
    result.current('c')
    expect(fn).toHaveBeenCalledWith('a')
  })

  test('calls trailing function after delay', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenCalledWith('b')
  })

  test('exits the function if there is already a pending timeout', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
      result.current('c')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(500)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenCalledWith('c')
  })

  test('covers else path when there is no trailing call', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useThrottle(callback, 300))

    act(() => {
      result.current('a')
    })

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('forces else branch by canceling before timeout', () => {
    const callback = vi.fn()
    const { result } = renderHook(() => useThrottle(callback, 300))

    act(() => {
      result.current('a')
      result.current('b')
    })

    act(() => {
      result.current.cancel()
    })

    vi.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('calls trailing arguments if any after delay', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, 500))

    act(() => {
      result.current('a')
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('a')

    vi.advanceTimersByTime(300)

    act(() => {
      result.current('b')
    })

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenCalledWith('b')
  })

  test('cleans timeout on unmount', () => {
    const fn = vi.fn()
    const { result, unmount } = renderHook(() => useThrottle(fn, 500))
    act(() => result.current('a'))
    unmount()
    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('cancel prevents pending calls', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottle(fn, 500))

    act(() => {
      result.current('a')
      result.current('b')
      result.current.cancel()
    })

    vi.advanceTimersByTime(1000)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
