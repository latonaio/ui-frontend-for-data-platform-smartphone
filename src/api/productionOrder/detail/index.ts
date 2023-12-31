import {
  ReadsDetailListParams,
  ReadsDetailListResponse,
  ReadsDetailParams,
  ReadsDetailResponse,
  ReadsPaginationResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const readsDetailList = async (
  params: ReadsDetailListParams,
): Promise<ReadsDetailListResponse> => {
  const endpointUrl = `production-order/detail/list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    productionOrderIsReleased: params.productionOrderIsReleased,
    isMarkedForDeletion: params.isMarkedForDeletion,
    // isCancelled: params.isCancelled,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    productionOrder: params.productionOrder,
  });
  return { ...response.data };
}

const readsDetail = async (
  params: ReadsDetailParams,
): Promise<ReadsDetailResponse> => {
  const endpointUrl = `production-order/item-single-unit/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    productionOrder: params.productionOrder,
    productionOrderItem: params.productionOrderItem,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  readsDetailList,
  readsDetail,
}
