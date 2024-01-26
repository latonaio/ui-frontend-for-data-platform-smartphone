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
  OrdersItemScheduleLineItem,
  OrdersTablesEnum,
  OrdersItemScheduleLineProps,
  DeliveryDocumentTablesEnum,
  DeliveryDocumentItem,
  DeliveryDocumentItemProps, DocumentImage,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateDocumentImageUrl, generateImageProductUrl } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import {
  editItemAsync,
  pushItemToEdit,
} from '@/store/slices/delivery-document/item';
import { DateTimePicker, TextField } from '@/components/Form';
import { checkInvalid, closeItem } from '@/store/slices/delivery-document/item';
import { PopupTranslucent } from '@/components/Popup';
import { Refresh } from '@/components/Refresh';

export interface DeliveryDocumentItemListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  deliveryDocument: number;
  list: DeliveryDocumentItem[];
  userType: string;
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
  setDocumentImageInfo: any;
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  deliveryDocument,
                                  userType,
                                  closedPopup,
                                  setClosedPopup,
                                  setDocumentImageInfo,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = DeliveryDocumentTablesEnum.deliveryDocumentItem;
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.deliveryDocumentItem) as {
    [DeliveryDocumentTablesEnum.deliveryDocumentItem]: any,
  };

  const trStyleList: any = [
    rem(10),
    `10%`,
    `8%`,
    `5%`,
    `5%`,
    `5%`,
    `5%`,
    `5%`,
    null,
    null,
    `5%`,
    `5%`,
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
            <td className={'text-right'}>{item.DeliveryDocumentItem}</td>
            <td>
              <img
                className={`imageSlide m-auto`}
                style={{}}
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
            <td>{item.DeliveryDocumentItemText}</td>
            <td
              className={item.errors['PlannedGoodsIssueQuantity'].isError ? 'invalid' : ''}
              style={{
                fontSize: rem(24),
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['PlannedGoodsIssueQuantity']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'PlannedGoodsIssueQuantity',
                }));
              }}
            >
              <span>
                <TextField
                  isEditing={item.isEditing['PlannedGoodsIssueQuantity']}
                  currentValue={item.PlannedGoodsIssueQuantity}
                  type={'number'}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'PlannedGoodsIssueQuantity',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: number) => {
                    await editItemAsync({
                        params: {
                          DeliveryDocument: {
                            DeliveryDocument: deliveryDocument,
                            Item: {
                              DeliveryDocument: deliveryDocument,
                              DeliveryDocumentItem: item.DeliveryDocumentItem,
                              PlannedGoodsIssueQuantity: value,
                            },
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'PlannedGoodsIssueQuantity',
                      },
                      appDispatch, listState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'PlannedGoodsIssueQuantity',
                  }))}
                />
              </span>
            </td>
            <td
              className={item.errors['PlannedGoodsIssueQtyInBaseUnit'].isError ? 'invalid' : ''}
              style={{
                fontSize: rem(24),
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['PlannedGoodsIssueQtyInBaseUnit']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'PlannedGoodsIssueQtyInBaseUnit',
                }));
              }}
            >
              <span>
                <TextField
                  isEditing={item.isEditing['PlannedGoodsIssueQtyInBaseUnit']}
                  currentValue={item.PlannedGoodsIssueQtyInBaseUnit}
                  type={'number'}
                  checkInvalid={(value) => {
                    checkInvalid({
                      index,
                      item,
                      key: 'PlannedGoodsIssueQtyInBaseUnit',
                      checkValue: value,
                    }, appDispatch);
                  }}
                  onChange={async (value: number) => {
                    await editItemAsync({
                        params: {
                          DeliveryDocument: {
                            DeliveryDocument: deliveryDocument,
                            Item: {
                              DeliveryDocument: deliveryDocument,
                              DeliveryDocumentItem: item.DeliveryDocumentItem,
                              PlannedGoodsIssueQtyInBaseUnit: value,
                            },
                          },
                          api_type: 'updates',
                          accepter: ['Item'],
                        },
                        index,
                        key: 'PlannedGoodsIssueQtyInBaseUnit',
                      },
                      appDispatch, listState);
                  }}
                  onClose={() => appDispatch(closeItem({
                    index,
                    item,
                    key: 'PlannedGoodsIssueQtyInBaseUnit',
                  }))}
                />
              </span>
            </td>

            <td>{item.DeliveryUnit}</td>
            <td>{item.BaseUnit}</td>
            <td
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['PlannedGoodsIssueDateTime']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'PlannedGoodsIssueDateTime',
                }));
              }}
            >
              <DateTimePicker
                isEditing={item.isEditing['PlannedGoodsIssueDateTime']}
                currentValue={item.PlannedGoodsIssueDate + ` ` + item.PlannedGoodsIssueTime}
                onChange={async (value: { date: string, time: string }) => {
                  await editItemAsync({
                      params: {
                        DeliveryDocument: {
                          DeliveryDocument: deliveryDocument,
                          Item: {
                            DeliveryDocument: deliveryDocument,
                            DeliveryDocumentItem: item.DeliveryDocumentItem,
                            PlannedGoodsIssueDate: value.date,
                            PlannedGoodsIssueTime: `${value.time}:00`,
                          },
                        },
                        api_type: 'updates',
                        accepter: ['Item'],
                      },
                      index,
                      key: 'PlannedGoodsIssueDateTime',
                    },
                    appDispatch, listState);
                }}
              />
            </td>
            <td
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();

                if (item.isEditing['PlannedGoodsReceiptDateTime']) {
                  return;
                }

                appDispatch(pushItemToEdit({
                  index,
                  item,
                  key: 'PlannedGoodsReceiptDateTime',
                }));
              }}
            >
              <DateTimePicker
                isEditing={item.isEditing['PlannedGoodsReceiptDateTime']}
                currentValue={item.PlannedGoodsReceiptDate + ` ` + item.PlannedGoodsReceiptTime}
                onChange={async (value: { date: string, time: string }) => {
                  await editItemAsync({
                      params: {
                        DeliveryDocument: {
                          DeliveryDocument: deliveryDocument,
                          Item: {
                            DeliveryDocument: deliveryDocument,
                            DeliveryDocumentItem: item.DeliveryDocumentItem,
                            PlannedGoodsReceiptDate: value.date,
                            PlannedGoodsReceiptTime: `${value.time}:00`,
                          },
                        },
                        api_type: 'updates',
                        accepter: ['Item'],
                      },
                      index,
                      key: 'PlannedGoodsReceiptDateTime',
                    },
                    appDispatch, listState);
                }}
              />
            </td>
            <td></td>
            <td></td>
            <td
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();

                setClosedPopup && setClosedPopup(!closedPopup);
                setDocumentImageInfo(item.Images?.DocumentImageDeliveryDocument || null);
              }}
            >
              <img
                className={`imageSlide m-auto`}
                style={{
                  padding: rem(10),
                }}
                src={
                  item.Images?.DocumentImageDeliveryDocument &&
                  generateDocumentImageUrl(item.Images?.DocumentImageDeliveryDocument) || ''
                }
                alt={``}
              />
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={10}>テーブルに対象のレコードが存在しません。</td>
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

export const DeliveryDocumentItemList = ({
                                           className,
                                           refresh,
                                         }: DeliveryDocumentItemListProps) => {
  const summary = [
    '#',
    '画像',
    '品目',
    '明細テキスト',
    '数量(DU)',
    '数量(BU)',
    '数量単位(DU)',
    '数量単位(BU)',
    '出荷予定日 / 時刻',
    '入荷予定日 / 時刻',
    'ピッキング',
    '出荷',
    '文書',
  ];

  const [closedPopup, setClosedPopup] = useState(true);
  const [documentImageInfo, setDocumentImageInfo] = useState({} as any);

  const list = useAppSelector(state => state.deliveryDocumentItem) as {
    [DeliveryDocumentTablesEnum.deliveryDocumentItem]: any,
  };

  if (!list[DeliveryDocumentTablesEnum.deliveryDocumentItem]) {
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
              imageName={'deliveryDocumentItemImage001'}
              style={{
                // width: `60%`,
              }}
            />
          </div>

          <div
            style={{
              width: `90%`,
            }}
          >
            <div>
              <span>入出荷伝票: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliveryDocument}</span>
              <span style={{
                marginLeft: rem(10),
              }}>計画出荷日付/時刻: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].PlannedGoodsIssueDate} / {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].PlannedGoodsIssueTime}</span>
              <span style={{
                marginLeft: rem(10),
              }}>計画入荷日付/時刻: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].PlannedGoodsReceiptDate} / {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].PlannedGoodsReceiptTime}</span>
            </div>
            <div className={'flex justify-between items-center'}>
              <div>
                <div>
                  <span>出荷先: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliverToPartyName}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>出荷先プラント: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliverToPlantName}</span>
                </div>
                <div>
                  <span>出荷元: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliverFromPartyName}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>出荷元プラント: {list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliverFromPlantName}</span>
                </div>
                <div className={'flex justify-start items-center'}>
                  <div>
                    <span>総重量: </span><span style={{
                    fontSize: rem(24),
                  }}>{list[DeliveryDocumentTablesEnum.deliveryDocumentItem].HeaderGrossWeight?.toLocaleString()}</span>
                  </div>
                  <div style={{
                    marginLeft: rem(10),
                  }}>
                    <span>正味重量: </span><span style={{
                    fontSize: rem(24),
                  }}>{list[DeliveryDocumentTablesEnum.deliveryDocumentItem].HeaderNetWeight?.toLocaleString()}</span>
                  </div>
                  <div style={{
                    marginLeft: rem(10),
                  }}>
                    <span>重量単位: </span><span style={{
                    fontSize: rem(24),
                  }}>{list[DeliveryDocumentTablesEnum.deliveryDocumentItem].HeaderWeightUnit}</span>
                  </div>
                </div>
              </div>
              <div className={'flex justify-start items-center'}>
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
                  <BackButton
                    className={'whiteInfo'}
                    style={{
                      marginRight: rem(10),
                    }}
                    hrefPath={`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                      `singleUnit/` +
                      `${list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliveryDocument}/` +
                      `${list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliveryDocumentItem}/` +
                      `${list[DeliveryDocumentTablesEnum.deliveryDocumentItem].UserType}`
                    }
                  >Cockpit</BackButton>
                </div>
                <div>
                  <BackButton className={'whiteInfo'}>その他の情報</BackButton>
                </div>
              </div>
            </div>
          </div>

        </ListHeaderInfoFlexStart>
      </ListSection>

      <PopupTranslucent
        title={`${documentImageInfo ? `入出荷ID: ` + documentImageInfo['DeliveryDocument'] + ` 明細: ` + documentImageInfo['DeliveryDocumentItem'] : ``}`}
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

      <ListSection>
        <DetailListTableElement
          summary={summary}
          deliveryDocument={list[DeliveryDocumentTablesEnum.deliveryDocumentItem].DeliveryDocument}
          list={list[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item}
          userType={list[DeliveryDocumentTablesEnum.deliveryDocumentItem].UserType}
          setClosedPopup={setClosedPopup}
          closedPopup={closedPopup}
          setDocumentImageInfo={setDocumentImageInfo}
        />
      </ListSection>
    </ListElement>
  );
};
