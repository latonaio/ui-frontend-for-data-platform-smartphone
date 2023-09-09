import { CacheDatabase } from '../../index';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader, ProductionOrderItemOperationHeader, ProductionOrderItemOperationItem,
} from '@/constants';
import { ProductionOrderUserType } from '../index';
import {
  readsList,
} from '@/api/productionOrder/item-operation/list';

export class ItemOperationList extends CacheDatabase {
  async getProductionOrderItemOperationList(
    productionOrder: number,
  ): Promise<{
    [ProductionOrderTablesEnum.productionOrderItemOperationList]:
      ProductionOrderItemOperationItem[];
    [ProductionOrderTablesEnum.productionOrderDetailHeader]:
      ProductionOrderItemOperationHeader | undefined;
  }> {
    return {
      [ProductionOrderTablesEnum.productionOrderItemOperationList]:
        await this.productionOrderItemOperationList
          .where('ProductionOrder')
          .equals(productionOrder)
          .toArray(),
      [ProductionOrderTablesEnum.productionOrderDetailHeader]:
        await this.productionOrderDetailHeader.get({ ProductionOrder: productionOrder }),
    }
  }

  async updateProductionOrderItemOperationList(
    params: {
      productionOrder: number;
      productionOrderItem: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    const response = await readsList({
      isMarkedForDeletion: false,
      isReleased: false,
      productionOrder: params.productionOrder,
      productionOrderItem: params.productionOrderItem,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    if (response.ItemOperation.length > 0) {
      for (const productionOrderItemOperationListItem of response.ItemOperation) {
        await this.productionOrderItemOperationList.put({
          ...productionOrderItemOperationListItem,
          ProductionOrder: params.productionOrder,
        });
      }

      await this.productionOrderDetailHeader.put({
        ...response.HeaderWithItem[0],
        ProductionOrder: params.productionOrder,
        ProductionOrderItem: params.productionOrderItem,
      });
    } else {
      await this.productionOrderItemOperationList.clear();
      await this.productionOrderDetailHeader.clear();
    }
  }
}
