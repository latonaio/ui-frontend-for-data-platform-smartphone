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
  InspectionLotHeader,
  InspectionLotListProps,
  InspectionLotTablesEnum,
} from '@/constants';
import { clickHandler, summaryHead } from './List';
import { BackButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { Refresh } from '@/components/Refresh';
import { checkInvalid, closeItem, editItemAsync } from '@/store/slices/bill-of-material/detail-list';
import { TextField } from '@/components/Form';
import { Input, Search } from '@/components/ContentsTop/ContentsTop.style';

export interface InspectionLotListListProps {
  className?: string;
  refresh?: () => void;
}

interface DetailListTableElementProps {
  summary: string[];
  inspectionLot: number;
  list: InspectionLotListProps[];
}

const DetailListTableElement = ({
                                  summary,
                                  list,
                                  inspectionLot,
                                }: DetailListTableElementProps) => {
  const router = useRouter();
  const listType = InspectionLotTablesEnum.inspectionLotList;
  const appDispatch = useAppDispatch();
  const listState  = useAppSelector(state => state.inspectionLotList) as {
    [InspectionLotTablesEnum.inspectionLotList]: any,
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
            <td>{item.InspectionLot}</td>
            <td>{item.Product}</td>
            <td>{item.InspectionLotDate}</td>
            <td>{item.PartnerFunction}</td>
            <td>{item.BusinessPartnerName}</td>
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

export const InspectionLotListList = ({
                                           className,
                                           refresh,
                                         }: InspectionLotListListProps) => {
  const summary = [
    '#',
    '品質検査<br />ロット',
    '品目',
    'ロット日付',
    'パートナー機能',
    'ビジネスパートナ',
  ];

  const list = useAppSelector(state => state.inspectionLotList) as {
    [InspectionLotTablesEnum.inspectionLotList]: any,
  };

  if (!list[InspectionLotTablesEnum.inspectionLotList]) {
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
              imageName={'inspectionLotListImage001'}
              style={{}}
            />
          </div>

          <div
            style={{
              width: `90%`,
              marginLeft: rem(10),
            }}
          >
            <div className={'flex justify-between items-center'}>
              <div>品質検査ロット一覧を照会しています</div>
              <div>
                <div
                  style={{
                    marginBottom: rem(10),
                  }}
                >
                  <div className={`flex justify-end items-center`}>
                    <Search className='text-3xl icon-search'></Search>
                    <Input type='text' id='name' name='name' required />
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
                        `${list[InspectionLotTablesEnum.inspectionLotList].InspectionLot}`
                      }
                    >Cockpit</BackButton>
                  </div>
                  <div>
                    <BackButton className={'whiteInfo'}>その他の情報</BackButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </ListHeaderInfoFlexStart>
      </ListSection>

      <ListSection>
        <DetailListTableElement
          summary={summary}
          inspectionLot={list[InspectionLotTablesEnum.inspectionLotList].InspectionLot}
          list={list[InspectionLotTablesEnum.inspectionLotList].Partner}
        />
      </ListSection>
    </ListElement>
  );
};
