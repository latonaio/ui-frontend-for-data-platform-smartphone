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
  InspectionLotTablesEnum,
  InspectionLotSpecDetail,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { Refresh } from '@/components/Refresh';

export interface InspectionLotSpecDetailListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  inspectionLot: number;
  list: InspectionLotSpecDetail[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  inspectionLot,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = InspectionLotTablesEnum.inspectionLotSpecDetail;
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.inspectionLotSpecDetail) as {
    [InspectionLotTablesEnum.inspectionLotSpecDetail]: any,
  };

  const trStyleList: any = [
    rem(10),
    `10%`,
    `15%`,
    null,
    null,
    null,
    null,
    null,
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
            <td className={'text-right'}>{index + 1}</td>
            <td>{item.SpecType}</td>
            <td>{item.SpecTypeText}</td>
            <td>{item.UpperLimitValue}</td>
            <td>{item.LowerLimitValue}</td>
            <td>{item.StandardValue}</td>
            <td>{item.SpecTypeUnit}</td>
            <td>{item.Formula}</td>
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

export const InspectionLotSpecDetailList = ({
                                           className,
                                           refresh,
                                         }: InspectionLotSpecDetailListProps) => {
  const summary = [
    '#',
    '仕様タイプ',
    '仕様タイプ<br />テキスト',
    '最大値',
    '最小値',
    '基準値',
    '数値<br />単位',
    '計算式',
  ];

  const list = useAppSelector(state => state.inspectionLotSpecDetail) as {
    [InspectionLotTablesEnum.inspectionLotSpecDetail]: any,
  };

  if (!list[InspectionLotTablesEnum.inspectionLotSpecDetail]) {
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
              imageName={'inspectionLotSpecDetailImage001'}
              style={{}}
            />
          </div>

          <div
            style={{
              width: `90%`,
            }}
          >
            <div>
              品質検査ロット: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].InspectionLot}
            </div>
            <div>
              プラント: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].InspectionPlantName}
            </div>
            <div className={'flex justify-between items-center'}>
              <div>
                <div>
                  <span>品目規格: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].ProductSpecification}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>ロット日付: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].InspectionLotDate}</span>
                </div>
                <div>
                  <span>品目: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].Product}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>製造指図/明細: {list[InspectionLotTablesEnum.inspectionLotSpecDetail].ProductionOrder} / {list[InspectionLotTablesEnum.inspectionLotSpecDetail].ProductionOrderItem}</span>
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
                    hrefPath={`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `singleUnit/` +
                      `${list[InspectionLotTablesEnum.inspectionLotSpecDetail].InspectionLot}`
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
          inspectionLot={list[InspectionLotTablesEnum.inspectionLotSpecDetail].InspectionLot}
          list={list[InspectionLotTablesEnum.inspectionLotSpecDetail].SpecDetail}
        />
      </ListSection>
    </ListElement>
  );
};
