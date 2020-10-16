import { BaseEntityState } from '@redactie/utils';

import { AssetResponse, AssetsMetaResponse } from '../../services/assets';

export type AssetModel = AssetResponse;

export interface AssetsState extends BaseEntityState<AssetModel, string> {
	meta?: AssetsMetaResponse;
	asset?: AssetModel;
}
