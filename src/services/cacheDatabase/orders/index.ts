import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersSingleUnitProps,
  OrdersItemScheduleLineProps,
  OrdersItemPricingElementProps,
  OrdersItemProps,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { SingleUnit } from './single-unit';
import { ItemScheduleLine } from './item-schedule-line';
import { ItemPricingElement } from './item-pricing-element';
import { Item } from './item';
import { ProductUserType } from '@/services/cacheDatabase/product';

export interface OrdersUserType {
  buyer: string;
  seller: string;
}

class OrdersCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;
  private singleUnit: SingleUnit;
  private itemScheduleLine: ItemScheduleLine;
  private itemPricingElement: ItemPricingElement;
  private item: Item;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.singleUnit = new SingleUnit();
    this.itemScheduleLine = new ItemScheduleLine();
    this.itemPricingElement = new ItemPricingElement();
    this.item = new Item();
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
  ): Promise<any> {
    return await this.singleUnit.updateOrdersSingleUnit(params);
  }

  async updateCacheOrdersSingleUnit(
    params: {
      orderId: number;
      orderItem: number;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      updateKey: string;
      updateValue: any;
      pagination: any;
    },
  ): Promise<any> {
    return await this.singleUnit.updateCacheOrdersSingleUnit(params);
  }

  async getOrdersItemScheduleLine(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemScheduleLineProps | null> {
    return await this.itemScheduleLine.getOrdersItemScheduleLine(orderId, orderItem);
  }

  async updateOrdersItemScheduleLine(
    params: {
      orderId: number;
      orderItem: number;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.itemScheduleLine.updateOrdersItemScheduleLine(params);
  }

  async getOrdersItemPricingElement(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemPricingElementProps | null> {
    return await this.itemPricingElement.getOrdersItemPricingElement(orderId, orderItem);
  }

  async updateOrdersItemPricingElement(
    params: {
      orderId: number;
      orderItem: number;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.itemPricingElement.updateOrdersItemPricingElement(params);
  }

  async getOrdersItem(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemProps | null> {
    return await this.item.getOrdersItem(orderId, orderItem);
  }

  async updateOrdersItem(
    params: {
      orderId: number;
      orderItem: number;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.item.updateOrdersItem(params);
  }
}

export const ordersCache = new OrdersCache();
