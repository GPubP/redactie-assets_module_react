import { Alert, Button } from '@acpaas-ui/react-components';
import { NavList } from '@acpaas-ui/react-editorial-components';
import { useDetectValueChanges, useSiteContext } from '@redactie/utils';
import classnames from 'classnames';
import kebabCase from 'lodash.kebabcase';
import { equals, isEmpty } from 'ramda';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
	AlertMessage,
	CropMethods,
	ModalViewComponentProps,
	NavListItem,
} from '../../assets.types';
import {
	CropOption,
	ImageCropper,
	ModalViewActions,
	ModalViewContainer,
	ModalViewData,
	ModalViewMode,
	ModalViewTarget,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import {
	getAssetUrl,
	parseCropsRequest,
	parseInitialCrops,
	validateCropValues,
} from '../../helpers';
import { assetsApiService } from '../../services/assets';
import { imageCropperService } from '../../services/imageCropper';

import { ALERT_MESSAGES } from './ImageCrop.const';
import { ImageCrops, TemporaryCrop } from './ImageCrop.types';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = ({
	data,
	onCancel,
	onDelete,
	onViewChange,
}) => {
	const { config, setImageFieldValue, imageFieldValue } = data;
	const cropOptions = config?.imageConfig?.cropOptions || [];

	/**
	 * Hooks
	 */

	const activeCropRef = useRef<CropOption | null>(cropOptions[0] || null);
	const cropperRef = useRef<Cropper | null>(null);
	const [activeCrop, setActiveCrop] = useState<CropOption | null>(cropOptions[0] || null);
	const [crops, setCrops] = useState<ImageCrops>(
		parseInitialCrops(imageFieldValue?.crops, cropOptions)
	);
	const [alert, setAlert] = useState<AlertMessage | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoadingImage, setIsLoadingImage] = useState(true);
	const [isGeneratingCrops, setIsGeneratingCrops] = useState(false);
	const [tempCrop, setTempCrop] = useState<TemporaryCrop | null>(null);
	const [hasChanges, resetDetectValueChanges] = useDetectValueChanges(true, crops);
	const [t] = useCoreTranslation();
	const { siteId } = useSiteContext();

	const currentAsset = useMemo(() => {
		return data.imageFieldValue?.original?.asset || null;
	}, [data.imageFieldValue]);
	const imgSrc = useMemo(() => {
		return currentAsset ? getAssetUrl(currentAsset.uuid) : '';
	}, [currentAsset]);
	const allCropsSet = Object.keys(crops).length === cropOptions.length;

	const navListItems: NavListItem[] = useMemo(() => {
		return cropOptions.map(crop => ({
			className: classnames({
				'is-active': crop.id === activeCrop?.id,
				'is-disabled': isLoadingImage,
			}),
			hasError: false,
			label: crop.name,
			onClick: () => !isLoadingImage && setActiveCrop(crop),
		}));
	}, [activeCrop, cropOptions, isLoadingImage]);

	// Clear or set crop data when activeCrop changes
	useEffect(() => {
		if (!cropperRef.current || !activeCrop || isLoadingImage) {
			return;
		}

		const aspectRatio = imageCropperService.calculateAspectRatio(activeCrop);
		const cropData = crops[kebabCase(activeCrop.name)] || {};

		cropperRef.current.setAspectRatio(aspectRatio);
		cropperRef.current.crop();

		if (!validateCropValues(cropData.cropValues)) {
			return;
		}

		cropperRef.current.setData({
			...cropData.cropValues,
			rotate: cropData.transformValues.rotate,
		});
	}, [activeCrop, cropperRef.current, isLoadingImage]); // eslint-disable-line react-hooks/exhaustive-deps

	// Update crops when cropValues change
	useEffect(() => {
		if (!activeCrop || !tempCrop) {
			return;
		}

		let newCropData = tempCrop;

		// Set initial crop if no data is present
		const cropData = crops[kebabCase(activeCrop.name)] || {};

		if (cropperRef.current && isEmpty(cropData)) {
			const { rotate, ...cropValues } = cropperRef.current.getData(true);
			const transformValues = { grayscale: false, blur: 0, rotate };

			if (activeCrop.method === CropMethods.BOUNDS) {
				const { maxHeight, maxWidth } = imageCropperService.getBoundsDimensions(
					activeCrop.boundsDimensions
				);
				const { naturalHeight, naturalWidth } = cropperRef.current.getImageData();
				// Set max size and center bounds crop
				const height = Math.min(naturalHeight, maxHeight);
				const width = Math.min(naturalWidth, maxWidth);
				const x = naturalWidth / 2 - width / 2;
				const y = naturalHeight / 2 - height / 2;
				const boundCropValues = { height, width, x, y };

				newCropData = {
					cropValues: boundCropValues,
					transformValues,
				};
				cropperRef.current.setData(boundCropValues);
			} else {
				newCropData = { cropValues, transformValues };
			}
		}

		// Only set crop if all values are valid
		// And the crop values has changed
		if (
			validateCropValues(newCropData.cropValues) &&
			!equals(crops[kebabCase(activeCrop.name)]?.cropValues, newCropData.cropValues)
		) {
			setCrops({
				...crops,
				[kebabCase(activeCrop.name)]: { ...newCropData, settings: activeCrop },
			});
		}

		setTempCrop(null);
	}, [activeCrop, crops, tempCrop]);

	// Keep ref of active crop because state values don't get updated in cropperjs event methods
	useEffect(() => {
		activeCropRef.current = activeCrop;
	}, [activeCrop]);

	/**
	 * Methods
	 */

	const getCropOptionIndex = (): number =>
		cropOptions.findIndex(crop => crop.id === activeCrop?.id);

	const cycleCropOption = (indexUpdate: number): void =>
		setActiveCrop(cropOptions[getCropOptionIndex() + indexUpdate]);

	const onCrop = (e: Cropper.CropEvent): void => {
		const { rotate, ...cropValues } = e.detail;
		const transformValues = { grayscale: false, blur: 0, rotate };

		setTempCrop({
			cropValues: {
				width: Math.round(cropValues.width * 10) / 10,
				height: Math.round(cropValues.height * 10) / 10,
				x: Math.round(cropValues.x * 10) / 10,
				y: Math.round(cropValues.y * 10) / 10,
			},
			transformValues,
		});
	};

	const onCropMove = (): void => {
		if (
			!cropperRef.current ||
			!activeCropRef.current ||
			![CropMethods.BOUNDS, CropMethods.EXACT].includes(activeCropRef.current.method)
		) {
			return;
		}

		const cropData = cropperRef.current.getData(true);
		// !Important note: the updated values on the crop(move) event are not scaled but based
		// on the actual image size, so we don't have to do calculations for the crop's min size
		const { minHeight, minWidth } = imageCropperService.getMinCropSize(activeCropRef.current);

		// Prevent crop being smaller than min sizes for current option
		if (activeCropRef.current.method !== CropMethods.BOUNDS && cropData.width < minWidth) {
			cropperRef.current.setData({ width: minWidth });
		}
		if (activeCropRef.current.method !== CropMethods.BOUNDS && cropData.height < minHeight) {
			cropperRef.current.setData({ height: minHeight });
		}

		// Prevent crop being smaller than calculated max sizes for bounds crop
		if (activeCropRef.current.method === CropMethods.BOUNDS) {
			const { naturalWidth, naturalHeight } = cropperRef.current.getImageData();
			const { maxHeight, maxWidth } = imageCropperService.getBoundsDimensions(
				activeCropRef.current.boundsDimensions
			);

			let newWidth;
			let newHeight;

			// Recalculate width if height max bounds are exceeded
			if (cropData.height > maxHeight || cropData.height === naturalHeight) {
				const ratio = Math.floor((maxHeight / cropData.height) * 1000) / 1000;
				const newMinWidth = Math.ceil(minWidth / ratio);

				if (newMinWidth > cropData.width) {
					newWidth = newMinWidth;

					if (newWidth > naturalWidth) {
						newWidth = naturalWidth;

						if (newWidth > maxWidth || newWidth === naturalWidth) {
							const ratio = Math.floor((maxWidth / newWidth) * 1000) / 1000;
							const newMinHeight = Math.ceil(minHeight / ratio);

							if (newMinHeight > cropData.height) {
								newHeight = newMinHeight;
							}
						}
					}
				}
			}

			// Prevent crop being smaller than min width
			if ((newWidth || cropData.width) < minWidth) {
				newWidth = minWidth;
			}

			// Recalculate height if width max bounds are exceeded
			if (cropData.width > maxWidth || cropData.width === naturalWidth) {
				const ratio = Math.floor((maxWidth / cropData.width) * 1000) / 1000;
				const newMinHeight = Math.ceil(minHeight / ratio);

				if (newMinHeight > cropData.height) {
					newHeight = newMinHeight;

					if (newHeight > naturalHeight) {
						newHeight = naturalHeight;

						if (newHeight > maxHeight || newHeight === naturalHeight) {
							const ratio = Math.floor((maxHeight / newHeight) * 1000) / 1000;
							const newMinWidth = Math.ceil(minWidth / ratio);

							if (newMinWidth > cropData.width) {
								newWidth = newMinWidth;
							}
						}
					}
				}
			}

			// Prevent crop being smaller than min height
			if ((newHeight || cropData.height) < minHeight) {
				newHeight = minHeight;
			}

			if (newHeight || newWidth) {
				console.log('[MODULE] SET DATA 5');
				cropperRef.current.setData({
					width: newWidth || cropData.width,
					height: newHeight || cropData.height,
				});
			}
		}
	};

	const onReplaceImg = (): void => {
		onViewChange(ModalViewTarget.ADD_SELECTION, ModalViewMode.REPLACE);
	};

	const onSubmit = async (): Promise<void> => {
		if (!crops || !currentAsset) {
			return;
		}

		// Validate if all crops are set
		if (cropOptions.length !== Object.keys(crops).length) {
			setError('Alle crops moeten gezet worden');
			return;
		}

		setIsGeneratingCrops(true);

		const cropsRequest = parseCropsRequest(crops);

		assetsApiService
			.generateCrops(currentAsset.uuid, cropsRequest, siteId)
			.then(response => {
				if (!response?.crops) {
					return;
				}

				setError(null);

				setImageFieldValue({
					...imageFieldValue,
					crops: Object.keys(crops).reduce((acc, key) => {
						const { cropValues, transformValues } = crops[key];
						const { asset, name, width, height } = response.crops[key];

						return {
							...acc,
							[key]: {
								asset: {
									fileName: name,
									mime: asset.mime,
									size: { width, height },
									uuid: asset.uuid,
								},
								cropValues,
								transformValues,
							},
						};
					}, {}),
				});
				// Close modal
				onCancel(true);
			})
			.catch(error => {
				console.error('crop error', error);
				setError(null);
				setAlert(ALERT_MESSAGES.danger);
			})
			.finally(() => {
				setIsGeneratingCrops(false);
				resetDetectValueChanges();
			});
	};

	/**
	 * Render
	 */

	return (
		<>
			<ModalViewContainer>
				<div className="row between-xs top-xs">
					{alert && (
						<div className="col-xs-12">
							<Alert
								className="u-margin-bottom"
								closable
								onClose={() => setAlert(null)}
								title={alert.title}
								type={alert.type}
							>
								{alert.message}
							</Alert>
						</div>
					)}

					<div className="col-xs-12 col-md-3 u-margin-bottom">
						<NavList className="u-bg-white" items={navListItems} />
					</div>

					<div className="col-xs-12 col-md-9">
						<p className="u-margin-bottom-xs">
							De afbeelding verschijnt op toestellen volgens deze verhouding:{' '}
							<strong>{imageCropperService.getRatioLabel(activeCrop)}</strong>. Je kan
							de selectie zelf bepalen.
						</p>
						{activeCrop?.guideline && (
							<p className="u-margin-bottom-xs">{activeCrop?.guideline}</p>
						)}

						<ImageCropper
							crop={onCrop}
							cropmove={onCropMove}
							ready={() => setIsLoadingImage(false)}
							ref={imgRef =>
								(cropperRef.current =
									(imgRef as HTMLImageElement & { cropper: Cropper })?.cropper ||
									null)
							}
							src={imgSrc}
						/>

						{error && (
							<p className="small u-margin-top-xs u-margin-bottom-xs u-text-danger">
								{error}
							</p>
						)}
					</div>
				</div>
			</ModalViewContainer>

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
						<Button
							className="u-margin-right-xs"
							negative
							onClick={() => onCancel(false)}
						>
							{t(CORE_TRANSLATIONS.BUTTON_CANCEL)}
						</Button>
						{cropOptions.length > 1 ? (
							<>
								<Button
									className="u-margin-right-xs"
									disabled={getCropOptionIndex() === 0}
									onClick={() => cycleCropOption(-1)}
								>
									Vorige
								</Button>
								<Button
									className="u-margin-right-xs"
									disabled={getCropOptionIndex() === cropOptions.length - 1}
									onClick={() => cycleCropOption(1)}
								>
									Volgende
								</Button>
							</>
						) : null}
						<Button
							disabled={isGeneratingCrops || !allCropsSet || !hasChanges}
							iconLeft={isGeneratingCrops ? 'circle-o-notch fa-spin' : null}
							onClick={onSubmit}
							type="success"
						>
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</div>
			</ModalViewActions>
		</>
	);
};

export default ImageCrop;
