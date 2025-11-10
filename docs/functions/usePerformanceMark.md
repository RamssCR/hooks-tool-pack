[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / usePerformanceMark

# Function: usePerformanceMark()

> **usePerformanceMark**(`markName`, `options?`): `void`

Defined in: [src/hooks/usePerformanceMark.ts:30](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/usePerformanceMark.ts#L30)

A React hook to create performance marks using the Performance API.
It allows you to define custom marks and measures for profiling
application performance. The hook cleans up the marks and measures
when the component unmounts.

## Parameters

### markName

`string`

The name of the performance mark to create.

### options?

[`Options`](../type-aliases/Options.md)

Optional settings for the performance mark, including measureName and startMark.

## Returns

`void`

void

## Example

```ts
const Component = () => {
  usePerformanceMark('component-mount', { measureName: 'mount-time', startMark: 'app-start' })
  return <div>My Component</div>
}
```
