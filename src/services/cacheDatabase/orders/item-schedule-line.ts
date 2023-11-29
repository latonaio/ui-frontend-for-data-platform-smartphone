import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersItemScheduleLineProps,
} from '@/constants';
import { OrdersUserType } from './index';
import { reads } from '@/api/orders/item-schedule-line';

export class ItemScheduleLine extends CacheDatabase {
  async getOrdersItemScheduleLine(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemScheduleLineProps | null> {
    const response = await this.ordersItemScheduleLine.get({
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

  async updateOrdersItemScheduleLine(
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

    const OrdersItemScheduleLineItemHeader =
      response.Item ?
        response.Item.length >= 1 ?
          response.Item[0] : {} : {};

    this.ordersItemScheduleLine.put({
      ...OrdersItemScheduleLineItemHeader,
      ItemScheduleLine: response.ItemScheduleLine || [],
      OrderID: params.orderId,
      OrderItem: params.orderItem,
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      orderId: params.orderId,
      orderItem: params.orderItem,
      businessPartner: params.businessPartner,
    }
  }
}
