import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProductionOrderDetailProps as DefaultProductionOrderDetailProps,
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

export interface ProductionOrderDetailProps extends DefaultProductionOrderDetailProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps | null;
}

const initialState: InitialState = {
  [ProductionOrderTablesEnum.productionOrderDetail]: null,
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    ProductionOrder: {
      ProductionOrder: number;
      Item: ProductionOrderDetailProps;
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  item: ProductionOrderDetailProps;
  key: string;
}

export const productionOrderDetail = createSlice({
  name: 'productionOrderDetail',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [ProductionOrderTablesEnum.productionOrderDetail]: DefaultProductionOrderDetailProps;
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

      if (!action.payload[ProductionOrderTablesEnum.productionOrderDetail]) { return; }

      state[ProductionOrderTablesEnum.productionOrderDetail] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[ProductionOrderTablesEnum.productionOrderDetail],
      }
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderDetail];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[ProductionOrderTablesEnum.productionOrderDetail] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailProps;
      key: string;
    }>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderDetail];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[ProductionOrderTablesEnum.productionOrderDetail] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[ProductionOrderTablesEnum.productionOrderDetail] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderDetailProps;
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

      state[ProductionOrderTablesEnum.productionOrderDetail] = {
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
                               index: number,
                               item: ProductionOrderDetailProps,
                               key: string,
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

const isError = (index: number, detailState: {
  [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps,
}) => {
  const detail  = detailState[ProductionOrderTablesEnum.productionOrderDetail];

  return Object.keys(
    detail.errors,
  ).some((key) => {
    return detail.errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  listState: {
    [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps,
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

    appDispatch(productionOrderDetail.actions.editedItem(
      {
        index: index,
        item: params.ProductionOrder.Item,
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
} = productionOrderDetail.actions;
