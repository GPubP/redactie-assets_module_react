import { Alert, Button } from '@acpaas-ui/react-components';
import { NavList } from '@acpaas-ui/react-editorial-components';
import kebabCase from 'lodash.kebabcase';
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
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import {
	getAssetUrl,
	parseCropsRequest,
	parseInitialCrops,
	validateCropValues,
} from '../../helpers';
import { AssetCropsRequest, assetsApiService } from '../../services/assets';
import { imageCropperService } from '../../services/imageCropper';

import { ALERT_MESSAGES } from './ImageCrop.const';
import { ImageCrops, TemporaryCrop } from './ImageCrop.types';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = ({ data, onCancel }) => {
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
	const [isGeneratingCrops, setIsGeneratingCrops] = useState(false);
	const [tempCrop, setTempCrop] = useState<TemporaryCrop | null>(null);
	const [imgSrc, setImgSrc] = useState<string>();
	const [t] = useCoreTranslation();

	const currentAsset = useMemo(() => {
		return data.imageFieldValue?.original?.asset || null;
	}, [data.imageFieldValue]);

	const navListItems: NavListItem[] = useMemo(() => {
		return cropOptions.map(crop => ({
			className: crop.id === activeCrop?.id ? 'is-active' : '',
			hasError: false,
			label: crop.name,
			onClick: () => setActiveCrop(crop),
		}));
	}, [activeCrop, cropOptions]);

	// Set image src url
	useEffect(() => {
		if (currentAsset) {
			setImgSrc(getAssetUrl(currentAsset.uuid));
		}
	}, [currentAsset]);

	// Clear or set crop data when activeCrop changes
	useEffect(() => {
		if (!cropperRef.current || !activeCrop) {
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
		cropperRef.current.crop();
	}, [activeCrop, cropperRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

	// Update crops when cropValues change
	useEffect(() => {
		if (!activeCrop || !tempCrop) {
			return;
		}

		// Only set crop if all values are valid
		if (validateCropValues(tempCrop.cropValues)) {
			setCrops({
				...crops,
				[kebabCase(activeCrop.name)]: { ...tempCrop, settings: activeCrop },
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

		setTempCrop({ cropValues, transformValues });
	};

	const onCropMove = (e: Cropper.CropMoveEvent): void => {
		if (
			!cropperRef.current ||
			!activeCropRef.current ||
			![CropMethods.BOUNDS, CropMethods.EXACT].includes(activeCropRef.current.method)
		) {
			return;
		}

		// Prevent crop being smaller than min sizes for current option
		const cropData = cropperRef.current.getData();
		const imageData = cropperRef.current.getImageData();
		const { minWidth, minHeight } = imageCropperService.calculateMinCropSize(
			activeCropRef.current,
			imageData
		);

		if (cropData.width < minWidth) {
			e.preventDefault();
			cropData.width = minWidth;
			cropperRef.current.setData(cropData);
		}
		if (cropData.height < minHeight) {
			e.preventDefault();
			cropData.height = minHeight;
			cropperRef.current.setData(cropData);
		}
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

		const cropsRequest: AssetCropsRequest = {
			// TODO: remove uuid from request body once removed from backend (old remnant from v3)
			uuid: currentAsset.uuid,
			...parseCropsRequest(crops),
		};

		assetsApiService
			.generateCrops(currentAsset.uuid, cropsRequest)
			.then(response => {
				if (!response?.crops) {
					return;
				}

				setError(null);
				setAlert(ALERT_MESSAGES.success);

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
			})
			.catch(error => {
				console.error('crop error', error);
				setError(null);
				setAlert(ALERT_MESSAGES.danger);
			})
			.finally(() => {
				setIsGeneratingCrops(false);
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
							Snijd de afbeelding bij volgens deze verhouding: <strong></strong>
						</p>

						<ImageCropper
							crop={onCrop}
							cropmove={onCropMove}
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
						<Button iconLeft="trash" type="secondary">
							{t(CORE_TRANSLATIONS.BUTTON_REMOVE)}
						</Button>
					</div>
					<div>
						<Button className="u-margin-right-xs" negative onClick={onCancel}>
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
							disabled={isGeneratingCrops}
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
