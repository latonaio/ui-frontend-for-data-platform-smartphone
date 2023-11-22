import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductSingleUnit as Content } from '@/components/Content';
import {
  AuthedUser,
  OrdersTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/orders/single-unit';

interface PageProps {
  orderId: string;
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

const OrdersSingleUnit: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    orderId: string,
  ) => {
    const detail = await ordersCache.getOrdersSingleUnit(
      orderId,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [OrdersTablesEnum.ordersSingleUnit]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    orderId: string,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      orderId,
    );

    await ordersCache.updateOrdersSingleUnit({
      orderId,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      orderId,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.orderId,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`${data.userType === 'seller' ? '受注' : '発注'}`}
        pageName={''}
        className={'text-2xl'}
        color={'gray'}
        headerContentNext={`/DPFM_API_ORDERS_SRV/reads/` +
          `doc/` +
          `${data.orderId}/` +
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
    orderId,
    userType
  } = context.query;

  return {
    props: {
      orderId: orderId,
      userType,
    }
  }
}

export default OrdersSingleUnit;
