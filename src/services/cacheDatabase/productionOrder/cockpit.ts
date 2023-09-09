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
  ): Promise<ProductionOrderCockpitProps | null> {
    const response = await this.productionOrderCockpit.get({
      ProductionOrder: productionOrder,
      ProductionOrderItem: productionOrderItem,
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
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await readsDetail({
      productionOrder: params.productionOrder,
      productionOrderItem: params.productionOrderItem,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    this.productionOrderCockpit.put({
      ...response.ItemSingleUnit[0],
      ProductionOrder: params.productionOrder,
      ProductionOrderItem: params.productionOrderItem,
    });

    return {
      ...response.ItemSingleUnit[0],
      ProductionOrder: params.productionOrder,
      ProductionOrderItem: params.productionOrderItem,
    }
  }
}
