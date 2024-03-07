import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotComponentCompositionProps,
} from '@/constants';
import { InspectionLotUserType } from './index';
import { reads } from 'api/inspectionLot/component-composition';

export class ComponentComposition extends CacheDatabase {
  async getInspectionLotComponentComposition(
    inspectionLot: number,
  ): Promise<InspectionLotComponentCompositionProps | null> {
    const response = await this.inspectionLotComponentComposition.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotComponentComposition(
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

    const InspectionLotSingleUnit =
      response.InspectionLotSingleUnit ?
        response.InspectionLotSingleUnit.length >= 1 ?
          response.InspectionLotSingleUnit[0] : {} : {};

    this.inspectionLotComponentComposition.put({
      ...InspectionLotSingleUnit,
      InspectionLot: params.inspectionLot,
      ComponentComposition: response.ComponentComposition || [],
      BusinessPartner: params.businessPartner,
    });

    return {
      InspectionLot: params.inspectionLot,
      BusinessPartner: params.businessPartner,
    }
  }
}
