import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductStockSingleUnit as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductStockTablesEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { productStockCache } from '@/services/cacheDatabase/productStock';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/product-stock/single-unit';

interface PageProps {
  product: string;
  businessPartner: number;
  plant: string;
  // supplyChainRelationshipID: number;
  // supplyChainRelationshipDeliveryID: number;
  // supplyChainRelationshipDeliveryPlantID: number;
  // buyer: number;
  // seller: number;
  // deliverToParty: number;
  // deliverFromParty: number;
  // deliverToPlant: string;
  // deliverFromPlant: string;
  // inventoryStockType: string;
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

const ProductStockSingleUnit: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    product: string,
    businessPartner: number,
    plant: string,
    // supplyChainRelationshipID: number,
    // supplyChainRelationshipDeliveryID: number,
    // supplyChainRelationshipDeliveryPlantID: number,
    // buyer: number,
    // seller: number,
    // deliverToParty: number,
    // deliverFromParty: number,
    // deliverToPlant: string,
    // deliverFromPlant: string,
    // inventoryStockType: string,
    userType: string,
  ) => {
    const detail = await productStockCache.getProductStockSingleUnit(
      product,
      businessPartner,
      plant,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [ProductStockTablesEnum.productStockSingleUnit]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    product: string,
    businessPartnerAsParam: number,
    plant: string,
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
      businessPartner,
      plant,
      userType,
    );

    await productStockCache.updateProductStockSingleUnit({
      product,
      plant,
      businessPartner,
      language,
      emailAddress,
      userType,
    });

    await setFormDataForPage(
      product,
      businessPartner,
      plant,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.product,
      data.businessPartner,
      data.plant,
      data.userType,
    );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={'在庫照会'}
        pageName={''}
        className={'text-2xl'}
        color={'gray'}
        headerContentNext={`/DPFM_API_PRODUCT_STOCK_SRV/reads/` +
          `doc/` +
          `${data.product}/` +
          `${data.businessPartner}/` +
          `${data.plant}/` +
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
    businessPartner,
    plant,
    userType
  } = context.query;

  return {
    props: {
      product: product,
      businessPartner: Number(businessPartner),
      plant,
      userType,
    }
  }
}

export default ProductStockSingleUnit;
