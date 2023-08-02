import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductionOrderDetail as Content } from '@/components/Content';
import { getLocalStorage } from '@/helpers/common';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailProps,
  UserTypeEnum,
} from '@/constants';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/production-order/detail';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';

interface PageProps {
  productionOrder: number;
  productionOrderItem: number;
  product: string;
  userType: UserTypeEnum;
}

export interface formData {
  editList: any;
  [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps | null;
}

export enum ActiveMenuTab {
  configurationItem = 'configurationItem',
  productionOrder = 'productionOrder',
}

const ProductionOrderDetail: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    productionOrder: number,
    productionOrderItem: number,
    userType: string,
    product: string,
  ) => {
    const detail = await productionOrderCache.getProductionOrderDetail(
      productionOrder,
      productionOrderItem,
      product,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [ProductionOrderTablesEnum.productionOrderDetail]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    productionOrder: number,
    productionOrderItem: number,
    product: string,
    userType: UserTypeEnum,
  ) => {
    dispatch(setLoading({ isOpen: true }));

    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    await setFormDataForPage(
      productionOrder,
      productionOrderItem,
      userType,
      product,
    );

    await productionOrderCache.updateProductionOrderDetail({
      productionOrder,
      productionOrderItem,
      userType,
      product,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionOrder,
      productionOrderItem,
      userType,
      product,
    );

    dispatch(setLoading({ isOpen: false }));
  }

  useEffect(() => {
    initLoadTabData(
      data.productionOrder,
      data.productionOrderItem,
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'トップ'} className={'text-2xl'} />
      <Main className={'Main'}>
        <Content />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    productionOrder,
    productionOrderItem,
    product,
    userType
  } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      productionOrderItem: Number(productionOrderItem),
      product,
      userType,
    }
  }
}

export default ProductionOrderDetail;
