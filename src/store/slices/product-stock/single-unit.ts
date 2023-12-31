import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ProductStockSingleUnitProps as DefaultProductStockSingleUnitProps,
  ProductStockTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
// import { updates } from '@/api/productStock/singleUnit';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface ProductStockSingleUnitProps extends DefaultProductStockSingleUnitProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [ProductStockTablesEnum.productStockSingleUnit]: ProductStockSingleUnitProps | null;
}

const initialState: InitialState = {
  [ProductStockTablesEnum.productStockSingleUnit]: null,
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    ProductStock: {
      ProductStock: number;
      Item: ProductStockSingleUnitProps;
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  item: ProductStockSingleUnitProps;
  key: string;
}

export const productStockSingleUnit = createSlice({
  name: 'productStockSingleUnit',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [ProductStockTablesEnum.productStockSingleUnit]: DefaultProductStockSingleUnitProps;
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

      if (!action.payload[ProductStockTablesEnum.productStockSingleUnit]) { return; }

      state[ProductStockTablesEnum.productStockSingleUnit] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[ProductStockTablesEnum.productStockSingleUnit],
      }
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[ProductStockTablesEnum.productStockSingleUnit];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[ProductStockTablesEnum.productStockSingleUnit] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: ProductStockSingleUnitProps;
      key: string;
    }>) => {
      const targetState = state[ProductStockTablesEnum.productStockSingleUnit];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[ProductStockTablesEnum.productStockSingleUnit] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: ProductStockSingleUnitProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[ProductStockTablesEnum.productStockSingleUnit] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: ProductStockSingleUnitProps;
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

      state[ProductStockTablesEnum.productStockSingleUnit] = {
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
                               item: ProductStockSingleUnitProps,
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
  [ProductStockTablesEnum.productStockSingleUnit]: ProductStockSingleUnitProps,
}) => {
  const detail  = detailState[ProductStockTablesEnum.productStockSingleUnit];

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
    [ProductStockTablesEnum.productStockSingleUnit]: ProductStockSingleUnitProps,
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
    //   ProductStock: {
    //     ProductStock: params.ProductStock.ProductStock,
    //     Item: [
    //       {
    //         // ProductStock: params.ProductStock.ProductStock,
    //         // ProductStockItem: params.ProductStock.Item[0].ProductStockItem,
    //         // ComponentProduct: params.ProductStock.Item[0].ComponentProduct,
    //         // ProductStockItemText: params.ProductStock.Item[0].ProductStockItemText,
    //         // StockConfirmationPlantName: params.ProductStock.Item[0].StockConfirmationPlantName,
    //         // StockConfirmationPlant: params.ProductStock.Item[0].StockConfirmationPlant,
    //         // ComponentProductStandardQuantityInBaseUnit: params.ProductStock.Item[0].ComponentProductStandardQuantityInBaseUnit,
    //         // ComponentProductBaseUnit: params.ProductStock.Item[0].ComponentProductBaseUnit,
    //         // ValidityStartDate: params.ProductStock.Item[0].ValidityStartDate,
    //         // IsMarkedForDeletion: params.ProductStock.Item[0].IsMarkedForDeletion,
    //       },
    //     ],
    //   },
    //   accepter: params.accepter,
    //   api_type: params.api_type,
    // }, 'item');

    appDispatch(productStockSingleUnit.actions.editedItem(
      {
        index: index,
        item: params.ProductStock.Item,
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
} = productStockSingleUnit.actions;
