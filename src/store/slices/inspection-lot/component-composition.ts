import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InspectionLotComponentCompositionProps as DefaultInspectionLotComponentCompositionProps,
  InspectionLotTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { updates } from '@/api/orders/item';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface InspectionLotComponentCompositionProps extends DefaultInspectionLotComponentCompositionProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [InspectionLotTablesEnum.inspectionLotComponentComposition]: InspectionLotComponentCompositionProps | null;
}

const initialState: InitialState = {
  [InspectionLotTablesEnum.inspectionLotComponentComposition]: null,
};

const isEditingObject = {
  OrderQuantityInBaseUnit: false,
  OrderQuantityInDeliveryUnit: false,
  RequestedDeliveryDateTime: false,
}

interface editItemParam {
  params: {
    Orders: {
      OrderID: number;
      Item: any;
    };
    accepter: string[];
    api_type: string;
  };
  index: number;
  key: string;
}

interface pushEditItem {
  index: number;
  item: InspectionLotComponentCompositionProps;
  key: string;
}

export const inspectionLotComponentComposition = createSlice({
  name: 'inspectionLotComponentComposition',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [InspectionLotTablesEnum.inspectionLotComponentComposition]: DefaultInspectionLotComponentCompositionProps;
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

      if (!action.payload[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }

      state[InspectionLotTablesEnum.inspectionLotComponentComposition] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[InspectionLotTablesEnum.inspectionLotComponentComposition],
      }

      if (!state[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }
      if (!action.payload[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition) { return; }
      if (action.payload[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition.length == 0) { return; }

      // item に対して isEditing と errors を追加
      state[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition = action.payload[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors(),
          }
        });
    },
    getState: (state: any) => {
      return state[InspectionLotTablesEnum.inspectionLotComponentComposition];
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[InspectionLotTablesEnum.inspectionLotComponentComposition];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      if (!state[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }

      state[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition[actionData.index] = {
        ...actionData.item,
      }
    },
    editedItem: (state, action: PayloadAction<{
      listState: any,
      updateInfoObject: {
        index: number;
        editKey: string;
        values: {
          value: string;
          key: string;
        }[]
      }
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData: {
        listState: any,
        updateInfoObject: {
          index: number;
          editKey: string;
          values: {
            value: string;
            key: string;
          }[]
        }
      } = {
        ...parsedDetail,
      };

      const targetState = actionData.listState[InspectionLotTablesEnum.inspectionLotComponentComposition]
        .Item[actionData.updateInfoObject.index];

      if (!targetState) { return; }

      targetState.isEditing[actionData.updateInfoObject.editKey] = !targetState.isEditing[actionData.updateInfoObject.editKey];

      actionData.updateInfoObject.values.map((value: any) => {
        targetState[value.key] = value.value;
      });

      if (!state[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }

      state[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition[actionData.updateInfoObject.index] = {
        ...targetState,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotComponentCompositionProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;

      if (!state[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }

      state[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition[actionData.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotComponentCompositionProps;
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

      if (!state[InspectionLotTablesEnum.inspectionLotComponentComposition]) { return; }

      state[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition[actionData.index] = {
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
                               item: InspectionLotComponentCompositionProps,
                               key: string,
                               checkValue: any,
                             },
                             appDispatch: Dispatch,
) => {
  if (key === 'OrderQuantityInDeliveryUnit') {
    if (checkValue < 0 || checkValue.includes('-')) {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'OrderQuantityInDeliveryUnit',
        isError: true,
        message: 'マイナスの値は無効です',
      }));
    }

    // if (isFloat(checkValue)) {
    //   return appDispatch(setErrorItem({
    //     index: index,
    //     item: item,
    //     key: 'OrderQuantityInDeliveryUnit',
    //     isError: true,
    //     message: '小数点は無効です',
    //   }));
    // }

    if (checkValue === '') {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'OrderQuantityInDeliveryUnit',
        isError: true,
        message: '空白は無効です',
      }));
    }

    return appDispatch(setErrorItem({
      index: index,
      item: item,
      key: 'OrderQuantityInDeliveryUnit',
      isError: false,
      message: '',
    }));
  }
};

const isError = (index: number, detailState: {
  [InspectionLotTablesEnum.inspectionLotComponentComposition]: any,
}) => {
  const list  = detailState[InspectionLotTablesEnum.inspectionLotComponentComposition].Item;

  return Object.keys(
    list[index].errors,
  ).some((key) => {
    return list[index].errors[key].isError
  })
}

export const editItemAsync = async (
  editItemParam: editItemParam,
  appDispatch: Dispatch,
  listState: any,
) => {
  appDispatch(setLoading({ isOpen: true }));

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

    let updateObject: any = {};
    let updateInfoObject: {
      index: number;
      editKey: string;
      values: {
        value: string;
        key: string;
      }[]
    } = {
      index: index,
      editKey: key,
      values: [],
    };

    if (editItemParam.key === 'RequestedDeliveryDateTime') {
      updateObject = {
        Orders: {
          OrderID: params.Orders.OrderID,
          Item: [
            {
              OrderID: params.Orders.OrderID,
              OrderItem: params.Orders.Item.OrderItem,
              RequestedDeliveryDate: params.Orders.Item.RequestedDeliveryDate,
              RequestedDeliveryTime: params.Orders.Item.RequestedDeliveryTime,
            },
          ],
        },
        accepter: params.accepter,
        api_type: params.api_type,
      };

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.Orders.Item.RequestedDeliveryDate,
            key: 'RequestedDeliveryDate',
          },
          {
            value: params.Orders.Item.RequestedDeliveryTime,
            key: 'RequestedDeliveryTime',
          },
        ],
      }
    }

    if (editItemParam.key === 'OrderQuantityInBaseUnit') {
      updateObject = {
        Orders: {
          OrderID: params.Orders.OrderID,
          Item: [
            {
              OrderID: params.Orders.OrderID,
              OrderItem: params.Orders.Item.OrderItem,
              OrderQuantityInBaseUnit: params.Orders.Item.OrderQuantityInBaseUnit,
            },
          ],
        },
        accepter: params.accepter,
        api_type: params.api_type,
      };

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.Orders.Item.OrderQuantityInBaseUnit,
            key: 'OrderQuantityInBaseUnit',
          },
        ],
      }
    }

    if (editItemParam.key === 'OrderQuantityInDeliveryUnit') {
      updateObject = {
        Orders: {
          OrderID: params.Orders.OrderID,
          Item: [
            {
              OrderID: params.Orders.OrderID,
              OrderItem: params.Orders.Item.OrderItem,
              OrderQuantityInDeliveryUnit: params.Orders.Item.OrderQuantityInDeliveryUnit,
            },
          ],
        },
        accepter: params.accepter,
        api_type: params.api_type,
      };

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.Orders.Item.OrderQuantityInDeliveryUnit,
            key: 'OrderQuantityInDeliveryUnit',
          },
        ],
      }
    }

    await updates(updateObject, 'item');

    appDispatch(inspectionLotComponentComposition.actions.editedItem(
      {
        listState: listState,
        updateInfoObject: updateInfoObject,
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
} = inspectionLotComponentComposition.actions;

export default inspectionLotComponentComposition.reducer
