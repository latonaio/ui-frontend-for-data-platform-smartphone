import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `product-stock/product-stock-by-storage-bin-by-batch-list/${params.userType}`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    product: params.product,
    plant: params.plant,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
