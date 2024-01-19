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
  OrdersItemScheduleLineProps, ProductTablesEnum, ProductionOrderTablesEnum,
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
import { Refresh } from '@/components/Refresh';

export interface OrdersItemScheduleLineListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  list: OrdersItemScheduleLineItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = OrdersTablesEnum.ordersItemScheduleLine;
  const dispatch = useDispatch();

  const trStyleList: any = [
    rem(10),
    `20%`,
    `20%`,
    `20%`,
    null,
    null,
    null,
    null,
  ];

  const renderList = (list: OrdersItemScheduleLineItem[]) => {
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
            <td>{item.ScheduleLine}</td>
            <td>{item.StockConfirmationBusinessPartnerName} / {item.StockConfirmationPlantName}</td>
            <td></td>
            <td>{item.RequestedDeliveryDate} / {item.RequestedDeliveryTime}</td>
            <td></td>
            <td></td>
            <td>{item.DeliveredQuantityInBaseUnit}</td>
            <td>{item.UndeliveredQuantityInBaseUnit}</td>
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

export const OrdersItemScheduleLine = ({
                                         className,
                                         refresh,
                                       }: OrdersItemScheduleLineListProps) => {
  const summary = [
    '#',
    '在庫確認BP / プラント',
    'ロット',
    '要求納入日付 / 時刻',
    '要求数量<br />(DU)',
    '引当済数量<br />(DU)',
    '入出荷済',
    '未入出荷',
  ];

  const list  = useAppSelector(state => state.ordersItemScheduleLine) as {
    [OrdersTablesEnum.ordersItemScheduleLine]: OrdersItemScheduleLineProps,
  };

  if (!list[OrdersTablesEnum.ordersItemScheduleLine]) { return <div></div> }

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
              width: `30%`,
              marginLeft: rem(10),
            }}
          >
            <div>オーダー: {list[OrdersTablesEnum.ordersItemScheduleLine].OrderID}</div>
            <div>買い手: {list[OrdersTablesEnum.ordersItemScheduleLine].BuyerName}</div>
            <div>売り手: {list[OrdersTablesEnum.ordersItemScheduleLine].SellerName}</div>
            <div>納入日付/時刻: {list[OrdersTablesEnum.ordersItemScheduleLine].RequestedDeliveryDate} {list[OrdersTablesEnum.ordersItemScheduleLine].RequestedDeliveryTime}</div>
          </div>

          <div
            style={{
              width: `10%`,
            }}
          >
            <img
              className={`imageSlide m-auto`}
              style={{
                // width: `60%`,
              }}
              src={
                list[OrdersTablesEnum.ordersItemScheduleLine].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  list[OrdersTablesEnum.ordersItemScheduleLine].Images?.Product?.BusinessPartnerID.toString(),
                  list[OrdersTablesEnum.ordersItemScheduleLine].Images?.Product,
                ) || ''}
              alt={``}
            />
          </div>

          <div
            style={{
              width: `30%`,
              marginLeft: rem(10),
            }}
          >
            <div>オーダー明細: {list[OrdersTablesEnum.ordersItemScheduleLine].OrderItem}</div>
            <div>テキスト: {
              list[OrdersTablesEnum.ordersItemScheduleLine].UserType === 'buyer' ?
              list[OrdersTablesEnum.ordersItemScheduleLine].OrderItemTextByBuyer : list[OrdersTablesEnum.ordersItemScheduleLine].OrderItemTextBySeller
            }</div>
            <div className={'flex justify-start items-center'}>
              <div>数量: <span
                style={{
                  fontSize: rem(24),
                }}
              >{list[OrdersTablesEnum.ordersItemScheduleLine].OrderQuantityInDeliveryUnit}</span></div>
              <div
                style={{
                  marginLeft: rem(10),
                }}
              >入出荷単位: <span
                style={{
                  fontSize: rem(24),
                }}
              >{list[OrdersTablesEnum.ordersItemScheduleLine].DeliveryUnit}</span></div>
            </div>
          </div>

          <div
            className={'flex justify-start items-center'}
            style={{
              width: `20%`,
            }}
          >
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
                hrefPath={`/DPFM_API_ORDERS_SRV/reads/` +
                  `singleUnit/` +
                  `${list[OrdersTablesEnum.ordersItemScheduleLine].OrderID}/` +
                  `${list[OrdersTablesEnum.ordersItemScheduleLine].OrderItem}/` +
                  `${list[OrdersTablesEnum.ordersItemScheduleLine].UserType}`
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
          list={list[OrdersTablesEnum.ordersItemScheduleLine].ItemScheduleLine}
        />
      </ListSection>
    </ListElement>
  );
};
