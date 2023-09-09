import {
  ReadsItemOperationListParams,
  ReadsItemOperationListResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const readsList = async (
  params: ReadsItemOperationListParams,
): Promise<ReadsItemOperationListResponse> => {
  const endpointUrl = `production-order/item-operation/list`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    isMarkedForDeletion: params.isMarkedForDeletion,
    isReleased: params.isReleased,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    productionOrder: params.productionOrder,
    productionOrderItem: params.productionOrderItem,
  });
  return { ...response.data };
}

export {
  readsList,
}
