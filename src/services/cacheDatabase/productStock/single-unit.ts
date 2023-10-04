import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductStockSingleUnitProps,
} from '@/constants';
import { ProductStockUserType } from './index';
import { reads } from '@/api/productStock/singleUnit';

export class SingleUnit extends CacheDatabase {
  async getProductStockSingleUnit(
    product: string,
    businessPartner: number,
    plant: string,
  ): Promise<ProductStockSingleUnitProps | null> {
    const response = await this.productStockSingleUnit.get({
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

  async updateProductStockSingleUnit(
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

    const productStockSingleUnit =
      response.ProductStockSingleUnit ?
        response.ProductStockSingleUnit.length >= 1 ?
          response.ProductStockSingleUnit[0] : {} : {};

    this.productStockSingleUnit.put({
      ...productStockSingleUnit,
      Product: params.product,
      BusinessPartner: params.businessPartner,
      Plant: params.plant,
      UserType: params.userType,
    });

    return {
      Product: params.product,
      BusinessPartner: params.businessPartner,
      Plant: params.plant,
    }
  }
}
