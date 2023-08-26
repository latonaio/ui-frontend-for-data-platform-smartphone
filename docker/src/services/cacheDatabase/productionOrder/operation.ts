import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
} from '@/constants';
import { ProductionOrderUserType } from './index';
import {
  readsDetailList,
} from '@/api/productionOrder/detail';

export class Operation extends CacheDatabase {
  async getProductionOrderOperation(
    productionOrder: number,
    userType: ProductionOrderUserType[keyof ProductionOrderUserType],
  ): Promise<{
    [ProductionOrderTablesEnum.productionOrderOperation]:
      ProductionOrderDetailListItem[];
    [ProductionOrderTablesEnum.productionOrderDetailHeader]:
      ProductionOrderDetailHeader | undefined;
  }> {
    return {
      [ProductionOrderTablesEnum.productionOrderOperation]:
        await this.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem
          .where('ProductionOrder')
          .equals(productionOrder)
          .toArray(),
      [ProductionOrderTablesEnum.productionOrderDetailHeader]:
        await this.productionOrderDetailHeader.get({ ProductionOrder: productionOrder }),
    }
  }

  async updateProductionOrderOperation(
    params: {
      productionOrder: number;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsDetailList({
      isMarkedForDeletion: false,
      productionOrder: params.productionOrder,
      productionOrderIsReleased: true,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    if (response.productionOrderDetailList.length > 0) {
      for (const productionOrderDetailListItem of response.productionOrderDetailList) {
        await this.productionOrderOperation.put({
          ...productionOrderDetailListItem,
          ProductionOrder: params.productionOrder,
        });
      }

      await this.productionOrderDetailHeader.put({
        ...response.productionOrderDetailHeader,
        ProductionOrder: params.productionOrder,
      });
    } else {
      await this.productionOrderOperation.clear();
      await this.productionOrderDetailHeader.clear();
    }
  }
}
