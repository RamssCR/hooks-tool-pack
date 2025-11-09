import { describe, expect, test, vi } from 'vitest'
import { useEffect, useLayoutEffect } from 'react'

describe('useIsomorphicEffect', () => {
  test('should use useLayoutEffect on the client', async () => {
    const { useIsomorphicEffect } = await import('@hooks/useIsomorphicEffect')
    expect(useIsomorphicEffect).toBe(useLayoutEffect)
  })

  test('should use useEffect on the server', async () => {
    const originalWindow = globalThis.window
    const originalDocument = globalThis.document

    globalThis.window = undefined as unknown as Window & typeof globalThis
    globalThis.document = undefined as unknown as Document

    vi.resetModules()
    const { useIsomorphicEffect } = await import('@hooks/useIsomorphicEffect')
    expect(useIsomorphicEffect).toBe(useEffect)

    globalThis.window = originalWindow
    globalThis.document = originalDocument
  })
})
