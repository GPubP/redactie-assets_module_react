# Interface: ModalViewComponentProps<Data\>

[index](../wiki/index).ModalViewComponentProps

## Type parameters

| Name |
| :------ |
| `Data` |

## Table of contents

### Properties

- [data](../wiki/index.ModalViewComponentProps#data-1)

### Methods

- [onCancel](../wiki/index.ModalViewComponentProps#oncancel-1)
- [onDelete](../wiki/index.ModalViewComponentProps#ondelete-1)
- [onSelect](../wiki/index.ModalViewComponentProps#onselect-1)
- [onViewChange](../wiki/index.ModalViewComponentProps#onviewchange-1)

## Properties

### data

• **data**: `Data`

#### Defined in

lib/assets.types.ts:44

## Methods

### onCancel

▸ **onCancel**(`isSaving?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isSaving?` | `boolean` |

#### Returns

`void`

#### Defined in

lib/assets.types.ts:40

___

### onDelete

▸ **onDelete**(): `void`

#### Returns

`void`

#### Defined in

lib/assets.types.ts:41

___

### onSelect

▸ **onSelect**(`assets`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `assets` | [`ImageSelectItem`](../wiki/index#imageselectitem-1)<[`SelectedAsset`](../wiki/index#selectedasset-1)\>[] |

#### Returns

`void`

#### Defined in

lib/assets.types.ts:43

___

### onViewChange

▸ **onViewChange**(`target`, `mode?`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |
| `mode?` | `string` |
| `data?` | `Partial`<`Data`\> |

#### Returns

`void`

#### Defined in

lib/assets.types.ts:42
