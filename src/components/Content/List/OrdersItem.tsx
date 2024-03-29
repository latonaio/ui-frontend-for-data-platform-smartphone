import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  DetailList,
  DetailListTable,
  List as ListElement,
  ListHeaderInfoFlexStart,
  ListSection,
} from './List.style';
import {
  OrdersTablesEnum,
  OrdersItemProps,
  OrdersItem,
  DocumentImage,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, BlueButton } from '@/components/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  generateImageProductUrl, generateDocumentImageUrl,
} from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { PopupTranslucent } from '@/components/Popup/Popup';
import { DateTimePicker, TextField } from '@/components/Form';
import { editItemAsync } from '@/store/slices/orders/item';

import {
  OrdersItemProps as StoreOrdersItemProps,
  pushItemToEdit,
  checkInvalid,
  closeItem,
} from '@/store/slices/orders/item';
import { Refresh } from '@/components/Refresh';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { reads as itemSingleUnitMillSheetReads } from '@/api/orders/item-single-unit-mill-sheet';
import { reads as detailListForAnOrderDocument } from '@/api/orders/detail-list-for-an-order-document';
import { setLoading } from '@/store/slices/loadging';
import { setGlobalSnackbar } from '@/store/slices/snackbar';

export interface OrdersItemListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  orderId: number;
  userType: string;
  list: any[];
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
  setDocumentImageInfo: any;
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  orderId,
                                  userType,
                                  closedPopup,
                                  setClosedPopup,
                                  setDocumentImageInfo,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = OrdersTablesEnum.ordersItem;
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.ordersItem) as {
    [OrdersTablesEnum.ordersItem]: any,
  };

  const trStyleList: any = [
    rem(10),
    `15%`,
    `10%`,
    null,
    `10%`,
    `10%`,
    `8%`,
    `8%`,
    `10%`,
    `15%`,
  ];

  const renderList = (list: any[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr
            key={index}
            className={`record`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <td className={'text-right'}>{item.OrderItem}</td>
            <td>
              <img
                className={`imageSlide m-auto`}
                src={
                  item.Images?.Product?.BusinessPartnerID &&
                  generateImageProductUrl(
                    item.Images?.Product?.BusinessPartnerID.toString(),
                    item.Images?.Product,
                  ) || ''}
                alt={``}
              />
            </td>
            <td>{item.Product}</td>
            <td>{item.OrderItemText}</td>
            <td
              className={item.errors['OrderQuantityInBaseUnit'].isError ? 'invalid' : ''}
              style={{
                fontSize: rem(24),
              }}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['OrderQuantityInBaseUnit']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'OrderQuantityInBaseUnit',
                }));
              }}
            >
              <span>
                <TextField
                  isEditing={item.isEditing['OrderQuantityInBaseUnit']}
                  currentValue={item.OrderQuantityInBaseUnit}
                  type={'number'}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'OrderQuantityInBaseUnit',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: number) => {
                    await editItemAsync({
                        params: {
                          Orders: {
                            OrderID: orderId,
                            Item: {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              OrderQuantityInBaseUnit: value,
                            },
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'OrderQuantityInBaseUnit',
                      },
                      appDispatch, listState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'OrderQuantityInBaseUnit',
                  }))}
                />
              </span>
            </td>
            <td
              className={item.errors['OrderQuantityInDeliveryUnit'].isError ? 'invalid' : ''}
              style={{
                fontSize: rem(24),
              }}
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['OrderQuantityInDeliveryUnit']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'OrderQuantityInDeliveryUnit',
                }));
              }}
            >
              <span>
                <TextField
                  isEditing={item.isEditing['OrderQuantityInDeliveryUnit']}
                  currentValue={item.OrderQuantityInDeliveryUnit}
                  type={'number'}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'OrderQuantityInDeliveryUnit',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: number) => {
                    await editItemAsync({
                        params: {
                          Orders: {
                            OrderID: orderId,
                            Item: {
                              OrderID: orderId,
                              OrderItem: item.OrderItem,
                              OrderQuantityInDeliveryUnit: value,
                            },
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'OrderQuantityInDeliveryUnit',
                      },
                      appDispatch, listState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'OrderQuantityInDeliveryUnit',
                  }))}
                />
              </span>
            </td>
            <td>{item.BaseUnit}</td>
            <td>{item.DeliveryUnit}</td>
            <td
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['RequestedDeliveryDateTime']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'RequestedDeliveryDateTime',
                }));
              }}
            >
              <DateTimePicker
                className={'orderDateDataPicker'}
                isEditing={item.isEditing['RequestedDeliveryDateTime']}
                currentValue={item.RequestedDeliveryDate + ` ` + item.RequestedDeliveryTime}
                onChange={async (value: { date: string, time: string }) => {
                  await editItemAsync({
                      params: {
                        Orders: {
                          OrderID: orderId,
                          Item: {
                            OrderID: orderId,
                            OrderItem: item.OrderItem,
                            RequestedDeliveryDate: value.date,
                            RequestedDeliveryTime: `${value.time}:00`,
                          },
                        },
                        api_type: 'updates',
                        accepter: ['Item'],
                      },
                      index,
                      key: 'RequestedDeliveryDateTime',
                    },
                    appDispatch, listState);
                }}
              />
            </td>
            <td
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                // setClosedPopup && setClosedPopup(!closedPopup);
                // setDocumentImageInfo(item.Images?.DocumentImageOrders || null);
              }}
            >

              {/*<img*/}
              {/*  className={`imageSlide m-auto`}*/}
              {/*  style={{*/}
              {/*    padding: rem(10),*/}
              {/*  }}*/}
              {/*  src={*/}
              {/*    item.Images?.DocumentImageOrders &&*/}
              {/*    generateDocumentImageUrl(item.Images?.DocumentImageOrders) || ''*/}
              {/*  }*/}
              {/*  alt={``}*/}
              {/*/>*/}

              <span
                className='icon-file-text2'
                style={{
                  fontSize: rem(60),
                  color: `#6e6e6e`,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  dispatch(setDialog({
                    type: 'consent',
                    consent: {
                      isOpen: true,
                      children: (
                        cancelDialogTemplate(
                          dispatch,
                          'ミルシートを生成します',
                          async () => {
                            dispatch(setLoading({ isOpen: true }));

                            try {
                              const response = await itemSingleUnitMillSheetReads({
                                orderId: orderId,
                                orderItem: item.OrderItem,
                                language: '',
                                businessPartner: 0,
                                userId: '',
                                userType: userType,
                              });

                              if (response) {
                                router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                                  `item/` +
                                  `${orderId}/` +
                                  `${item.OrderItem}/` +
                                  `${userType}/` +
                                  `pdf` +
                                  `?pdfUrl=${response.MillSheetPdfMountPath}&type=mill-sheet-pdf`
                                );
                              }
                            } catch (e) {
                              appDispatch(setGlobalSnackbar({
                                message: `Inspection Lot が null です`,
                                variant: 'error',
                              }));
                            }

                            dispatch(setLoading({ isOpen: false }));
                          },
                        )
                      ),
                    }
                  }))
                }}>
              </span>
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={9}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  };

  return (
    <DetailList>
      <DetailListTable className={''}>
        <tbody>
        {summaryHead(summary, {
          trStyleList,
        })}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const OrdersItemList = ({
                                 className,
                                 refresh,
                               }: OrdersItemListProps) => {
  const summary = [
    '#',
    '画像',
    '品目',
    '明細テキスト',
    'オーダー数量(BU)',
    'オーダー数量(DU)',
    '数量単位(BU)',
    '数量単位(DU)',
    '入出荷予定日 / 時刻',
    'ミルシート生成',
  ];

  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const [closedPopup, setClosedPopup] = useState(true);
  const [documentImageInfo, setDocumentImageInfo] = useState({} as any);

  const list = useAppSelector(state => state.ordersItem) as {
    [OrdersTablesEnum.ordersItem]: any,
  };

  if (!list[OrdersTablesEnum.ordersItem]) {
    return <div></div>;
  }

  return (
    <ListElement className={clsx(
      `List`,
      className,
    )}>
      <ListSection>
        <ListHeaderInfoFlexStart>
          <div
            style={{
              width: `10%`,
            }}
          >
            <PublicImage
              className={`imageSlide m-auto`}
              imageName={'ordersItemImage001'}
              style={{
                // width: `60%`,
              }}
            />
          </div>

          <div
            style={{
              marginLeft: rem(10),
            }}
          >
            <div>オーダー: {list[OrdersTablesEnum.ordersItem].OrderID}</div>
            <div>買い手: {list[OrdersTablesEnum.ordersItem].BuyerName}</div>
            <div className={'flex justify-between items-center'}>
              <span>売り手: {list[OrdersTablesEnum.ordersItem].SellerName}</span>
              <span
                style={{ marginLeft: rem(20) }}>オーダー金額: {list[OrdersTablesEnum.ordersItem].TotalGrossAmount?.toLocaleString()}</span>
            </div>
            <div>納入日付/時刻: {list[OrdersTablesEnum.ordersItem].RequestedDeliveryDate} {list[OrdersTablesEnum.ordersItem].RequestedDeliveryTime}</div>
          </div>

          <div className={'ml-auto flex justify-between items-center'}>
            <div>
              <Refresh
                style={{
                  marginRight: rem(10),
                }}
                onClick={() => {
                  refresh && refresh();
                }}
              ></Refresh>
            </div>
            <div>
              <BlueButton
                className={'mr-2'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  dispatch(setDialog({
                    type: 'consent',
                    consent: {
                      isOpen: true,
                      children: (
                        cancelDialogTemplate(
                          dispatch,
                          '注文書を生成します',
                          async () => {
                            dispatch(setLoading({ isOpen: true }));

                            try {
                              const response = await detailListForAnOrderDocument({
                                orderId: list[OrdersTablesEnum.ordersItem].OrderID,
                                language: '',
                                businessPartner: 0,
                                userId: '',
                              });

                              if (response) {
                                router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                                  `item/` +
                                  `${list[OrdersTablesEnum.ordersItem].OrderID}/` +
                                  `${list[OrdersTablesEnum.ordersItem].OrderItem}/` +
                                  `${list[OrdersTablesEnum.ordersItem].UserType}/` +
                                  `pdf` +
                                  `?pdfUrl=${response.mount_path}&type=order-pdf`
                                );
                              }
                            } catch (e) {
                              appDispatch(setGlobalSnackbar({
                                message: `エラーです`,
                                variant: 'error',
                              }));
                            }

                            dispatch(setLoading({ isOpen: false }));
                          },
                        )
                      ),
                    }
                  }))
                }}
              >注文書を生成</BlueButton>
            </div>
            <div>
              <BackButton
                className={'whiteInfo'}
                style={{
                  marginRight: rem(10),
                }}
                hrefPath={`/DPFM_API_ORDERS_SRV/reads/` +
                  `singleUnit/` +
                  `${list[OrdersTablesEnum.ordersItem].OrderID}/` +
                  `${list[OrdersTablesEnum.ordersItem].OrderItem}/` +
                  `${list[OrdersTablesEnum.ordersItem].UserType}`
                }
              >Cockpit</BackButton>
            </div>
            <div>
              <BackButton className={'whiteInfo'}>その他の情報</BackButton>
            </div>
          </div>
        </ListHeaderInfoFlexStart>
      </ListSection>

      <PopupTranslucent
        title={`${documentImageInfo ? `オーダーID: ` + documentImageInfo['OrdersID'] + ` 明細: ` + documentImageInfo['OrdersItem'] : ``}`}
        closedPopup={closedPopup}
        setClosedPopup={setClosedPopup}
        isHeightFull={true}
      >
        <div>
          {
            documentImageInfo &&
            <img
              src={
                generateDocumentImageUrl(documentImageInfo as DocumentImage) || ''
              }
              alt={``}
            />
          }
        </div>
      </PopupTranslucent>

      <ListSection
        className={clsx(
          `${closedPopup ? '' : 'hidden'}`,
        )}
      >
        <DetailListTableElement
          summary={summary}
          orderId={list[OrdersTablesEnum.ordersItem].OrderID}
          userType={list[OrdersTablesEnum.ordersItem].UserType}
          list={list[OrdersTablesEnum.ordersItem].Item}
          setClosedPopup={setClosedPopup}
          closedPopup={closedPopup}
          setDocumentImageInfo={setDocumentImageInfo}
        />
      </ListSection>
    </ListElement>
  );
};
