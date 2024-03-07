import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  InspectionLotSpecDetailProps as DefaultInspectionLotSpecDetailProps,
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

export interface InspectionLotSpecDetailProps extends DefaultInspectionLotSpecDetailProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [InspectionLotTablesEnum.inspectionLotSpecDetail]: InspectionLotSpecDetailProps | null;
}

const initialState: InitialState = {
  [InspectionLotTablesEnum.inspectionLotSpecDetail]: null,
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
  item: InspectionLotSpecDetailProps;
  key: string;
}

export const inspectionLotSpecDetail = createSlice({
  name: 'inspectionLotSpecDetail',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [InspectionLotTablesEnum.inspectionLotSpecDetail]: DefaultInspectionLotSpecDetailProps;
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

      if (!action.payload[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }

      state[InspectionLotTablesEnum.inspectionLotSpecDetail] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[InspectionLotTablesEnum.inspectionLotSpecDetail],
      }

      if (!state[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }
      if (!action.payload[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail) { return; }
      if (action.payload[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail.length == 0) { return; }

      // item に対して isEditing と errors を追加
      state[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail = action.payload[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors(),
          }
        });
    },
    getState: (state: any) => {
      return state[InspectionLotTablesEnum.inspectionLotSpecDetail];
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[InspectionLotTablesEnum.inspectionLotSpecDetail];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      if (!state[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }

      state[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail[actionData.index] = {
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

      const targetState = actionData.listState[InspectionLotTablesEnum.inspectionLotSpecDetail]
        .Item[actionData.updateInfoObject.index];

      if (!targetState) { return; }

      targetState.isEditing[actionData.updateInfoObject.editKey] = !targetState.isEditing[actionData.updateInfoObject.editKey];

      actionData.updateInfoObject.values.map((value: any) => {
        targetState[value.key] = value.value;
      });

      if (!state[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }

      state[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail[actionData.updateInfoObject.index] = {
        ...targetState,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotSpecDetailProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;

      if (!state[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }

      state[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail[actionData.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: InspectionLotSpecDetailProps;
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

      if (!state[InspectionLotTablesEnum.inspectionLotSpecDetail]) { return; }

      state[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail[actionData.index] = {
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
                               item: InspectionLotSpecDetailProps,
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
  [InspectionLotTablesEnum.inspectionLotSpecDetail]: any,
}) => {
  const list  = detailState[InspectionLotTablesEnum.inspectionLotSpecDetail].Item;

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

    appDispatch(inspectionLotSpecDetail.actions.editedItem(
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
} = inspectionLotSpecDetail.actions;

export default inspectionLotSpecDetail.reducer
