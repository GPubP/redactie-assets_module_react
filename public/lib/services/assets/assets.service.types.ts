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
		attributes: {
			alt: string;
			title: string;
		};
		name: string;
		category: string;
		description: string;
		copyright: string;
		file: AssetFile;
		parent: any;
		thumbnail: string | null;
		metaData: AssetMetaData;
		type: string;
		figuratively?: boolean;
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

export interface AssetMetaData {
	width?: number;
	height?: number;
}

export interface AssetCropsResponse {
	crops: {
		[key: string]: {
			asset: {
				mime: string;
				source: string;
				url: string;
				uuid: string;
			};
			name: string;
			width: number;
			height: number;
			settings: {
				x: number;
				y: number;
				width: number;
				height: number;
				blur: number;
				grayscale: boolean;
				rotate: 0;
			};
		};
	};
	original: {
		asset: {
			uuid: string;
			mime: string;
			source: string;
			url: string;
		};
		name: string;
		width: number;
		height: number;
		settings: {};
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
	settings: AssetCropsSettings[];
}

export interface AssetCropsSettings {
	type: 'free' | 'exact' | 'boundary' | 'ratio';
	label: string;
	safeLabel: string;
	ratio?: {
		width: number;
		height: number;
	};
	width?: number;
	height?: number;
	lockRatio?: boolean;
	minWidth?: number;
	minHeight?: number;
	maxWidth?: number;
	maxHeight?: number;
}
