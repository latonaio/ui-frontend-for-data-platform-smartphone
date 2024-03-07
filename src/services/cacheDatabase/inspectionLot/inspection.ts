import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotInspectionProps,
} from '@/constants';
import { InspectionLotUserType } from './index';
import { reads } from 'api/inspectionLot/inspection';

export class Inspection extends CacheDatabase {
  async getInspectionLotInspection(
    inspectionLot: number,
  ): Promise<InspectionLotInspectionProps | null> {
    const response = await this.inspectionLotInspection.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotInspection(
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

    this.inspectionLotInspection.put({
      ...InspectionLotSingleUnit,
      InspectionLot: params.inspectionLot,
      Inspection: response.Inspection || [],
      BusinessPartner: params.businessPartner,
    });

    return {
      InspectionLot: params.inspectionLot,
      BusinessPartner: params.businessPartner,
    }
  }
}
