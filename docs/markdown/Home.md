# Redactie Assets module (React)

## How to start?

### Install all dependencies

```
npm install
```

### Build the library

```
// from root
npm run build
// or
npm run build:w
// To watch the file
```

## How to use the registerAssetsProvider functionality

An `onSelect` prop is provided to the `viewComponent` passed to the `registerAssetsProvider` function.
This `onSelect` functionality accepts the following object in array (currently passing one object is only supported):
```js
const selectedImage = [{
	content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAALZCAYAAACnCthnAAAgAElEQVR...', // This should be the asset you want to provide, base64 encoded
	name: 'Some image', // This should be the name of your image
	figuratively: true, // If you want this to be a figurative image
	alt: 'This is the alt image', // Image alternative text
	title: 'This is the title', // Image title
	description: 'This be desc', // Image description
	copyright: 'copyright 2022', // Image copyright
}]
```

Only the `content` prop is required, the other props are used for default fill-ins and can still be edited by the user in the meta screen

### Example

```js
const ExternalProvider: FC<ExternalModalViewComponentProps<ModalViewData>> = ({ onSelect }) => {
	useEffect(() => {
		onSelect([
			{
				content: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAALZCAYAAACnCthnAAAgAElEQVR...',
				name: 'Flüüfff image',
				figuratively: true,
				alt: 'This is the alt image',
				title: 'This is the title',
				description: 'This be desc',
				copyright: 'copy',
			},
		]);
	}, []);

	return (
		<ModalViewContainer>
			<p>Hello world</p>
		</ModalViewContainer>
	);
};

registerAssetsProvider('external-provider', {
	active: true,
	name: 'Selecteren: ExternalProvider',
	viewComponent: ExternalProvider,
	show: (siteId) => true
});
```
