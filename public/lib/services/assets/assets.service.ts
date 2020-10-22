import { apiService, parseSearchParams } from '../api';

import { AssetResponse, AssetsResponse, AssetsSearchParams } from './assets.service.types';

export class AssetsApiService {
	public async getAssets(searchParams: AssetsSearchParams): Promise<AssetsResponse> {
		return await apiService
			.get('assets', {
				searchParams: parseSearchParams(searchParams),
			})
			.json<AssetsResponse>();
	}

	public async createAsset(formData: FormData): Promise<AssetResponse> {
		return await apiService
			.post('files', {
				body: formData,
			})
			.json<AssetResponse>();
	}
}

export const assetsApiService = new AssetsApiService();
