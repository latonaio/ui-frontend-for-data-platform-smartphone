import { CacheDatabase } from '..';
import {
  AuthedUser,
  UserTypeEnum,
} from '@/constants';
import { List } from './list';
import { toLowerCase } from '@/helpers/common';
import { Detail } from './detail';
import { Cockpit } from './cockpit';
import { Operation } from './operation';

export interface ProductionOrderUserType {
  ownerProductionPlantBusinessPartner: string;
}

class ProductionOrderCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;
  private cockpit: Cockpit;
  private operation: Operation;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.cockpit = new Cockpit();
    this.operation = new Operation();
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

  async getProductionOrderOperation(
    productionOrder: number,
    productionOrderItem: string,
  ) {
    return await this.operation.getProductionOrderOperation(
      productionOrder,
      productionOrderItem,
    );
  }

  async getProductionOrderCockpit(
    productionOrder: number,
    productionOrderItem: number,
    product: string,
  ) {
    return await this.cockpit.getProductionOrderCockpit(
      productionOrder,
      productionOrderItem,
      product,
    );
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
    return await this.operation.updateProductionOrderOperation(params);
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
      product: string;
      userType: ProductionOrderUserType[keyof ProductionOrderUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return await this.cockpit.updateProductionOrderCockpit(params);
  }
}

export const productionOrderCache = new ProductionOrderCache();

