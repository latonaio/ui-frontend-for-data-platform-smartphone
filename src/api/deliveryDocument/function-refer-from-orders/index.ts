import {
  CreatesResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const creates = async (
  params: any,
  type: string,
): Promise<CreatesResponse> => {
  let endpointUrl = '';

  if (type === 'function-refer-from-orders') {
    endpointUrl = 'delivery-document/function-refer-from-orders/creates';
  }

  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  creates,
}
