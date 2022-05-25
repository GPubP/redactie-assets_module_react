# Module: index

## Table of contents

### Namespaces

- [&lt;internal\&gt;](../wiki/index.%3Cinternal%3E)

### Enumerations

- [CropMethods](../wiki/index.CropMethods)

### Interfaces

- [AlertMessage](../wiki/index.AlertMessage)
- [AssetsAPI](../wiki/index.AssetsAPI)
- [ExternalAsset](../wiki/index.ExternalAsset)
- [ExternalModalViewComponentProps](../wiki/index.ExternalModalViewComponentProps)
- [ExternalProviderProps](../wiki/index.ExternalProviderProps)
- [ImageSelectProps](../wiki/index.ImageSelectProps)
- [ModalViewComponentProps](../wiki/index.ModalViewComponentProps)
- [ModalViewData](../wiki/index.ModalViewData)
- [NavListItem](../wiki/index.NavListItem)
- [Tab](../wiki/index.Tab)

### Type aliases

- [ExternalProviderOptions](../wiki/index#externalprovideroptions)
- [ImageSelectItem](../wiki/index#imageselectitem)
- [SelectedAsset](../wiki/index#selectedasset)

### Variables

- [ModalViewContainer](../wiki/index#modalviewcontainer)

## Type aliases

### ExternalProviderOptions

Ƭ **ExternalProviderOptions**: `Omit`<[`ExternalProviderModel`](../wiki/index.%3Cinternal%3E.ExternalProviderModel), ``"target"`` \| ``"type"``\>

#### Defined in

lib/store/api/externalProviders/externalProviders.model.ts:20

___

### ImageSelectItem

Ƭ **ImageSelectItem**<`Data`\>: `Data` & { `disabled?`: `boolean` ; `src`: `string` ; `title`: `string`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Data` | { `[key: string]`: `any`;  } |

#### Defined in

lib/assets.types.ts:33

___

### SelectedAsset

Ƭ **SelectedAsset**: `Pick`<[`AssetResponse`](../wiki/index.%3Cinternal%3E.AssetResponse), ``"uuid"`` \| ``"data"``\>

#### Defined in

lib/assets.types.ts:65

## Variables

### ModalViewContainer

• `Const` **ModalViewContainer**: `FC`<{ `className?`: `string`  }\>

#### Defined in

lib/components/ModalView/ModalViewContainer/ModalViewContainer.tsx:8
