import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { useToggle } from '@hooks/useToggle'

describe('useToggle', () => {
  test('activates initial state', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current.active).toBe(true)
  })

  test('deactivates initial state', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current.active).toBe(false)
  })

  test('toggles state', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current.active).toBe(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.active).toBe(true)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.active).toBe(false)
  })

  test('sets state to true', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current.active).toBe(false)

    act(() => {
      result.current.on()
    })
    expect(result.current.active).toBe(true)
  })

  test('sets state to false', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current.active).toBe(true)

    act(() => {
      result.current.off()
    })
    expect(result.current.active).toBe(false)
  })
})
