import { OrdersDetailHeader, OrdersItemProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  orderId: number;
  orderItem: number;
  userType: string;
}

export interface ReadsResponse {
  HeaderWithItem: OrdersDetailHeader[] | null;
  Item: OrdersItemProps[] | null;
}
