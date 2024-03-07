import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotSingleUnitProps,
} from '@/constants';
import { InspectionLotUserType } from './index';
import { reads } from 'api/inspectionLot/single-unit';
import { paginationArrow } from '@/helpers/common';

export class SingleUnit extends CacheDatabase {
  async getInspectionLotSingleUnit(
    inspectionLot: number,
  ): Promise<InspectionLotSingleUnitProps | null> {
    const response = await this.inspectionLotSingleUnit.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotSingleUnit(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      inspectionLot: params.inspectionLot,
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    let inspectionLotSingleUnit = {};

    if (response.InspectionLotSingleUnit && response.InspectionLotSingleUnit.length >= 1) {
      const filteredItem = response.InspectionLotSingleUnit.filter(
        item => Number(item.InspectionLot) === params.inspectionLot,
      );

      if (filteredItem.length >= 1) {
        inspectionLotSingleUnit = filteredItem[0];
      }
    }

    this.inspectionLotSingleUnit.put({
      ...inspectionLotSingleUnit,
      BusinessPartner: params.businessPartner,
    });

    return {
      inspectionLot: params.inspectionLot,
      businessPartner: params.businessPartner,
      pagination: response.InspectionLotSingleUnit ? paginationArrow(response.InspectionLotSingleUnit, params.inspectionLot, 'InspectionLot') : {},
    }
  }
}
