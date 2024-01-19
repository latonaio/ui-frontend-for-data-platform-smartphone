import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth';
import dialogReducer from './slices/dialog';
import loadingReducer from './slices/loadging';
import snackbarReducer from './slices/snackbar';
import ordersDetailReducer from './slices/orders/detail';
import deliveryDocumentDetailReducer from './slices/delivery-document/detail';
import { productionOrderCockpit } from './slices/production-order/cockpit';
import { productionOrderItemOperationList } from './slices/production-order/item-operation/list';
import { productionOrderItemOperationInput } from './slices/production-order/item-operation/input';
import { productStockSingleUnit } from './slices/product-stock/single-unit';
import { productStockByStorageBinByBatch } from './slices/product-stock/by-storage-bin-by-batch';
import { productSingleUnit } from './slices/product/single-unit';
import ordersPaginationReducer from './slices/orders/pagination';
import { deliveryDocumentSingleUnit } from './slices/delivery-document/single-unit';
import { deliveryDocumentItem } from './slices/delivery-document/item';
import deliveryDocumentPaginationReducer from './slices/delivery-document/pagination';
import productionOrderPaginationReducer from './slices/production-order/pagination';
import { ordersList } from './slices/orders/list';
import { ordersDetailList } from './slices/orders/detail-list';
import { ordersSingleUnit } from './slices/orders/single-unit';
import { ordersItemScheduleLine } from './slices/orders/item-schedule-line';
import { ordersItemPricingElement } from './slices/orders/item-pricing-element';
// import { ordersItem } from './slices/orders/item';
import ordersItemReducer from './slices/orders/item';
import { billOfMaterialList, } from './slices/bill-of-material/list';
import { billOfMaterialDetailList, } from './slices/bill-of-material/detail-list';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        dialog: dialogReducer,
        loading: loadingReducer,
        ordersList: ordersList.reducer,
        ordersDetailList: ordersDetailList.reducer,
        ordersDetail: ordersDetailReducer,
        ordersSingleUnit: ordersSingleUnit.reducer,
        ordersItemScheduleLine: ordersItemScheduleLine.reducer,
        ordersItemPricingElement: ordersItemPricingElement.reducer,
        // ordersItem: ordersItem.reducer,
        ordersItem: ordersItemReducer,
        snackbar: snackbarReducer,
        deliveryDocumentSingleUnit: deliveryDocumentSingleUnit.reducer,
        deliveryDocumentItem: deliveryDocumentItem.reducer,
        deliveryDocumentDetail: deliveryDocumentDetailReducer,
        productionOrderCockpit: productionOrderCockpit.reducer,
        productionOrderItemOperationList: productionOrderItemOperationList.reducer,
        productionOrderItemOperationInput: productionOrderItemOperationInput.reducer,
        productStockSingleUnit: productStockSingleUnit.reducer,
        productStockByStorageBinByBatch: productStockByStorageBinByBatch.reducer,
        productSingleUnit: productSingleUnit.reducer,
        ordersPagination: ordersPaginationReducer,
        deliveryDocumentPagination: deliveryDocumentPaginationReducer,
        productionOrderPagination: productionOrderPaginationReducer,
        billOfMaterialList: billOfMaterialList.reducer,
        billOfMaterialDetailList: billOfMaterialDetailList.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
