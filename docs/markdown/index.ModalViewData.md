# Interface: ModalViewData

[index](../wiki/index).ModalViewData

## Table of contents

### Properties

- [config](../wiki/index.ModalViewData#config)
- [externalFiles](../wiki/index.ModalViewData#externalfiles)
- [imageFieldValue](../wiki/index.ModalViewData#imagefieldvalue)
- [mode](../wiki/index.ModalViewData#mode)
- [queuedFiles](../wiki/index.ModalViewData#queuedfiles)
- [selectedFiles](../wiki/index.ModalViewData#selectedfiles)

### Methods

- [onManualUpload](../wiki/index.ModalViewData#onmanualupload)
- [setImageFieldValue](../wiki/index.ModalViewData#setimagefieldvalue)

## Properties

### config

• `Optional` **config**: [`ImageUploadConfig`](../wiki/index.%3Cinternal%3E.ImageUploadConfig)

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:31

___

### externalFiles

• `Optional` **externalFiles**: [`ExternalAsset`](../wiki/index.ExternalAsset)[]

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:35

___

### imageFieldValue

• `Optional` **imageFieldValue**: [`ImageFieldValue`](../wiki/index.%3Cinternal%3E.ImageFieldValue)

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:32

___

### mode

• **mode**: [`ModalViewMode`](../wiki/index.%3Cinternal%3E.ModalViewMode)

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:33

___

### queuedFiles

• `Optional` **queuedFiles**: `File`[]

#### Defined in

lib/components/Fields/ImageUpload/ImageUpload.types.ts:34

___

### selectedFiles

• **selectedFiles**: [`SelectedAsset`](../wiki/index#selectedasset)[]

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
