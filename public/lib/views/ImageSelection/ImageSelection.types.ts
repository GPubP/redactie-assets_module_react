import { ImageSelectItem } from '../../components';
import { AssetResponse } from '../../services/assets';

export type AssetSelectItem = ImageSelectItem<Pick<AssetResponse, 'uuid' | 'data'>>;
