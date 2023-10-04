import { ProductStockSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  product: string;
  plant: string;
  userType: string;
}

export interface ReadsResponse {
  ProductStockAvailabilityDetailHeader: any[] | null;
  ProductStockAvailabilityHeader: any[] | null;
  ProductStockDetailHeader: any[] | null;
  ProductStockHeader: any[] | null;
  ProductStockSingleUnit: ProductStockSingleUnitProps[] | null;
}
