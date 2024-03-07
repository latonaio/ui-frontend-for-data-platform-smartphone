import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotUsageControlChainProps,
} from '@/constants';
import { InspectionLotUserType } from './index';
import { reads } from 'api/inspectionLot/usage-control-chain';
import { paginationArrow } from '@/helpers/common';

export class UsageControlChain extends CacheDatabase {
  async getInspectionLotUsageControlChain(
    inspectionLot: number,
  ): Promise<InspectionLotUsageControlChainProps | null> {
    const response = await this.inspectionLotUsageControlChain.get({
      InspectionLot: inspectionLot,
    });

    if (response) {
      return {
        ...response,
      };
    }

    return null;
  }

  async updateInspectionLotUsageControlChain(
    params: {
      inspectionLot: number;
      usageControlChain: string;
      certificateAuthorityChain: string;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    const response = await reads({
      usageControlChain: params.usageControlChain,
      certificateAuthorityChain: params.certificateAuthorityChain,
      certificateObject: params.inspectionLot.toString(),
      certificateObjectLabel: 'InspectionLot',
      language: params.language,
      businessPartner: params.businessPartner,
      userId: params.emailAddress,
    });

    this.inspectionLotUsageControlChain.put({
      ...response.CertificateAuthorityChain[0],
      ...response.UsageControlChain[0],
      InspectionLot: params.inspectionLot,
      BusinessPartner: params.businessPartner,
    });

    return {
      inspectionLot: params.inspectionLot,
      businessPartner: params.businessPartner,
    }
  }
}
