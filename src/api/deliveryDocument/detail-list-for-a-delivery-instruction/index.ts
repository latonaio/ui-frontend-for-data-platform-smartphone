import { apiCallReads } from '../../axios';
import { methods } from '@/constants/enums';
import {
  ReadsDetailListForAnDeliveryInstructionParams,
  ReadsDetailListForAnDeliveryInstructionResponses,
} from './model';

const reads = async (
  params: ReadsDetailListForAnDeliveryInstructionParams,
): Promise<ReadsDetailListForAnDeliveryInstructionResponses> => {
  const endpointUrl = `delivery-document/detail/list-for-a-delivery-instruction`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    deliveryDocument: params.deliveryDocument,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
};

export {
  reads,
};
