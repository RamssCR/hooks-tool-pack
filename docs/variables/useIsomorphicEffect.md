[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useIsomorphicEffect

# Variable: useIsomorphicEffect()

> `const` **useIsomorphicEffect**: (`effect`, `deps?`) => `void`

Defined in: [src/hooks/useIsomorphicEffect.ts:17](https://github.com/RamssCR/hooks-tool-pack/blob/1c8903ce0542bd7238dec2ae07ec771396c8295d/src/hooks/useIsomorphicEffect.ts#L17)

A hook that uses `useLayoutEffect` on the client and `useEffect` on the server.
This is useful for avoiding warnings when rendering on the server while still
ensuring that effects run synchronously on the client.

Accepts a function that contains imperative, possibly effectful code.

## Parameters

### effect

`EffectCallback`

Imperative function that can return a cleanup function

### deps?

`DependencyList`

If present, effect will only activate if the values in the list change.

## Returns

`void`

## Version

16.8.0

## See

[https://react.dev/reference/react/useEffect](https://react.dev/reference/react/useEffect)

## See

https://reactjs.org/docs/hooks-reference.html#uselayouteffect

## Example

```ts
import { useIsomorphicEffect } from 'src/hooks/useIsomorphicEffect'
function MyComponent() {
  useIsomorphicEffect(() => {
    // Your effect logic here
  }, [])
  return <div>My Component</div>
}
```
