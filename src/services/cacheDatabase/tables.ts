import Dexie, { Table } from 'dexie';
import {
  // Orders
  BuyerItem,
  SellerItem,
  OrdersDetailListItem,
  OrdersDetailHeader,
  OrdersProductDetailProps,
  OrdersSingleUnitProps,
  OrdersTablesEnum,

  // Delivery Document
  DeliverFromPartyItem,
  DeliverToPartyItem,
  DeliveryDocumentDetailListItem,
  DeliveryDocumentDetailHeader,
  DeliveryDocumentDetailProps,
  DeliveryDocumentListEditForCache,
  DeliveryDocumentTablesEnum,

  // InvoiceDocument
  InvoiceDocumentListItem,
  InvoiceDocumentDetailListItem,
  InvoiceDocumentDetailHeader,
  InvoiceDocumentTablesEnum,

  // Production Order
  ProductionOrderTablesEnum,
  ProductionOrderItem,
  ProductionOrderDetailListItem,
  ProductionOrderDetailHeader,
  ProductionOrderCockpitProps,

  // Product
  ProductItem,
  ProductTablesEnum,
  ProductDetailExconfList,
  ProductDetailExconfListHeader,

  // Business Partner
  BusinessPartnerTablesEnum,
  BusinessPartnerItem,
  BusinessPartnerDetailExconfList,
  BusinessPartnerDetailExconfListHeader,

  // Equipment
  EquipmentTablesEnum,
  EquipmentItem,

  // Price Master
  PriceMasterTablesEnum,
  PriceMasterBuyerItem,
  PriceMasterSellerItem,
  PriceMasterDetailListItem,
  PriceMasterDetailHeader,

  // Bill Of Material
  BillOfMaterialTablesEnum,
  BillOfMaterialListItem,
  BillOfMaterialDetailListItem,
  BillOfMaterialDetailHeader,

  // Operations
  OperationsTablesEnum,
  OperationsItem,

  // Work Center
  WorkCenterTablesEnum,
  WorkCenterItem,

  // Production Version
  ProductionVersionTablesEnum,
  ProductionVersionListItem,

  // Operations
  OperationsDetailHeader,
  OperationsDetailListItem,

  // Production Version
  ProductionVersionDetailListItem,
  ProductionVersionDetailListHeader,

  // Supply Chain Relationship
  SupplyChainRelationshipBuyerItem,
  SupplyChainRelationshipSellerItem,
  SupplyChainRelationshipDetailExconfList,
  SupplyChainRelationshipDetailExconfListHeader,
  SupplyChainRelationshipDetailList,
  SupplyChainRelationshipDetailHeader,
  SupplyChainRelationshipTablesEnum,

  QuotationsTablesEnum,
  QuotationsBuyerItem,
  QuotationsSellerItem,
  QuotationsDetailListItem,
  QuotationsDetailListHeader,

  ProductionOrderItemOperationItem,
  ProductionOrderItemOperationInputProps,

  ProductStockTablesEnum,
  ProductStockSingleUnitProps,
  ProductStockByStorageBinByBatchProps,
} from '@/constants';

export class Tables extends Dexie {
  [OrdersTablesEnum.ordersListBuyerItem]!: Table<BuyerItem>;
  [OrdersTablesEnum.ordersListSellerItem]!: Table<SellerItem>;
  [OrdersTablesEnum.ordersDetailListBuyerItem]!: Table<OrdersDetailListItem>;
  [OrdersTablesEnum.ordersDetailListSellerItem]!: Table<OrdersDetailListItem>;
  [OrdersTablesEnum.ordersDetailHeader]!: Table<OrdersDetailHeader>;
  [OrdersTablesEnum.ordersDetail]!: Table<OrdersProductDetailProps>;
  [OrdersTablesEnum.ordersSingleUnit]!: Table<any>;
  [OrdersTablesEnum.ordersItemScheduleLine]!: Table<any>;
  [OrdersTablesEnum.ordersItemPricingElement]!: Table<any>;

  [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]!: Table<DeliveryDocumentListEditForCache>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]!: Table<DeliveryDocumentListEditForCache>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]!: Table<DeliverToPartyItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]!: Table<DeliverFromPartyItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverToPartyItem]!: Table<DeliveryDocumentDetailListItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverFromPartyItem]!: Table<DeliveryDocumentDetailListItem>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]!: Table<DeliveryDocumentDetailHeader>;
  [DeliveryDocumentTablesEnum.deliveryDocumentDetail]!: Table<DeliveryDocumentDetailProps>;
  [DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit]!: Table<any>;

  [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]!: Table<InvoiceDocumentListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]!: Table<InvoiceDocumentListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillToPartyItem]!: Table<InvoiceDocumentDetailListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillFromPartyItem]!: Table<InvoiceDocumentDetailListItem>;
  [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]!: Table<InvoiceDocumentDetailHeader>;

  [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]!: Table<ProductionOrderItem>;
  [ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem]!: Table<ProductionOrderDetailListItem>;
  [ProductionOrderTablesEnum.productionOrderDetailHeader]!: Table<ProductionOrderDetailHeader>;
  [ProductionOrderTablesEnum.productionOrderCockpit]!: Table<ProductionOrderCockpitProps>;
  [ProductionOrderTablesEnum.productionOrderItemOperationList]!: Table<ProductionOrderItemOperationItem>;
  // todo 後でちゃんとした型を作成する
  [ProductionOrderTablesEnum.productionOrderItemOperationInput]!: Table<any>;

  // [ProductStockTablesEnum.productStockSingleUnit]!: Table<ProductStockSingleUnitProps>;
  [ProductStockTablesEnum.productStockSingleUnit]!: Table<any>;
  [ProductStockTablesEnum.productStockByStorageBinByBatch]!: Table<any>;

  [ProductTablesEnum.productSingleUnit]!: Table<any>;
  [ProductTablesEnum.productListBusinessPartnerItem]!: Table<ProductItem>;
  [ProductTablesEnum.productDetailExconfListHeader]!: Table<ProductDetailExconfListHeader>;
  [ProductTablesEnum.productDetailExconfList]!: Table<ProductDetailExconfList>;

  [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]!: Table<BusinessPartnerItem>;

  [EquipmentTablesEnum.equipmentListBusinessPartnerItem]!: Table<EquipmentItem>;

  [PriceMasterTablesEnum.priceMasterListBuyerItem]!: Table<PriceMasterBuyerItem>;
  [PriceMasterTablesEnum.priceMasterListSellerItem]!: Table<PriceMasterSellerItem>;
  [PriceMasterTablesEnum.priceMasterDetailListItem]!: Table<PriceMasterDetailListItem>;
  [PriceMasterTablesEnum.priceMasterDetailHeader]!: Table<PriceMasterDetailHeader>;
  [PriceMasterTablesEnum.priceMasterDetail]!: Table<OrdersProductDetailProps>;

  [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]!: Table<BillOfMaterialListItem>;
  [BillOfMaterialTablesEnum.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem]!: Table<BillOfMaterialDetailListItem>;
  [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]!: Table<BillOfMaterialDetailHeader>;

  [WorkCenterTablesEnum.workCenterListBusinessPartnerItem]!: Table<WorkCenterItem>;

  [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]!: Table<OperationsItem>;
  [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]!: Table<OperationsItem>;
  [OperationsTablesEnum.operationsDetailHeader]!: Table<OperationsDetailHeader>;
  [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]!: Table<OperationsItem>;
  [OperationsTablesEnum.operationsDetailListOwnerProductionPlantBusinessPartnerItem]!: Table<OperationsDetailListItem>;

  [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]!: Table<ProductionVersionListItem>;
  [ProductionVersionTablesEnum.productionVersionDetailListOwnerBusinessPartnerItem]!: Table<ProductionVersionDetailListItem>;
  [ProductionVersionTablesEnum.productionVersionDetailListHeader]!: Table<ProductionVersionDetailListHeader>;

  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]!: Table<SupplyChainRelationshipBuyerItem>;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]!: Table<SupplyChainRelationshipSellerItem>;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]!: Table<SupplyChainRelationshipDetailExconfListHeader>;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]!: Table<SupplyChainRelationshipDetailExconfList>;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]!: Table<SupplyChainRelationshipDetailHeader>;
  [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]!: Table<SupplyChainRelationshipDetailList>;

  [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]!: Table<BusinessPartnerDetailExconfList>;
  [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]!: Table<BusinessPartnerDetailExconfListHeader>;

  [QuotationsTablesEnum.quotationsListBuyerItem]!: Table<QuotationsBuyerItem>;
  [QuotationsTablesEnum.quotationsListSellerItem]!: Table<QuotationsSellerItem>;
  [QuotationsTablesEnum.quotationsListDetailListItem]!: Table<QuotationsDetailListItem>;
  [QuotationsTablesEnum.quotationsListDetailListHeader]!: Table<QuotationsDetailListHeader>;
}
