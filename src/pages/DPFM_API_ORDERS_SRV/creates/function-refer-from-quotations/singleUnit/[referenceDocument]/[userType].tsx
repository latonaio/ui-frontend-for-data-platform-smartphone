import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrdersFunctionReferFromQuotations as Content } from '@/components/Content';
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
import { reads, updates } from '@/api/orders/item';

interface PageProps {
  referenceDocument: number;
  userType: string;
}

const OrdersFunctionReferFromQuotations: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [createOrderResponse, setCreateOrderResponse] =
    useState({
      orderId: null,
      orderItem: 1, // default Page transition order item number 1
    });

  const [isCreating, setIsCreating] = useState(false);

  const initLoadTabData = async (
    referenceDocument: number,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');
  };

  useEffect(() => {
    initLoadTabData(
      data.referenceDocument,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`見積参照登録`}
        pageName={'Cockpit'}
        className={'text-2xl'}
        color={`${data.userType === 'buyer' ? 'pink' : 'purple'}`}
        headerContentNext={`/DPFM_API_ORDERS_SRV/reads/` +
          `singleUnit/` +
          `${createOrderResponse.orderId}/` +
          `${createOrderResponse.orderItem}/` +
          `${data.userType}/`}
      />
      <Main className={'Main'}>
        <Content
          referenceDocument={data.referenceDocument}
          userType={data.userType}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
        />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    referenceDocument,
    userType
  } = context.query;

  return {
    props: {
      referenceDocument: Number(referenceDocument),
      userType,
    }
  }
}

export default OrdersFunctionReferFromQuotations;
