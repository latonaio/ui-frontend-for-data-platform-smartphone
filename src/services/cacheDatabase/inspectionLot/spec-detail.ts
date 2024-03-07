import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotSpecDetailProps,
} from '@/constants';
import { InspectionLotUserType } from './index';
import { reads } from 'api/inspectionLot/spec-detail';

export class SpecDetail extends CacheDatabase {
  async getInspectionLotSpecDetail(
    inspectionLot: number,
  ): Promise<InspectionLotSpecDetailProps | null> {
    const response = await this.inspectionLotSpecDetail.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotSpecDetail(
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

    this.inspectionLotSpecDetail.put({
      ...InspectionLotSingleUnit,
      InspectionLot: params.inspectionLot,
      SpecDetail: response.SpecDetail || [],
      BusinessPartner: params.businessPartner,
    });

    return {
      InspectionLot: params.inspectionLot,
      BusinessPartner: params.businessPartner,
    }
  }
}
