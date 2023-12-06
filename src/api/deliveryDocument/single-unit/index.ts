import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `delivery-document/item-single-unit/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    deliveryDocument: params.deliveryDocument,
    deliveryDocumentItem: params.deliveryDocumentItem,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
