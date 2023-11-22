import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductSingleUnit as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { productCache } from '@/services/cacheDatabase/product';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/product/single-unit';

interface PageProps {
  product: string;
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

const ProductSingleUnit: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    product: string,
  ) => {
    const detail = await productCache.getProductSingleUnit(
      product,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [ProductTablesEnum.productSingleUnit]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    product: string,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      product,
    );

    await productCache.updateProductSingleUnit({
      product,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      product,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.product,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={'品目'}
        pageName={''}
        className={'text-2xl'}
        color={'gray'}
        headerContentNext={`/DPFM_API_PRODUCT_MASTER_SRV/reads/` +
          `doc/` +
          `${data.product}/` +
          'seller'}
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
    product,
    userType
  } = context.query;

  return {
    props: {
      product: product,
      userType,
    }
  }
}

export default ProductSingleUnit;
