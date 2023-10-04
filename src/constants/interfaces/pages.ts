import {
  ProductInfo,
  ProductTag,
  Stock,
  ProductImage,
  BarcodeImage,
  ProductDetail, Quantity, ProductionOrderDetailHeader, ProductionOrderItemOperationItem, QRCodeImage,
} from '@/constants';
import { AuthedUser } from '@/constants';

interface OrdersProductDetailProps extends ProductDetail {
  OrderID: string;
  OrderItem: string;
  Product: string;
  Popup: {
    RequestedDeliveryDate: string;
    RequestedDeliveryTime: string;
    ConfirmedDeliveryDate: string;
    ConfirmedDeliveryTime: string;
    OrderQuantityInBaseUnit: number;
    BaseUnit: string;
    OrderQuantityInDeliveryUnit: number;
    DeliveryUnit: string;
    ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit: number;
    DeliverToPlantBatch: string;
    BatchMgmtPolicyInDeliverToPlant: string;
    DeliverToPlantBatchValidityStartDate: string;
    DeliverToPlantBatchValidityStartTime: string;
    DeliverToPlantBatchValidityEndDate: string;
    DeliverToPlantBatchValidityEndTime: string;
    DeliverFromPlantBatch: string;
    BatchMgmtPolicyInDeliverFromPlant: string;
    DeliverFromPlantBatchValidityStartDate: string;
    DeliverFromPlantBatchValidityStartTime: string;
    DeliverFromPlantBatchValidityEndDate: string;
    DeliverFromPlantBatchValidityEndTime: string;
  }
  BusinessPartner: AuthedUser['businessPartner'];
}

interface DeliveryDocumentDetailProps extends ProductDetail {
  DeliveryDocument: string;
  DeliveryDocumentItem: string;
  ActualGoodsIssueDate: string;
  ActualGoodsIssueTime: string;
  ActualGoodsReceiptDate: string;
  ActualGoodsReceiptTime: string;
  PlannedGoodsIssueDate: string;
  PlannedGoodsIssueTime: string;
  BestByDate: string;
  ExpirationDate: string;
  ShelfNumber: string;
  PlannedGoodsReceiptDate: string;
  PlannedGoodsReceiptTime: string;
  StorageLocationFullName: string;
  PlannedGoodsIssueQuantity: Quantity;
  PlannedGoodsReceiptQuantity: Quantity;
  PlannedGoodsIssueQtyInBaseUnit: Quantity;
  PlannedGoodsReceiptQtyInBaseUnit: Quantity;
  ActualGoodsIssueQuantity: Quantity;
  ActualGoodsReceiptQuantity: Quantity;
  ActualGoodsIssueQtyInBaseUnit: Quantity;
  ActualGoodsReceiptQtyInBaseUnit: Quantity;
  StorageBin: string;
  DeliverToPlantBatchValidityStartDate: string;
  DeliverToPlantBatchValidityStartTime: string;
  DeliverToPlantBatchValidityEndDate: string;
  DeliverToPlantBatchValidityEndTime: string;
  DeliverToPlantBatch: string;
  BatchMgmtPolicyInDeliverToPlant: string;
  DeliverFromPlantBatchValidityStartDate: string;
  DeliverFromPlantBatchValidityStartTime: string;
  DeliverFromPlantBatchValidityEndDate: string;
  DeliverFromPlantBatchValidityEndTime: string;
  DeliverFromPlantBatch: string;
  BatchMgmtPolicyInDeliverFromPlant: string;
  Product?: string;
  OrdersDetailJumpReq: {
    OrderID: number;
    OrderItem: number;
    Product: string;
    Buyer: number;
  };
  BusinessPartner?: AuthedUser['businessPartner'];
}

interface BusinessPartnerDetailProps {
  businessPartner: AuthedUser['businessPartner'] | null;
  businessPartnerName: AuthedUser['businessPartnerName'];
  localRegion: string;
  district: string;
  relation: string;
  personInCharge: string;
  location: string;
  locationFacility: string;
  phoneNumber: string;
  emailAddress: string;
  tags: string[];
}

interface ProductionOrderCockpitProps {
  ProductionOrder: number;
  ProductionOrderItem: number;
  OrderItemText: string;
  Product: string;
  ProductName: string;
  MRPArea: string;
  ProductionVersion: number;
  MinimumLotSizeQuantity: number;
  MaximumLotSizeQuantity: number;
  LotSizeRoundingQuantity: number;
  StandardLotSizeQuantity: number;
  ProductionOrderPlannedStartDate: string;
  ProductionOrderPlannedStartTime: string;
  ProductionOrderPlannedEndDate: string;
  ProductionOrderPlannedEndTime: string;
  ProductionOrderActualStartDate: string;
  ProductionOrderActualStartTime: string;
  ProductionOrderActualEndDate: string;
  ProductionOrderActualEndTime: string;
  TotalQuantity: number;
  PlannedScrapQuantity: number;
  ConfirmedYieldQuantity: number;
  ProductionPlant: string;
  ProductionPlantStorageLocation: string;
  BillOfMaterialItem: string;
  ProductionUnit: string;
  Components: ComponentItem[];
  Operations: OperationItem[];
  Images: {
    Product: ProductImage;
    Barcode: BarcodeImage;
    QRCode: QRCodeImage,
  };

  SizeOrDimensionText: string;
  SafetyStockQuantityInBaseUnit: number;
  InternalCapacityQuantity: number;
  ReorderThresholdQuantityInBaseUnit: number;
  StandardProductionLotSizeQuantityInBaseUnit: number;
}

// interface ProductionOrderItemOperationInputProps extends ProductionOrderDetailHeader, ProductionOrderItemOperationItem {
interface ProductionOrderItemOperationInputProps extends ProductionOrderDetailHeader {
  OwnerProductionPlantBusinessPartnerName: string;
  OwnerProductionPlantName: string;
  ProductionOrderQuantityInBaseUnit: number;
  ProductionOrderQuantityInDestinationProductionUnit: number;
  OperationText: string;
  SellerName: string;
  WorkCenter: number;
  WorkCenterName: string;
  Images: {
    Product: ProductImage;
    Barcode: BarcodeImage;
    QRCode: QRCodeImage;
  };
}

interface ProductStockSingleUnitProps {
  Product: string;
  ProductStock: number;
  Plant: string;
  PlantName: string;
  BusinessPartner: number;
  BusinessPartnerName: string;
  StorageBin: string;
  UserType: string;
  Images: {
    Product: ProductImage;
    QRCode: QRCodeImage;
  };
}

interface ProductStockByStorageBinByBatchProps {
  BusinessPartner: number;
  BusinessPartnerName: string;
  Plant: string;
  PlantName: string;
  StorageLocation: string;
  StorageBin: string;
  Batch: string;
  Product: string;
  ProductDescription: string;
  ProductStock: string;
  ProductStockHeader: {
    BusinessPartner: number;
    BusinessPartnerName: string;
    Plant: string;
    PlantName: string;
    StorageLocation: string;
    StorageBin: string;
    Batch: string;
    Product: string;
    ProductDescription: string;
    ProductStock: string;
    Images: {
      Product: ProductImage;
    };
  }
  ProductStockByStorageBinByBatchHeader: {
    Batch: string;
    Plant: string;
    PlantName: string;
    Product: string;
    ProductStock: number;
    StorageBin: string;
    StorageLocation: string;
    ValidityStartDate: string;
    ValidityStartTime: string;
    ValidityEndDate: string;
    ValidityEndTime: string;
  }[];
  Images: {
    Product: ProductImage;
  };
}

interface OperationItem {
  OperationText: string
  WorkCenter: number
  OperationPlannedTotalQuantity: number
  OperationTotalConfirmedYieldQuantity: number
  OperationErlstSchedldExecStrtDte: string
  OperationErlstSchedldExecStrtTme: string
  OperationErlstSchedldExecEndDate: string
  OperationErlstSchedldExecEndTime: any
  OperationActualExecutionStartDate: string
  OperationActualExecutionStartTime: string
  OperationActualExecutionEndDate: string
  OperationActualExecutionEndTime: string
}

interface ComponentItem {
  ComponentProduct: string;
  ComponentProductRequirementDate: string;
  ComponentProductRequirementTime: string;
  RequiredQuantity: number;
  WithdrawnQuantity: number;
  BaseUnit: string;
  CostingPolicy: string;
  StandardPrice: number;
  MovingAveragePrice: number;
}


interface PriceMasterDetailProps extends ProductDetail {
  OrderID: string;
  OrderItem: string;
  Product: string;
  Popup: {
    RequestedDeliveryDate: string;
    RequestedDeliveryTime: string;
    ConfirmedDeliveryDate: string;
    ConfirmedDeliveryTime: string;
    OrderQuantityInBaseUnit: number;
    BaseUnit: string;
    OrderQuantityInDeliveryUnit: number;
    DeliveryUnit: string;
    ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit: number;
    DeliverToPlantBatch: string;
    BatchMgmtPolicyInDeliverToPlant: string;
    DeliverToPlantBatchValidityStartDate: string;
    DeliverToPlantBatchValidityStartTime: string;
    DeliverToPlantBatchValidityEndDate: string;
    DeliverToPlantBatchValidityEndTime: string;
    DeliverFromPlantBatch: string;
    BatchMgmtPolicyInDeliverFromPlant: string;
    DeliverFromPlantBatchValidityStartDate: string;
    DeliverFromPlantBatchValidityStartTime: string;
    DeliverFromPlantBatchValidityEndDate: string;
    DeliverFromPlantBatchValidityEndTime: string;
  }
  BusinessPartner: AuthedUser['businessPartner'];
}
interface OperationsDetailProps {
    Operations: number;
    OperationsNumber: number;
    Product: string;
    OperationsText: string;
    ProductionPlantName: string;
    StandardLotSizeQuantity: string;
    OperationsUnit:string,
    ValidityStartDate: string;
    IsMarkedForDeletion: boolean;
    OwnerProductionPlantBusinessPartner: number;
    OwnerProductionPlant: number;
  }

interface BillOfMaterialDetailProps extends ProductDetail {
  BillOfMaterial: number;
  // OrderItem: string;
  // Product: string;
  // Popup: {
  //   RequestedDeliveryDate: string;
  //   RequestedDeliveryTime: string;
  //   ConfirmedDeliveryDate: string;
  //   ConfirmedDeliveryTime: string;
  //   OrderQuantityInBaseUnit: number;
  //   BaseUnit: string;
  //   OrderQuantityInDeliveryUnit: number;
  //   DeliveryUnit: string;
  //   ConfirmedOrderQuantityByPDTAvailCheckInBaseUnit: number;
  //   DeliverToPlantBatch: string;
  //   BatchMgmtPolicyInDeliverToPlant: string;
  //   DeliverToPlantBatchValidityStartDate: string;
  //   DeliverToPlantBatchValidityStartTime: string;
  //   DeliverToPlantBatchValidityEndDate: string;
  //   DeliverToPlantBatchValidityEndTime: string;
  //   DeliverFromPlantBatch: string;
  //   BatchMgmtPolicyInDeliverFromPlant: string;
  //   DeliverFromPlantBatchValidityStartDate: string;
  //   DeliverFromPlantBatchValidityStartTime: string;
  //   DeliverFromPlantBatchValidityEndDate: string;
  //   DeliverFromPlantBatchValidityEndTime: string;
  // }
  // BusinessPartner: AuthedUser['businessPartner'];
}

export type {
  OrdersProductDetailProps,
  BusinessPartnerDetailProps,
  DeliveryDocumentDetailProps,
  ProductionOrderCockpitProps,
  ProductionOrderItemOperationInputProps,
  ComponentItem,
  OperationItem,
  PriceMasterDetailProps,
  BillOfMaterialDetailProps,
  OperationsDetailProps,
  ProductStockSingleUnitProps,
  ProductStockByStorageBinByBatchProps,
}
