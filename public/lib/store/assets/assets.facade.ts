import { BaseEntityFacade } from '@redactie/utils';

import {
	AssetData,
	AssetResponse,
	AssetsApiService,
	assetsApiService,
	AssetsSearchParams,
} from '../../services/assets';

import { AssetsQuery, assetsQuery } from './assets.query';
import { AssetsStore, assetsStore } from './assets.store';

export class AssetsFacade extends BaseEntityFacade<AssetsStore, AssetsApiService, AssetsQuery> {
	public readonly meta$ = this.query.meta$;
	public readonly assets$ = this.query.assets$;
	public readonly asset$ = this.query.asset$;

	public getAssets(searchParams: AssetsSearchParams, siteId?: string): void {
		this.store.setIsFetching(true);

		this.service
			.getAssets(searchParams, siteId)
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

	public getAsset(assetId: string, siteId?: string): void {
		this.store.setIsFetchingOne(true);

		this.service
			.getAsset(assetId, siteId)
			.then(response => {
				if (response) {
					this.store.update({
						asset: response,
						isFetchingOne: false,
					});
				}
			})
			.catch(error => {
				this.store.update({
					error,
					isFetchingOne: false,
				});
			});
	}

	public createAsset(formData: FormData, siteId?: string): Promise<AssetResponse> {
		this.store.setIsCreating(true);

		return this.service
			.createAsset(formData, siteId)
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

	public updateAsset(
		assetId: string,
		assetData: Partial<AssetData>,
		siteId?: string
	): Promise<AssetResponse> {
		this.store.setIsUpdating(true);

		return this.service
			.updateAsset(assetId, assetData, siteId)
			.then(response => {
				if (response) {
					this.store.setIsUpdating(false);
				}
				return response;
			})
			.catch(error => {
				this.store.update({
					error,
					isUpdating: false,
				});
				return error;
			});
	}
}

export const assetsFacade = new AssetsFacade(assetsStore, assetsApiService, assetsQuery);
