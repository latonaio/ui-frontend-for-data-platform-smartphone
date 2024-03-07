import {
  ReadsParams,
  ReadsResponse,
} from './model';
import { apiCallReads } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: ReadsParams,
): Promise<ReadsResponse> => {
  const endpointUrl = `certificate-authority-chain-with-usage-control-chain/certificate-authority-chain-with-usage-control-chain`;
  const response = await apiCallReads(methods.GET, endpointUrl, {
    usageControlChain: params.usageControlChain,
    certificateAuthorityChain: params.certificateAuthorityChain,
    certificateObject: params.certificateObject,
    certificateObjectLabel: params.certificateObjectLabel,
    language: params.language,
    businessPartner: params.businessPartner,
    userId: params.userId,
  });
  return { ...response.data };
}

export {
  reads,
}
