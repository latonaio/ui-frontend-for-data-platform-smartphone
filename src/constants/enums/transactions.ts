export enum UserTypeEnum {
  Buyer = 'Buyer',
  Seller = 'Seller',
  DeliverToParty = 'DeliverToParty',
  DeliverFromParty = 'DeliverFromParty',
  BillToParty = 'BillToParty',
  BillFromParty = 'BillFromParty',
  OwnerProductionPlantBusinessPartner = 'OwnerProductionPlantBusinessPartner',
  BusinessPartner = 'BusinessPartner',
  OwnerBusinessPartner = 'OwnerBusinessPartner',
  InspectionPlantBP = 'InspectionPlantBP',
}

export enum OrdersTablesEnum {
  ordersListBuyerItem = 'ordersListBuyerItem', // 受注オーダー
  ordersListSellerItem = 'ordersListSellerItem', // 発注オーダー
  ordersDetailListBuyerItem = 'ordersDetailListBuyerItem',
  ordersDetailListSellerItem = 'ordersDetailListSellerItem',
  ordersDetailList = 'ordersDetailList',
  ordersDetailHeader = 'ordersDetailHeader',
  ordersDetail = 'ordersDetail',
  ordersSingleUnit = 'ordersSingleUnit',
  ordersItemScheduleLine = 'ordersItemScheduleLine',
  ordersItemPricingElement = 'ordersItemPricingElement',
  ordersItem = 'ordersItem',
}

export enum DeliveryDocumentTablesEnum {
  deliveryDocumentListEditDeliverToPartyItem = 'deliveryDocumentListEditDeliverToPartyItem',
  deliveryDocumentListEditDeliverFromPartyItem = 'deliveryDocumentListEditDeliverFromPartyItem',
  deliveryDocumentListDeliverToPartyItem = 'deliveryDocumentListDeliverToPartyItem', // 入荷
  deliveryDocumentListDeliverFromPartyItem = 'deliveryDocumentListDeliverFromPartyItem', // 出荷
  deliveryDocumentDetailListDeliverToPartyItem = 'deliveryDocumentDetailListDeliverToPartyItem',
  deliveryDocumentDetailListDeliverFromPartyItem = 'deliveryDocumentDetailListDeliverFromPartyItem',
  deliveryDocumentDetailList = 'deliveryDocumentDetailList',
  deliveryDocumentDetailHeader = 'deliveryDocumentDetailHeader',
  deliveryDocumentDetail = 'deliveryDocumentDetail',
  deliveryDocumentSingleUnit = 'deliveryDocumentSingleUnit',
  deliveryDocumentItem = 'deliveryDocumentItem',
}

export enum InvoiceDocumentTablesEnum {
  invoiceDocumentListBillToPartyItem = 'invoiceDocumentListBillToPartyItem', // 請求先名
  invoiceDocumentListBillFromPartyItem = 'invoiceDocumentListBillFromPartyItem', // 請求元名
  invoiceDocumentDetailListBillToPartyItem = 'invoiceDocumentDetailListBillToPartyItem',
  invoiceDocumentDetailListBillFromPartyItem = 'invoiceDocumentDetailListBillFromPartyItem',
  invoiceDocumentDetailList = 'invoiceDocumentDetailList',
  invoiceDocumentDetailHeader = 'invoiceDocumentDetailHeader',
}

export enum ProductionOrderTablesEnum {
  productionOrderListOwnerProductionPlantBusinessPartnerItem = 'productionOrderListOwnerProductionPlantBusinessPartnerItem',
  productionOrderDetailListOwnerProductionPlantBusinessPartnerItem = 'productionOrderDetailListOwnerProductionPlantBusinessPartnerItem',
  productionOrderDetailList = 'productionOrderDetailList',
  productionOrderDetailHeader = 'productionOrderDetailHeader',
  productionOrderCockpit = 'productionOrderCockpit',
  productionOrderItemOperationInput = 'productionOrderItemOperationInput',
  productionOrderItemOperationList = 'productionOrderItemOperationList',
}

export enum ProductStockTablesEnum {
  productStockSingleUnit = 'productStockSingleUnit',
  productStockByStorageBinByBatch = 'productStockByStorageBinByBatch',
}

export enum ProductTablesEnum {
  productSingleUnit = 'productSingleUnit',
  productListBusinessPartnerItem = 'productListBusinessPartnerItem',
  productDetailExconfList = 'productDetailExconfList',
  productDetailExconfListHeader = 'productDetailExconfListHeader',
}

export enum BusinessPartnerTablesEnum {
  businessPartnerListBusinessPartnerItem = 'businessPartnerListBusinessPartnerItem',
  businessPartnerDetailExconfList = 'businessPartnerDetailExconfList',
  businessPartnerDetailExconfListHeader = 'businessPartnerDetailExconfListHeader',

}

export enum EquipmentTablesEnum {
  equipmentListBusinessPartnerItem = 'equipmentListBusinessPartnerItem',
}

export enum ProductionVersionTablesEnum {
  productionVersionListOwnerBusinessPartnerItem = 'productionVersionListOwnerBusinessPartnerItem',
  productionVersionDetailList = 'productionVersionDetailList',
  productionVersionDetailListHeader = 'productionVersionDetailListHeader',
  productionVersionDetailListOwnerBusinessPartnerItem = "productionVersionDetailListOwnerBusinessPartnerItem",
}

export enum PriceMasterTablesEnum {
  priceMasterListBuyerItem = 'priceMasterListBuyerItem',
  priceMasterListSellerItem = 'priceMasterListSellerItem',
  priceMasterDetailListItem = 'priceMasterDetailListItem',
  priceMasterDetailHeader = 'priceMasterDetailHeader',
  priceMasterDetail = 'priceMasterDetail',
  priceMasterDetailList = 'priceMasterDetailList',
}

export enum BillOfMaterialTablesEnum {
  billOfMaterialListOwnerProductionPlantBusinessPartnerItem = 'billOfMaterialListOwnerProductionPlantBusinessPartnerItem',
  billOfMaterialDetailList = 'billOfMaterialDetailList',
  billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem = 'billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem',
  billOfMaterialDetailHeader = 'billOfMaterialDetailHeader',
}

export enum OperationsTablesEnum {
  operationsListOwnerProductionPlantBusinessPartnerItem = 'operationsListOwnerProductionPlantBusinessPartnerItem',
  operationsListOwnerBusinessPartnerItem = 'operationsListOwnerBusinessPartnerItem',
  operationsDetailListOwnerProductionPlantBusinessPartnerItem = 'operationsDetailListOwnerProductionPlantBusinessPartnerItem',
  operationsDetailList = 'operationsDetailList',
  operationsDetailHeader = 'operationsDetailHeader',
}

export enum SupplyChainRelationshipTablesEnum {
  supplyChainRelationshipListBuyerItem = 'supplyChainRelationshipListBuyerItem',
  supplyChainRelationshipListSellerItem = 'supplyChainRelationshipListSellerItem',
  supplyChainRelationshipDetailExconfList = 'supplyChainRelationshipDetailExconfList',
  supplyChainRelationshipDetailExconfListHeader = 'supplyChainRelationshipDetailExconfListHeader',
  supplyChainRelationshipDetail = 'supplyChainRelationshipDetail',
  supplyChainRelationshipDetailHeader = 'supplyChainRelationshipDetailHeader',
}

export enum WorkCenterTablesEnum {
	workCenterListBusinessPartnerItem = 'workCenterListBusinessPartnerItem',
}

export enum QuotationsTablesEnum{
	quotationsListBuyerItem = 'quotationsListBuyerItem',
	quotationsListSellerItem = 'quotationsListSellerItem',
	quotationsListDetailListItem = 'quotationsListDetailListItem',
	quotationsListDetailListHeader = 'quotationsListDetailListHeader',
}

export enum InspectionLotTablesEnum {
  inspectionLotSingleUnit = 'inspectionLotSingleUnit',
  inspectionLotSpecDetail = 'inspectionLotSpecDetail',
  inspectionLotComponentComposition = 'inspectionLotComponentComposition',
  inspectionLotInspection = 'inspectionLotInspection',
  inspectionLotUsageControlChain = 'inspectionLotUsageControlChain',
  inspectionLotList = 'inspectionLotList',
}
