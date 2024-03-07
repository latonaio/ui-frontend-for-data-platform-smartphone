import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InspectionLotSpecDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  InspectionLotTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { inspectionLotCache } from '@/services/cacheDatabase/inspectionLot';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/inspection-lot/spec-detail';

interface PageProps {
  inspectionLot: number;
}

export type onUpdateItem = (
  value: any,
  index: number,
  itemType: string,
  params: any,
  listType: string,
  apiType?: string,
) => void;

const InspectionLotSpecDetail: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    inspectionLot: number,
  ) => {
    const detail = await inspectionLotCache.getInspectionLotSpecDetail(
      inspectionLot,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [InspectionLotTablesEnum.inspectionLotSpecDetail]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    inspectionLot: number,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      inspectionLot,
    );

    await inspectionLotCache.updateInspectionLotSpecDetail({
      inspectionLot,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      inspectionLot,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.inspectionLot,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`品質検査ロット`}
        pageName={'仕様詳細一覧'}
        className={'text-2xl'}
        color={`inspectionLot`}
        headerContentNext={`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
          `singleUnit/` +
          `${data.inspectionLot}/`}
      />
      <Main className={'Main'}>
        <Content
          refresh={() => {
            initLoadTabData(
              data.inspectionLot,
            );
          }}
        />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    inspectionLot,
  } = context.query;

  return {
    props: {
      inspectionLot: Number(inspectionLot),
    }
  }
}

export default InspectionLotSpecDetail;
