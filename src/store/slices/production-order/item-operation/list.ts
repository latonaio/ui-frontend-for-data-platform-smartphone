import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProductionOrderDetailHeader as DefaultProductionOrderDetailHeader,
  ProductionOrderItemOperationItem as DefaultProductionOrderItemOperationItem,
  ProductionOrderTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/productionOrder';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface ProductionOrderDetailListItem extends DefaultProductionOrderItemOperationItem {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface ProductionOrderDetailHeader extends DefaultProductionOrderDetailHeader {
}

export interface InitialState {
  [ProductionOrderTablesEnum.productionOrderItemOperationList]: ProductionOrderDetailListItem[] | [];
  [ProductionOrderTablesEnum.productionOrderDetailHeader]: ProductionOrderDetailHeader | {};
}

const initialState: InitialState = {
  [ProductionOrderTablesEnum.productionOrderItemOperationList]: [],
  [ProductionOrderTablesEnum.productionOrderDetailHeader]: {},
};

const isEditingObject = {
  ComponentProductStandardQuantityInBaseUnit: false,
  ProductionOrderItemText: false,
}

interface editItemParam {
  params: {
    ProductionOrder: {
      ProductionOrder: number;
      Item: ProductionOrderDetailListItem[];
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: ProductionOrderDetailListItem;
  key: string;
}

export const productionOrderItemOperationList = createSlice({
  name: 'productionOrderItemOperationList',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [ProductionOrderTablesEnum.productionOrderItemOperationList]: DefaultProductionOrderItemOperationItem[] | [];
      [ProductionOrderTablesEnum.productionOrderDetailHeader]: DefaultProductionOrderDetailHeader | {};
    }>) => {
      const errors = (): errors => {
        return Object.keys(isEditingObject).reduce((collection, key) => {
          collection[key] = {
            isError: false,
            message: null,
          }

          return collection;
        }, {} as { [key: string]: { isError: boolean, message: string | null } });
      };

      if (!action.payload[ProductionOrderTablesEnum.productionOrderItemOperationList]) { return; }

      state[ProductionOrderTablesEnum.productionOrderItemOperationList] = action.payload[ProductionOrderTablesEnum.productionOrderItemOperationList]
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors()
          }
        });
      state[ProductionOrderTablesEnum.productionOrderDetailHeader] = action
        .payload[ProductionOrderTablesEnum.productionOrderDetailHeader];
    },
    pushItemToEdit: (state, action: PayloadAction<pushEditItem>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailListItem;
      key: string;
    }>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index];
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailListItem;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailListItem;
      key: string;
      isError: boolean;
      message: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.errors[actionData.key].isError = actionData.isError;
      actionData.item.errors[actionData.key].message = actionData.message;

      state[ProductionOrderTablesEnum.productionOrderItemOperationList][action.payload.index] = {
        ...actionData.item,
      }
    },
  }
})

export const checkInvalid = ({
                               index,
                               item,
                               key,
                               checkValue,
                             }: {
                               index: number
                               item: ProductionOrderDetailListItem
                               key: string
                               checkValue: any,
                             },
                             appDispatch: Dispatch,
) => {
  if (key === 'ComponentProductStandardQuantityInBaseUnit') {
    if (!isFloat(checkValue)) {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'ComponentProductStandardQuantityInBaseUnit',
        isError: true,
        message: '小数点以外は無効です',
      }));
    }

    return appDispatch(setErrorItem({
      index: index,
      item: item,
      key: 'ComponentProductStandardQuantityInBaseUnit',
      isError: false,
      message: '',
    }));
  }
};

const isError = (index: number, listState: {
  [ProductionOrderTablesEnum.productionOrderDetailHeader]: ProductionOrderDetailHeader,
  [ProductionOrderTablesEnum.productionOrderItemOperationList]: ProductionOrderDetailListItem[],
}) => {
  const list  = listState;

  return Object.keys(
    list[ProductionOrderTablesEnum.productionOrderItemOperationList][index].errors,
  ).some((key) => {
    return list[ProductionOrderTablesEnum.productionOrderItemOperationList][index].errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  listState: {
    [ProductionOrderTablesEnum.productionOrderDetailHeader]: ProductionOrderDetailHeader,
    [ProductionOrderTablesEnum.productionOrderItemOperationList]: ProductionOrderDetailListItem[],
  },
) => {
  appDispatch(setLoading({ isOpen: true }))

  const params = editItemParam.params;
  const index = editItemParam.index;
  const key = editItemParam.key;

  try {
    if (isError(index, listState)) {
      appDispatch(setGlobalSnackbar({
        message: `無効の値です。`,
      }));
      throw new Error();
    }

    await updates({
      ProductionOrder: {
        ProductionOrder: params.ProductionOrder.ProductionOrder,
        Item: [
          {
            // ProductionOrder: params.ProductionOrder.ProductionOrder,
            // ProductionOrderItem: params.ProductionOrder.Item[0].ProductionOrderItem,
            // ComponentProduct: params.ProductionOrder.Item[0].ComponentProduct,
            // ProductionOrderItemText: params.ProductionOrder.Item[0].ProductionOrderItemText,
            // StockConfirmationPlantName: params.ProductionOrder.Item[0].StockConfirmationPlantName,
            // StockConfirmationPlant: params.ProductionOrder.Item[0].StockConfirmationPlant,
            // ComponentProductStandardQuantityInBaseUnit: params.ProductionOrder.Item[0].ComponentProductStandardQuantityInBaseUnit,
            // ComponentProductBaseUnit: params.ProductionOrder.Item[0].ComponentProductBaseUnit,
            // ValidityStartDate: params.ProductionOrder.Item[0].ValidityStartDate,
            // IsMarkedForDeletion: params.ProductionOrder.Item[0].IsMarkedForDeletion,
          },
        ],
      },
      accepter: params.accepter,
      api_type: params.api_type,
    }, 'item');

    appDispatch(productionOrderItemOperationList.actions.editedItem(
      {
        index: index,
        item: params.ProductionOrder.Item[0]  ,
        key: key,
      },
    ));
  } catch (error) {
    // エラー時の処理を行う場合はここに書く

  }

  appDispatch(setLoading({ isOpen: false }))
};

export const {
  initializeUpdate,
  pushItemToEdit,
  editedItem,
  closeItem,
  setErrorItem,
} = productionOrderItemOperationList.actions;
