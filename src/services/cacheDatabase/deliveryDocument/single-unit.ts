import { CacheDatabase } from '..';
import {
  AuthedUser,
  DeliveryDocumentSingleUnitProps,
} from '@/constants';
import { DeliveryDocumentUserType } from './index';
import { reads } from 'api/deliveryDocument/single-unit';

export class SingleUnit extends CacheDatabase {
  async getDeliveryDocumentSingleUnit(
    deliveryDocument: number,
    deliveryDocumentItem: number,
  ): Promise<DeliveryDocumentSingleUnitProps | null> {
    const response = await this.deliveryDocumentSingleUnit.get({
      DeliveryDocument: deliveryDocument,
      DeliveryDocumentItem: deliveryDocumentItem,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateDeliveryDocumentSingleUnit(
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

    const DeliveryDocumentSingleUnit =
      response.SingleUnit ?
        response.SingleUnit.length >= 1 ?
          response.SingleUnit[0] : {} : {};

    this.deliveryDocumentSingleUnit.put({
      ...DeliveryDocumentSingleUnit,
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
