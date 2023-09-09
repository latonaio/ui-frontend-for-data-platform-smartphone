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
import ordersPaginationReducer from './slices/orders/pagination';
import deliveryDocumentPaginationReducer from './slices/delivery-document/pagination';
import productionOrderPaginationReducer from './slices/production-order/pagination';
import { ordersList, } from './slices/orders/list';
import { ordersDetailList, } from './slices/orders/detail-list';
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
        snackbar: snackbarReducer,
        deliveryDocumentDetail: deliveryDocumentDetailReducer,
        productionOrderCockpit: productionOrderCockpit.reducer,
        productionOrderItemOperationList: productionOrderItemOperationList.reducer,
        productionOrderItemOperationInput: productionOrderItemOperationInput.reducer,
        ordersPagination: ordersPaginationReducer,
        deliveryDocumentPagination: deliveryDocumentPaginationReducer,
        productionOrderPagination: productionOrderPaginationReducer,
        billOfMaterialList: billOfMaterialList.reducer,
        billOfMaterialDetailList: billOfMaterialDetailList.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
