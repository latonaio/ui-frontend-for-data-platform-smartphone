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
  OrdersItemPricingElementItem,
  OrdersTablesEnum,
  OrdersItemPricingElementProps,
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

export interface OrdersItemPricingElementListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  list: OrdersItemPricingElementItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = OrdersTablesEnum.ordersItemPricingElement;
  const dispatch = useDispatch();

  const trStyleList: any = [
    rem(10),
    `20%`,
    `10%`,
    `10%`,
    null,
    null,
    null,
    null,
  ];

  const renderList = (list: OrdersItemPricingElementItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr
            key={index}
            className={`record`}
            onClick={(e) => {
            // e.preventDefault();
            // e.stopPropagation();
            // clickHandler(
            //   // `/DPFM_API_PRODUCTION_ORDER_SRV/reads/itemOperation/input/${item.ProductionOrder}/${item.ProductionOrderItem}/${item.Operations}/${item.OperationsItem}/userType`,
            //   ``,
            //   router
            // );
          }}>
            <td className={'text-right'}>{item.PricingProcedureCounter}</td>
            <td className={'text-right'}>{item.ConditionRateValue?.toLocaleString()}</td>
            <td className={'text-right'}>{item.ConditionRateValueUnit?.toLocaleString()}</td>
            <td className={'text-right'}>{item.ConditionScaleQuantity?.toLocaleString()}</td>
            <td>{item.ConditionCurrency}</td>
            <td className={'text-right'}>{item.ConditionQuantity?.toLocaleString()}</td>
            <td className={'text-right'}>{item.ConditionAmount?.toLocaleString()}</td>
            <td>{item.ConditionType}</td>
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

export const OrdersItemPricingElement = ({
                                           className,
                                           refresh,
                                         }: OrdersItemPricingElementListProps) => {
  const summary = [
    '#',
    '条件レート値',
    '条件レート<br />価格単位',
    '条件レート<br />スケール数量',
    '条件通貨',
    '条件数量',
    '条件金額',
    '条件タイプ',
  ];

  const list  = useAppSelector(state => state.ordersItemPricingElement) as {
    [OrdersTablesEnum.ordersItemPricingElement]: OrdersItemPricingElementProps,
  };

  if (!list[OrdersTablesEnum.ordersItemPricingElement]) { return <div></div> }

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
            <div>オーダー: {list[OrdersTablesEnum.ordersItemPricingElement].OrderID}</div>
            <div>買い手: {list[OrdersTablesEnum.ordersItemPricingElement].BuyerName}</div>
            <div>売り手: {list[OrdersTablesEnum.ordersItemPricingElement].SellerName}</div>
            <div>納入日付/時刻: {list[OrdersTablesEnum.ordersItemPricingElement].RequestedDeliveryDate} {list[OrdersTablesEnum.ordersItemPricingElement].RequestedDeliveryTime}</div>
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
                list[OrdersTablesEnum.ordersItemPricingElement].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  list[OrdersTablesEnum.ordersItemPricingElement].Images?.Product?.BusinessPartnerID.toString(),
                  list[OrdersTablesEnum.ordersItemPricingElement].Images?.Product,
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
            <div>オーダー明細: {list[OrdersTablesEnum.ordersItemPricingElement].OrderItem}</div>
            <div>テキスト: {
              list[OrdersTablesEnum.ordersItemPricingElement].UserType === 'buyer' ?
              list[OrdersTablesEnum.ordersItemPricingElement].OrderItemTextByBuyer : list[OrdersTablesEnum.ordersItemPricingElement].OrderItemTextBySeller
            }</div>
            <div className={'flex justify-start items-center'}>
              <div>数量: <span
                style={{
                  fontSize: rem(24),
                }}
              >{list[OrdersTablesEnum.ordersItemPricingElement].OrderQuantityInDeliveryUnit}</span></div>
              <div
                style={{
                  marginLeft: rem(10),
                }}
              >入出荷単位: <span
                style={{
                  fontSize: rem(24),
                }}
              >{list[OrdersTablesEnum.ordersItemPricingElement].DeliveryUnit}</span></div>
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
                  `${list[OrdersTablesEnum.ordersItemPricingElement].OrderID}/` +
                  `${list[OrdersTablesEnum.ordersItemPricingElement].OrderItem}/` +
                  `${list[OrdersTablesEnum.ordersItemPricingElement].UserType}`
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
          list={list[OrdersTablesEnum.ordersItemPricingElement].ItemPricingElement}
        />
      </ListSection>
    </ListElement>
  );
};
