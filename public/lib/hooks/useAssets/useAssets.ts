import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { AssetsMetaResponse } from '../../services/assets';
import { AssetModel, assetsFacade } from '../../store/assets';

const useAssets = (): [
	LoadingState,
	LoadingState,
	AssetModel[],
	AssetsMetaResponse | null | undefined
] => {
	const [isFetching] = useObservable(assetsFacade.isFetching$, LoadingState.Loading);
	const [isCreating] = useObservable(assetsFacade.isCreating$, LoadingState.Loading);
	const [assets] = useObservable(assetsFacade.assets$, []);
	const [meta] = useObservable(assetsFacade.meta$, null);
	const [error] = useObservable(assetsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : isFetching;
	const creatingState = error ? LoadingState.Error : isCreating;

	return [loadingState, creatingState, assets, meta];
};

export default useAssets;
