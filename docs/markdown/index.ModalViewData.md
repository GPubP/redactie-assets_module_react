# Interface: ModalViewData

[index](../wiki/index).ModalViewData

## Table of contents

### Properties

- [config](../wiki/index.ModalViewData#config-1)
- [externalFiles](../wiki/index.ModalViewData#externalfiles-1)
- [imageFieldValue](../wiki/index.ModalViewData#imagefieldvalue-1)
- [mode](../wiki/index.ModalViewData#mode-1)
- [queuedFiles](../wiki/index.ModalViewData#queuedfiles-1)
- [selectedFiles](../wiki/index.ModalViewData#selectedfiles-1)

### Methods

- [onManualUpload](../wiki/index.ModalViewData#onmanualupload-1)
- [setImageFieldValue](../wiki/index.ModalViewData#setimagefieldvalue-1)

## Properties

### config

• `Optional` **config**: `ImageUploadConfig`

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:31

___

### externalFiles

• `Optional` **externalFiles**: [`ExternalAsset`](../wiki/index.ExternalAsset)[]

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:35

___

### imageFieldValue

• `Optional` **imageFieldValue**: `ImageFieldValue`

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:32

___

### mode

• **mode**: `ModalViewMode`

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:33

___

### queuedFiles

• `Optional` **queuedFiles**: `File`[]

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:34

___

### selectedFiles

• **selectedFiles**: [`SelectedAsset`](../wiki/index#selectedasset-1)[]

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:36

## Methods

### onManualUpload

▸ **onManualUpload**(`files`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `files` | `File`[] |

#### Returns

`void`

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:37

___

### setImageFieldValue

▸ **setImageFieldValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`void`

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:38
