
interface CertificateAuthorityChain {
  CertificateAuthorityChain: string;
  CertificateObject: string;
  CertificateObjectLabel: string;
}

interface UsageControlChain {
  UsageControlChain: string;
  UsageControlLess: boolean;
  Perpetual: boolean;
  Rental: boolean;
  Duration: number;
  DurationUnit: string;
  ValidityStartDate: string;
  ValidityStartTime: string;
  ValidityEndDate: string;
  ValidityEndTime: string;
  DeleteAfterValidityEnd: boolean;
  ServiceLabelRestriction: string;
  ApplicationRestriction: string;
  PurposeRestriction: string;
  BusinessPartnerRoleRestriction: string;
  DataStateRestriction: string;
  NumberOfUsageRestriction: number;
  NumberOfActualUsage: number;
  IPAddressRestriction: string;
  MACAddressRestriction: string;
  ModifyIsAllowed: boolean;
  LocalLoggingIsAllowed: boolean;
  RemoteNotificationIsAllowed: string;
  DistributeOnlyIfEncrypted: boolean;
  AttachPolicyWhenDistribute: boolean;
  PostalCode: string;
  LocalSubRegion: string;
  LocalRegion: string;
  Country: string;
  GlobalRegion: string;
  TimeZone: string;
  CreationDate: string;
  CreationTime: string;
}

export type {
  CertificateAuthorityChain,
  UsageControlChain,
}
