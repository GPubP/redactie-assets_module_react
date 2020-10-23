import { Button } from '@acpaas-ui/react-components';
import { NavList } from '@acpaas-ui/react-editorial-components';
import React, { FC, useMemo, useState } from 'react';

import { ModalViewComponentProps, NavListItem } from '../../assets.types';
import { CropOption, ModalViewActions, ModalViewContainer, ModalViewData } from '../../components';
import { CORE_TRANSLATIONS, useCoreTranslation } from '../../connectors';

const ImageCrop: FC<ModalViewComponentProps<ModalViewData>> = ({ data, onCancel }) => {
	const { config } = data;
	const cropOptions = config?.imageConfig?.cropOptions || [];

	/**
	 * Hooks
	 */

	const [cropOption, setCropOption] = useState<CropOption | null>(cropOptions[0] || null);
	const [t] = useCoreTranslation();
	const navListItems: NavListItem[] = useMemo(() => {
		return cropOptions.map(crop => ({
			className: crop.id === cropOption?.id ? 'is-active' : '',
			hasError: false,
			label: crop.name,
			onClick: () => setCropOption(crop),
		}));
	}, [cropOptions, cropOption]);

	/**
	 * Methods
	 */

	const getCropOptionIndex = (): number =>
		cropOptions.findIndex(crop => crop.id === cropOption?.id);

	const cycleCropOption = (indexUpdate: number): void =>
		setCropOption(cropOptions[getCropOptionIndex() + indexUpdate]);

	const onSave = (): void => {
		// TODO: handle save functionality
		// setImageFieldValue();
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
						<p>
							Snijd de afbeelding bij volgens deze verhouding: <strong></strong>
						</p>
						<div className="o-cropper-container"></div>
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
						<Button onClick={onSave} type="success">
							{t(CORE_TRANSLATIONS.BUTTON_SAVE)}
						</Button>
					</div>
				</div>
			</ModalViewActions>
		</>
	);
};

export default ImageCrop;
