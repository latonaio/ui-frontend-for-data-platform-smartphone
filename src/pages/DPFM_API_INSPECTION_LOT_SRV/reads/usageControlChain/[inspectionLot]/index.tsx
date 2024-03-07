import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { InspectionLotUsageControlChain as Content } from '@/components/Content';
import {
  AuthedUser,
  InspectionLotTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { inspectionLotCache } from '@/services/cacheDatabase/inspectionLot';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/inspection-lot/usage-control-chain';
import { reads } from '@/api/inspectionLot/single-unit';

interface PageProps {
  inspectionLot: number;
}

const InspectionLotUsageControlChain: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [isUsageControlOpenFlag, setIsUsageControlOpenFlag] = useState(false);

  const setFormDataForPage = async (
    inspectionLot: number,
    pagination?: any,
  ) => {
    const detail = await inspectionLotCache.getInspectionLotUsageControlChain(
      inspectionLot,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [InspectionLotTablesEnum.inspectionLotUsageControlChain]: {
          ...detail,
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

    const response = await reads({
      inspectionLot: inspectionLot,
      language: language,
      businessPartner: businessPartner,
      userId: emailAddress,
    });

    let usageControlChain = '';

    if (response.InspectionLotSingleUnit && response.InspectionLotSingleUnit.length > 0) {
      usageControlChain = response.InspectionLotSingleUnit[0].UsageControlChain;
    }

    let certificateAuthorityChain = '';

    if (response.InspectionLotSingleUnit && response.InspectionLotSingleUnit.length > 0) {
      certificateAuthorityChain = response.InspectionLotSingleUnit[0].CertificateAuthorityChain;
    }

    const updateResult = await inspectionLotCache.updateInspectionLotUsageControlChain({
      inspectionLot,
      usageControlChain,
      certificateAuthorityChain,
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
        pageName={'ﾃﾞｰﾀ証明書'}
        className={'text-2xl'}
        color={`inspectionLot`}
        headerContentNext={`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
          `singleUnit/` +
          `${data.inspectionLot}/`}
      />
      <Main className={'Main'}>
        <Content
          isUsageControlOpenFlag={isUsageControlOpenFlag}
          setIsUsageControlOpenFlag={setIsUsageControlOpenFlag}
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

export default InspectionLotUsageControlChain;
