[**hooks-tool-pack**](../README.md)

***

[hooks-tool-pack](../README.md) / useDocumentTitle

# Function: useDocumentTitle()

> **useDocumentTitle**(`title`): `void`

Defined in: [src/hooks/useDocumentTitle.ts:11](https://github.com/RamssCR/hooks-tool-pack/blob/1c8903ce0542bd7238dec2ae07ec771396c8295d/src/hooks/useDocumentTitle.ts#L11)

Sets the document title and restores the previous title on unmount.
If the title changes, it updates the document title accordingly.

## Parameters

### title

`string`

The title to set for the document.

## Returns

`void`

void

## Example

```ts
useDocumentTitle('My Page Title');
```
