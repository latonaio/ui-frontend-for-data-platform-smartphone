import { CertificateAuthorityChain, UsageControlChain, UIKeyGeneral } from '@/constants';

export interface ReadsParams extends UIKeyGeneral {
  usageControlChain: string;
  certificateAuthorityChain: string;
  certificateObject: string;
  certificateObjectLabel: string;
}

export interface ReadsResponse {
  CertificateAuthorityChain: CertificateAuthorityChain[];
  UsageControlChain: UsageControlChain[];
}
