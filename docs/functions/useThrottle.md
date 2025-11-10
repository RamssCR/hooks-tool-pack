[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useThrottle

# Function: useThrottle()

> **useThrottle**\<`T`\>(`callback`, `delay`): (...`args`) => `void` & `object`

Defined in: [src/hooks/useThrottle.ts:16](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useThrottle.ts#L16)

A hook that provides a throttled version of a callback function.
It ensures that the callback is invoked at most once in a specified delay period.

## Type Parameters

### T

`T` *extends* `unknown`[]

## Parameters

### callback

(...`args`) => `void`

The function to be throttled.

### delay

`number`

The delay period in milliseconds.

## Returns

A throttled version of the callback function.

## Example

```ts
const throttledFunction = useThrottle((value) => {
  console.log(value);
}, 300);
throttledFunction('Hello'); // Will log 'Hello' immediately, then ignore subsequent calls for 300ms.
throttledFunction.cancel(); // Cancels any pending execution.
```
