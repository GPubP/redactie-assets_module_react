import { Button } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { FormikOnChangeHandler, LoadingState, useDetectValueChanges } from '@redactie/utils';
import React, { FC, useMemo, useState } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { IMAGE_META_INITIAL_FORM_STATE, ImageMetaForm, ImageMetaFormState } from '../../components';
import {
	ModalViewData,
	ModalViewMode,
	ModalViewTarget,
} from '../../components/Fields/ImageUpload/ImageUpload.types';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

const ImageMetaInfo: FC<ModalViewComponentProps<ModalViewData>> = ({
	data,
	onCancel,
	onViewChange,
}) => {
	const { imageFieldValue } = data;
	const initialValues = data.imageFieldValue
		? {
				name: imageFieldValue?.meta.name ?? '',
				alt: imageFieldValue?.meta.alt ?? '',
				title: imageFieldValue?.meta.title ?? '',
				description: imageFieldValue?.meta.description ?? '',
				copyright: imageFieldValue?.meta.copyright ?? '',
		  }
		: IMAGE_META_INITIAL_FORM_STATE;

	/**
	 * Hooks
	 */
	const [t] = useCoreTranslation();
	const [, creatingState] = useAssets();
	const [formValues, setFormValues] = useState<ImageMetaFormState>(initialValues);
	const isSaving = useMemo(() => creatingState === LoadingState.Loading, [creatingState]);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(true, formValues);

	/**
	 * Function
	 */
	const filesToFormData = (files: File[] = [], formValues: ImageMetaFormState): FormData => {
		return files.reduce((formData, file) => {
			formData.append('file', file);
			formData.append('name', formValues.name);
			formData.append('description', formValues.description);
			formData.append('copyright', formValues.copyright);
			// TODO: Add extra attributes when the API is ready
			// const attributes = {
			// 	alt: formValues.alt,
			// 	titel: formValues.title,
			// };
			// formData.append('attributes', JSON.stringify(attributes, null, 2));
			formData.append('category', 'image');

			return formData;
		}, new FormData());
	};

	const onSubmit = (formValues: ImageMetaFormState): void => {
		const uploadNewImage = Array.isArray(data.queuedFiles) && data.queuedFiles.length > 0;

		if (uploadNewImage) {
			const formData = filesToFormData(data.queuedFiles, formValues);

			assetsFacade.createAsset(formData).then(response => {
				const { data: responseData } = response;
				data.setImageFieldValue({
					...data.imageFieldValue,
					meta: {
						name: responseData?.name,
						alt: formValues.alt,
						title: formValues.title,
						description: responseData?.description,
						copyright: responseData?.copyright,
					},
					original: {
						asset: {
							mime: responseData?.file?.type?.mime,
							uuid: response.uuid,
							size: {
								height: responseData?.metaData?.height ?? 0,
								width: responseData?.metaData?.width ?? 0,
							},
							fileName: responseData?.file?.name,
						},
					},
				});
				resetDetectValueChanges();
				onViewChange(ModalViewTarget.EDIT_META, ModalViewMode.EDIT);
			});
			return;
		}

		data.setImageFieldValue({
			...data.imageFieldValue,
			meta: {
				name: formValues.name,
				alt: formValues.alt,
				title: formValues.title,
				description: formValues.description,
				copyright: formValues.copyright,
			},
		});
		resetDetectValueChanges();
	};

	/**
	 * Render
	 */

	return (
		<ImageMetaForm initialValues={initialValues} onSubmit={onSubmit}>
			{({ submitForm }) => (
				<>
					<FormikOnChangeHandler
						onChange={values => setFormValues(values as ImageMetaFormState)}
					/>
					<ActionBar disablePortal isOpen>
						<ActionBarContentSection>
							<div className="u-wrapper row end-xs">
								<Button onClick={onCancel} negative>
									{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
								</Button>
								<Button
									iconLeft={isSaving ? 'circle-o-notch fa-spin' : null}
									disabled={isSaving || !hasChanges}
									className="u-margin-left-xs"
									onClick={submitForm}
									type="success"
								>
									{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
								</Button>
							</div>
						</ActionBarContentSection>
					</ActionBar>
				</>
			)}
		</ImageMetaForm>
	);
};

export default ImageMetaInfo;
