import { DeliveryDocumentDetailHeader, DeliveryDocumentItemProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  deliveryDocument: number;
  deliveryDocumentItem: number;
  userType: string;
}

export interface ReadsResponse {
  HeaderWithItem: DeliveryDocumentDetailHeader[] | null;
  Item: DeliveryDocumentItemProps[] | null;
}
