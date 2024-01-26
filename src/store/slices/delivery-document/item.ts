import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeliveryDocumentItemProps as DefaultDeliveryDocumentItemProps,
  DeliveryDocumentTablesEnum, OrdersTablesEnum,
} from '@/constants';
import { setLoading } from '@/store/slices/loadging';
import { Dispatch } from 'redux';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { isFloat } from '@/helpers/form';
import { updates } from '@/api/deliveryDocument/item';

interface errors {
  [key: string]: {
    isError: boolean,
    message: string | null,
  };
}

export interface DeliveryDocumentItemProps extends DefaultDeliveryDocumentItemProps {
  isEditing: {
    [key: string]: boolean;
  };
  errors: errors
}

export interface InitialState {
  [DeliveryDocumentTablesEnum.deliveryDocumentItem]: DeliveryDocumentItemProps | null;
}

const initialState: InitialState = {
  [DeliveryDocumentTablesEnum.deliveryDocumentItem]: null,
};

const isEditingObject = {
  PlannedGoodsIssueQuantity: false,
  PlannedGoodsIssueQtyInBaseUnit: false,
  PlannedGoodsIssueDateTime: false,
  PlannedGoodsReceiptDateTime: false,
}

interface editItemParam {
  params: {
    DeliveryDocument: {
      DeliveryDocument: number;
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
  item: DeliveryDocumentItemProps;
  key: string;
}

export const deliveryDocumentItem = createSlice({
  name: 'deliveryDocumentItem',
  initialState,
  reducers: {
    initializeUpdate: (state, action: PayloadAction<{
      [DeliveryDocumentTablesEnum.deliveryDocumentItem]: DefaultDeliveryDocumentItemProps;
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

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem] = {
        isEditing: isEditingObject,
        errors: errors(),
        ...action.payload[DeliveryDocumentTablesEnum.deliveryDocumentItem],
      }

      if (!action.payload[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return; }
      if (!action.payload[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item) { return; }
      if (action.payload[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item.length == 0) { return; }

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item = action.payload[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item
        .map((item) => {
          return {
            ...item,
            isEditing: isEditingObject,
            errors: errors(),
          }
        });
    },
    pushItemToEdit: (state: InitialState, action: PayloadAction<pushEditItem>) => {
      const targetState = state[DeliveryDocumentTablesEnum.deliveryDocumentItem];

      if (!targetState) { return; }

      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = !targetState.isEditing[actionData.key];

      if (!state[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return; }

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item[actionData.index] = {
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

      const targetState = actionData.listState[DeliveryDocumentTablesEnum.deliveryDocumentItem]
        .Item[actionData.updateInfoObject.index];

      if (!targetState) { return; }

      targetState.isEditing[actionData.updateInfoObject.editKey] = !targetState.isEditing[actionData.updateInfoObject.editKey];

      actionData.updateInfoObject.values.map((value: any) => {
        targetState[value.key] = value.value;
      });

      if (!state[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return; }

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item[actionData.updateInfoObject.index] = {
        ...targetState,
      }
    },
    closeItem: (state, action: PayloadAction<{
      index: number;
      item: DeliveryDocumentItemProps;
      key: string;
    }>) => {
      const payload = JSON.stringify(action.payload);
      const parsedDetail = JSON.parse(payload);
      const actionData = {
        ...parsedDetail,
      };

      actionData.item.isEditing[actionData.key] = false;

      if (!state[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return; }

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item[actionData.index] = {
        ...actionData.item,
      }
    },
    setErrorItem: (state, action: PayloadAction<{
      index: number;
      item: DeliveryDocumentItemProps;
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

      if (!state[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return; }

      state[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item[actionData.index] = {
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
                               item: DeliveryDocumentItemProps,
                               key: string,
                               checkValue: any,
                             },
                             appDispatch: Dispatch,
) => {
  if (key === 'PlannedGoodsIssueQuantity') {
    if (checkValue < 0 || checkValue.includes('-')) {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'PlannedGoodsIssueQuantity',
        isError: true,
        message: 'マイナスの値は無効です',
      }));
    }

    // if (isFloat(checkValue)) {
    //   return appDispatch(setErrorItem({
    //     index: index,
    //     item: item,
    //     key: 'PlannedGoodsIssueQuantity',
    //     isError: true,
    //     message: '小数点は無効です',
    //   }));
    // }

    if (checkValue === '') {
      return appDispatch(setErrorItem({
        index: index,
        item: item,
        key: 'PlannedGoodsIssueQuantity',
        isError: true,
        message: '空白は無効です',
      }));
    }

    return appDispatch(setErrorItem({
      index: index,
      item: item,
      key: 'PlannedGoodsIssueQuantity',
      isError: false,
      message: '',
    }));
  }
};

const isError = (index: number, detailState: {
  [DeliveryDocumentTablesEnum.deliveryDocumentItem]: any,
}) => {
  const list  = detailState[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item;

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

    if (editItemParam.key === 'PlannedGoodsIssueQuantity') {
      updateObject = {
        DeliveryDocument: {
          DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
          Item: [
            {
              DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
              DeliveryDocumentItem: params.DeliveryDocument.Item.DeliveryDocumentItem,
              PlannedGoodsIssueQuantity: params.DeliveryDocument.Item.PlannedGoodsIssueQuantity,
            }
          ],
        },
        api_type: 'updates',
        accepter: ['Item'],
      }

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.DeliveryDocument.Item.PlannedGoodsIssueQuantity,
            key: 'PlannedGoodsIssueQuantity',
          },
        ],
      }
    }

    if (editItemParam.key === 'PlannedGoodsIssueQtyInBaseUnit') {
      updateObject = {
        DeliveryDocument: {
          DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
          Item: [
            {
              DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
              DeliveryDocumentItem: params.DeliveryDocument.Item.DeliveryDocumentItem,
              PlannedGoodsIssueQtyInBaseUnit: params.DeliveryDocument.Item.PlannedGoodsIssueQtyInBaseUnit,
            }
          ],
        },
        api_type: 'updates',
        accepter: ['Item'],
      }

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.DeliveryDocument.Item.PlannedGoodsIssueQtyInBaseUnit,
            key: 'PlannedGoodsIssueQtyInBaseUnit',
          },
        ],
      }
    }

    if (editItemParam.key === 'PlannedGoodsIssueDateTime') {
      updateObject = {
        DeliveryDocument: {
          DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
          Item: [
            {
              DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
              DeliveryDocumentItem: params.DeliveryDocument.Item.DeliveryDocumentItem,
              PlannedGoodsIssueDate: params.DeliveryDocument.Item.PlannedGoodsIssueDate,
              PlannedGoodsIssueTime: params.DeliveryDocument.Item.PlannedGoodsIssueTime,
            },
          ],
        },
        api_type: 'updates',
        accepter: ['Item'],
      }

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.DeliveryDocument.Item.PlannedGoodsIssueDate,
            key: 'PlannedGoodsIssueDate',
          },
          {
            value: params.DeliveryDocument.Item.PlannedGoodsIssueTime,
            key: 'PlannedGoodsIssueTime',
          },
        ],
      }
    }

    if (editItemParam.key === 'PlannedGoodsReceiptDateTime') {
      updateObject = {
        DeliveryDocument: {
          DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
          Item: [
            {
              DeliveryDocument: params.DeliveryDocument.DeliveryDocument,
              DeliveryDocumentItem: params.DeliveryDocument.Item.DeliveryDocumentItem,
              PlannedGoodsReceiptDate: params.DeliveryDocument.Item.PlannedGoodsReceiptDate,
              PlannedGoodsReceiptTime: params.DeliveryDocument.Item.PlannedGoodsReceiptTime,
            },
          ],
        },
        api_type: 'updates',
        accepter: ['Item'],
      }

      updateInfoObject = {
        index,
        editKey: key,
        values: [
          {
            value: params.DeliveryDocument.Item.PlannedGoodsReceiptDate,
            key: 'PlannedGoodsReceiptDate',
          },
          {
            value: params.DeliveryDocument.Item.PlannedGoodsReceiptTime,
            key: 'PlannedGoodsReceiptTime',
          },
        ],
      }
    }

    await updates(updateObject, 'item');

    appDispatch(deliveryDocumentItem.actions.editedItem(
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
} = deliveryDocumentItem.actions;
