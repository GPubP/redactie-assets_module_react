import React from 'react';

import { Tab } from '../../../assets.types';
import { ImageCrop, ImageMetaInfo, ImageSelection } from '../../../views';

import {
	ImageUploadConfig,
	ModalViewData,
	ModalViewMode,
	ModalViewTarget,
} from './ImageUpload.types';

export const IMAGE_SETTINGS_DEFAULT_CONFIG: ImageUploadConfig = {
	allowedFileTypes: [],
	guideline: '',
	imageConfig: {
		minWidth: 0,
		minHeight: 0,
	},
};

const MODAL_VIEW_SELECT_TABS: Tab<ModalViewData>[] = [
	{
		active: true,
		name: 'Selecteren',
		target: ModalViewTarget.ADD_SELECTION,
		viewComponent: ImageSelection,
	},
	{
		active: false,
		disabled: true,
		name: 'Opladen',
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
	{
		active: false,
		disabled: true,
		name: 'Afbeelding vervangen',
		target: ModalViewTarget.EDIT_REPLACE,
		viewComponent: () => null,
	},
];

const MODAL_VIEW_CREATE_TABS: Tab<ModalViewData>[] = [
	{
		active: true,
		name: 'Meta-informatie',
		target: ModalViewTarget.CREATE_META,
		viewComponent(props) {
			return <ImageMetaInfo {...props} />;
		},
	},
];

export const MODAL_VIEW_MODE_MAP: {
	[key in ModalViewMode]: { title: string; tabs: Tab<ModalViewData>[] };
} = {
	[ModalViewMode.CREATE]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_CREATE_TABS,
	},
	[ModalViewMode.SELECT]: {
		title: 'Afbeelding toevoegen',
		tabs: MODAL_VIEW_SELECT_TABS,
	},
	[ModalViewMode.EDIT]: {
		title: 'Bewerk afbeelding',
		tabs: MODAL_VIEW_EDIT_TABS,
	},
};
