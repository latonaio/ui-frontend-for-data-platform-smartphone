import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `orders/item-pricing-element/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    orderId: params.orderId,
    orderItem: params.orderItem,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
