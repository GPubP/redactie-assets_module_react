import { BaseEntityFacade } from '@redactie/utils';

import { AssetsApiService, assetsApiService, AssetsSearchParams } from '../../services/assets';

import { AssetsQuery, assetsQuery } from './assets.query';
import { AssetsStore, assetsStore } from './assets.store';

export class AssetsFacade extends BaseEntityFacade<AssetsStore, AssetsApiService, AssetsQuery> {
	public readonly meta$ = this.query.meta$;
	public readonly assets$ = this.query.assets$;
	public readonly asset$ = this.query.asset$;

	public getAssets(searchParams: AssetsSearchParams): void {
		this.store.setIsFetching(true);

		this.service
			.getAssets(searchParams)
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
}

export const assetsFacade = new AssetsFacade(assetsStore, assetsApiService, assetsQuery);
