import { CacheDatabase } from '..';
import {
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { List } from './list';
import { toLowerCase } from '@/helpers/common';
import { Detail } from './detail';
import { Cockpit } from './cockpit';
import { ItemOperationList } from './item-operation/list';
import { ItemOperationInput } from './item-operation/input';

export interface ProductionOrderUserType {
  ownerProductionPlantBusinessPartner: string;
}

class ProductionOrderCache extends CacheDatabase implements ItemOperationList, Detail {
  private list: List;
  private detail: Detail;
  private cockpit: Cockpit;
  private itemOperationList: ItemOperationList;
  private itemOperationInput: ItemOperationInput;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.cockpit = new Cockpit();
    this.itemOperationList = new ItemOperationList();
    this.itemOperationInput = new ItemOperationInput();
  }

  async getProductionOrderList() {
    return this.list.getProductionOrderList();
  }

  async updateProductionOrderList(
    params: {
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductionOrderUserType[keyof ProductionOrderUserType];
    },
  ): Promise<void> {
    return await this.list.updateProductionOrderList(params);
  }

  async getProductionOrderDetailList(
    productionOrder: number,
    productionOrderItem: string,
  ) {
    return await this.detail.getProductionOrderDetailList(
      productionOrder,
      productionOrderItem,
    );
  }

  async getProductionOrderItemOperationList(
    productionOrder: number,
  ) {
    return await this.itemOperationList.getProductionOrderItemOperationList(
      productionOrder,
    );
  }

  async getProductionOrderCockpit(
    productionOrder: number,
    productionOrderItem: number,
  ) {
    return await this.cockpit.getProductionOrderCockpit(
      productionOrder,
      productionOrderItem,
    );
  }

  async getProductionOrderItemOperationInput(
    productionOrder: number,
    productionOrderItem: number,
  ) {
    return await this.itemOperationInput.getProductionOrderItemOperationInput(
      productionOrder,
      productionOrderItem,
    );
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
    return await this.itemOperationList.updateProductionOrderItemOperationList(params);
  }

  async updateProductionOrderDetailList(
    params: {
      productionOrder: number;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.detail.updateProductionOrderDetailList(params);
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
  ) {
    return await this.cockpit.updateProductionOrderCockpit(params);
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
  ) {
    return await this.itemOperationInput.updateProductionOrderItemOperationInput(params);
  }
}

export const productionOrderCache = new ProductionOrderCache();

