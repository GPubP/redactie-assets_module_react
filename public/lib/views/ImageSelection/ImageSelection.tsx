import { Button, Pagination, TextField } from '@acpaas-ui/react-components';
import { DataLoader } from '@redactie/utils';
import debounce from 'lodash.debounce';
import React, { ChangeEvent, FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import { ImageSelect, ImageSelectItem } from '../../components';
import {
	ModalViewMode,
	ModalViewTarget,
} from '../../components/Fields/ImageUpload/ImageUpload.types';
import { ModalViewActions, ModalViewContainer } from '../../components/ModalView';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { getThumbnailUrl } from '../../helpers';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

import { DEFAULT_SEARCH_PARAMS } from './ImageSelection.const';

const ImageSelection: FC<ModalViewComponentProps<ModalViewData>> = ({ onCancel, onViewChange }) => {
	/**
	 * Hooks
	 */

	const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
	const [selectedImages, setSelectedImages] = useState<ImageSelectItem[]>([]);
	const [assetsLoading, assets, assetsMeta] = useAssets();
	const [t] = useCoreTranslation();
	const parsedAssets: ImageSelectItem[] = useMemo(() => {
		if (!assets || assets.length === 0) {
			return [];
		}

		return assets.map(({ data, uuid }) => ({
			uuid,
			data,
			// disabled: false, // TODO: check if minWidth, minHeight and allowedFileTypes are correct
			src: getThumbnailUrl(data.thumbnail),
			title: data.name,
		}));
	}, [assets]);

	// Fetch assets
	useEffect(() => {
		assetsFacade.getAssets(searchParams);
	}, [searchParams]);

	/**
	 * Methods
	 */

	const findSelected = (item: ImageSelectItem): boolean =>
		!!selectedImages.find(selected => selected.uuid === item.uuid);

	const onContinue = (): void => {
		// TODO: bubble selected images up to parent to pass it via data to other views
		// This will be done with a third param for onViewChange
		onViewChange(ModalViewTarget.EDIT_META, ModalViewMode.EDIT);
	};

	const onImageSelect = (item: ImageSelectItem): void => {
		const isSelected = findSelected(item);

		if (isSelected) {
			setSelectedImages(selectedImages.filter(selected => selected.uuid !== item.uuid));
		} else {
			setSelectedImages(selectedImages.concat(item));
		}
	};

	const onPageChange = (newPage: number): void => {
		setSearchParams({ ...searchParams, page: newPage });
	};

	const onSearchAssets = debounce(
		(e: ChangeEvent<HTMLInputElement>): void => {
			setSearchParams({ ...searchParams, search: e.target.value });
		},
		500,
		{ leading: true }
	);

	/**
	 * Render
	 */

	const renderAssets = (): ReactElement | null => {
		if (!assets || assets.length === 0) {
			return null;
		}

		return (
			<>
				<p className="u-margin-bottom">Resultaat ({assetsMeta?.totalElements || 0})</p>
				<ImageSelect
					compareSelected={findSelected}
					items={parsedAssets}
					selection={selectedImages}
					onSelect={onImageSelect}
				/>
				{assetsMeta && (
					<Pagination
						currentPage={searchParams.page}
						itemsPerPage={DEFAULT_SEARCH_PARAMS.pagesize}
						styling="center-xs"
						totalValues={assetsMeta.totalElements}
						onUpdate={onPageChange}
					/>
				)}
			</>
		);
	};

	return (
		<>
			<ModalViewContainer>
				<div className="row">
					<div className="col-xs-12 col-md-3">
						<TextField
							iconright="search"
							label="Zoek op woord"
							placeholder="Zoeken"
							value={searchParams.search}
							onChange={onSearchAssets}
						/>
					</div>
				</div>

				<div className="u-margin-top">
					<DataLoader loadingState={assetsLoading} render={renderAssets} />
				</div>
			</ModalViewContainer>

			<ModalViewActions>
				<div className="row end-xs">
					<Button negative onClick={onCancel}>
						{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
					</Button>
					<Button
						className="u-margin-left-xs"
						disabled={selectedImages.length === 0}
						onClick={onContinue}
					>
						{t(CORE_TRANSLATIONS['BUTTON_NEXT'])}
					</Button>
				</div>
			</ModalViewActions>
		</>
	);
};

export default ImageSelection;
