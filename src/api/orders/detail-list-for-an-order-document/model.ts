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

export interface ReadsDetailListForAnOrderDocumentParams extends UIKeyGeneral {
  orderId: number;
}

export interface ReadsDetailListForAnOrderDocumentResponse {
  HeaderWithItem: OrdersDetailHeader[] | null;
  Item: OrdersItemProps[] | null;
  MillSheetPdfMountPath: string;
  mount_path: string;
}
