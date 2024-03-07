import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotListProps,
} from '@/constants';
import { reads } from 'api/inspectionLot/list';

export class List extends CacheDatabase {
  async getInspectionLotList(
    inspectionLot: number,
  ): Promise<InspectionLotListProps | null> {
    const response = await this.inspectionLotList.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotList(
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

    // const extractPartner = () => {
    //   return response.Header?.reduce((collection: any, header) => {
    //     console.log(collection)
    //     console.log(header)
    //
    //     response.Partner?.forEach((partner) => {
    //       if (header.InspectionLot == partner.InspectionLot) {
    //         console.log(partner)
    //
    //         collection.push({
    //           ...header,
    //           PartnerFunction: partner.PartnerFunction,
    //           BusinessPartner: partner.BusinessPartner,
    //           BusinessPartnerName: partner.BusinessPartnerName,
    //         });
    //       }
    //     })
    //
    //     return collection;
    //   }, []);
    // }
    //
    // console.log(extractPartner())

    this.inspectionLotList.put({
      InspectionLot: params.inspectionLot,
      Header: response.Header || [],
      Partner: response.Partner || [],
      BusinessPartner: params.businessPartner,
    });

    return {
      InspectionLot: params.inspectionLot,
      BusinessPartner: params.businessPartner,
    }
  }
}
