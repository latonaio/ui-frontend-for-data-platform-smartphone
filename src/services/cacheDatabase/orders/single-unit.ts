import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersSingleUnitProps,
} from '@/constants';
import { OrdersUserType } from './index';
import { reads } from 'api/orders/single-unit';
import { paginationArrow } from '@/helpers/common';

export class SingleUnit extends CacheDatabase {
  async getOrdersSingleUnit(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersSingleUnitProps | null> {
    const response = await this.ordersSingleUnit.get({
      OrderID: orderId,
      OrderItem: orderItem,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateOrdersSingleUnit(
    params: {
      orderId: number;
      orderItem: number;
      userType: OrdersUserType[keyof OrdersUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      orderId: params.orderId,
      orderItem: params.orderItem,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    let OrdersSingleUnit = {};

    if (response.SingleUnit && response.SingleUnit.length >= 1) {
      const filteredItem = response.SingleUnit.filter(
        item => Number(item.OrderItem) === params.orderItem,
      );

      if (filteredItem.length >= 1) {
        OrdersSingleUnit = filteredItem[0];
      }
    }

    this.ordersSingleUnit.put({
      ...OrdersSingleUnit,
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      orderId: params.orderId,
      orderItem: params.orderItem,
      businessPartner: params.businessPartner,
      pagination: response.SingleUnit ? paginationArrow(response.SingleUnit, params.orderItem, 'orders') : {},
    }
  }

  async updateCacheOrdersSingleUnit(
    params: {
      orderId: number;
      orderItem: number;
      userType: OrdersUserType[keyof OrdersUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      updateKey: string;
      updateValue: any;
      pagination: any;
    },
  ): Promise<any> {
    const response = await this.ordersSingleUnit.get({
      OrderID: params.orderId,
      OrderItem: params.orderItem,
    });

    console.log(params)

    console.log({
      ...response,
      [params.updateKey]: params.updateValue,
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    })

    this.ordersSingleUnit.put({
      ...response,
      [params.updateKey]: params.updateValue,
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      orderId: params.orderId,
      orderItem: params.orderItem,
      businessPartner: params.businessPartner,
      pagination: params.pagination,
    }
  }
}
