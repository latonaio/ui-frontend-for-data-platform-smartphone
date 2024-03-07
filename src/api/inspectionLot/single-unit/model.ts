import { InspectionLotSingleUnitProps, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  inspectionLot: number;
}

export interface ReadsResponse {
  InspectionLotSingleUnit: InspectionLotSingleUnitProps[] | null;
}
