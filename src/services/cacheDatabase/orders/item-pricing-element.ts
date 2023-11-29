import { CacheDatabase } from '..';
import {
  AuthedUser,
  OrdersItemPricingElementProps,
} from '@/constants';
import { OrdersUserType } from './index';
import { reads } from '@/api/orders/item-pricing-element';

export class ItemPricingElement extends CacheDatabase {
  async getOrdersItemPricingElement(
    orderId: number,
    orderItem: number,
  ): Promise<OrdersItemPricingElementProps | null> {
    const response = await this.ordersItemPricingElement.get({
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

  async updateOrdersItemPricingElement(
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

    const OrdersItemPricingElementItemHeader =
      response.Item ?
        response.Item.length >= 1 ?
          response.Item[0] : {} : {};

    this.ordersItemPricingElement.put({
      ...OrdersItemPricingElementItemHeader,
      ItemPricingElement: response.ItemPricingElement || [],
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
