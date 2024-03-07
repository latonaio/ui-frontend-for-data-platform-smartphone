interface InspectionLotItem {
}

interface InspectionLotSpecDetail {
  InspectionLot: number;
  SpecType: string;
  SpecTypeText: string;
  UpperLimitValue: number;
  LowerLimitValue: number;
  StandardValue: number;
  SpecTypeUnit: string;
  Formula: string;
}

interface InspectionLotComponentComposition {
  InspectionLot: number;
  ComponentCompositionType: string;
  ComponentCompositionTypeText: string;
  ComponentCompositionUpperLimitInPercent: number;
  ComponentCompositionLowerLimitInPercent: number;
  ComponentCompositionStandardValueInPercent: number;
}

interface InspectionLotInspection {
  InspectionLot: number;
  Inspection: number;
  InspectionType: string;
  InspectionTypeValueUnit: string;
  InspectionTypePlannedValue: number;
  InspectionTypeCertificateType: string;
  InspectionTypeCertificateValueInText: string;
  InspectionTypeCertificateValueInQuantity: number;
  InspectionLotInspectionText: string;
}

interface InspectionLotHeader {
  InspectionLot: number;
  InspectionLotDate: string;
  InspectionPlantBusinessPartner: number;
  InspectionPlantBusinessPartnerName: string;
  InspectionPlant: string;
  InspectionPlantName: string;
  Product: string;
  ProductSpecification: string;
  ProductionOrder: number;
  ProductionOrderItem: number;
  CertificateAuthorityChain: string;
  UsageControlChain: string;
}

interface InspectionLotPartner {
  InspectionLot: number;
  PartnerFunction: string;
  BusinessPartner: string;
  BusinessPartnerName: string;
  Product: string;
  InspectionLotDate: string;
}

export type {
  InspectionLotItem,
  InspectionLotSpecDetail,
  InspectionLotComponentComposition,
  InspectionLotInspection,
  InspectionLotHeader,
  InspectionLotPartner,
}
