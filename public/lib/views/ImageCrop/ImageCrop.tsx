import { Alert, Button } from '@acpaas-ui/react-components';
import { NavList } from '@acpaas-ui/react-editorial-components';
import kebabCase from 'lodash.kebabcase';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { AlertMessage, ModalViewComponentProps, NavListItem } from '../../assets.types';
import {
	CropMethods,
	CropOption,
	ImageCropper,
	ModalViewActions,
	ModalViewContainer,
	ModalViewData,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { getThumbnailUrl, parseCropsRequest, parseInitialCrops } from '../../helpers';
import { AssetCropsRequest, assetsApiService } from '../../services/assets';
import { imageCropperService } from '../../services/imageCropper';

import { ALERT_MESSAGES } from './ImageCrop.const';
import { ImageCrops, TemporaryCrop } from './ImageCrop.types';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = ({ data, onCancel }) => {
	const { config, queuedFiles, selectedFiles, setImageFieldValue, imageFieldValue } = data;
	const cropOptions = config?.imageConfig?.cropOptions || [];
	const currentAsset = imageFieldValue?.original?.asset || null;

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
		if (queuedFiles?.length) {
			// TODO: handle queued files
			// Depends on whether an image can be saved without meta info or not
			return;
		}
		if (selectedFiles.length) {
			setImgSrc(getThumbnailUrl(selectedFiles[0].uuid));
		}
	}, [queuedFiles, selectedFiles]);

	// Clear or set crop data when activeCrop changes
	useEffect(() => {
		if (!cropperRef.current || !activeCrop) {
			return;
		}

		const aspectRatio = imageCropperService.calculateAspectRatio(activeCrop);
		const cropData = crops[activeCrop.id] || {};

		cropperRef.current.setAspectRatio(aspectRatio);
		cropperRef.current.crop();

		if (
			!cropData.cropValues?.width &&
			!cropData.cropValues?.height &&
			!cropData.cropValues?.x &&
			!cropData.cropValues?.y
		) {
			cropperRef.current.clear();
			return;
		}
		cropperRef.current.setData({
			...cropData.cropValues,
			rotate: cropData.transformValues.rotate,
		});
	}, [activeCrop, cropperRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

	// Update crops when cropValues change
	useEffect(() => {
		if (!activeCrop || !tempCrop) {
			return;
		}

		setCrops({
			...crops,
			[kebabCase(activeCrop.name)]: { ...tempCrop, settings: activeCrop },
		});
		setTempCrop(null);
	}, [activeCrop, crops, tempCrop]);

	// Keep ref of active crop for use in event methods
	// because state values don't get updated
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
		const cropper = cropperRef.current;
		const cropOption = activeCropRef.current;
		const { rotate, ...cropValues } = e.detail;
		const transformValues = { grayscale: false, blur: 0, rotate };

		if (
			cropper &&
			cropOption &&
			[CropMethods.BOUNDS, CropMethods.EXACT].includes(cropOption.method)
		) {
			const imageData = cropper.getImageData();
			const { minWidth, minHeight } = imageCropperService.calculateMinCropSize(
				cropOption,
				imageData
			);
			const { width, height } = cropValues;

			if (width && width < minWidth) {
				cropValues.width = minWidth;
			}
			if (height && height < minHeight) {
				cropValues.height = minHeight;
			}
		}

		setTempCrop({ cropValues, transformValues });
	};

	const onSubmit = async (): Promise<void> => {
		if (!crops || !currentAsset) {
			return;
		}
		setIsGeneratingCrops(true);

		if (cropOptions.length !== Object.keys(crops).length) {
			setError('Alle crops moeten gezet worden');
			return;
		}

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
