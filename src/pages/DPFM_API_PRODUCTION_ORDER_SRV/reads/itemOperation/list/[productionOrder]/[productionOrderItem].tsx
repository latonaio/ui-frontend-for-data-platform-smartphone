import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductionOrderItemOperationList as Content } from '@/components/Content';
import { AuthedUser, ProductionOrderDetailListItem, ProductionOrderTablesEnum } from '@/constants';
import { getLocalStorage } from '@/helpers/common';
import { productionOrderCache } from '@/services/cacheDatabase/productionOrder';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/store/slices/loadging';
import { useAppDispatch } from '@/store/hooks';
import { initializeUpdate } from '@/store/slices/production-order/item-operation/list';

interface PageProps {
  productionOrder: number;
  productionOrderItem: number;
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

const ProductionOrderItemOperationList: React.FC<PageProps> = (data) => {
  const [displayData, setDisplayData] = useState({});
  const [formData, setFormData] = useState<formData | any>({
    editList: {},
    [ProductionOrderTablesEnum.productionOrderDetailList]: [],
  });
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const setFormDataForPage = async (productionOrder: number) => {
    const list = await productionOrderCache.getProductionOrderItemOperationList(productionOrder);

    appDispatch(initializeUpdate({
      [ProductionOrderTablesEnum.productionOrderItemOperationList]: list[ProductionOrderTablesEnum.productionOrderItemOperationList],
      [ProductionOrderTablesEnum.productionOrderDetailHeader]:
        list[ProductionOrderTablesEnum.productionOrderDetailHeader] ?
          list[ProductionOrderTablesEnum.productionOrderDetailHeader] : {},
    }));
  }

  const initLoadTabData = async (
    productionOrder: number,
    productionOrderItem: number,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      productionOrder,
    );

    await productionOrderCache.updateProductionOrderItemOperationList({
      productionOrder,
      productionOrderItem,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      productionOrder,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(data.productionOrder, data.productionOrderItem);
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={'製造指図'}
        pageName={'作業手順'}
        className={'text-2xl'}
      />
      <Main className={'Main'}>
        <Content />
      </Main>
      <Footer hrefPath={`/production-order/list`}></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    productionOrder,
    productionOrderItem,
  } = context.query;

  return {
    props: {
      productionOrder: Number(productionOrder),
      productionOrderItem: Number(productionOrderItem),
    }
  }
}

export default ProductionOrderItemOperationList;
