import { CacheDatabase } from '..';
import {
  AuthedUser,
  InspectionLotSingleUnitProps,
  InspectionLotSpecDetailProps,
  InspectionLotComponentCompositionProps,
  InspectionLotInspectionProps,
  InspectionLotUsageControlChainProps,
  InspectionLotListProps,
} from '@/constants';
import { SingleUnit } from './single-unit';
import { SpecDetail } from './spec-detail';
import { ComponentComposition } from './component-composition';
import { Inspection } from './inspection';
import { UsageControlChain } from './usage-control-chain';
import { List } from './list';

export interface InspectionLotUserType {
}

class InspectionLotCache extends CacheDatabase {
  private singleUnit: SingleUnit;
  private specDetail: SpecDetail;
  private componentComposition: ComponentComposition;
  private inspection: Inspection;
  private certificateAuthorityChain: UsageControlChain;
  private list: List;

  constructor() {
    super();
    this.singleUnit = new SingleUnit();
    this.specDetail = new SpecDetail();
    this.componentComposition = new ComponentComposition();
    this.inspection = new Inspection();
    this.certificateAuthorityChain = new UsageControlChain();
    this.list = new List();
  }

  async getInspectionLotSingleUnit(
    inspectionLot: number,
  ): Promise<InspectionLotSingleUnitProps | null> {
    return await this.singleUnit.getInspectionLotSingleUnit(inspectionLot);
  }

  async updateInspectionLotSingleUnit(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    return await this.singleUnit.updateInspectionLotSingleUnit(params);
  }

  async getInspectionLotSpecDetail(
    inspectionLot: number,
  ): Promise<InspectionLotSpecDetailProps | null> {
    return await this.specDetail.getInspectionLotSpecDetail(inspectionLot);
  }

  async updateInspectionLotSpecDetail(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    return await this.specDetail.updateInspectionLotSpecDetail(params);
  }

  async getInspectionLotComponentComposition(
    inspectionLot: number,
  ): Promise<InspectionLotComponentCompositionProps | null> {
    return await this.componentComposition.getInspectionLotComponentComposition(inspectionLot);
  }

  async updateInspectionLotComponentComposition(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    return await this.componentComposition.updateInspectionLotComponentComposition(params);
  }

  async getInspectionLotInspection(
    inspectionLot: number,
  ): Promise<InspectionLotInspectionProps | null> {
    return await this.inspection.getInspectionLotInspection(inspectionLot);
  }

  async updateInspectionLotInspection(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    return await this.inspection.updateInspectionLotInspection(params);
  }

  async getInspectionLotUsageControlChain(
    inspectionLot: number,
  ): Promise<InspectionLotUsageControlChainProps | null> {
    return await this.certificateAuthorityChain.getInspectionLotUsageControlChain(inspectionLot);
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
    return await this.certificateAuthorityChain.updateInspectionLotUsageControlChain(params);
  }

  async getInspectionLotList(
    inspectionLot: number,
  ): Promise<InspectionLotListProps | null> {
    return await this.list.getInspectionLotList(inspectionLot);
  }

  async updateInspectionLotList(
    params: {
      inspectionLot: number;
      language: AuthedUser['language'];
      businessPartner: AuthedUser['businessPartner'];
      emailAddress: AuthedUser['emailAddress'];
    },
  ): Promise<any> {
    return await this.list.updateInspectionLotList(params);
  }
}

export const inspectionLotCache = new InspectionLotCache();
