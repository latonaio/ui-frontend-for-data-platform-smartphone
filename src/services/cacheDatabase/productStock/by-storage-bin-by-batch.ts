import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductStockByStorageBinByBatchProps,
} from '@/constants';
import { ProductStockUserType } from './index';
import { reads } from '@/api/productStock/byStorageBinByBatch';

export class ByStorageBinByBatch extends CacheDatabase {
  async getProductStockByStorageBinByBatch(
    product: string,
    businessPartner: number,
    plant: string,
  ): Promise<ProductStockByStorageBinByBatchProps | null> {
    const response = await this.productStockByStorageBinByBatch.get({
      Product: product,
      BusinessPartner: businessPartner,
      Plant: plant,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateProductStockByStorageBinByBatch(
    params: {
      product: string;
      plant: string;
      userType: ProductStockUserType[keyof ProductStockUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      product: params.product,
      plant: params.plant,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    const ProductStockHeader =
      response.ProductStockHeader ?
        response.ProductStockHeader.length >= 1 ?
          response.ProductStockHeader[0] : {} : {};

    this.productStockByStorageBinByBatch.put({
      ...ProductStockHeader,
      ProductStockByStorageBinByBatchHeader: response.ProductStockByStorageBinByBatchHeader,
      Product: params.product,
      BusinessPartner: params.businessPartner,
      Plant: params.plant,
    });

    return {
      Product: params.product,
      BusinessPartner: params.businessPartner,
      Plant: params.plant,
    }
  }
}
