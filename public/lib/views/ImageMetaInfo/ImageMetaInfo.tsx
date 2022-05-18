import { Button } from '@acpaas-ui/react-components';
import {
	AlertContainer,
	alertService,
	FormikOnChangeHandler,
	LoadingState,
	useDetectValueChanges,
	useSiteContext,
} from '@redactie/utils';
import { pick } from 'ramda';
import React, { FC, useContext, useMemo, useState } from 'react';

import { ALERT_CONTAINER_IDS } from '../../assets.const';
import { ExternalAsset, ModalViewComponentProps } from '../../assets.types';
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
import { formRendererConnector } from '../../connectors';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors/translations';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

import { ALERT_MESSAGES } from './ImageMetaInfo.const';

const ImageMetaInfo: FC<ModalViewComponentProps<ModalViewData>> = ({
	data,
	onCancel,
	onDelete,
	onViewChange,
}) => {
	const { activeLanguage } = useContext(formRendererConnector.api.FormContext);

	const { imageFieldValue, mode, selectedFiles, config, externalFiles } = data;
	const isCreating = mode === ModalViewMode.CREATE;
	// When creating check if user has uploaded or selected from assets
	// otherwise, when editing, the meta should be available from imageFieldValue
	const currentValue = isCreating
		? selectedFiles?.[0]?.data.translations?.find(trans => trans.lang === activeLanguage)
				?.data ||
		  selectedFiles?.[0]?.data ||
		  imageFieldValue?.meta ||
		  externalFiles?.[0]
		: imageFieldValue?.meta;

	// Always use alt and title from imageFieldValue.meta for the default values
	// if they are not avalaible use the current value's name

	const initialValues = currentValue
		? {
				name: currentValue?.name ?? '',
				figuratively: !!currentValue?.figuratively,
				alt:
					imageFieldValue?.meta?.alt ??
					(currentValue as ExternalAsset)?.alt ??
					currentValue?.name ??
					'',
				title:
					imageFieldValue?.meta?.title ??
					(currentValue as ExternalAsset)?.title ??
					currentValue?.name ??
					'',
				description: currentValue?.description ?? '',
				copyright: currentValue?.copyright ?? '',
		  }
		: {
				...IMAGE_META_INITIAL_FORM_STATE,
				figuratively: !!config?.figuratively,
		  };

	/**
	 * Hooks
	 */

	const [t] = useCoreTranslation();
	const [, creatingState] = useAssets();
	const [formValues, setFormValues] = useState<ImageMetaFormState>(initialValues);
	const isSaving = useMemo(() => creatingState === LoadingState.Loading, [creatingState]);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(true, formValues);
	const { siteId } = useSiteContext();

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

	const filesToFormData = (
		files: File[] = [],
		formValues: ImageMetaFormState,
		lang?: string
	): FormData => {
		return files.reduce((formData, file) => {
			formData.append('file', file);
			formData.append('name', formValues.name);
			formData.append('description', formValues.description);
			formData.append('copyright', formValues.copyright);
			formData.append('figuratively', (formValues.figuratively || false).toString());
			const attributes = {
				alt: formValues.alt,
				title: formValues.title,
			};
			formData.append('attributes', JSON.stringify(attributes, null, 2));
			formData.append('category', 'image');

			if (lang) {
				formData.append(
					'translations',
					JSON.stringify([
						{
							lang,
							data: {
								name: formValues.name,
								description: formValues.description,
								copyright: formValues.copyright,
								figuratively: (formValues.figuratively || false).toString(),
								title: formValues.title,
								alt: formValues.alt,
							},
						},
					])
				);
			}

			return formData;
		}, new FormData());
	};

	const dataURLtoFile = (url: string, filename: string, mimeType: string): Promise<File> => {
		return fetch(url)
			.then(function(res) {
				return res.arrayBuffer();
			})
			.then(function(buf) {
				return new File([buf], filename, { type: mimeType });
			});
	};

	const externalsToFormData = async (
		files: ExternalAsset[] = [],
		formValues: ImageMetaFormState,
		lang?: string
	): Promise<FormData> => {
		return await files.reduce(async (acc, file) => {
			const formData = await acc;

			const mimeType = file.content.split(';')[0].split(':')[1];
			formData.append('file', await dataURLtoFile(file.content, formValues.name, mimeType));
			formData.append('name', formValues.name);
			formData.append('description', formValues.description);
			formData.append('copyright', formValues.copyright);
			formData.append('figuratively', (formValues.figuratively || false).toString());
			const attributes = {
				alt: formValues.alt,
				title: formValues.title,
			};
			formData.append('attributes', JSON.stringify(attributes, null, 2));
			formData.append('category', 'image');

			if (lang) {
				formData.append(
					'translations',
					JSON.stringify([
						{
							lang,
							data: {
								name: formValues.name,
								description: formValues.description,
								copyright: formValues.copyright,
								figuratively: (formValues.figuratively || false).toString(),
								title: formValues.title,
								alt: formValues.alt,
							},
						},
					])
				);
			}

			return formData;
		}, Promise.resolve(new FormData()));
	};

	const onSubmit = (formValues: ImageMetaFormState): void => {
		const uploadNewImage = Array.isArray(data.queuedFiles) && data.queuedFiles.length > 0;
		const editImage = Array.isArray(data.selectedFiles) && data.selectedFiles.length > 0;
		const parseExternalFiles =
			Array.isArray(data.externalFiles) && data.externalFiles.length > 0;

		const activeLanguageTranslation = (data.selectedFiles[0].data.translations || []).find(
			trans => trans.lang === activeLanguage
		);

		if (uploadNewImage || (editImage && !activeLanguageTranslation && activeLanguage)) {
			let upsertPromise = undefined;

			if (uploadNewImage) {
				upsertPromise = assetsFacade.createAsset(
					filesToFormData(data.queuedFiles, formValues, activeLanguage),
					siteId
				);
			}

			if (editImage) {
				upsertPromise = assetsFacade.updateAsset(
					data.selectedFiles[0].uuid,
					{
						...pick(
							['name', 'description', 'copyright', 'thumbnail', 'attributes'],
							data.selectedFiles[0].data
						),
						translations: [
							...(data.selectedFiles[0].data.translations || []),
							{
								lang: activeLanguage as string,
								data: {
									name: formValues.name,
									description: formValues.description,
									copyright: formValues.copyright,
									figuratively: !!formValues.figuratively,
									title: formValues.title,
									alt: formValues.alt,
								},
							},
						],
					},
					siteId
				);
			}

			upsertPromise &&
				upsertPromise
					.then(response => {
						if (!response.data) {
							showUploadError();
							return;
						}

						const { data: responseData } = response;

						const translationData = responseData.translations?.find(
							trans => trans.lang === activeLanguage
						);

						data.setImageFieldValue({
							...data.imageFieldValue,
							meta: {
								name: translationData?.data.name || responseData?.name,
								alt: translationData?.data.alt || responseData?.attributes?.alt,
								title:
									translationData?.data.title || responseData?.attributes?.title,
								description:
									translationData?.data.description || responseData?.description,
								copyright:
									translationData?.data.copyright || responseData?.copyright,
								figuratively:
									translationData?.data.figuratively ||
									responseData?.figuratively,
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
						onViewChange(ModalViewTarget.EDIT_CROP, ModalViewMode.EDIT);
					})
					.catch(error => {
						console.error(error);
						showUploadError();
					});

			return;
		}

		if (parseExternalFiles) {
			externalsToFormData(data.externalFiles, formValues, activeLanguage).then(formData => {
				assetsFacade
					.createAsset(formData, siteId)
					.then(response => {
						if (!response.data) {
							showUploadError();
							return;
						}

						const { data: responseData } = response;

						const translationData = responseData.translations?.find(
							trans => trans.lang === activeLanguage
						);

						data.setImageFieldValue({
							...data.imageFieldValue,
							meta: {
								name: translationData?.data.name || responseData?.name,
								alt: translationData?.data.alt || responseData?.attributes?.alt,
								title:
									translationData?.data.title || responseData?.attributes?.title,
								description:
									translationData?.data.description || responseData?.description,
								copyright:
									translationData?.data.copyright || responseData?.copyright,
								figuratively:
									translationData?.data.figuratively ||
									responseData?.figuratively,
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
						onViewChange(ModalViewTarget.EDIT_CROP, ModalViewMode.EDIT);
					})
					.catch(error => {
						console.error(error);
						showUploadError();
					});
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
			onViewChange(ModalViewTarget.EDIT_CROP, ModalViewMode.EDIT);
		}
	};

	const onReplaceImg = (): void => {
		onViewChange(ModalViewTarget.ADD_SELECTION, ModalViewMode.REPLACE);
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
				{({ isValid, submitForm }) => {
					const saveButtonDisabled = isCreating
						? isSaving || (!hasChanges && !isValid)
						: isSaving || !hasChanges || !isValid;
					return (
						<>
							<FormikOnChangeHandler
								onChange={values => setFormValues(values as ImageMetaFormState)}
							/>
							<ModalViewActions>
								<div className="row between-xs">
									<div>
										<Button
											className="u-margin-right-xs"
											iconLeft="trash-o"
											onClick={onDelete}
											type="danger"
										>
											{t(CORE_TRANSLATIONS.BUTTON_REMOVE)}
										</Button>
										<Button onClick={onReplaceImg}>Vervangen</Button>
									</div>
									<div>
										<Button onClick={onCancel} negative>
											{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
										</Button>
										<Button
											iconLeft={isSaving ? 'circle-o-notch fa-spin' : null}
											disabled={saveButtonDisabled}
											className="u-margin-left-xs"
											onClick={submitForm}
											type="success"
										>
											{t(CORE_TRANSLATIONS['BUTTON_SAVE'])}
										</Button>
									</div>
								</div>
							</ModalViewActions>
						</>
					);
				}}
			</ImageMetaForm>
		</>
	);
};

export default ImageMetaInfo;
