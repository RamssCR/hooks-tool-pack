import { beforeEach, describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from '@hooks/useLocalStorage'

describe('useLocalStorage Hook', () => {
  const STORAGE_KEY = 'testKey'
  const INITIAL_VALUE = { theme: 'light' }

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  test('should initialize with initial value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )
    expect(result.current.value).toEqual(INITIAL_VALUE)
  })

  test('should initialize with value from localStorage if it exists', () => {
    const storedValue = { theme: 'dark' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedValue))

    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )
    expect(result.current.value).toEqual(storedValue)
  })

  test('should update localStorage when setValue is called', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )
    const newValue = { theme: 'dark' }

    act(() => {
      result.current.setValue(newValue)
    })

    const storedValue = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    expect(storedValue).toEqual(newValue)
    expect(result.current.value).toEqual(newValue)
  })

  test('should remove item from localStorage and reset state when remove is called', () => {
    const storedValue = { theme: 'dark' }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedValue))

    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )

    act(() => {
      result.current.remove()
    })

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(result.current.value).toEqual(INITIAL_VALUE)
  })

  test('should clear all localStorage when clearStorage is called', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: 'dark' }))
    localStorage.setItem('anotherKey', JSON.stringify({ data: 123 }))

    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )

    act(() => {
      result.current.clearStorage()
    })

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(localStorage.getItem('anotherKey')).toBeNull()
    expect(result.current.value).toEqual(INITIAL_VALUE)
  })

  test('should update state when storage event is fired for the same key', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )
    const newValue = { theme: 'dark' }

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: STORAGE_KEY,
          newValue: JSON.stringify(newValue),
          oldValue: JSON.stringify(INITIAL_VALUE),
        }),
      )
    })

    expect(result.current.value).toEqual(newValue)
  })

  test('should not update state when storage event is fired for a different key', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'differentKey',
          newValue: JSON.stringify({ theme: 'dark' }),
          oldValue: JSON.stringify(INITIAL_VALUE),
        }),
      )
    })

    expect(result.current.value).toEqual(INITIAL_VALUE)
  })

  test('should handle invalid JSON in storage event gracefully', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: STORAGE_KEY,
          newValue: 'invalid JSON',
          oldValue: JSON.stringify(INITIAL_VALUE),
        }),
      )
    })

    expect(result.current.value).toEqual(INITIAL_VALUE)
  })

  test('sets initial value if e.newValue is null in storage event', () => {
    const { result } = renderHook(() =>
      useLocalStorage<typeof INITIAL_VALUE>(STORAGE_KEY, INITIAL_VALUE),
    )

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: STORAGE_KEY,
          newValue: null,
          oldValue: JSON.stringify({ theme: 'dark' }),
        }),
      )
    })

    expect(result.current.value).toEqual(INITIAL_VALUE)
  })
})
