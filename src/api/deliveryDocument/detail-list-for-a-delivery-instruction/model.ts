import {
  OrdersDetailHeader,
  OrdersDetailListItem,
  UIKeyGeneral,
  OrdersProductDetailProps,
  Pagination,
  PaymentTerms,
  PaymentMethod,
  Currency,
  QuantityUnit,
  OrdersItemProps,
} from '@/constants';

export interface ReadsDetailListForAnDeliveryInstructionParams extends UIKeyGeneral {
  deliveryDocument: number;
}

export interface ReadsDetailListForAnDeliveryInstructionResponses {
  mount_path: string;
}
