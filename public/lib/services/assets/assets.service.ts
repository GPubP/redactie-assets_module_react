// import { SearchParams } from '../api';
import apiService, { parseSearchParams } from '../api/api.service';

import { AssetResponse, AssetsResponse } from './assets.service.types';

export class AssetsApiService {
	public async getAssets(): Promise<AssetsResponse> {
		// TODO: implement when API is ready
		// return await apiService
		// 	.get('assets', {
		// 		searchParams: parseSearchParams(searchParams),
		// 	})
		// 	.json<AssetsResponse>();

		return Promise.resolve({
			_embedded: [
				{
					_id: '5f8955d8ab1e53000fdf2a6a',
					data: {
						name: 'en',
						category: 'translation',
						description: 'English translation file',
						copyright: 'shd',
						file: {
							type: {
								mime: 'application/octet-stream',
								extension: 'po',
							},
							size: 1084,
							reference: 'c91c617b-6799-4216-8ec7-221702212fa2',
							name: 'en.po',
						},
						parent: null,
						thumbnail: null,
						metaData: {
							language: 'en',
						},
						type: 'source',
					},
					meta: {
						deleted: false,
						lastEditor: 'Bart N',
						tenant: '90963f74-37f2-466e-9428-481ace181bc0',
						created: '2020-10-16T08:12:08.395Z',
						lastUpdated: '2020-10-16T08:12:08.395Z',
					},
					uuid: '24df240f-3853-4d27-b349-3c7dcce1b718',
				},
				{
					_id: '5f895525ab1e53000fdf2a68',
					data: {
						name: 'de-redactie',
						category: 'image',
						description: 'Test image',
						copyright: 'sabam',
						file: {
							type: {
								mime: 'image/jpeg',
								extension: 'jpeg',
							},
							size: 63575,
							reference: 'b0a6fab1-9f33-4c5c-b983-75c2958fafca',
							name: 'friends.jpeg',
						},
						parent: null,
						thumbnail: '75b1847c-dc9c-47e3-a33a-fd947d6ca978',
						metaData: {
							width: 763,
							height: 539,
						},
						type: 'source',
					},
					meta: {
						deleted: false,
						lastEditor: 'Bart N',
						tenant: '90963f74-37f2-466e-9428-481ace181bc0',
						created: '2020-10-16T08:09:09.425Z',
						lastUpdated: '2020-10-16T08:09:09.425Z',
					},
					uuid: '7df1e781-dec4-46a5-978c-4082c72f9e3c',
				},
				{
					_id: '5f8954bbab1e53000fdf2a66',
					data: {
						name: 'friends',
						category: 'image',
						description: 'Test image',
						copyright: 'sabam',
						file: {
							type: {
								mime: 'image/jpeg',
								extension: 'jpeg',
							},
							size: 63575,
							reference: 'd8652aba-139a-4f55-b052-7ab592fa5017',
							name: 'friends.jpeg',
						},
						parent: null,
						thumbnail: '6f2aa035-bc12-45ca-b0ed-c4c1fe57b564',
						metaData: {
							width: 763,
							height: 539,
						},
						type: 'source',
					},
					meta: {
						deleted: false,
						lastEditor: 'Bart N',
						tenant: '90963f74-37f2-466e-9428-481ace181bc0',
						created: '2020-10-16T08:07:23.305Z',
						lastUpdated: '2020-10-16T08:07:23.306Z',
					},
					uuid: 'af9bbdf0-967b-4a97-a152-eb3266ce7a6c',
				},
			],
			_page: {
				size: 10,
				totalElements: 3,
				totalPages: 1,
				number: 1,
			},
		});
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
