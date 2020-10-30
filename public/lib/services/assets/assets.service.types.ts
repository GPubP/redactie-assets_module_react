/**
 * Response types
 */

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

export interface AssetFile {
	type: {
		mime: string;
		extension: string;
	};
	size: number;
	reference: string;
	name: string;
}

export interface AssetCropsResponse {
	uuid: string;
	data: {
		name: string;
		description: string;
		copyright: string;
		category: string;
		file: {
			type: {
				mime: string;
				extension: string;
			};
			size: number;
			ref: string;
			name: string;
		};
		parent: string;
		thumbnail: string;
		metaData: {
			width: string;
			height: string;
			language: string;
		};
		attributes: Record<string, any>;
		type: string;
	};
	meta: {
		created: string;
		lastUpdated: string;
		lastEditor: string;
		tenant: string;
	};
}

/**
 * Request types
 */

export interface AssetsSearchParams {
	sort: string;
	page: number;
	pagesize: number;
	search: string;
	type: string;
	category: string;
}

export interface AssetCropsRequest {
	uuid: string;
	cropData: {
		[key: string]: {
			grayscale: boolean;
			blur: number;
			x: number;
			y: number;
			width: number;
			height: number;
			rotate: number;
		};
	};
	settings: [
		{
			type: 'free' | 'exact' | 'boundary' | 'ratio';
			label: string;
			safeLabel: string;
			ratio?: {
				width: number;
				height: number;
			};
			_lockID?: boolean;
			width?: number;
			height?: number;
			lockRatio?: boolean;
			minWidth?: number;
			minHeight?: number;
			maxWidth?: number;
			maxHeight?: number;
		}
	];
}
