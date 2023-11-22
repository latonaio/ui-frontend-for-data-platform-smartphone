import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrdersSingleUnitProps as DefaultOrdersSingleUnitProps,
  OrdersTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface OrdersSingleUnitProps extends DefaultOrdersSingleUnitProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [OrdersTablesEnum.ordersSingleUnit]: OrdersSingleUnitProps | null;
}

const initialState: InitialState = {
  [OrdersTablesEnum.ordersSingleUnit]: null,
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    product: {
      product: number;
      Item: OrdersSingleUnitProps;
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  item: OrdersSingleUnitProps;
  key: string;
}

export const ordersSingleUnit = createSlice({
  name: 'ordersSingleUnit',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [OrdersTablesEnum.ordersSingleUnit]: DefaultOrdersSingleUnitProps;
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

      if (!action.payload[OrdersTablesEnum.ordersSingleUnit]) { return; }

      state[OrdersTablesEnum.ordersSingleUnit] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[OrdersTablesEnum.ordersSingleUnit],
      }
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[OrdersTablesEnum.ordersSingleUnit];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[OrdersTablesEnum.ordersSingleUnit] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersSingleUnitProps;
      key: string;
    }>) => {
      const targetState = state[OrdersTablesEnum.ordersSingleUnit];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[OrdersTablesEnum.ordersSingleUnit] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersSingleUnitProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[OrdersTablesEnum.ordersSingleUnit] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: OrdersSingleUnitProps;
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

      state[OrdersTablesEnum.ordersSingleUnit] = {
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
                               item: OrdersSingleUnitProps,
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
  [OrdersTablesEnum.ordersSingleUnit]: OrdersSingleUnitProps,
}) => {
  const detail  = detailState[OrdersTablesEnum.ordersSingleUnit];

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
    [OrdersTablesEnum.ordersSingleUnit]: OrdersSingleUnitProps,
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

    // await updates({
    //   product: {
    //     product: params.product.product,
    //     Item: [
    //       {
    //         // product: params.product.product,
    //         // ProductItem: params.product.Item[0].ProductItem,
    //         // ComponentProduct: params.product.Item[0].ComponentProduct,
    //         // ProductItemText: params.product.Item[0].ProductItemText,
    //         // StockConfirmationPlantName: params.product.Item[0].StockConfirmationPlantName,
    //         // StockConfirmationPlant: params.product.Item[0].StockConfirmationPlant,
    //         // ComponentProductStandardQuantityInBaseUnit: params.product.Item[0].ComponentProductStandardQuantityInBaseUnit,
    //         // ComponentProductBaseUnit: params.product.Item[0].ComponentProductBaseUnit,
    //         // ValidityStartDate: params.product.Item[0].ValidityStartDate,
    //         // IsMarkedForDeletion: params.product.Item[0].IsMarkedForDeletion,
    //       },
    //     ],
    //   },
    //   accepter: params.accepter,
    //   api_type: params.api_type,
    // }, 'item');

    appDispatch(ordersSingleUnit.actions.editedItem(
      {
        index: index,
        item: params.product.Item,
        key: key,
      },
    ));
  } catch (error) {
  }

  appDispatch(setLoading({ isOpen: false }))
};

export const {
  initializeUpdate,
  pushItemToEdit,
  editedItem,
  closeItem,
  setErrorItem,
} = ordersSingleUnit.actions;
