import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersSingleUnitProps,
} from '@/constants';
import { OrdersUserType } from './index';
import { reads } from '@/api/orders/singleUnit';

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

    const OrdersSingleUnit =
      response.SingleUnit ?
        response.SingleUnit.length >= 1 ?
          response.SingleUnit[0] : {} : {};

    this.ordersSingleUnit.put({
      ...OrdersSingleUnit,
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
