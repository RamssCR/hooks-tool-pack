import { describe, expect, test, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { isBrowser } from '@helpers/browser'
import { useNetworkStatus } from '@hooks/useNetworkStatus'

vi.mock('@helpers/browser', () => ({
  isBrowser: vi.fn(() => true),
}))

describe('useNetworkStatus', () => {
  test('should return true when navigator.onLine is true', () => {
    Object.defineProperty(globalThis.navigator, 'onLine', {
      value: true,
      configurable: true,
    })
    const { result } = renderHook(() => useNetworkStatus())
    expect(result.current).toBe(true)
  })

  test('should update when offline event is triggered', () => {
    Object.defineProperty(globalThis.navigator, 'onLine', {
      value: false,
      configurable: true,
    })
    const { result } = renderHook(() => useNetworkStatus())
    act(() => window.dispatchEvent(new Event('offline')))
    expect(result.current).toBe(false)
  })

  test('should update when online event is triggered', () => {
    Object.defineProperty(globalThis.navigator, 'onLine', {
      value: true,
      configurable: true,
    })
    const { result } = renderHook(() => useNetworkStatus())
    act(() => window.dispatchEvent(new Event('online')))
    expect(result.current).toBe(true)
  })

  test('assigns true by default in non-browser environments', () => {
    ;(isBrowser as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false)

    const { result } = renderHook(() => useNetworkStatus())
    expect(result.current).toBe(true)
  })

  test('removes event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useNetworkStatus())

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    )
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'online',
      expect.any(Function),
    )
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'offline',
      expect.any(Function),
    )
  })
})
