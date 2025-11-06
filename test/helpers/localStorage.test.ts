import { beforeEach, describe, expect, test } from 'vitest'
import { createLocalStorage } from '@helpers/localStorage'

describe('localStorage Wrapper Helpers', () => {
  let storage: ReturnType<typeof createLocalStorage<'testKey'>>

  beforeEach(() => {
    localStorage.clear()
    storage = createLocalStorage<'testKey'>()
  })

  test('sets and gets an item correctly', () => {
    const testValue = { name: 'Test' }

    storage.set('testKey', testValue)
    const retrievedValue = storage.get<{ name: string }>('testKey')
    expect(retrievedValue).toEqual(testValue)
  })

  test('returns fallback value when key does not exist', () => {
    const fallbackValue = { name: 'Fallback' }
    const retrievedValue = storage.get<{ name: string }>(
      'testKey',
      fallbackValue,
    )
    expect(retrievedValue).toEqual(fallbackValue)
  })

  test('returns fallback after parsing throws error', () => {
    localStorage.setItem('testKey', 'invalid JSON')
    const fallbackValue = { name: 'Fallback' }
    const retrievedValue = storage.get<{ name: string }>(
      'testKey',
      fallbackValue,
    )
    expect(retrievedValue).toEqual(fallbackValue)
  })

  test('returns null after parsing throws error without fallback', () => {
    localStorage.setItem('testKey', 'invalid JSON')
    const retrievedValue = storage.get<{ name: string }>('testKey')
    expect(retrievedValue).toBeNull()
  })

  test('removes an item correctly', () => {
    const testValue = { name: 'ToBeRemoved' }
    storage.set('testKey', testValue)
    storage.remove('testKey')
    const retrievedValue = storage.get<{ name: string }>('testKey')
    expect(retrievedValue).toBeNull()
  })

  test('clears all items correctly', () => {
    storage.set('testKey', { name: 'ToBeCleared' })
    storage.clear()
    const retrievedValue = storage.get<{ name: string }>('testKey')
    expect(retrievedValue).toBeNull()
  })
})
