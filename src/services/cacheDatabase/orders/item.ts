import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersItemProps,
} from '@/constants';
import { OrdersUserType } from './index';
import { reads } from 'api/orders/item';

export class Item extends CacheDatabase {
  async getOrdersItem(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemProps | null> {
    const response = await this.ordersItem.get({
      OrderID: orderId,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateOrdersItem(
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

    const OrdersItem =
      response.HeaderWithItem ?
        response.HeaderWithItem.length >= 1 ?
          response.HeaderWithItem[0] : {} : {};

    this.ordersItem.put({
      ...OrdersItem,
      OrderID: params.orderId,
      OrderItem: params.orderItem,
      Item: response.Item || [],
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      orderId: params.orderId,
      orderItem: params.orderItem,
      BusinessPartner: params.businessPartner,
    }
  }
}
