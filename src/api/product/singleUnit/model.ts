import { ProductSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  product: string;
  userType: string;
}

export interface ReadsResponse {
  Generals: any[] | null;
  GeneralWithOthers: any[] | null;
  DetailGeneral: any[] | null;
  DetailBusinessPartner: any[] | null;
  DetailBPPlant: any[] | null;
  SingleUnit: ProductSingleUnitProps[] | null;
}
