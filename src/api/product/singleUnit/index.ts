import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `product-master/product-single-unit/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    product: params.product,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
