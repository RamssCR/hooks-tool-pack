import { describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useEventListener } from '@hooks/useEventListener'

describe('useEventListener', () => {
  test('should attach and detach event listener on element', () => {
    const handler = vi.fn()
    const element = document.createElement('div')

    const { unmount } = renderHook(() =>
      useEventListener('click', handler, element),
    )

    act(() => {
      element.click()
    })

    expect(handler).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      element.click()
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should update event handler when it changes', () => {
    const initialHandler = vi.fn()
    const updatedHandler = vi.fn()
    const element = document.createElement('div')

    const { rerender } = renderHook(
      ({ handler }) => useEventListener('click', handler, element),
      { initialProps: { handler: initialHandler } },
    )

    act(() => {
      element.click()
    })

    expect(initialHandler).toHaveBeenCalledTimes(1)

    rerender({ handler: updatedHandler })

    act(() => {
      element.click()
    })

    expect(updatedHandler).toHaveBeenCalledTimes(1)
    expect(initialHandler).toHaveBeenCalledTimes(1)
  })

  test('should not attach listener if element is null', () => {
    const handler = vi.fn()
    renderHook(() => useEventListener('click', handler, null))

    act(() => {
      const event = new MouseEvent('click')
      window.dispatchEvent(event)
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
