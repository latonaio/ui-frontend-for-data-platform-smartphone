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
  InspectionLotComponentComposition,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { Refresh } from '@/components/Refresh';

export interface InspectionLotComponentCompositionListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  inspectionLot: number;
  list: InspectionLotComponentComposition[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  inspectionLot,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = InspectionLotTablesEnum.inspectionLotComponentComposition;
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.inspectionLotComponentComposition) as {
    [InspectionLotTablesEnum.inspectionLotComponentComposition]: any,
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
            <td>{item.ComponentCompositionType}</td>
            <td>{item.ComponentCompositionTypeText}</td>
            <td>{item.ComponentCompositionUpperLimitInPercent}</td>
            <td>{item.ComponentCompositionLowerLimitInPercent}</td>
            <td>{item.ComponentCompositionStandardValueInPercent}</td>
          </tr>
        );
      });
    }

    return (
      <tr className={'record'}>
        <td colSpan={6}>テーブルに対象のレコードが存在しません。</td>
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

export const InspectionLotComponentCompositionList = ({
                                           className,
                                           refresh,
                                         }: InspectionLotComponentCompositionListProps) => {
  const summary = [
    '#',
    '構成物質<br />タイプ',
    '構成物質タイプ<br />テキスト',
    '最大値(%)',
    '最小値(%)',
    '標準値(%)',
  ];

  const list = useAppSelector(state => state.inspectionLotComponentComposition) as {
    [InspectionLotTablesEnum.inspectionLotComponentComposition]: any,
  };

  if (!list[InspectionLotTablesEnum.inspectionLotComponentComposition]) {
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
              imageName={'inspectionLotComponentCompositionImage001'}
              style={{}}
            />
          </div>

          <div
            style={{
              width: `90%`,
              marginLeft: rem(10),
            }}
          >
            <div>
              品質検査ロット: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].InspectionLot}
            </div>
            <div>
              プラント: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].InspectionPlantName}
            </div>
            <div className={'flex justify-between items-center'}>
              <div>
                <div>
                  <span>品目規格: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].ProductSpecification}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>ロット日付: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].InspectionLotDate}</span>
                </div>
                <div>
                  <span>品目: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].Product}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>製造指図/明細: {list[InspectionLotTablesEnum.inspectionLotComponentComposition].ProductionOrder} / {list[InspectionLotTablesEnum.inspectionLotComponentComposition].ProductionOrderItem}</span>
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
                      `${list[InspectionLotTablesEnum.inspectionLotComponentComposition].InspectionLot}`
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
          inspectionLot={list[InspectionLotTablesEnum.inspectionLotComponentComposition].InspectionLot}
          list={list[InspectionLotTablesEnum.inspectionLotComponentComposition].ComponentComposition}
        />
      </ListSection>
    </ListElement>
  );
};
