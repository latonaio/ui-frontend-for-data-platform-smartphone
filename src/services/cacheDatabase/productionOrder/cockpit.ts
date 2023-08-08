import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductionOrderCockpitProps,
} from '@/constants';
import { ProductionOrderUserType } from './index';
import {
  readsDetail,
} from '@/api/productionOrder/detail';

export class Cockpit extends CacheDatabase {
  async getProductionOrderCockpit(
    productionOrder: number,
    productionOrderItem: number,
    product: string,
  ): Promise<ProductionOrderCockpitProps | null> {
    const response = await this.productionOrderCockpit.get({
      ProductionOrder: productionOrder,
      ProductionOrderItem: productionOrderItem,
      Product: product,
    });

    if (response) {
      return {
        ...response,
      }
    }

    return null;
  }

  async updateProductionOrderCockpit(
    params: {
      productionOrder: number;
      productionOrderItem: number;
      product: string;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await readsDetail({
      productionOrder: params.productionOrder,
      productionOrderItem: params.productionOrderItem,
      product: params.product,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    this.productionOrderCockpit.put({
      ...response.productionOrderDetail,
    });

    return {
      ...response.productionOrderDetail,
      ProductionOrder: params.productionOrder,
    }
  }
}
