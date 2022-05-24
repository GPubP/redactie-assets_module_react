# Interface: Tab<Data\>

[index](../wiki/index).Tab

## Type parameters

| Name |
| :------ |
| `Data` |

## Table of contents

### Properties

- [active](../wiki/index.Tab#active)
- [disabled](../wiki/index.Tab#disabled)
- [id](../wiki/index.Tab#id)
- [name](../wiki/index.Tab#name)
- [target](../wiki/index.Tab#target)
- [type](../wiki/index.Tab#type)
- [viewComponent](../wiki/index.Tab#viewcomponent)

### Methods

- [onClick](../wiki/index.Tab#onclick)

## Properties

### active

• **active**: `boolean`

#### Defined in

lib/assets.types.ts:23

___

### disabled

• `Optional` **disabled**: `boolean`

#### Defined in

lib/assets.types.ts:24

___

### id

• `Optional` **id**: `string`

#### Defined in

lib/assets.types.ts:25

___

### name

• **name**: `string`

#### Defined in

lib/assets.types.ts:26

___

### target

• **target**: `string`

#### Defined in

lib/assets.types.ts:29

___

### type

• `Optional` **type**: ``"internal"`` \| ``"external"``

#### Defined in

lib/assets.types.ts:27

___

### viewComponent

• **viewComponent**: `FC`<[`ModalViewComponentProps`](../wiki/index.ModalViewComponentProps)<`Data`\>\> \| `FC`<[`ExternalModalViewComponentProps`](../wiki/index.ExternalModalViewComponentProps)<`Data`\>\>

#### Defined in

lib/assets.types.ts:30

## Methods

### onClick

▸ `Optional` **onClick**(`viewData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewData` | `Data` |

#### Returns

`void`

#### Defined in

lib/assets.types.ts:28
