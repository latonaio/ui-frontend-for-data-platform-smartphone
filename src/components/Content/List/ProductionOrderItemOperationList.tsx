import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { DetailList, DetailListTable, List as ListElement, ListHeaderInfo, ListSection } from './List.style';
import { ProductionOrderDetailHeader, ProductionOrderItemOperationItem, ProductionOrderTablesEnum } from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppSelector } from '@/store/hooks';
import {
  generateImageProductUrl,
} from '@/helpers/common';

export interface ProductionOrderDetailListProps {
  className?: string;
}

interface DetailListTableElementProps {
  summary: string[];
  list: ProductionOrderItemOperationItem[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = ProductionOrderTablesEnum.productionOrderDetailListOwnerProductionPlantBusinessPartnerItem;
  const dispatch = useDispatch();

  const renderList = (list: ProductionOrderItemOperationItem[]) => {
    if (list && list.length > 0) {
      return list.map((item, index) => {
        return (
          <tr key={index} className={`record`} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            clickHandler(
              `/DPFM_API_PRODUCTION_ORDER_SRV/reads/itemOperation/input/${item.ProductionOrder}/${item.ProductionOrderItem}/${item.Operations}/${item.OperationsItem}/userType`,
              router
            );
          }}>
            <td>{item.OperationsItem}</td>
            <td>{item.OperationText}</td>
            <td></td>
            <td></td>
            <td>{item.SellerName}</td>
            <td></td>
            <td>
              <i className={`${!item.IsConfirmed ? 'hidden' : ''} icon-checkmark`} />
            </td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={7}>テーブルに対象のレコードが存在しません。</td>
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

export const ProductionOrderItemOperationList = ({
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

  const list  = useAppSelector(state => state.productionOrderItemOperationList) as {
    [ProductionOrderTablesEnum.productionOrderDetailHeader]: ProductionOrderDetailHeader,
    [ProductionOrderTablesEnum.productionOrderItemOperationList]: ProductionOrderItemOperationItem[],
  };

  if (!list[ProductionOrderTablesEnum.productionOrderDetailHeader]) { return <div></div> }
  if (!list[ProductionOrderTablesEnum.productionOrderItemOperationList]) { return <div></div> }

  return (
    <ListElement className={clsx(
      `List`,
      className
    )}>
      <ListSection>
        <ListHeaderInfo>
          <div className={'columnLeft'}>
            <img
              src={list[ProductionOrderTablesEnum.productionOrderDetailHeader].Images &&
                generateImageProductUrl(
                  list[ProductionOrderTablesEnum.productionOrderDetailHeader].Images.Product.BusinessPartnerID.toString(),
                  list[ProductionOrderTablesEnum.productionOrderDetailHeader].Images.Product,
                )}
              alt={``}
            />
          </div>
          <div className={'columnRight'}>
            <div>
              <span>製造指図: {list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrder}</span>
              <span style={{
                marginLeft: rem(10)
              }}
              >明細: {list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderItem}</span>
              <span style={{
                marginLeft: rem(10)
              }}>計画開始日付/時刻: <span style={{
                fontSize: rem(10)
              }}>{list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderPlannedStartDate} / {list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderPlannedStartTime}</span></span>
              <span style={{
                marginLeft: rem(10)
              }}>計画終了日付/時刻: <span style={{
                fontSize: rem(10)
              }}>{list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderPlannedEndDate} / {list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderPlannedEndTime}</span></span>
            </div>
            <div>
              <span>オーナーBP: {list[ProductionOrderTablesEnum.productionOrderDetailHeader].OwnerProductionPlantBusinessPartnerName}</span>
              <span style={{
                marginLeft: rem(10)
              }}>オーナープラント: {list[ProductionOrderTablesEnum.productionOrderDetailHeader].OwnerProductionPlantName}</span>
            </div>
            <div className={'flex justify-between items-center'}>
              <div className={'flex justify-end items-center'}>
                <div>
                  <span>計画製造数量(基): <span style={{
                    fontSize: rem(16)
                  }}>{list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderQuantityInBaseUnit}</span></span>
                </div>
                <div style={{
                  marginLeft: rem(10)
                }}>
                  <span>計画製造数量(製): <span style={{
                    fontSize: rem(16)
                  }}>{list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderQuantityInDestinationProductionUnit}</span></span>
                </div>
              </div>
              <div className={'m-0'}>
                <BackButton
                  className={'whiteInfo'}
                  style={{
                    marginRight: rem(10),
                  }}
                  hrefPath={`/DPFM_API_PRODUCTION_ORDER_SRV/reads/` +
                    `ItemDoc/` +
                    `${list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrder}/` +
                    `${list[ProductionOrderTablesEnum.productionOrderDetailHeader].ProductionOrderItem}/` +
                    `userType`
                }
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
          list={list[ProductionOrderTablesEnum.productionOrderItemOperationList]}
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
