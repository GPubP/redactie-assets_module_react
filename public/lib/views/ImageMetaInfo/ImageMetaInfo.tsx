import { Button } from '@acpaas-ui/react-components';
import {
	AlertContainer,
	alertService,
	FormikOnChangeHandler,
	LoadingState,
	useDetectValueChanges,
} from '@redactie/utils';
import React, { FC, useMemo, useState } from 'react';

import { ALERT_CONTAINER_IDS } from '../../assets.const';
import { ModalViewComponentProps } from '../../assets.types';
import {
	IMAGE_META_INITIAL_FORM_STATE,
	ImageMetaForm,
	ImageMetaFormState,
	ModalViewActions,
	ModalViewContainer,
	ModalViewData,
	ModalViewMode,
	ModalViewTarget,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

import { ALERT_MESSAGES } from './ImageMetaInfo.const';

const ImageMetaInfo: FC<ModalViewComponentProps<ModalViewData>> = ({
	data,
	onCancel,
	onViewChange,
}) => {
	const { imageFieldValue, mode, selectedFiles } = data;
	const isCreating = mode === ModalViewMode.CREATE;
	// When creating check if user has uploaded or selected from assets
	// otherwise, when editing, the meta should be available from imageFieldValue
	const currentValue = isCreating
		? selectedFiles?.[0]?.data || imageFieldValue?.meta
		: imageFieldValue?.meta;
	// Always use alt and title from imageFieldValue.meta for the default values
	// if they are not avalaible use the current value's name
	const initialValues = currentValue
		? {
				name: currentValue?.name ?? '',
				figuratively: currentValue?.figuratively,
				alt: imageFieldValue?.meta?.alt ?? currentValue?.name ?? '',
				title: imageFieldValue?.meta?.title ?? currentValue?.name ?? '',
				description: currentValue?.description ?? '',
				copyright: currentValue?.copyright ?? '',
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

	const showUploadError = (): void => {
		alertService.danger(
			{ ...ALERT_MESSAGES.create.error },
			{
				containerId: ALERT_CONTAINER_IDS.imageMetaCreate,
			}
		);
	};

	const filesToFormData = (files: File[] = [], formValues: ImageMetaFormState): FormData => {
		return files.reduce((formData, file) => {
			formData.append('file', file);
			formData.append('name', formValues.name);
			formData.append('description', formValues.description);
			formData.append('copyright', formValues.copyright);
			formData.append('figuratively', formValues.figuratively.toString());
			const attributes = {
				alt: formValues.alt,
				title: formValues.title,
			};
			formData.append('attributes', JSON.stringify(attributes, null, 2));
			formData.append('category', 'image');

			return formData;
		}, new FormData());
	};

	const onSubmit = (formValues: ImageMetaFormState): void => {
		const uploadNewImage = Array.isArray(data.queuedFiles) && data.queuedFiles.length > 0;

		if (uploadNewImage) {
			const formData = filesToFormData(data.queuedFiles, formValues);

			assetsFacade
				.createAsset(formData)
				.then(response => {
					if (!response.data) {
						showUploadError();
						return;
					}

					const { data: responseData } = response;

					data.setImageFieldValue({
						...data.imageFieldValue,
						meta: {
							name: responseData?.name,
							alt: responseData?.attributes?.alt,
							title: responseData?.attributes?.title,
							description: responseData?.description,
							copyright: responseData?.copyright,
							figuratively: responseData?.figuratively,
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
				})
				.catch(error => {
					console.error(error);
					showUploadError();
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
				figuratively: formValues.figuratively,
			},
			...(isCreating && selectedFiles.length
				? {
						original: {
							asset: {
								mime: selectedFiles[0]?.data?.file?.type?.mime,
								uuid: selectedFiles[0]?.uuid,
								size: {
									height: selectedFiles[0]?.data?.metaData?.height ?? 0,
									width: selectedFiles[0]?.data?.metaData?.width ?? 0,
								},
								fileName: selectedFiles[0]?.data?.file?.name,
							},
						},
				  }
				: {}),
		});
		resetDetectValueChanges();
		if (isCreating) {
			onViewChange(ModalViewTarget.EDIT_META, ModalViewMode.EDIT);
		}
	};

	/**
	 * Render
	 */

	return (
		<>
			<ModalViewContainer className="u-no-padding-top u-no-padding-bottom">
				<AlertContainer
					className="u-padding-top"
					containerId={ALERT_CONTAINER_IDS.imageMetaCreate}
				/>
			</ModalViewContainer>

			<ImageMetaForm initialValues={initialValues} onSubmit={onSubmit}>
				{({ isValid, submitForm }) => (
					<>
						<FormikOnChangeHandler
							onChange={values => setFormValues(values as ImageMetaFormState)}
						/>
						<ModalViewActions>
							<div className="u-wrapper row end-xs">
								<Button onClick={onCancel} negative>
									{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
								</Button>
								<Button
									iconLeft={isSaving ? 'circle-o-notch fa-spin' : null}
									disabled={isSaving || (!hasChanges && !isValid)}
									className="u-margin-left-xs"
									onClick={submitForm}
									type="success"
								>
									{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
								</Button>
							</div>
						</ModalViewActions>
					</>
				)}
			</ImageMetaForm>
		</>
	);
};

export default ImageMetaInfo;
