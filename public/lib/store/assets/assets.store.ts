import { StoreConfig } from '@datorama/akita';
import { BaseEntityStore } from '@redactie/utils';

import { AssetModel, AssetsState } from './assets.model';

@StoreConfig({ name: 'assets', idKey: 'uuid' })
export class AssetsStore extends BaseEntityStore<AssetsState, AssetModel> {}

export const assetsStore = new AssetsStore();
