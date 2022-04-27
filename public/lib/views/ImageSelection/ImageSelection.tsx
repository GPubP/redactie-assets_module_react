import { Pagination, TextField } from '@acpaas-ui/react-components';
import { DataLoader, useSiteContext } from '@redactie/utils';
import debounce from 'lodash.debounce';
import React, { ChangeEvent, FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { ImageSelectItem, ModalViewComponentProps } from '../../assets.types';
import { ImageSelect, ModalViewContainer, ModalViewData } from '../../components';
import { parseImageCards } from '../../helpers';
import { useAssets } from '../../hooks';
import { assetsFacade } from '../../store/assets';

import { DEFAULT_SEARCH_PARAMS } from './ImageSelection.const';
import { AssetSelectItem } from './ImageSelection.types';

const ImageSelection: FC<ModalViewComponentProps<ModalViewData>> = ({
	data: viewData,
	onSelect,
}) => {
	const { siteId } = useSiteContext();

	/**
	 * Hooks
	 */

	const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH_PARAMS);
	const [selectedAssets, setSelectedAssets] = useState<AssetSelectItem[]>([]);
	const [assetsLoading, , assets, assetsMeta] = useAssets();
	const parsedAssets: AssetSelectItem[] = useMemo(() => {
		return viewData.config ? parseImageCards(viewData.config, assets) : [];
	}, [assets, viewData.config]);

	// Fetch assets
	useEffect(() => {
		const leading = !searchParams.search && searchParams.page === 1;
		const debouncedGetAssets = debounce(
			() => assetsFacade.getAssets(searchParams, siteId),
			500,
			{
				leading,
			}
		);
		debouncedGetAssets();
		return () => debouncedGetAssets.cancel();
	}, [searchParams, siteId]);

	useEffect(() => {
		onSelect(selectedAssets);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedAssets]);

	/**
	 * Methods
	 */

	const findSelected = (item: ImageSelectItem): boolean =>
		!!selectedAssets.find(selected => selected.uuid === item.uuid);

	const onImageSelect = (item: ImageSelectItem): void => {
		const isSelected = findSelected(item);

		if (isSelected) {
			setSelectedAssets(selectedAssets.filter(selected => selected.uuid !== item.uuid));
		} else {
			if (selectedAssets.length === 1) {
				// For now, only allow to select 1 item
				setSelectedAssets([item as AssetSelectItem]);
				return;
			}
			setSelectedAssets(selectedAssets.concat(item as AssetSelectItem));
		}
	};

	const onPageChange = (newPage: number): void => {
		setSearchParams({ ...searchParams, page: newPage });
	};

	const onSearchAssets = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchParams({ ...searchParams, page: 1, search: e.target.value });
	};

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
	);
};

export default ImageSelection;
