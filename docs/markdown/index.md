# Module: index

## Table of contents

### Enumerations

- [CropMethods](../wiki/index.CropMethods)

### Interfaces

- [AlertMessage](../wiki/index.AlertMessage)
- [AssetsAPI](../wiki/index.AssetsAPI)
- [ExternalAsset](../wiki/index.ExternalAsset)
- [ExternalModalViewComponentProps](../wiki/index.ExternalModalViewComponentProps)
- [ExternalProviderProps](../wiki/index.ExternalProviderProps)
- [ModalViewComponentProps](../wiki/index.ModalViewComponentProps)
- [ModalViewData](../wiki/index.ModalViewData)
- [NavListItem](../wiki/index.NavListItem)
- [Tab](../wiki/index.Tab)

### Type aliases

- [ExternalProviderOptions](../wiki/index#externalprovideroptions-1)
- [ImageSelectItem](../wiki/index#imageselectitem-1)
- [SelectedAsset](../wiki/index#selectedasset-1)

### Variables

- [ModalViewContainer](../wiki/index#modalviewcontainer-1)

## Type aliases

### ExternalProviderOptions

Ƭ **ExternalProviderOptions**: `Omit`<`ExternalProviderModel`, ``"target"`` \| ``"type"``\>

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

Ƭ **SelectedAsset**: `Pick`<`AssetResponse`, ``"uuid"`` \| ``"data"``\>

#### Defined in

lib/assets.types.ts:65

## Variables

### ModalViewContainer

• `Const` **ModalViewContainer**: `FC`<{ `className?`: `string`  }\>

#### Defined in

lib/components/ModalView/ModalViewContainer/ModalViewContainer.tsx:8
