import {
  CreatesResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const reads = async (
  params: any,
  type?: string,
): Promise<CreatesResponse> => {
  let endpointUrl = '';

  endpointUrl = 'inspection-lot/header-single-unit-mill-sheet';

  const response = await apiCallReads(methods.GET, endpointUrl, params);
  return { ...response.data };
};

export {
  reads,
}
