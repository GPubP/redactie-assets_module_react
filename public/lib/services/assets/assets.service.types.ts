export interface AssetsResponse {
	_embedded: AssetResponse[];
	_page: AssetsMetaResponse;
}

export interface AssetsMetaResponse {
	size: number;
	totalElements: number;
	totalPages: number;
	number: number;
}

export interface AssetResponse {
	_id: string;
	data: {
		name: string;
		category: string;
		description: string;
		copyright: string;
		file: AssetFile;
		parent: any;
		thumbnail: string | null;
		metaData: {
			width?: number;
			height?: number;
		};
		type: string;
	};
	meta: {
		deleted: boolean;
		lastEditor: string;
		tenant: string;
		created: string;
		lastUpdated: string;
	};
	uuid: string;
}

export interface AssetsSearchParams {
	sort: string;
	page: number;
	pagesize: number;
	search: string;
	type: string;
	category: string;
}

export interface AssetFile {
	type: {
		mime: string;
		extension: string;
	};
	size: number;
	reference: string;
	name: string;
}
