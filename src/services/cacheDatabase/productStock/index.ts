import { CacheDatabase } from '..';
import { SingleUnit } from './single-unit';
import { ByStorageBinByBatch } from './by-storage-bin-by-batch';
import {
  AuthedUser,
} from '@/constants';

export interface ProductStockUserType {
  ownerProductionPlantBusinessPartner: string;
}

class ProductStockCache extends CacheDatabase implements SingleUnit, ByStorageBinByBatch {
  private singleUnit: SingleUnit;
  private byStorageBinByBatch: ByStorageBinByBatch;

  constructor() {
    super();
    this.singleUnit = new SingleUnit();
    this.byStorageBinByBatch = new ByStorageBinByBatch();
  }

  async getProductStockSingleUnit(
    product: string,
    businessPartner: number,
    plant: string,
  ) {
    return this.singleUnit.getProductStockSingleUnit(
      product,
      businessPartner,
      plant,
    );
  }

  async updateProductStockSingleUnit(
    params: {
      product: string;
      plant: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductStockUserType[keyof ProductStockUserType];
    },
  ): Promise<void> {
    return await this.singleUnit.updateProductStockSingleUnit(params);
  }

  async getProductStockByStorageBinByBatch(
    product: string,
    businessPartner: number,
    plant: string,
  ) {
    return this.byStorageBinByBatch.getProductStockByStorageBinByBatch(
      product,
      businessPartner,
      plant,
    );
  }

  async updateProductStockByStorageBinByBatch(
    params: {
      product: string;
      businessPartnerAsParam: number;
      plant: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
      userType: ProductStockUserType[keyof ProductStockUserType];
    },
  ): Promise<void> {
    return await this.byStorageBinByBatch.updateProductStockByStorageBinByBatch(params);
  }
}

export const productStockCache = new ProductStockCache();
