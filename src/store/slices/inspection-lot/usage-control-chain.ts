import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InspectionLotUsageControlChainProps as DefaultInspectionLotUsageControlChainProps,
  InspectionLotTablesEnum,
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

export interface InspectionLotUsageControlChainProps extends DefaultInspectionLotUsageControlChainProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [InspectionLotTablesEnum.inspectionLotUsageControlChain]: InspectionLotUsageControlChainProps | null;
}

const initialState: InitialState = {
  [InspectionLotTablesEnum.inspectionLotUsageControlChain]: null,
};

const isEditingObject = {
}

interface editItemParam {
  params: {
    product: {
      product: number;
      Item: InspectionLotUsageControlChainProps;
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  item: InspectionLotUsageControlChainProps;
  key: string;
}

export const inspectionLotUsageControlChain = createSlice({
  name: 'inspectionLotUsageControlChain',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [InspectionLotTablesEnum.inspectionLotUsageControlChain]: DefaultInspectionLotUsageControlChainProps;
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

      if (!action.payload[InspectionLotTablesEnum.inspectionLotUsageControlChain]) { return; }

      state[InspectionLotTablesEnum.inspectionLotUsageControlChain] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[InspectionLotTablesEnum.inspectionLotUsageControlChain],
      }
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[InspectionLotTablesEnum.inspectionLotUsageControlChain];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      state[InspectionLotTablesEnum.inspectionLotUsageControlChain] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotUsageControlChainProps;
      key: string;
    }>) => {
      const targetState = state[InspectionLotTablesEnum.inspectionLotUsageControlChain];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];
      state[InspectionLotTablesEnum.inspectionLotUsageControlChain] = {
        ...actionData.item,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotUsageControlChainProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;
      state[InspectionLotTablesEnum.inspectionLotUsageControlChain] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotUsageControlChainProps;
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

      state[InspectionLotTablesEnum.inspectionLotUsageControlChain] = {
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
                               item: InspectionLotUsageControlChainProps,
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
  [InspectionLotTablesEnum.inspectionLotUsageControlChain]: InspectionLotUsageControlChainProps,
}) => {
  const detail  = detailState[InspectionLotTablesEnum.inspectionLotUsageControlChain];

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
    [InspectionLotTablesEnum.inspectionLotUsageControlChain]: InspectionLotUsageControlChainProps,
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

    appDispatch(inspectionLotUsageControlChain.actions.editedItem(
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
} = inspectionLotUsageControlChain.actions;
