import { ProductImage, DocumentImage } from '@/constants';

interface OrdersItem {
  OrderID: number;
  OrderItem: number;
  Product: string;
  OrderItemText: string;
  OrderQuantityInDeliveryUnit: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  HeaderDeliveryStatus: string;
  OrderDate: string;
  PaymentTerms: string;
  PaymentTermsName: string;
  PaymentMethod: string;
  PaymentMethodName: string;
  TransactionCurrency: string;
  RequestedDeliveryDate: string;
  RequestedDeliveryTime: string;
  DeliveryUnit: string;
  OrderType: string;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  Images: {
    Product: ProductImage;
    DocumentImage: DocumentImage;
  };
}

interface OrdersItemScheduleLineItemHeader extends OrdersItem {
}

interface OrdersItemPricingElementItemHeader extends OrdersItem {
}

interface OrdersItemScheduleLineItem {
  OrderID: number;
  ScheduleLine: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  ScheduleLineOrderQuantityInBaseUnit: number;
  ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit: number;
  StockConfirmationBusinessPartner: number;
  StockConfirmationBusinessPartnerName: string;
  StockConfirmationPlant: string;
  StockConfirmationPlantName: string;
  RequestedDeliveryDate: string;
  RequestedDeliveryTime: string;
  DeliveredQuantityInBaseUnit: number;
  UndeliveredQuantityInBaseUnit: number;
}

interface OrdersItemPricingElementItem {
  OrderID: number;
  PricingProcedureCounter: number;
  ConditionRateValue: number;
  ConditionRateValueUnit: number;
  ConditionScaleQuantity: number;
  ConditionCurrency: string;
  ConditionQuantity: number;
  ConditionAmount: number;
  ConditionType: string;
}

interface BuyerItem extends OrdersItem {
}

interface SellerItem extends OrdersItem {
}

interface OrdersDetailListItem {
  OrderID?: number;
  OrderItem: number;
  Product: string;
  OrderItemTextByBuyer: string;
  OrderItemTextBySeller: string;
  OrderQuantityInDeliveryUnit: string;
  DeliveryUnit: string;
  ConditionRateValue: string;
  RequestedDeliveryDate: string;
  NetAmount: string;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  SupplyChainRelationshipID: number;
  PricingProcedureCounter: number;
}

interface PaymentFormList {
  PaymentTermsList: PaymentTerms[];
  PaymentMethodList: PaymentMethod[];
  CurrencyList: Currency[];
  QuantityUnitList: QuantityUnit[];
}

interface OrdersDetailHeader extends PaymentFormList {
  OrderID: number;
  SellerName: string;
  Seller: number;
  BuyerName: string;
  Buyer: number;
  DeliveryStatus: string;
  OrderDate: string;
  PaymentTerms: string;
  PaymentTermsName: string;
  PaymentMethod: string;
  PaymentMethodName: string;
  TransactionCurrency: string;
  OrderType: string;
}

interface PaymentTerms {
  PaymentTerms: string;
  PaymentTermsName: string;
}

interface PaymentMethod {
  PaymentMethod: string;
  PaymentMethodName: string;
}

interface Currency {
  Currency: string;
  CurrencyName: string;
}

interface QuantityUnit {
  QuantityUnit: string;
  QuantityUnitName: string;
}

export type {
  OrdersItem,
  OrdersItemScheduleLineItemHeader,
  OrdersItemScheduleLineItem,
  OrdersItemPricingElementItemHeader,
  OrdersItemPricingElementItem,
  BuyerItem,
  SellerItem,
  OrdersDetailListItem,
  OrdersDetailHeader,
  PaymentTerms,
  PaymentMethod,
  Currency,
  QuantityUnit,
}
