import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `orders/item/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    orderId: params.orderId,
    orderItem: params.orderItem,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

const updates = async (
  params: any,
  type: string,
): Promise<any> => {
  let endpointUrl = 'item';

  if (type === 'item') {
    endpointUrl = 'orders/item/updates';
  }

  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  updates,
  reads,
}
