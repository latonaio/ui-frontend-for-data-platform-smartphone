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

  ProductTablesEnum,
  ProductionOrderTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppSelector } from '@/store/hooks';
import {
  generateImageProductUrl,
} from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import ordersItemImage001 from '@public/orders-item-image-001.png';

export interface OrdersItemListProps {
  className?: string;
}

interface DetailListTableElementProps {
  summary: string[];
  list: OrdersItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = OrdersTablesEnum.ordersItem;
  const dispatch = useDispatch();

  const trStyleList: any = [
    rem(10),
    `15%`,
    `15%`,
    null,
    `10%`,
    `10%`,
    `15%`,
    `15%`,
  ];

  const renderList = (list: OrdersItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr
            key={index}
            className={`record`}
            onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              // `/DPFM_API_PRODUCTION_ORDER_SRV/reads/itemOperation/input/${item.ProductionOrder}/${item.ProductionOrderItem}/${item.Operations}/${item.OperationsItem}/userType`,
              ``,
              router
            );
          }}>
            <td>{item.OrderItem}</td>
            <td>
              <img
                className={`imageSlide m-auto`}
                style={{
                }}
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
            <td></td>
            <td>{item.DeliveryUnit}</td>
            <td></td>
            <td></td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={8}>テーブルに対象のレコードが存在しません。</td>
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
                                                 }: OrdersItemListProps) => {
  const summary = [
    '#',
    '画像',
    '品目',
    '明細テキスト',
    '予定数量',
    '入出荷数量単位',
    '出荷予定日 / 時刻',
    '入荷予定日 / 時刻',
  ];

  const list  = useAppSelector(state => state.ordersItem) as {
    [OrdersTablesEnum.ordersItem]: OrdersItemProps,
  };

  if (!list[OrdersTablesEnum.ordersItem]) { return <div></div> }

  return (
    <ListElement className={clsx(
      `List`,
      className
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
              <span style={{ marginLeft: rem(20) }}>オーダー金額: {list[OrdersTablesEnum.ordersItem].TotalGrossAmount?.toLocaleString()}</span>
            </div>
            <div>納入日付/時刻: {list[OrdersTablesEnum.ordersItem].RequestedDeliveryDate} {list[OrdersTablesEnum.ordersItem].RequestedDeliveryTime}</div>
          </div>

          <div className={'ml-auto flex justify-between items-center'}>
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

      <ListSection>
        <DetailListTableElement
          summary={summary}
          list={list[OrdersTablesEnum.ordersItem].Item}
        />
      </ListSection>
    </ListElement>
  );
};
