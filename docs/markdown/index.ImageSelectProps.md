# Interface: ImageSelectProps

[index](../wiki/index).ImageSelectProps

## Table of contents

### Properties

- [className](../wiki/index.ImageSelectProps#classname)
- [dataKey](../wiki/index.ImageSelectProps#datakey)
- [items](../wiki/index.ImageSelectProps#items)
- [selection](../wiki/index.ImageSelectProps#selection)

### Methods

- [compareSelected](../wiki/index.ImageSelectProps#compareselected)
- [onSelect](../wiki/index.ImageSelectProps#onselect)

## Properties

### className

• `Optional` **className**: `string`

Class that will be set on the internal wrapper div

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:5

___

### dataKey

• `Optional` **dataKey**: `string`

The key of eacht item that should be use to uniquely identify an item in the DOM

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:8

___

### items

• **items**: [`ImageSelectItem`](../wiki/index#imageselectitem)<{ `[key: string]`: `any`;  }\>[]

List of images

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:10

___

### selection

• **selection**: (`string` \| [`ImageSelectItem`](../wiki/index#imageselectitem)<{ `[key: string]`: `any`;  }\>)[]

List of selected items / images

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:12

## Methods

### compareSelected

▸ `Optional` **compareSelected**(`item`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`ImageSelectItem`](../wiki/index#imageselectitem)<{ `[key: string]`: `any`;  }\> |

#### Returns

`boolean`

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:6

___

### onSelect

▸ `Optional` **onSelect**(`item`): `void`

Callback that is called when an image is selected

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`ImageSelectItem`](../wiki/index#imageselectitem)<{ `[key: string]`: `any`;  }\> |

#### Returns

`void`

#### Defined in

lib/components/ImageSelect/ImageSelect.types.ts:14
