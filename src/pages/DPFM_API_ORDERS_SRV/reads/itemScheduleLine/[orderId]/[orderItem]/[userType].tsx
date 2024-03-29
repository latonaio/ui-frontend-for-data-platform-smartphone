import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrdersItemScheduleLine as Content } from '@/components/Content';
import {
  AuthedUser,
  OrdersTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/orders/item-schedule-line';

interface PageProps {
  orderId: number;
  orderItem: number;
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

const OrdersItemScheduleLine: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    orderId: number,
    orderItem: number,
  ) => {
    const detail = await ordersCache.getOrdersItemScheduleLine(
      orderId,
      orderItem,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [OrdersTablesEnum.ordersItemScheduleLine]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    orderId: number,
    orderItem: number,
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
      orderItem,
    );

    await ordersCache.updateOrdersItemScheduleLine({
      orderId,
      orderItem,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      orderId,
      orderItem,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.orderId,
      data.orderItem,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`${data.userType === 'buyer' ? '発注' : '受注'}`}
        pageName={'納入日程行'}
        className={'text-2xl'}
        color={`${data.userType === 'buyer' ? 'pink' : 'purple'}`}
        headerContentNext={`/DPFM_API_ORDERS_SRV/reads/` +
          `singleUnit/` +
          `${data.orderId}/` +
          `${data.orderItem}/` +
          `${data.userType}/`}
      />
      <Main className={'Main'}>
        <Content
          refresh={() => {
            initLoadTabData(
              data.orderId,
              data.orderItem,
              data.userType,
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
    orderId,
    orderItem,
    userType
  } = context.query;

  return {
    props: {
      orderId: Number(orderId),
      orderItem: Number(orderItem),
      userType,
    }
  }
}

export default OrdersItemScheduleLine;
