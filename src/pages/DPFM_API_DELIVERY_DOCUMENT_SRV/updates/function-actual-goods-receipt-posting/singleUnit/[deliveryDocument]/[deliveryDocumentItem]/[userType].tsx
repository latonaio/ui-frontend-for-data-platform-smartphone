import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DeliveryDocumentFunctionActualGoodsReceiptPosting as Content } from '@/components/Content';
import {
  AuthedUser,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '@/store/hooks';

interface PageProps {
  deliveryDocument: number;
  deliveryDocumentItem: number;
  userType: string;
}

const DeliveryDocumentFunctionActualGoodsReceiptPosting: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const [createDeliveryDocumentResponse, setCreateDeliveryDocumentResponse] =
    useState({
      deliveryDocument: null,
      deliveryDocumentItem: 1, // default Page transition order item number 1
    });

  const [isCreating, setIsCreating] = useState(false);

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
        pageName={'入出荷更新'}
        className={'text-2xl'}
        color={`${data.userType === 'deliverFromParty' ? 'deliveryFromParty' : 'deliveryToParty'}`}
        headerContentNext={`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
          `singleUnit/` +
          `${createDeliveryDocumentResponse.deliveryDocument}/` +
          `${createDeliveryDocumentResponse.deliveryDocumentItem}/` +
          `${data.userType}/`}
      />
      <Main className={'Main'}>
        <Content
          deliveryDocument={data.deliveryDocument}
          deliveryDocumentItem={data.deliveryDocumentItem}
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

export default DeliveryDocumentFunctionActualGoodsReceiptPosting;
