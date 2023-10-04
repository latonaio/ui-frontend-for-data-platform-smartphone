import { ProductStockByStorageBinByBatchProps, ProductStockSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  product: string;
  plant: string;
  userType: string;
}

export interface ReadsResponse {
  ProductStockHeader: ProductStockSingleUnitProps[],
  ProductStockByStorageBinByBatchHeader: ProductStockByStorageBinByBatchProps[] | null;
}
