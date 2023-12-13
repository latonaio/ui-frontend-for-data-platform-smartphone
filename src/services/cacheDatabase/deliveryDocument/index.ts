import { CacheDatabase } from '..';
import {
  AuthedUser,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { SingleUnit } from './single-unit';
import { Item } from './item';

export interface DeliveryDocumentUserType {
  deliverToParty: string;
  deliverFromParty: string;
}

class DeliveryDocumentCache extends CacheDatabase implements List, Detail {
  private list: List;
  private detail: Detail;
  private singleUnit: SingleUnit;
  private item: Item;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.singleUnit = new SingleUnit();
    this.item = new Item();
  }

  async getDeliveryDocumentList() {
    return this.list.getDeliveryDocumentList();
  }

  async updateDeliveryDocumentList(
    params: {
      userType: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.list.updateDeliveryDocumentList(params);
  }

  async getDeliveryDocumentDetailList(
    deliveryDocument: number,
    userType: string,
  ) {
    return this.detail.getDeliveryDocumentDetailList(deliveryDocument, userType);
  }

  async getDeliveryDocumentDetail(
    deliveryDocument: number,
    deliveryDocumentItem: number,
    product: string,
  ) {
    return this.detail.getDeliveryDocumentDetail(deliveryDocument, deliveryDocumentItem, product);
  }

  async updateDeliveryDocumentDetailList(
    params: {
      deliveryDocument: number;
      userType: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.detail.updateDeliveryDocumentDetailList(params);
  }

  async updateDeliveryDocumentDetail(
    params: {
      userType: string;
      deliveryDocument: number;
      deliveryDocumentItem: number;
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.detail.updateDeliveryDocumentDetail(params);
  }

  async getDeliveryDocumentSingleUnit(
    deliveryDocument: number,
    deliveryDocumentItem: number,
  ) {
    return this.singleUnit.getDeliveryDocumentSingleUnit(
      deliveryDocument,
      deliveryDocumentItem,
    );
  }

  async updateDeliveryDocumentSingleUnit(
    params: {
      userType: string;
      deliveryDocument: number;
      deliveryDocumentItem: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.singleUnit.updateDeliveryDocumentSingleUnit(params);
  }

  async getDeliveryDocumentItem(
    deliveryDocument: number,
    deliveryDocumentItem: number,
  ) {
    return this.item.getDeliveryDocumentItem(
      deliveryDocument,
      deliveryDocumentItem,
    );
  }

  async updateDeliveryDocumentItem(
    params: {
      userType: string;
      deliveryDocument: number;
      deliveryDocumentItem: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ) {
    return this.item.updateDeliveryDocumentItem(params);
  }
}

export const deliveryDocumentCache = new DeliveryDocumentCache();
