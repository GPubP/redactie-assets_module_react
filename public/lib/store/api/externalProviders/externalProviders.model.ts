import { EntityState } from '@datorama/akita';
import React from 'react';

import { ExternalModalViewComponentProps } from '../../../assets.types';
import { ModalViewData } from '../../../components';

export interface ExternalProviderProps {
	test: string;
}

export interface ExternalProviderModel {
	active: boolean;
	name: string;
	viewComponent: React.FC<ExternalModalViewComponentProps<ModalViewData>>;
	target: string;
	show?: (siteId: string) => boolean;
	type: 'external';
}

export type ExternalProviderOptions = Omit<ExternalProviderModel, 'target' | 'type'>;

export type ExternalProvidersState = EntityState<ExternalProviderModel, string>;

export const createInitialExternalProvidersState = (): ExternalProvidersState => ({});
