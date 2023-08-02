import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import {
  List as ListElement,
  DetailList,
  DetailListTable,
  ListHeaderInfoTop,
  ListHeaderInfoBottom,
  ListHeaderInfo,
  ListSection,
} from './List.style';
import {
  DeliveryDocumentTablesEnum,
  ProductionOrderDetailHeader,
  ProductionOrderDetailListItem,
  ProductionOrderTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton, Checkbox, GreenButton, BlueButton } from '@/components/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  formData, onUpdateItem,
} from '@/pages/production-order/operation/[userType]/[productionOrder]';
import { texts } from '@/constants/message';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { generateImageProductUrl } from '@/helpers/common';
import { rem } from 'polished';

export interface ProductionOrderDetailListProps {
  className?: string;
}

interface DetailListTableElementProps {
  summary: string[];
  list: ProductionOrderDetailListItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionOrderDetailListItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record ${item.IsCancelled ? 'disabled' : ''} ${item.IsActive ? 'active' : ''}`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              // `/production-order/detail/${productionOrder}/${item.ProductionOrderItem}/${userType}/${item.Product}`,
              ``,
              router
            );
          }}>
            <td>{item.ProductionOrderItem}</td>
            <td>{item.OrderItemTextBySeller}</td>
            <td>X</td>
            <td>{item.TotalQuantity}</td>
            <td>九州たまご製造</td>
            <td></td>
            <td></td>
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
        {summaryHead(summary)}
        {renderList(list)}
        </tbody>
      </DetailListTable>
    </DetailList>
  );
};

export const ProductionOrderDetailList = ({
                                            className,
                                          }: ProductionOrderDetailListProps) => {
  const summary = [
    '作業<br />番号',
    '作業テキスト',
    '構成品目<br />消費',
    '構成品目<br />出荷',
    '外注業者<br />(Seller)',
    '入荷',
    '作業完了<br />確認',
  ];

  const header = {
    [ProductionOrderTablesEnum.productionOrderDetail]: {
      Images: {
        Product: '',
      }
    }
  };

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <ListSection>
        <ListHeaderInfo>
          <div className={'columnLeft'}>
            {/*<img*/}
            {/*  src={header[ProductionOrderTablesEnum.productionOrderDetail] &&*/}
            {/*    generateImageProductUrl(*/}
            {/*      header[ProductionOrderTablesEnum.productionOrderDetail].Images.Product.BusinessPartnerID.toString(),*/}
            {/*      header[ProductionOrderTablesEnum.productionOrderDetail].Images.Product,*/}
            {/*    )}*/}
            {/*  alt={``}*/}
            {/*/>*/}
            <img alt="" src="http://34.209.222.142:30000/doc/201/642be1c5d070b605cb250ac9534f6a0ab210e8fd9253a4e8a0a756ee7c589143.jpg"></img>
          </div>
          <div className={'columnRight'}>
            <div>
              <span>製造指図番号: 794939</span>
              <span style={{
                marginLeft: rem(10)
              }}>計画開始日付/時刻: <span style={{
                fontSize: rem(10)
              }}>2023-07-24 / 11:20:00</span></span>
              <span style={{
                marginLeft: rem(10)
              }}>計画終了日付/時刻: <span style={{
                fontSize: rem(10)
              }}>2023-07-24 / 14:30:00</span></span>
            </div>
            <div>
              <span>オーナーBP: 山崎製パン</span>
              <span style={{
                marginLeft: rem(10)
              }}>オーナープラント: 松戸第二工場</span>
            </div>
            <div className={'flex justify-between items-center'}>
              <div className={'flex justify-end items-center'}>
                <div>
                  <span>計画製造数量(基): <span style={{
                    fontSize: rem(16)
                  }}>3,000</span></span>
                </div>
                <div style={{
                  marginLeft: rem(10)
                }}>
                  <span>計画製造数量(製): <span style={{
                    fontSize: rem(16)
                  }}>6,000</span></span>
                </div>
              </div>
              <div className={'m-0'}>
                <BackButton
                  className={'whiteInfo'}
                  style={{
                    marginRight: rem(10),
                  }}
                >Cockpit</BackButton>
                <BackButton className={'whiteInfo'}>その他の情報</BackButton>
              </div>
            </div>
          </div>
        </ListHeaderInfo>
      </ListSection>

      <ListSection>
        <DetailListTableElement
          summary={summary}
          list={[
            {
              "ProductionOrder": 1,
              "ProductionOrderItem": 1,
              "Product": "A3750",
              "ProductName": "",
              "OrderItemTextBySeller": "たまご作成",
              "TotalQuantity": 1,
              "ConfirmedYieldQuantity": 1,
              "ItemIsConfirmed": false,
              "ItemIsPartiallyConfirmed": false,
              "ItemIsReleased": false,
              "IsCancelled": false,
              "MRPArea": "",
              "IsActive": true,
            },
            {
              "ProductionOrder": 1,
              "ProductionOrderItem": 2,
              "Product": "A3750",
              "ProductName": "",
              "OrderItemTextBySeller": "パン成形",
              "TotalQuantity": 1,
              "ConfirmedYieldQuantity": 1,
              "ItemIsConfirmed": false,
              "ItemIsPartiallyConfirmed": false,
              "ItemIsReleased": false,
              "IsCancelled": false,
              "MRPArea": ""
            },
            {
              "ProductionOrder": 1,
              "ProductionOrderItem": 3,
              "Product": "A3750",
              "ProductName": "",
              "OrderItemTextBySeller": "中身封入",
              "TotalQuantity": 1,
              "ConfirmedYieldQuantity": 1,
              "ItemIsConfirmed": false,
              "ItemIsPartiallyConfirmed": false,
              "ItemIsReleased": false,
              "IsCancelled": false,
              "MRPArea": ""
            }
          ]}
        />
      </ListSection>

      {/*<DetailListTableElement*/}
      {/*  userType={userType}*/}
      {/*  summary={summary}*/}
      {/*  productionOrder={productionOrder}*/}
      {/*  businessPartner={data.businessPartner}*/}
      {/*  list={formData[ProductionOrderTablesEnum.productionOrderDetailList] || []}*/}
      {/*  formData={formData}*/}
      {/*  onUpdateItem={onUpdateItem}*/}
      {/*/>*/}
    </ListElement>
  );
};
