import { Button, Pagination, TextField } from '@acpaas-ui/react-components';
import { DataLoader } from '@redactie/utils';
import debounce from 'lodash.debounce';
import React, { ChangeEvent, FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { ModalViewComponentProps } from '../../assets.types';
import {
	ImageSelect,
	ImageSelectItem,
	ModalViewActions,
	ModalViewContainer,
	ModalViewData,
	ModalViewMode,
	ModalViewTarget,
} from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';
import { getAssetUrl, parseAllowedFileTypes, validateFileType } from '../../helpers';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

import { DEFAULT_SEARCH_PARAMS } from './ImageSelection.const';
import { AssetSelectItem } from './ImageSelection.types';

const ImageSelection: FC<ModalViewComponentProps<ModalViewData>> = ({
	data: viewData,
	onCancel,
	onViewChange,
}) => {
	/**
	 * Hooks
	 */

	const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
	const [selectedAssets, setSelectedAssets] = useState<AssetSelectItem[]>([]);
	const [assetsLoading, , assets, assetsMeta] = useAssets();
	const [t] = useCoreTranslation();
	const parsedAssets: AssetSelectItem[] = useMemo(() => {
		if (!assets || assets.length === 0) {
			return [];
		}

		return assets.map(({ data, uuid }) => ({
			uuid,
			data,
			disabled: !validateFileType(
				parseAllowedFileTypes(viewData.config?.allowedFileTypes),
				data.file
			),
			src: getAssetUrl(data.thumbnail),
			title: data.name,
		}));
	}, [assets, viewData.config]);

	// Fetch assets
	useEffect(() => {
		assetsFacade.getAssets(searchParams);
	}, [searchParams]);

	/**
	 * Methods
	 */

	const findSelected = (item: ImageSelectItem): boolean =>
		!!selectedAssets.find(selected => selected.uuid === item.uuid);

	const onContinue = (): void => {
		onViewChange(ModalViewTarget.CREATE_META, ModalViewMode.CREATE, {
			// Don't pass image select component props
			selectedFiles: selectedAssets.map(({ uuid, data }) => ({ uuid, data })),
		});
	};

	const onImageSelect = (item: ImageSelectItem): void => {
		const isSelected = findSelected(item);

		if (isSelected) {
			setSelectedAssets(selectedAssets.filter(selected => selected.uuid !== item.uuid));
		} else {
			if (selectedAssets.length === 1) {
				// For now, only allow to select 1 item
				return;
			}
			setSelectedAssets(selectedAssets.concat(item as AssetSelectItem));
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
					selection={selectedAssets}
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
				<div className="row middle-xs end-xs">
					{selectedAssets.length > 0 && (
						<span className="u-text-success u-text-italic u-margin-right">
							{selectedAssets.length} afbeelding(en) geselecteerd
						</span>
					)}
					<Button negative onClick={onCancel}>
						{t(CORE_TRANSLATIONS['BUTTON_CANCEL'])}
					</Button>
					<Button
						className="u-margin-left-xs"
						disabled={selectedAssets.length === 0}
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
