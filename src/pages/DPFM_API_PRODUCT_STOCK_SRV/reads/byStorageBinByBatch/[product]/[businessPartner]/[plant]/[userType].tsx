import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductStockByStorageBinByBatch as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductStockTablesEnum, UserTypeEnum,
} from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { productStockCache } from '@/services/cacheDatabase/productStock';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/product-stock/by-storage-bin-by-batch';

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

  const displayType = {
    FIFO: 'FIFO',
    LIFO: 'LIFO',
  };

  const [display, setDisplay] = useState(displayType.FIFO);

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
    const detail = await productStockCache.getProductStockByStorageBinByBatch(
      product,
      businessPartner,
      plant,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [ProductStockTablesEnum.productStockByStorageBinByBatch]: detail,
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
      businessPartnerAsParam,
      plant,
      userType,
    );

    await productStockCache.updateProductStockByStorageBinByBatch({
      product,
      businessPartnerAsParam,
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
        <Content
          display={display}
          setDisplay={setDisplay}
        />
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
