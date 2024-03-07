import { InspectionLotSingleUnitProps, InspectionLotSpecDetailProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  inspectionLot: number;
}

export interface ReadsResponse {
  InspectionLotSingleUnit: InspectionLotSingleUnitProps[] | null;
  SpecDetail: InspectionLotSpecDetailProps[] | null;
}
