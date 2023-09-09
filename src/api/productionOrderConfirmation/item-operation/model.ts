import { Accepter } from '@/constants';


export interface CancelsParams extends Accepter {
  params: {
    ProductionOrderConfirmation: {
      ConfirmedYieldQuantity: number;
    }
  },
}
