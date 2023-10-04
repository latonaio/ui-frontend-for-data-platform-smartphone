import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductionOrderInput as Content } from '@/components/Content';
import { AuthedUser, ProductionOrderDetailListItem, ProductionOrderTablesEnum } from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/production-order/item-operation/input';

interface PageProps {
  productionOrder: number;
  productionOrderItem: number;
  operations: number;
  operationsItem: number;
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

export interface editList {
}

export interface formData {
  [ProductionOrderTablesEnum.productionOrderDetailList]:
    ProductionOrderDetailListItem[];
  editList: any;
}

const ProductionOrderItemOperationInput: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetailList]: [],
  });
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (
    productionOrder: number,
    productionOrderItem: number,
    userType: string,
  ) => {
    const detail = await productionOrderCache.getProductionOrderItemOperationInput(
      productionOrder,
      productionOrderItem,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [ProductionOrderTablesEnum.productionOrderItemOperationInput]: detail,
      }));
    }
  }

  const initLoadTabData = async (
    productionOrder: number,
    productionOrderItem: number,
    operations: number,
    operationsItem: number,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionOrder,
      productionOrderItem,
      userType,
    );

    await productionOrderCache.updateProductionOrderItemOperationInput({
      productionOrder,
      productionOrderItem,
      operations,
      operationsItem,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionOrder,
      productionOrderItem,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.productionOrder,
      data.productionOrderItem,
      data.operations,
      data.operationsItem,
      data.userType,
      );
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={'製造指図'}
        pageName={'作業入力'}
        className={'text-2xl'}
        headerContentNext={`/DPFM_API_PRODUCTION_ORDER_SRV/reads/` +
          `itemDoc/` +
          `${data.productionOrder}/` +
          `${data.productionOrderItem}/` +
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
    productionOrder,
    productionOrderItem,
    operations,
    operationsItem,
    userType
  } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      productionOrderItem: Number(productionOrderItem),
      operations: Number(operations),
      operationsItem: Number(operationsItem),
      userType,
    }
  }
}

export default ProductionOrderItemOperationInput;
