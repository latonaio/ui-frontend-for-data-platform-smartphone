import { CacheDatabase } from '..';
import {
  AuthedUser,
  DeliveryDocumentItemProps,
} from '@/constants';
import { DeliveryDocumentUserType } from './index';
import { reads } from 'api/deliveryDocument/item';

export class Item extends CacheDatabase {
  async getDeliveryDocumentItem(
    deliveryDocument: number,
    deliveryDocumentItem: number,
  ): Promise<DeliveryDocumentItemProps | null> {
    const response = await this.deliveryDocumentItem.get({
      DeliveryDocument: deliveryDocument,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateDeliveryDocumentItem(
    params: {
      deliveryDocument: number,
      deliveryDocumentItem: number,
      userType: DeliveryDocumentUserType[keyof DeliveryDocumentUserType],
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      deliveryDocument: params.deliveryDocument,
      deliveryDocumentItem: params.deliveryDocumentItem,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
      userType: params.userType,
    });

    const DeliveryDocumentItem =
      response.HeaderWithItem ?
        response.HeaderWithItem.length >= 1 ?
          response.HeaderWithItem[0] : {} : {};

    this.deliveryDocumentItem.put({
      ...DeliveryDocumentItem,
      DeliveryDocument: params.deliveryDocument,
      DeliveryDocumentItem: params.deliveryDocumentItem,
      Item: response.Item || [],
      BusinessPartner: params.businessPartner,
      UserType: params.userType,
    });

    return {
      deliveryDocument: params.deliveryDocument,
      deliveryDocumentItem: params.deliveryDocumentItem,
      BusinessPartner: params.businessPartner,
    }
  }
}
