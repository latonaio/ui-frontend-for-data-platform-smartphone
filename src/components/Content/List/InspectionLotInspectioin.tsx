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
  InspectionLotInspection,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { Refresh } from '@/components/Refresh';

export interface InspectionLotInspectionListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  inspectionLot: number;
  list: InspectionLotInspection[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  inspectionLot,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = InspectionLotTablesEnum.inspectionLotInspection;
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.inspectionLotInspection) as {
    [InspectionLotTablesEnum.inspectionLotInspection]: any,
  };

  const trStyleList: any = [
    rem(10),
    `15%`,
    `12%`,
    `12%`,
    `12%`,
    `12%`,
    `12%`,
    `12%`,
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
            <td>{item.InspectionType}</td>
            <td>{item.InspectionTypeValueUnit}</td>
            <td>{item.InspectionTypePlannedValue}</td>
            <td>{item.InspectionTypeCertificateType}</td>
            <td>{item.InspectionTypeCertificateValueInText}</td>
            <td>{item.InspectionTypeCertificateValueInQuantity}</td>
            <td>{item.InspectionLotInspectionText}</td>
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

export const InspectionLotInspectionList = ({
                                           className,
                                           refresh,
                                         }: InspectionLotInspectionListProps) => {
  const summary = [
    '#',
    '品質検査<br />タイプ',
    '品質検査タイプ値単位',
    '品質検査タイプ計画値',
    '品質検査タイプ認証タイプ',
    '試験タイプ認証値',
    '試験タイプ認証値<br />テキスト',
    '品質検査ロット<br />品質検査テキスト',
  ];

  const list = useAppSelector(state => state.inspectionLotInspection) as {
    [InspectionLotTablesEnum.inspectionLotInspection]: any,
  };

  if (!list[InspectionLotTablesEnum.inspectionLotInspection]) {
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
              imageName={'inspectionLotInspectionImage001'}
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
              品質検査ロット: {list[InspectionLotTablesEnum.inspectionLotInspection].InspectionLot}
            </div>
            <div>
              プラント: {list[InspectionLotTablesEnum.inspectionLotInspection].InspectionPlantName}
            </div>
            <div className={'flex justify-between items-center'}>
              <div>
                <div>
                  <span>品目規格: {list[InspectionLotTablesEnum.inspectionLotInspection].ProductSpecification}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>ロット日付: {list[InspectionLotTablesEnum.inspectionLotInspection].InspectionLotDate}</span>
                </div>
                <div>
                  <span>品目: {list[InspectionLotTablesEnum.inspectionLotInspection].Product}</span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>製造指図/明細: {list[InspectionLotTablesEnum.inspectionLotInspection].ProductionOrder} / {list[InspectionLotTablesEnum.inspectionLotInspection].ProductionOrderItem}</span>
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
                      `${list[InspectionLotTablesEnum.inspectionLotInspection].InspectionLot}`
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
          inspectionLot={list[InspectionLotTablesEnum.inspectionLotInspection].InspectionLot}
          list={list[InspectionLotTablesEnum.inspectionLotInspection].Inspection}
        />
      </ListSection>
    </ListElement>
  );
};
