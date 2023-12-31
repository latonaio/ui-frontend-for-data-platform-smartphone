import {
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
  UIKeyGeneral,
  Pagination,
  ProductionOrderCockpitProps,
} from '@/constants';

export interface ReadsDetailListParams extends UIKeyGeneral {
  productionOrder: number;
  productionOrderIsReleased: boolean;
  isMarkedForDeletion: boolean;
  // isCancelled: boolean;
  userType: string;
}

export interface ReadsDetailParams extends UIKeyGeneral {
  userType: string;
  productionOrder: number;
  productionOrderItem: number;
  product?: string;
}

export interface ReadsDetailResponse {
  HeaderSingleUnit: ProductionOrderCockpitProps[];
  ItemSingleUnit: any;
}

interface DetailPagination {
  Paginations: {
    ProductionOrder: number;
    ProductionOrderItem: number;
    Product: string;
  }[];
}

export interface ReadsPaginationResponse {
  productionOrderDetailPagination: DetailPagination;
}

export interface ReadsDetailListResponse extends Pagination {
  productionOrderDetailList: ProductionOrderDetailListItem[];
  productionOrderDetailHeader: ProductionOrderDetailHeader;
}
