import { useEffect } from 'react'

/**
 * Sets the document title and restores the previous title on unmount.
 * If the title changes, it updates the document title accordingly.
 * @param title - The title to set for the document.
 * @returns void
 * @example
 * useDocumentTitle('My Page Title');
 */
export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title

    document.title = title
    return () => {
      document.title = previousTitle
    }
  }, [title])
}
