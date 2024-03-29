import { env } from '@/helpers/env';
import { Tables } from './tables';
import {
  BusinessPartnerTablesEnum,
  DeliveryDocumentTablesEnum,
  InvoiceDocumentTablesEnum,
  OrdersTablesEnum,
  ProductionOrderTablesEnum,
  ProductStockTablesEnum,
  ProductTablesEnum,
  EquipmentTablesEnum,
  PriceMasterTablesEnum,
  BillOfMaterialTablesEnum,
  OperationsTablesEnum,
  SupplyChainRelationshipTablesEnum,
  WorkCenterTablesEnum,
  ProductionVersionTablesEnum,
  QuotationsTablesEnum,
  InspectionLotTablesEnum,
} from '@/constants';

export class CacheDatabase extends Tables {
  constructor() {
    super('db');
    this.version(Number(env.cacheDatabaseVersion)).stores({
      [OrdersTablesEnum.ordersListBuyerItem]: '++id, OrderID, BuyerName, SellerName, DeliveryStatus',
      [OrdersTablesEnum.ordersListSellerItem]: '++id, OrderID, BuyerName, SellerName, DeliveryStatus',
      [OrdersTablesEnum.ordersDetailListBuyerItem]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersDetailListSellerItem]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersDetailHeader]: 'OrderID',
      [OrdersTablesEnum.ordersDetail]: '[OrderID+OrderItem+Product]',
      [OrdersTablesEnum.ordersSingleUnit]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersItemScheduleLine]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersItemPricingElement]: '[OrderID+OrderItem]',
      [OrdersTablesEnum.ordersItem]: 'OrderID',

      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverToPartyItem]: 'SupplyChainRelationshipID',
      [DeliveryDocumentTablesEnum.deliveryDocumentListEditDeliverFromPartyItem]: 'SupplyChainRelationshipID',
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverToPartyItem]: '++id, DeliveryDocument, DeliverToParty, DeliverFromParty, HeaderDeliveryStatus, HeaderBillingStatus',
      [DeliveryDocumentTablesEnum.deliveryDocumentListDeliverFromPartyItem]: '++id, DeliveryDocument, DeliverToParty, DeliverFromParty, HeaderDeliveryStatus, HeaderBillingStatus',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverToPartyItem]: '[DeliveryDocument+DeliveryDocumentItem]',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailListDeliverFromPartyItem]: '[DeliveryDocument+DeliveryDocumentItem]',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetailHeader]: 'DeliveryDocument',
      [DeliveryDocumentTablesEnum.deliveryDocumentDetail]: '[DeliveryDocument+DeliveryDocumentItem+Product]',
      [DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit]: '[DeliveryDocument+DeliveryDocumentItem]',
      [DeliveryDocumentTablesEnum.deliveryDocumentItem]: 'DeliveryDocument',

      [InvoiceDocumentTablesEnum.invoiceDocumentListBillToPartyItem]: '++id, InvoiceDocument, BillToParty, BillFromParty, HeaderPaymentBlockStatus',
      [InvoiceDocumentTablesEnum.invoiceDocumentListBillFromPartyItem]: '++id, InvoiceDocument, BillToParty, BillFromParty, HeaderPaymentBlockStatus',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillToPartyItem]: '[InvoiceDocument+InvoiceDocumentItem]',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailListBillFromPartyItem]: '[InvoiceDocument+InvoiceDocumentItem]',
      [InvoiceDocumentTablesEnum.invoiceDocumentDetailHeader]: 'InvoiceDocument',

      [ProductionOrderTablesEnum.productionOrderListOwnerProductionPlantBusinessPartnerItem]: 'ProductionOrder',
      [ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem]: '[ProductionOrder+ProductionOrderItem]',
      [ProductionOrderTablesEnum.productionOrderDetailHeader]: 'ProductionOrder',
      [ProductionOrderTablesEnum.productionOrderCockpit]: '[ProductionOrder+ProductionOrderItem]',
      [ProductionOrderTablesEnum.productionOrderItemOperationList]: '[ProductionOrder+ProductionOrderItem+Operations+OperationsItem]',
      [ProductionOrderTablesEnum.productionOrderItemOperationInput]: '[ProductionOrder+ProductionOrderItem]',

      // Product Stock
      [ProductStockTablesEnum.productStockSingleUnit]: '[Product+BusinessPartner+Plant]',
      [ProductStockTablesEnum.productStockByStorageBinByBatch]: '[Product+BusinessPartner+Plant]',

      [ProductTablesEnum.productSingleUnit]: 'Product',
      [ProductTablesEnum.productListBusinessPartnerItem]: 'Product, ProductDescription, ProductGroup, BaseUnit, ValidityStartDate',
      [ProductTablesEnum.productDetailExconfListHeader]: 'Product',
      [ProductTablesEnum.productDetailExconfList]: 'Product',

      [EquipmentTablesEnum.equipmentListBusinessPartnerItem]: 'Equipment, EquipmentDescription, EquipmentGroup, BaseUnit, ValidityStartDate',

      [BusinessPartnerTablesEnum.businessPartnerListBusinessPartnerItem]: '++id, BusinessPartner',
	    [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: 'BusinessPartner',
      [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: 'BusinessPartner',

      [PriceMasterTablesEnum.priceMasterListBuyerItem]: '++id',
      [PriceMasterTablesEnum.priceMasterListSellerItem]: '++id',
      [PriceMasterTablesEnum.priceMasterDetailListItem]: '++id',
      [PriceMasterTablesEnum.priceMasterDetailHeader]: 'SupplyChainRelationshipID',

      [BillOfMaterialTablesEnum.billOfMaterialListOwnerProductionPlantBusinessPartnerItem]: '++id',
      [BillOfMaterialTablesEnum.billOfMaterialDetailListOwnerProductionPlantBusinessPartnerItem]: '[BillOfMaterial+BillOfMaterialItem]',
      [BillOfMaterialTablesEnum.billOfMaterialDetailHeader]: 'BillOfMaterial',

      [OperationsTablesEnum.operationsListOwnerProductionPlantBusinessPartnerItem]: 'Operations',

      [WorkCenterTablesEnum.workCenterListBusinessPartnerItem]: '++id',

      [ProductionVersionTablesEnum.productionVersionListOwnerBusinessPartnerItem]: 'ProductionVersion',

      [OperationsTablesEnum.operationsListOwnerBusinessPartnerItem]: 'Operations',
      [OperationsTablesEnum.operationsDetailListOwnerProductionPlantBusinessPartnerItem]: '[Operations+OperationsItem]',
      [OperationsTablesEnum.operationsDetailHeader]: 'Operations',

      [ProductionVersionTablesEnum.productionVersionDetailListOwnerBusinessPartnerItem]: '[ProductionVersion+ProductionVersionItem]',
      [ProductionVersionTablesEnum.productionVersionDetailListHeader]: 'ProductionVersion',

      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListBuyerItem]: '++id, SupplyChainRelationship, BuyerName, SellerName, DeliveryStatus',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipListSellerItem]: '++id, SupplyChainRelationship, BuyerName, SellerName, DeliveryStatus',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfListHeader]: 'SupplyChainRelationshipID',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailExconfList]: 'SupplyChainRelationshipID',

      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetailHeader]: 'SupplyChainRelationshipID',
      [SupplyChainRelationshipTablesEnum.supplyChainRelationshipDetail]: 'SupplyChainRelationshipID',

      [BusinessPartnerTablesEnum.businessPartnerDetailExconfList]: 'BusinessPartner',
      [BusinessPartnerTablesEnum.businessPartnerDetailExconfListHeader]: 'BusinessPartner',

      [QuotationsTablesEnum.quotationsListBuyerItem]: '++id',
      [QuotationsTablesEnum.quotationsListSellerItem]: '++id',

      [InspectionLotTablesEnum.inspectionLotSingleUnit]: 'InspectionLot',
      [InspectionLotTablesEnum.inspectionLotSpecDetail]: 'InspectionLot',
      [InspectionLotTablesEnum.inspectionLotComponentComposition]: 'InspectionLot',
      [InspectionLotTablesEnum.inspectionLotInspection]: 'InspectionLot',
      [InspectionLotTablesEnum.inspectionLotUsageControlChain]: 'InspectionLot',
      [InspectionLotTablesEnum.inspectionLotList]: 'InspectionLot',
    });
  }

  async cacheAllClear() {
    this.tables.forEach((table) => {
      table.clear();
    });
  }
}
