[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useToggle

# Function: useToggle()

> **useToggle**(`initial`): `object`

Defined in: [src/hooks/useToggle.ts:14](https://github.com/RamssCR/hooks-tool-pack/blob/584beee882f8ad4c4e91becd60bfc68728c2a98f/src/hooks/useToggle.ts#L14)

Custom hook to manage a boolean toggle state.
This hook provides methods to toggle, turn on, and turn off the state.

## Parameters

### initial

`boolean` = `false`

The initial state of the toggle (default is false).

## Returns

An object containing the current state and methods to manipulate it.

### active

> **active**: `boolean`

### off()

> **off**: () => `void`

Sets the state to false.

#### Returns

`void`

### on()

> **on**: () => `void`

Sets the state to true.

#### Returns

`void`

### toggle()

> **toggle**: () => `void`

Toggles the current state.

#### Returns

`void`

## Example

```ts
const { active, toggle, on, off } = useToggle(true);
console.log(active); // true
toggle();
console.log(active); // false
```
