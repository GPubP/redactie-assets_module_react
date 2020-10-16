import { object, string } from 'yup';

import { ImageMetaFormState } from './ImageMetaForm.types';

export const IMAGE_META_VALIDATION_SCHEMA = object().shape({
	name: string().required('Naam is een verplicht veld'),
	alt: string().required('Alt is een verplicht veld'),
	title: string().required('Titel is een verplicht veld'),
});

export const IMAGE_META_INITIAL_FORM_STATE: ImageMetaFormState = {
	name: '',
	title: '',
	alt: '',
	description: '',
	copyright: '',
};
