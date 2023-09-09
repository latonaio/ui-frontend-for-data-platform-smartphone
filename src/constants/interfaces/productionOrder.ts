import { ProductImage } from '@/constants';

interface ProductionOrderItem {
  ProductionOrder: number;
  MRPArea: number;
  Product: number;
  ProductName: number;
  OwnerProductionPlantBusinessPartner: number;
  OwnerProductionPlant: number;
  TotalQuantity: number;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
}

interface ProductionOrderDetailListItem {
  ProductionOrder: number;
  ProductionOrderItem: number;
  Product: string;
  ProductName: string;
  OrderItemTextBySeller: string;
  TotalQuantity: number;
  ConfirmedYieldQuantity: number;
  ItemIsConfirmed: boolean;
  ItemIsPartiallyConfirmed: boolean;
  ItemIsReleased: boolean;
  IsCancelled: boolean;
  MRPArea: string;
}

interface ProductionOrderItemOperationItem {
  ProductionOrder: number;
  ProductionOrderItem: number;
  Product: string;
  Operations: number;
  OperationsItem: number;
  OperationID: number;
  OperationText: string;
  Seller: number;
  SellerName: string;
  IsReleased: boolean;
  IsMarkedForDeletion: boolean;
  IsPartiallyConfirmed: boolean;
  IsConfirmed: boolean;
}

interface ProductionOrderDetailHeader {
  ProductionOrder: number;
  ProductionOrderItem: number;
  MRPArea: string;
  Product: string;
  ProductName: string;
  OwnerProductionPlantBusinessPartner: string;
  OwnerProductionPlantBusinessPartnerName: string;
  OwnerProductionPlant: string;
  OwnerProductionPlantName: string;
  TotalQuantity: number;
  ProductionOrderQuantityInBaseUnit: number;
  ProductionOrderQuantityInDestinationProductionUnit: number;
  ProductionOrderQuantityInProductionUnit: number;
  ProductionOrderPlannedStartDate: string;
  ProductionOrderPlannedStartTime: string;
  ProductionOrderPlannedEndDate: string;
  ProductionOrderPlannedEndTime: string;
  HeaderIsConfirmed: boolean;
  HeaderIsPartiallyConfirmed: boolean;
  HeaderIsReleased: boolean;
  IsCancelled: boolean;
  IsMarkedForDeletion: boolean;
  Images: {
    Product: ProductImage;
  };
}

interface ProductionOrderItemOperationHeader extends ProductionOrderDetailHeader {
}

export type {
  ProductionOrderItem,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
  ProductionOrderItemOperationItem,
  ProductionOrderItemOperationHeader,
}
