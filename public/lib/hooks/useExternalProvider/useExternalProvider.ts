import { useObservable } from '@redactie/utils';

import { ExternalProviderModel, externalProvidersFacade } from '../../store/api/externalProviders';

const useExternalProviderFacade = (): [ExternalProviderModel[]] => {
	const externalProviders = useObservable(externalProvidersFacade.all$, []);

	return [externalProviders];
};

export default useExternalProviderFacade;
