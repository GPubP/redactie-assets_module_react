import React from 'react';

import { ModalViewComponentProps, Tab } from '../../../assets.types';
import { ExternalProviderModel } from '../../../store/api/externalProviders';
import { ImageCrop, ImageMetaInfo, ImageSelection } from '../../../views';

import { ModalViewData, ModalViewMode, ModalViewTarget } from './ImageUpload.types';

export const DEFAULT_IMAGE_CONFIG = {
	cropOptions: [],
	minWidth: 0,
	minHeight: 0,
};

export const IMAGE_SETTINGS_DEFAULT_CONFIG = {
	allowedFileTypes: [],
	guideline: '',
	imageConfig: DEFAULT_IMAGE_CONFIG,
	required: false,
};

const MODAL_VIEW_SELECT_TABS = (
	externalProviders: ExternalProviderModel[]
): Tab<ModalViewData>[] => [
	{
		active: true,
		name: 'Selecteren: WCM',
		type: 'internal',
		target: ModalViewTarget.ADD_SELECTION,
		viewComponent: ImageSelection,
	},
	...externalProviders,
	{
		active: false,
		name: 'Opladen',
		type: 'internal',
		onClick({ onManualUpload }) {
			const fileInput = document.createElement('input');
			fileInput.type = 'file';
			fileInput.onchange = ({ target }: Event) => {
				if (target) {
					const { files } = target as HTMLInputElement;
					onManualUpload(Array.from(files || []));
				}
			};
			fileInput.click();
		},
		target: ModalViewTarget.ADD_UPLOAD,
		viewComponent: () => null,
	},
];

const MODAL_VIEW_EDIT_TABS: Tab<ModalViewData>[] = [
	{
		active: true,
		name: 'Meta-informatie',
		target: ModalViewTarget.EDIT_META,
		viewComponent: ImageMetaInfo,
	},
	{
		active: false,
		name: 'Bijsnijden en schalen',
		target: ModalViewTarget.EDIT_CROP,
		viewComponent: ImageCrop,
	},
];

const MODAL_VIEW_CREATE_TABS: Tab<ModalViewData>[] = [
	{
		active: true,
		name: 'Meta-informatie',
		target: ModalViewTarget.CREATE_META,
		viewComponent(props: ModalViewComponentProps<ModalViewData>) {
			return <ImageMetaInfo {...props} />;
		},
	},
];

export const MODAL_VIEW_MODE_MAP = (
	externalProviders: ExternalProviderModel[]
): {
	[key in ModalViewMode]: { title: string; tabs: Tab<ModalViewData>[] };
} => ({
	[ModalViewMode.CREATE]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_CREATE_TABS,
	},
	[ModalViewMode.SELECT]: {
		title: 'Afbeelding toevoegen',
		tabs: MODAL_VIEW_SELECT_TABS(externalProviders),
	},
	[ModalViewMode.EDIT]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_EDIT_TABS,
	},
	[ModalViewMode.REPLACE]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_SELECT_TABS(externalProviders),
	},
});
