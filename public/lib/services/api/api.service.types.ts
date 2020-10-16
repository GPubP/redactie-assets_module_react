export interface SearchParams {
	skip: number;
	limit: number;
	sort?: string;
	search?: string;
}

export interface OrderBy {
	key: string;
	order: 'asc' | 'desc';
}
