import { DeliveryDocumentSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  deliveryDocument: number;
  deliveryDocumentItem: number;
  userType: string;
}

export interface ReadsResponse {
  SingleUnit: DeliveryDocumentSingleUnitProps[] | null;
}
