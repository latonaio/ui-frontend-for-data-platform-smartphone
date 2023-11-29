import { OrdersItemScheduleLineProps, OrdersItemScheduleLineItemHeader, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  orderId: number;
  orderItem: number;
  userType: string;
}

export interface ReadsResponse {
  Item: OrdersItemScheduleLineItemHeader[] | null;
  ItemScheduleLine: OrdersItemScheduleLineProps[] | null;
}
