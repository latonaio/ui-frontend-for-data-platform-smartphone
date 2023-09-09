import { CacheDatabase } from '../..';
import {
  AuthedUser,
  ProductionOrderItemOperationInputProps,
} from '@/constants';
import { ProductionOrderUserType } from '../index';
import {
  readsInput,
} from '@/api/productionOrder/item-operation/input';

export class ItemOperationInput extends CacheDatabase {
  async getProductionOrderItemOperationInput(
    productionOrder: number,
    productionOrderItem: number,
  ): Promise<ProductionOrderItemOperationInputProps | null> {
    const response = await this.productionOrderItemOperationInput.get({
      ProductionOrder: productionOrder,
    });

    if (response) {
      return {
        ...response,
      }
    }

    return null;
  }

  async updateProductionOrderItemOperationInput(
    params: {
      productionOrder: number;
      productionOrderItem: number;
      operations: number;
      operationsItem: number;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await readsInput({
      productionOrder: params.productionOrder,
      productionOrderItem: params.productionOrderItem,
      operations: params.operations,
      operationsItem: params.operationsItem,
      language: params.language,
      businessPartner: params.businessPartner,
      isMarkedForDeletion: false,
      isReleased: false,
      userId: params.emailAddress,
      userType: params.userType,
    });

    this.productionOrderItemOperationInput.put({
      ...response.HeaderWithItem[0],
      ...response.ItemOperation[0],
      ProductionOrder: params.productionOrder,
      ProductionOrderItem: params.productionOrderItem,
    });

    return {
      ...response.HeaderWithItem[0],
      ProductionOrder: params.productionOrder,
      ProductionOrderItem: params.productionOrderItem,
    }
  }
}
