import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { ContentsTop } from '@/components/ContentsTop';
import { Footer } from '@/components/Footer';
import { ProductionOrderDetail as Content } from '@/components/Content';
import { getLocalStorage, paginationArrow, toUpperCase } from '@/helpers/common';
import {
  AuthedUser,
  ProductionOrderTablesEnum,
  ProductionOrderDetailProps,
  UserTypeEnum,
} from '@/constants';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { getSearchTextDescription } from '@/helpers/pages';
import { readsPagination } from '@/api/productionOrder/detail';
import { setLoading } from '@/store/slices/loadging';

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
  const [displayData, setDisplayData] = useState<ProductionOrderDetailProps | null>(null);

  const [formData, setFormData] = useState<formData>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetail]: {} as ProductionOrderDetailProps,
  });

  const [paginationData, setPaginationData] = useState({});
  const [activeMenuTab, setActiveMenuTab] = useState<ActiveMenuTab>(ActiveMenuTab.configurationItem);

  const dispatch = useDispatch();

  const setFormDataForPage = async (
    productionOrder: number,
    productionOrderItem: number,
    userType: string,
    product: string,
  ) => {
  }

  const initLoadTabData = async (
    productionOrder: number,
    productionOrderItem: number,
    product: string,
    userType: UserTypeEnum,
  ) => {
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
      <Footer hrefPath={`/production-order/detail/list/${data.userType}/${data.productionOrder}`}></Footer>
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
