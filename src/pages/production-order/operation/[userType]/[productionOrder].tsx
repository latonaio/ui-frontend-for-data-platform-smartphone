import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionOrderDetailList as Content } from '@/components/Content';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailListItem,
  UserTypeEnum,
} from '@/constants';
import { getLocalStorage, toUpperCase } from '@/helpers/common';
import {
  createFormDataForSelectObject,
  getSearchTextDescription,
} from '@/helpers/pages';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { deletes, updates } from '@/api/productionOrder';
import { toLowerCase } from '@/helpers/common';
interface PageProps {
  productionOrder: number;
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

const ProductionOrderDetailList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetailList]: [],
  });
  const dispatch = useDispatch();

  const setFormDataForPage = async (orderId: number, userType: string) => {
    const list = await productionOrderCache.getProductionOrderDetailList(orderId, userType);
    setFormData({
      ...createFormDataForSelectObject([]),
      editList: {},
      [ProductionOrderTablesEnum.productionOrderDetailList]: list.productionOrderDetailList || [],
    });

    setDisplayData({
      userType,
      [ProductionOrderTablesEnum.productionOrderDetailList]: list.productionOrderDetailList || [],
      [ProductionOrderTablesEnum.productionOrderDetailHeader]: list.productionOrderDetailHeader || {},
    });
  }

  const initLoadTabData = async (productionOrder: number, userType: string) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionOrder,
      userType,
    );

    await productionOrderCache.updateProductionOrderDetailList({
      productionOrder: productionOrder,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionOrder,
      userType,
    );

    dispatch(setLoading({ isOpen: false }));

  };

  useEffect(() => {
    initLoadTabData(data.productionOrder, data.userType);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header title={'トップ'} className={'text-2xl'} />
      <Main className={'Main'}>
        <Content />
      </Main>
      <Footer hrefPath={`/production-order/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { productionOrder, userType } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      userType,
    }
  }
}

export default ProductionOrderDetailList;
