import { apiService, parseSearchParams } from '../api';

import {
	AssetCropsRequest,
	AssetCropsResponse,
	AssetResponse,
	AssetsResponse,
	AssetsSearchParams,
} from './assets.service.types';

export class AssetsApiService {
	public async getAssets(
		searchParams: AssetsSearchParams,
		siteId?: string
	): Promise<AssetsResponse> {
		const path = siteId ? `sites/${siteId}/assets` : 'assets';
		return await apiService
			.get(path, {
				searchParams: parseSearchParams(searchParams),
			})
			.json<AssetsResponse>();
	}

	public async createAsset(formData: FormData): Promise<AssetResponse> {
		return await apiService
			.post('files', {
				body: formData,
				timeout: 30000, // Up the timeout for uploading large files
			})
			.json<AssetResponse>();
	}

	public async generateCrops(
		assetId: string,
		crops: AssetCropsRequest
	): Promise<AssetCropsResponse> {
		return await apiService
			.post(`assets/${assetId}/generate-crops`, {
				json: crops,
			})
			.json<AssetCropsResponse>();
	}
}

export const assetsApiService = new AssetsApiService();
