import { apiCallUpdate, multiPartFormApiCall } from '@/api/axios';
import { methods } from '@/constants';
import {
  CancelsParams,
} from './model';

const updates = async (
  params: any,
  type: string,
): Promise<any> => {
  let endpointUrl = 'header';

  if (type === 'header') {
    endpointUrl = 'production-order-confirmation/header/updates';
  }

  const response = await apiCallUpdate(methods.POST, endpointUrl, params);
  return { ...response.data.message };
};

export {
  updates,
}
