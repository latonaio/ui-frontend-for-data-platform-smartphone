import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `inspection-lot/spec-detail`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    inspectionLot: params.inspectionLot,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
