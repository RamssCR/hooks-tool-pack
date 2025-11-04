import { describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { usePrevious } from '@hooks/usePrevious'

describe('usePrevious Hook', () => {
  test('should return null on initial render', () => {
    const { result } = renderHook(() => usePrevious(10))
    expect(result.current).toBeNull()
  })

  test('should return previous value after update', () => {
    let value = 10
    const { result, rerender } = renderHook(() => usePrevious(value))
    expect(result.current).toBeNull()

    value = 20
    rerender()
    expect(result.current).toBe(10)
  })

  test('should handle multiple updates correctly', () => {
    let value = 'first'
    const { result, rerender } = renderHook(() => usePrevious(value))
    expect(result.current).toBeNull()

    value = 'second'
    rerender()
    expect(result.current).toBe('first')

    value = 'third'
    rerender()
    expect(result.current).toBe('second')
  })
})
