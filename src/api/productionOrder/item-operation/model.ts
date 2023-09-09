import {
  ProductionOrderDetailHeader,
  ProductionOrderItemOperationItem,
  UIKeyGeneral,
} from '@/constants';

export interface ReadsItemOperationListParams extends UIKeyGeneral {
  productionOrder: number;
  productionOrderItem: number;
  isMarkedForDeletion: boolean;
  isReleased: boolean;
}

export interface ReadsItemOperationInputParams extends UIKeyGeneral {
  productionOrder: number;
  productionOrderItem: number;
  operations: number;
  operationsItem: number;
  userType: string;
  isMarkedForDeletion: boolean;
  isReleased: boolean;
}

export interface ReadsItemOperationListResponse {
  HeaderWithItem: ProductionOrderDetailHeader[];
  ItemOperation: ProductionOrderItemOperationItem[];
}

export interface ReadsItemOperationInputResponse {
  HeaderWithItem: ProductionOrderDetailHeader[];
  ItemOperation: ProductionOrderItemOperationItem[];
}
