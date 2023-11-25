import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersDetailListItem,
  ProductSingleUnitProps,
  OrdersSingleUnitProps,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { SingleUnit } from './single-unit';
import { ProductUserType } from '@/services/cacheDatabase/product';

export interface OrdersUserType {
  buyer: string;
  seller: string;
}

class OrdersCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;
  private singleUnit: SingleUnit;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.singleUnit = new SingleUnit();
  }

  async getOrdersDetailList(
    orderId: number,
    userType: OrdersUserType[keyof OrdersUserType],
    ) {
    return await this.detail.getOrdersDetailList(orderId, userType);
  }

  async getOrdersDetail(orderId: number, orderItem: number, product: string) {
    return await this.detail.getOrdersDetail(orderId, orderItem, product);
  }

  async updateOrdersDetailList(
    params: {
      orderId: number;
      userType: OrdersUserType[keyof OrdersUserType];
      buyer: number | null;
      seller: number | null;
      language: string;
      businessPartner: number;
      emailAddress: string;
    }): Promise<void> {
    return await this.detail.updateOrdersDetailList(params);
  }

  async updateOrdersDetail(
    params: {
      userType: string;
      orderId: number;
      orderItem: number;
      product: string;
      language: string;
      businessPartner: number;
      emailAddress: string;
    }) {
    return await this.detail.updateOrdersDetail(params);
  }

  async getOrdersList() {
    return this.list.getOrdersList();
  }

  async updateOrdersList(
    params:
      {
        language: AuthedUser['language'];
        businessPartner: AuthedUser['businessPartner'];
        emailAddress: AuthedUser['emailAddress'];
        userType: OrdersUserType[keyof OrdersUserType];
      }
  ): Promise<void> {
    return await this.list.updateOrdersList(params);
  }

  async getOrdersSingleUnit(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersSingleUnitProps | null> {
    return await this.singleUnit.getOrdersSingleUnit(orderId, orderItem);
  }

  async updateOrdersSingleUnit(
    params: {
      orderId: number;
      orderItem: number;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.singleUnit.updateOrdersSingleUnit(params);
  }
}

export const ordersCache = new OrdersCache();
