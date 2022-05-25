# Interface: ModalViewComponentProps<Data\>

[index](../wiki/index).ModalViewComponentProps

## Type parameters

| Name |
| :------ |
| `Data` |

## Table of contents

### Properties

- [data](../wiki/index.ModalViewComponentProps#data)

### Methods

- [onCancel](../wiki/index.ModalViewComponentProps#oncancel)
- [onDelete](../wiki/index.ModalViewComponentProps#ondelete)
- [onSelect](../wiki/index.ModalViewComponentProps#onselect)
- [onViewChange](../wiki/index.ModalViewComponentProps#onviewchange)

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
| `assets` | [`ImageSelectItem`](../wiki/index#imageselectitem)<[`SelectedAsset`](../wiki/index#selectedasset)\>[] |

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
