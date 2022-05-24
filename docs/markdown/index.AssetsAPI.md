# Interface: AssetsAPI

[index](../wiki/index).AssetsAPI

## Table of contents

### Properties

- [ImageSelect](../wiki/index.AssetsAPI#imageselect)
- [registerAssetsProvider](../wiki/index.AssetsAPI#registerassetsprovider)

## Properties

### ImageSelect

• **ImageSelect**: `FC`<[`ImageSelectProps`](../wiki/index.ImageSelectProps)\>

#### Defined in

lib/api/api.types.ts:7

___

### registerAssetsProvider

• **registerAssetsProvider**: (`name`: `string`, `options`: [`ExternalProviderOptions`](../wiki/index#externalprovideroptions)) => `void`

#### Type declaration

▸ (`name`, `options`): `void`

Register a external assets provider

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | A unique name to identity your external assets provider |
| `options` | [`ExternalProviderOptions`](../wiki/index#externalprovideroptions) | options to setup your external assets provider |

##### Returns

`void`

void

#### Defined in

lib/api/api.types.ts:6
