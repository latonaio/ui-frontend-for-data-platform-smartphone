import {
  CreatesResponse,
} from './model';
import { apiCallReads, apiCallUpdate } from '@/api/axios';
import { methods } from '@/constants';

const updates = async (
  params: any,
  type: string,
): Promise<CreatesResponse> => {
  let endpointUrl = '';

  if (type === 'function-actual-goods-receipt-posting') {
    endpointUrl = 'delivery-document/function-actual-goods-receipt-posting/updates';
  }

  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  updates,
}
