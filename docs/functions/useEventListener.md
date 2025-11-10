[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useEventListener

# Function: useEventListener()

> **useEventListener**(`event`, `handler`, `element`, `options?`): `void`

Defined in: [src/hooks/useEventListener.ts:25](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useEventListener.ts#L25)

A hook that adds an event listener to a specified element.
It receives an element previously accessed via a ref and attaches
the event listener to it, also ensuring proper cleanup on unmount or
when dependencies change.

## Parameters

### event

`string`

The event type to listen for.

### handler

`EventListener`

The event handler function.

### element

[`Target`](../type-aliases/Target.md) = `window`

The element (accessed via a ref) to attach the event listener to. If null, the listener is not attached.

### options?

Optional options for the event listener.

`boolean` | `AddEventListenerOptions`

## Returns

`void`

void

## Example

```ts
useEventListener('click', handleClick, buttonRef.current) // Attaches a click event listener to the button element.
useEventListener('resize', handleResize) // Attaches a resize event listener to the window.
useEventListener('keydown', handleKeydown, document) // Attaches a keydown event listener to the document.
useEventListener('scroll', handleScroll, divRef.current, { once: true }) // Attaches a scroll event listener with once option.
```
