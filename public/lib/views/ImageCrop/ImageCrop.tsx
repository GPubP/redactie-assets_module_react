import { Button } from '@acpaas-ui/react-components';
import { NavList } from '@acpaas-ui/react-editorial-components';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { ModalViewComponentProps, NavListItem } from '../../assets.types';
import {
	CropMethods,
	CropOption,
	CropValues,
	ImageCropper,
	ModalViewActions,
	ModalViewContainer,
	ModalViewData,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { getThumbnailUrl } from '../../helpers';
import { imageCropperService } from '../../services/imageCropper';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = ({ data, onCancel }) => {
	const { config, queuedFiles, selectedFiles, setImageFieldValue, imageFieldValue = {} } = data;
	const cropOptions = config?.imageConfig?.cropOptions || [];

	/**
	 * Hooks
	 */

	const activeCropRef = useRef<CropOption | null>(cropOptions[0] || null);
	const cropperRef = useRef<Cropper | null>(null);
	const [crops, setCrops] = useState<{ [key: string]: CropValues }>({});
	const [activeCrop, setActiveCrop] = useState<CropOption | null>(cropOptions[0] || null);
	const [cropValues, setCropValues] = useState<CropValues | null>(null);
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
		const cropperData = crops[activeCrop.id] || {};

		cropperRef.current.setAspectRatio(aspectRatio);
		cropperRef.current.crop();

		if (!cropperData.width && !cropperData.height && !cropperData.x && !cropperData.y) {
			cropperRef.current.clear();
			return;
		}
		cropperRef.current.setData(cropperData);
	}, [activeCrop, cropperRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

	// Update crops when cropValues change
	useEffect(() => {
		if (!activeCrop || !cropValues) {
			return;
		}

		setCrops({
			...crops,
			[activeCrop.id]: cropValues,
		});
		setCropValues(null);
	}, [activeCrop, cropValues, crops]);

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
		const data = { ...e.detail };

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
			const { width, height } = data;
			if (width && width < minWidth) {
				data.width = minWidth;
			}
			if (height && height < minHeight) {
				data.height = minHeight;
			}
		}

		setCropValues(data);
	};

	const onSubmit = (): void => {
		if (!crops) {
			return;
		}

		const asset = selectedFiles[0];

		setImageFieldValue({
			...imageFieldValue,
			// Add asset and transform data
			crops: Object.keys(crops).reduce((acc, key) => {
				return {
					...acc,
					[key]: {
						asset: {
							fileName: asset.data.file.name,
							mime: asset.data.file.type.mime,
							size: asset.data.metaData,
							uuid: asset.uuid,
						},
						cropValues: crops[key],
						transformValues: {
							blur: 0,
							grayscale: 0,
							rotate: 0,
						},
					},
				};
			}, {}),
		});
	};

	/**
	 * Render
	 */

	return (
		<>
			<ModalViewContainer>
				<div className="row between-xs top-xs">
					<div className="col-xs-12 col-md-3 u-margin-bottom">
						<NavList className="u-bg-white" items={navListItems} />
					</div>

					<div className="col-xs-12 col-md-9">
						<p className="u-margin-bottom-xs">
							Snijd de afbeelding bij volgens deze verhouding: <strong></strong>
						</p>

						<ImageCropper
							crop={onCrop}
							cropmove={e => {
								const height = cropperRef.current?.getData().height || 0;
								if (height > 400) {
									e.preventDefault();
								}
							}}
							ref={imgRef =>
								(cropperRef.current =
									(imgRef as HTMLImageElement & { cropper: Cropper })?.cropper ||
									null)
							}
							src={imgSrc}
						/>
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
						<Button onClick={onSubmit} type="success">
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</div>
			</ModalViewActions>
		</>
	);
};

export default ImageCrop;
