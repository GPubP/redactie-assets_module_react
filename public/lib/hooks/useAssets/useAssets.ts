import { useObservable } from '@mindspace-io/react';
import { LoadingState } from '@redactie/utils';

import { AssetsMetaResponse } from '../../services/assets';
import { AssetModel, assetsFacade } from '../../store/assets';

const useAssets = (): [LoadingState, AssetModel[], AssetsMetaResponse | null | undefined] => {
	const [loading] = useObservable(assetsFacade.isFetching$, LoadingState.Loading);
	const [assets] = useObservable(assetsFacade.assets$, []);
	const [meta] = useObservable(assetsFacade.meta$, null);
	const [error] = useObservable(assetsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;

	return [loadingState, assets, meta];
};

export default useAssets;
