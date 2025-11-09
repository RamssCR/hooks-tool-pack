import { beforeEach, describe, expect, test } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useDocumentTitle } from '@hooks/useDocumentTitle'

describe('useDocumentTitle', () => {
  beforeEach(() => {
    document.title = 'Previous Title'
  })

  test('should set the document title', () => {
    renderHook(() => useDocumentTitle('My Page Title'))
    expect(document.title).toBe('My Page Title')
  })

  test('should restore the previous title on unmount', () => {
    const { unmount } = renderHook(() => useDocumentTitle('My Page Title'))
    unmount()
    expect(document.title).toBe('Previous Title')
  })
})
