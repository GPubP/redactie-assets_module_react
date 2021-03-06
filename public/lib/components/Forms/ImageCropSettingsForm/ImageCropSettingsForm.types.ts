import { FormikProps } from 'formik';

import { CropOption } from '../../Fields/ImageFieldSettings';

export interface ImageCropSettingsFormProps {
	initialValues: CropOption;
	onSubmit: (values: CropOption) => void;
	children?: ((props: FormikProps<CropOption>) => React.ReactNode) | React.ReactNode;
}

export interface CropMethodFieldOption {
	key: string;
	value: string;
	label: string;
	guideline: string;
}
