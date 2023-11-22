import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductSingleUnitProps,
} from '@/constants';
import { ProductUserType } from './index';
import { reads } from '@/api/product/singleUnit';

export class SingleUnit extends CacheDatabase {
  async getProductSingleUnit(
    product: string,
  ): Promise<ProductSingleUnitProps | null> {
    const response = await this.productSingleUnit.get({
      Product: product,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateProductSingleUnit(
    params: {
      product: string;
      userType: ProductUserType[keyof ProductUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    const ProductSingleUnit =
      response.SingleUnit ?
        response.SingleUnit.length >= 1 ?
          response.SingleUnit[0] : {} : {};

    this.productSingleUnit.put({
      ...ProductSingleUnit,
      Product: params.product,
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      Product: params.product,
      BusinessPartner: params.businessPartner,
    }
  }
}
