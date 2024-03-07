import {
  InspectionLotHeader,
  InspectionLotPartner,
  UIKeyGeneral,
} from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  inspectionLot: number;
}

export interface ReadsResponse {
  Header: InspectionLotHeader[] | null;
  Partner: InspectionLotPartner[] | null;
}
