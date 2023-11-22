import { OrdersSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  orderId: string;
  userType: string;
}

export interface ReadsResponse {
  SingleUnit: OrdersSingleUnitProps[] | null;
}
