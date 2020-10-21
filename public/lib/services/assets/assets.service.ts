import { apiService, parseSearchParams } from '../api';

import { AssetsResponse, AssetsSearchParams } from './assets.service.types';

export class AssetsApiService {
	public async getAssets(searchParams: AssetsSearchParams): Promise<AssetsResponse | null> {
		try {
			return await apiService
				.get('assets', {
					searchParams: parseSearchParams(searchParams),
				})
				.json<AssetsResponse>();
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export const assetsApiService = new AssetsApiService();
