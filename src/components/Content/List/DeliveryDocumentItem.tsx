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
  DeliveryDocumentItemProps,
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

export interface DeliveryDocumentItemListProps {
  className?: string;
}

interface DetailListTableElementProps {
  summary: string[];
  list: DeliveryDocumentItem[];
  userType: string;
}

const DetailListTableElement = ({
                                  summary,
                                  list,
  userType,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = DeliveryDocumentTablesEnum.deliveryDocumentItem;
  const dispatch = useDispatch();

  const trStyleList: any = [
    rem(10),
    `10%`,
    `10%`,
    `20%`,
    `5%`,
    `5%`,
    null,
    null,
    `5%`,
    `5%`,
  ];

  const renderList = (list: DeliveryDocumentItem[]) => {
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
            <td>{item.DeliveryDocumentItem}</td>
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
            <td>{item.DeliveryDocumentItemText}</td>
            <td
              style={{
                fontSize: rem(24),
              }}
            >{item.PlannedGoodsIssueQuantity}</td>
            <td>{item.DeliveryUnit}</td>
            <td>{item.PlannedGoodsIssueDate} / {item.PlannedGoodsIssueTime}</td>
            <td>{item.PlannedGoodsReceiptDate} / {item.PlannedGoodsReceiptTime}</td>
            <td></td>
            <td></td>
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
                                                 }: DeliveryDocumentItemListProps) => {
  const summary = [
    '#',
    '画像',
    '品目',
    '明細テキスト',
    '予定数量',
    '入出荷数量単位',
    '出荷予定日 / 時刻',
    '入荷予定日 / 時刻',
    'ピッキング',
    '出荷',
  ];

  const list  = useAppSelector(state => state.deliveryDocumentItem) as {
    [DeliveryDocumentTablesEnum.deliveryDocumentItem]: DeliveryDocumentItemProps,
  };

  if (!list[DeliveryDocumentTablesEnum.deliveryDocumentItem]) { return <div></div> }

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
                  }}>{list[DeliveryDocumentTablesEnum.deliveryDocumentItem].HeaderGrossWeight.toLocaleString()}</span>
                  </div>
                  <div style={{
                    marginLeft: rem(10),
                  }}>
                    <span>正味重量: </span><span style={{
                    fontSize: rem(24),
                  }}>{list[DeliveryDocumentTablesEnum.deliveryDocumentItem].HeaderNetWeight.toLocaleString()}</span>
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

      <ListSection>
        <DetailListTableElement
          summary={summary}
          list={list[DeliveryDocumentTablesEnum.deliveryDocumentItem].Item}
          userType={list[DeliveryDocumentTablesEnum.deliveryDocumentItem].UserType}
        />
      </ListSection>
    </ListElement>
  );
};
