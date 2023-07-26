import React, { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  HeadTab,
  DetailList,
  DetailListTable,
} from './List.style';
import { GreenButton, BlueButton } from '@/components/Button';
import { BuyerItem, SellerItem } from '@/constants';
import { OrdersTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { setDialog } from '@/store/slices/dialog';
import { useDispatch } from 'react-redux';
import { Template as cancelDialogTemplate } from '@/components/Dialog/Consent';
import { texts } from '@/constants/message';
import { useAppSelector } from '@/store/hooks';
import { OrdersListItem } from '@/store/slices/orders/list';

interface onCancelItem {
  (
    value: any,
    index: number,
    itemType: string,
    params: any,
    listType: string,
  ): void;
}


interface ListProps {
  className?: string;
  onClickHandler: (type: OrdersTablesEnum) => void;
}

interface DetailListTableElementProps {
  summary: string[];
  type: OrdersTablesEnum;
  display: OrdersTablesEnum;
  list: SellerItem[] | BuyerItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  type,
                                  display,
                                  list,
}: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = display === OrdersTablesEnum.ordersListBuyerItem ?
    OrdersTablesEnum.ordersListBuyerItem :
    OrdersTablesEnum.ordersListSellerItem;
  const dispatch = useDispatch();

  const renderList = (list: BuyerItem[] | SellerItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled || item.IsMarkedForDeletion ? 'disabled' : ''}`} onClick={() => {
            clickHandler(
              `/orders/detail/list/${display === OrdersTablesEnum.ordersListBuyerItem ? 'buyer' : 'seller'}/${item.OrderID}`,
              router,
            );
          }}>
            <td>{item.OrderID}</td>
            <td>{item.BuyerName}</td>
            <td>{item.SellerName}</td>
            <td>{item.HeaderDeliveryStatus}</td>
            <td>
              <div className={'w-full inline-flex justify-evenly items-center'}>
                <GreenButton
                  className={'size-relative'}
                  isFinished={item.IsCancelled}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch(setDialog({
                      type: 'consent',
                      consent: {
                        isOpen: true,
                        children: (
                          cancelDialogTemplate(
                            dispatch,
                            item.IsCancelled  ?
                              'オーダーのキャンセルを取り消しますか？' : 'オーダーをキャンセルしますか？',
                            () => {
                              // onCancelItem(
                              //   !item.IsCancelled,
                              //   index,
                              //   'IsCancelled',
                              //   {
                              //     Orders: {
                              //       OrderID: item.OrderID,
                              //       IsCancelled: !item.IsCancelled,
                              //     }
                              //   },
                              //   listType,
                              // );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.cancel}
                </GreenButton>
                <BlueButton
                  className={'size-relative'}
                  isFinished={item.IsMarkedForDeletion}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    e.preventDefault();

                    dispatch(setDialog({
                      type: 'consent',
                      consent: {
                        isOpen: true,
                        children: (
                          cancelDialogTemplate(
                            dispatch,
                            item.IsMarkedForDeletion ? 'オーダーの削除を取り消しますか？' : 'オーダーを削除しますか？',
                            () => {
                              // onCancelItem(
                              //   !item.IsMarkedForDeletion,
                              //   index,
                              //   'IsMarkedForDeletion',
                              //   {
                              //     Orders: {
                              //       OrderID: item.OrderID,
                              //       IsMarkedForDeletion: !item.IsMarkedForDeletion,
                              //     }
                              //   },
                              //   listType,
                              // );
                            },
                          )
                        ),
                      }
                    }));
                  }}
                >
                  {texts.button.delete}
                </BlueButton>
              </div>
            </td>
          </tr>
        )
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={5}>テーブルに対象のレコードが存在しません。</td>
      </tr>
    );
  }

  return (
    <DetailList
      className={`${type === display ? '' : 'hidden'}`}
    >
      <DetailListTable>
        <tbody>
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  )
}

export const OrdersList = ({
                             onClickHandler,
                             className,
                           }: ListProps) => {
  const summaryData = {
    [OrdersTablesEnum.ordersListBuyerItem]: ['オーダー番号', 'Buyer', 'Seller', '入出荷ステータス', ''],
    [OrdersTablesEnum.ordersListSellerItem]: ['オーダー番号', 'Buyer', 'Seller', '入出荷ステータス', '',],
  };

  const [display, setDisplay] = useState<OrdersTablesEnum>(OrdersTablesEnum.ordersListBuyerItem);
  const [summary, setSummary] = useState<string[]>(summaryData[OrdersTablesEnum.ordersListBuyerItem]);
  const tabClickHandler = (type: OrdersTablesEnum) => {
    setDisplay(type);
    onClickHandler(type);
  }

  const list  = useAppSelector(state => state.ordersList) as {
    [OrdersTablesEnum.ordersListBuyerItem]: OrdersListItem[],
    [OrdersTablesEnum.ordersListSellerItem]: OrdersListItem[],
  };

  useEffect(() => {
    setSummary(summaryData[
      display === OrdersTablesEnum.ordersListBuyerItem ?
        OrdersTablesEnum.ordersListBuyerItem : OrdersTablesEnum.ordersListSellerItem
      ]);
  }, [display]);

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <div>
        <HeadTab className={'text-center text-1xl mb-2'}>
          <li
            className={`${display === OrdersTablesEnum.ordersListBuyerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(OrdersTablesEnum.ordersListBuyerItem)}
          >User ＝ Buyer
          </li>
          <li
            className={`${display === OrdersTablesEnum.ordersListSellerItem ? 'active' : ''}`}
            onClick={() => tabClickHandler(OrdersTablesEnum.ordersListSellerItem)}
          >User ＝ Seller
          </li>
        </HeadTab>
      </div>
      <DetailListTableElement
        summary={summary}
        type={OrdersTablesEnum.ordersListBuyerItem}
        display={display}
        list={list[OrdersTablesEnum.ordersListBuyerItem] || []}
      />
      <DetailListTableElement
        summary={summary}
        type={OrdersTablesEnum.ordersListSellerItem}
        display={display}
        list={list[OrdersTablesEnum.ordersListSellerItem] || []}
      />
    </ListElement>
  );
};
