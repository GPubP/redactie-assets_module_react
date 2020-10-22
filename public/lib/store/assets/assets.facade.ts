import { BaseEntityFacade } from '@redactie/utils';

import { AssetResponse, AssetsApiService, assetsApiService } from '../../services/assets';

import { AssetsQuery, assetsQuery } from './assets.query';
import { AssetsStore, assetsStore } from './assets.store';

export class AssetsFacade extends BaseEntityFacade<AssetsStore, AssetsApiService, AssetsQuery> {
	public readonly meta$ = this.query.meta$;
	public readonly assets$ = this.query.assets$;
	public readonly asset$ = this.query.asset$;

	public getAssets(): void {
		this.store.setIsFetching(true);

		this.service
			.getAssets()
			.then(response => {
				if (response) {
					this.store.set(response._embedded);
					this.store.update({
						meta: response._page,
						isFetching: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isFetching: false,
				});
			});
	}

	public createAsset(formData: FormData): Promise<AssetResponse> {
		this.store.setIsCreating(true);

		return this.service
			.createAsset(formData)
			.then(response => {
				if (response) {
					this.store.setIsCreating(false);
				}
				return response;
			})
			.catch(error => {
				this.store.update({
					error,
					isCreating: false,
				});
				return error;
			});
	}
}

export const assetsFacade = new AssetsFacade(assetsStore, assetsApiService, assetsQuery);
