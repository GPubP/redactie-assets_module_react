import { FormikProps } from 'formik';

export interface ImageMetaFormProps {
	initialValues?: ImageMetaFormState;
	children?: (props: FormikProps<ImageMetaFormState>) => React.ReactNode;
	onSubmit: (values: ImageMetaFormState) => void;
}

export interface ImageMetaFormState {
	name: string;
	alt: string;
	title: string;
	description: string;
	copyright: string;
}
