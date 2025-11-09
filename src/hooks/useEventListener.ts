import { useEffect, useRef } from 'react'

type Target = Window | Document | HTMLElement | null

/**
 * A hook that adds an event listener to a specified element.
 * It receives an element previously accessed via a ref and attaches
 * the event listener to it, also ensuring proper cleanup on unmount or
 * when dependencies change.
 * @param event - The event type to listen for.
 * @param handler - The event handler function.
 * @param element - The element (accessed via a ref) to attach the event listener to. If null, the listener is not attached.
 * @param options - Optional options for the event listener.
 * @returns void
 * @example
 * useEventListener('click', handleClick, buttonRef.current) // Attaches a click event listener to the button element.
 * useEventListener('resize', handleResize) // Attaches a resize event listener to the window.
 * useEventListener('keydown', handleKeydown, document) // Attaches a keydown event listener to the document.
 * useEventListener('scroll', handleScroll, divRef.current, { once: true }) // Attaches a scroll event listener with once option.
 */
export const useEventListener = (
  event: string,
  handler: EventListener,
  element: Target = window,
  options?: boolean | AddEventListenerOptions,
) => {
  const savedHandler = useRef<EventListener>(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (!element?.addEventListener) return

    /**
     * A wrapper function that calls the saved handler.
     * @param e - The event object.
     * @returns void
     * @example
     * element.addEventListener('click', listener) // Calls the saved handler on click event.
     */
    const listener: EventListener = (e) => savedHandler.current?.(e)

    element.addEventListener(event, listener, options)
    return () => element.removeEventListener(event, listener, options)
  }, [event, element, options])
}
