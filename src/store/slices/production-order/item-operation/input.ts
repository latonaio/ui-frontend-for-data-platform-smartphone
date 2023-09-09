import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProductionOrderItemOperationInputProps as DefaultProductionOrderItemOperationInputProps,
  ProductionOrderTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/productionOrderConfirmation/item-operation/input';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { useDispatch } from 'react-redux';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface ProductionOrderItemOperationInputProps extends DefaultProductionOrderItemOperationInputProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [ProductionOrderTablesEnum.productionOrderItemOperationInput]: ProductionOrderItemOperationInputProps | null;
}

const initialState: InitialState = {
  [ProductionOrderTablesEnum.productionOrderItemOperationInput]: null,
};

const isEditingObject = {
  ProductionOrderConfirmation: false,
}

interface editItemParam {
  params: {
    ProductionOrder?: {
      ProductionOrder: number;
      Item: ProductionOrderItemOperationInputProps;
    };
    ProductionOrderConfirmation: {
      ProductionOrder: number;
      ProductionOrderItem: number;
      ProductBaseUnit: string;
      ProductProductionUnit: string;
      ProductOperationUnit: string;
      WorkCenter: number;
      ConfirmedYieldQuantity: string;
      CreationDate: string;
      CreationTime: string;
      LastChangeDate: string;
      LastChangeTime: string;
    },
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  item: ProductionOrderItemOperationInputProps;
  key: string;
}

export const productionOrderItemOperationInput = createSlice({
  name: 'productionOrderItemOperationInput',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [ProductionOrderTablesEnum.productionOrderItemOperationInput]: DefaultProductionOrderItemOperationInputProps;
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

      if (!action.payload[ProductionOrderTablesEnum.productionOrderItemOperationInput]) { return; }

      state[ProductionOrderTablesEnum.productionOrderItemOperationInput] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[ProductionOrderTablesEnum.productionOrderItemOperationInput],
      }
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderItemOperationInput];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[ProductionOrderTablesEnum.productionOrderItemOperationInput] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderItemOperationInputProps;
      key: string;
    }>) => {
      const targetState = state[ProductionOrderTablesEnum.productionOrderItemOperationInput];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[ProductionOrderTablesEnum.productionOrderItemOperationInput] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderItemOperationInputProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[ProductionOrderTablesEnum.productionOrderItemOperationInput] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: ProductionOrderItemOperationInputProps;
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

      state[ProductionOrderTablesEnum.productionOrderItemOperationInput] = {
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
                               item: ProductionOrderItemOperationInputProps,
                               key: string,
                               checkValue: any,
                             },
                             appDispatch: Dispatch,
) => {
  // todo いったんバリーデーションは解除
  // if (key === 'ProductionOrderConfirmation') {
  //   if (isFloat(checkValue)) {
  //     return appDispatch(setErrorItem({
  //       index: index,
  //       item: item,
  //       key: 'ProductionOrderConfirmation',
  //       isError: true,
  //       message: '0未満は無効です',
  //     }));
  //   }
  //
  //   return appDispatch(setErrorItem({
  //     index: index,
  //     item: item,
  //     key: 'ProductionOrderConfirmation',
  //     isError: false,
  //     message: '',
  //   }));
  // }
};

const isError = (index: number, detailState: ProductionOrderItemOperationInputProps) => {
  const detail  = detailState;

  return Object.keys(
    detail.errors,
  ).some((key) => {
    return detail.errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  detailState: any,
) => {
  appDispatch(setLoading({ isOpen: true }))

  const params = editItemParam.params;
  const index = editItemParam.index;
  const key = editItemParam.key;

  try {
    if (isError(index, detailState)) {
      appDispatch(setGlobalSnackbar({
        message: `無効の値です。`,
      }));
      throw new Error();
    }

    await updates({
      // ProductionOrderConfirmation: {
      //   ProductionOrder: params.ProductionOrderConfirmation.ProductionOrder,
      //   ProductionOrderItem: params.ProductionOrderConfirmation.ProductionOrderItem,
      //   Operations: params.ProductionOrderConfirmation.Operations,
      //   OperationsItem: params.ProductionOrderConfirmation.OperationsItem,
      //   OperationID: params.ProductionOrderConfirmation.OperationID,
      // },
      ...editItemParam.params,
      accepter: params.accepter,
      api_type: params.api_type,
    }, 'header');

    appDispatch(setGlobalSnackbar({
      message: `登録が完了しました`,
      variant: 'success',
    }));

    appDispatch(setLoading({ isOpen: false }))

    // appDispatch(productionOrderItemOperationInput.actions.editedItem(
    //   {
    //     index: index,
    //     item: params.ProductionOrder.Item,
    //     key: key,
    //   },
    // ));
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
} = productionOrderItemOperationInput.actions;
