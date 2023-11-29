import { OrdersItemPricingElementProps, OrdersItemPricingElementItemHeader, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  orderId: number;
  orderItem: number;
  userType: string;
}

export interface ReadsResponse {
  Item: OrdersItemPricingElementItemHeader[] | null;
  ItemPricingElement: OrdersItemPricingElementProps[] | null;
}
