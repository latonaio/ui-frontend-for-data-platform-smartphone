import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailListForAnOrderDocumentParams,
  ReadsDetailListForAnOrderDocumentResponse,
} from './model';

const reads = async (
  params: ReadsDetailListForAnOrderDocumentParams,
): Promise<ReadsDetailListForAnOrderDocumentResponse> => {
  const endpointUrl = `orders/detail/list-for-an-order-document`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    orderId: params.orderId,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  reads,
};
