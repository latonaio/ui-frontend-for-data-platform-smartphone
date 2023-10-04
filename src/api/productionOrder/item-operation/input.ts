import {
  ReadsItemOperationInputParams,
  ReadsItemOperationInputResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const readsInput = async (
  params: ReadsItemOperationInputParams,
): Promise<ReadsItemOperationInputResponse> => {
  const endpointUrl = `production-order-conf/header-single-unit/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    isMarkedForDeletion: params.isMarkedForDeletion,
    isReleased: params.isReleased,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
    productionOrder: params.productionOrder,
    productionOrderItem: params.productionOrderItem,
    operations: params.operations,
    operationsItem: params.operationsItem,
  });
  return { ...response.data };
}

export {
  readsInput,
}
