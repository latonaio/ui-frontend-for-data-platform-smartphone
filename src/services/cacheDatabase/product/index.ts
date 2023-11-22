import { CacheDatabase } from '..';
import {
  AuthedUser,
  ProductDetailExconfListItem,
  ProductDetailExconfList,
  ProductTablesEnum,
  ProductDetailExconfListHeader, ProductSingleUnitProps,
} from '@/constants';
import { List } from './list';
import { Detail } from './detail';
import { SingleUnit } from './single-unit';

export interface ProductUserType {
  businessPartner: string;
}

class ProductCache extends CacheDatabase implements List {
  private list: List;
  private detail: Detail;
  private singleUnit: SingleUnit;

  constructor() {
    super();
    this.list = new List();
    this.detail = new Detail();
    this.singleUnit = new SingleUnit();
  }

  async getProductList() {
    return this.list.getProductList();
  }

  async updateProductList(params: {
    language: AuthedUser['language'];
    businessPartner: AuthedUser['businessPartner'];
    emailAddress: AuthedUser['emailAddress'];
    userType: ProductUserType[keyof ProductUserType];
  }): Promise<void> {
    return await this.list.updateProductList({
      language: params.language,
      businessPartner: params.businessPartner,
      emailAddress: params.emailAddress,
      userType: params.userType,
    });
  }

  async getProductDetailExconfList(
    product: string,
    userType: ProductUserType[keyof ProductUserType],
  ): Promise<{
    [ProductTablesEnum.productDetailExconfList]: ProductDetailExconfList | null;
    [ProductTablesEnum.productDetailExconfListHeader]: ProductDetailExconfListHeader | null;
  }> {
    return await this.detail.getProductDetailExconfList(product, userType);
  }

  async updateProductDetailExconfList(
    params: {
      // isMarkedForDeletion: number;
      userType: ProductUserType[keyof ProductUserType];
      product: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.detail.updateProductDetailExconfList(params);
  }

  async getProductSingleUnit(
    product: string,
  ): Promise<ProductSingleUnitProps | null> {
    return await this.singleUnit.getProductSingleUnit(product);
  }

  async updateProductSingleUnit(
    params: {
      product: string;
      userType: ProductUserType[keyof ProductUserType];
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<void> {
    return await this.singleUnit.updateProductSingleUnit(params);
  }
}

export const productCache = new ProductCache();

