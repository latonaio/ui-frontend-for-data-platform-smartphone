import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `delivery-document/item/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    deliveryDocument: params.deliveryDocument,
    deliveryDocumentItem: params.deliveryDocumentItem,
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
    endpointUrl = 'delivery-document/item/updates';
  }

  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  updates,
  reads,
}
