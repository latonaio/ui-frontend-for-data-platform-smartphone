import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InspectionLotSingleUnit as Content } from '@/components/Content';
import {
  AuthedUser,
  InspectionLotTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { inspectionLotCache } from '@/services/cacheDatabase/inspectionLot';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/inspection-lot/single-unit';

interface PageProps {
  inspectionLot: number;
}

const InspectionLotSingleUnit: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    inspectionLot: number,
    pagination?: any,
  ) => {
    const detail = await inspectionLotCache.getInspectionLotSingleUnit(
      inspectionLot,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [InspectionLotTablesEnum.inspectionLotSingleUnit]: {
          ...detail,
          Pagination: pagination,
        },
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

    const updateResult = await inspectionLotCache.updateInspectionLotSingleUnit({
      inspectionLot,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      inspectionLot,
      updateResult.pagination,
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
        pageName={'Cockpit'}
        className={'text-2xl'}
        color={`inspectionLot`}
        headerContentNext={`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
          `singleUnit/` +
          `${data.inspectionLot}/`}
      />
      <Main className={'Main'}>
        <Content />
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

export default InspectionLotSingleUnit;
