import { LoadingState, useObservable } from '@redactie/utils';

import { AssetModel, assetsFacade } from '../../store/assets';

const useAsset = (): [LoadingState, AssetModel] => {
	const isFetchingOne = useObservable(assetsFacade.isFetchingOne$, LoadingState.Loading);
	const asset = useObservable(assetsFacade.asset$, undefined);
	const error = useObservable(assetsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : isFetchingOne;

	return [loadingState, asset as AssetModel];
};

export default useAsset;
