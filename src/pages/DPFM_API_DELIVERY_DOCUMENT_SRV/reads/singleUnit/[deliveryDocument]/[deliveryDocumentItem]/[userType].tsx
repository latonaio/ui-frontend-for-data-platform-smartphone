import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeliveryDocumentSingleUnit as Content } from '@/components/Content';
import {
  AuthedUser,
  DeliveryDocumentTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { deliveryDocumentCache } from '@/services/cacheDatabase/deliveryDocument';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/delivery-document/single-unit';

interface PageProps {
  deliveryDocument: number;
  deliveryDocumentItem: number;
  userType: string;
}

export type onUpdateItem = (
  value: any,
  index: number,
  itemType: string,
  params: any,
  listType: string,
  apiType?: string,
) => void;

const DeliverDocumentSingleUnit: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    deliveryDocument: number,
    deliveryDocumentItem: number,
    pagination?: any,
  ) => {
    const detail = await deliveryDocumentCache.getDeliveryDocumentSingleUnit(
      deliveryDocument,
      deliveryDocumentItem,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit]: {
          ...detail,
          Pagination: pagination,
        },
      }));
    }
  }

  const initLoadTabData = async (
    deliveryDocument: number,
    deliveryDocumentItem: number,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      deliveryDocument,
      deliveryDocumentItem,
    );

    const updateResult = await deliveryDocumentCache.updateDeliveryDocumentSingleUnit({
      deliveryDocument,
      deliveryDocumentItem,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      deliveryDocument,
      deliveryDocumentItem,
      updateResult.pagination,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.deliveryDocument,
      data.deliveryDocumentItem,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`${data.userType === 'deliverFromParty' ? '出荷' : '入荷'}`}
        pageName={'Cockpit'}
        className={'text-2xl'}
        color={`${data.userType === 'deliverFromParty' ? 'deliveryFromParty' : 'deliveryToParty'}`}
        headerContentNext={`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
          `singleUnit/` +
          `${data.deliveryDocument}/` +
          `${data.deliveryDocumentItem}/` +
          `${data.userType}/`}
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
    deliveryDocument,
    deliveryDocumentItem,
    userType
  } = context.query;

  return {
    props: {
      deliveryDocument: Number(deliveryDocument),
      deliveryDocumentItem: Number(deliveryDocumentItem),
      userType,
    }
  }
}

export default DeliverDocumentSingleUnit;
