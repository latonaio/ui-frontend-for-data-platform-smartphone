import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { OrdersItemPdf as Content } from '@/components/Content';
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

import { useResizeObserver } from '@wojtekmaj/react-hooks';

import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import type { PDFDocumentProxy } from 'pdfjs-dist';

import { env } from '@/helpers/env';

if (process.browser) {
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/build/pdf.worker.min.js',
  //   import.meta.url,
  // ).toString();

  pdfjs.GlobalWorkerOptions.workerSrc = `${env.nest.host}:${env.nest.port}/mill-sheet-pdf/mill-sheet-pdf/pdf.worker.min.js`;
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

interface PageProps {
  orderId: number;
  orderItem: number;
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

const OrdersItemPDF: React.FC<PageProps> = (data) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const [orderStatusSelectEditingFlag, setOrderStatusSelectEditingFlag] =
    useState(false);

  const setFormDataForPage = async (
    orderId: number,
    orderItem: number,
    pagination?: any,
  ) => {
    const detail = await ordersCache.getOrdersSingleUnit(
      orderId,
      orderItem,
    );

    if (detail) {
      appDispatch(initializeUpdate({
        [OrdersTablesEnum.ordersSingleUnit]: {
          ...detail,
          Pagination: pagination,
        },
      }));
    }
  }

  const initLoadTabData = async (
    orderId: number,
    orderItem: number,
    userType: string,
  ) => {
    const {
      language,
      businessPartner,
      emailAddress,
    }: AuthedUser = getLocalStorage('auth');

    dispatch(setLoading({ isOpen: true }));

    await setFormDataForPage(
      orderId,
      orderItem,
    );

    const updateResult = await ordersCache.updateOrdersSingleUnit({
      orderId,
      orderItem,
      userType,
      language,
      businessPartner,
      emailAddress,
    });

    await setFormDataForPage(
      orderId,
      orderItem,
      updateResult.pagination,
    );

    dispatch(setLoading({ isOpen: false }));
  };

  useEffect(() => {
    initLoadTabData(
      data.orderId,
      data.orderItem,
      data.userType,
    );
  }, [data]);

  const [file, setFile] = useState<PDFFile>(null);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { files } = event.target;

    if (files && files[0]) {
      setFile(files[0] || null);
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={`${data.userType === 'buyer' ? '発注' : '受注'}`}
        pageName={'明細一覧'}
        className={'text-2xl'}
        color={`${data.userType === 'buyer' ? 'pink' : 'purple'}`}
        headerContentNext={`/DPFM_API_ORDERS_SRV/reads/` +
          `singleUnit/` +
          `${data.orderId}/` +
          `${data.orderItem}/` +
          `${data.userType}/`}
      />
      <Main className={'Main Main-bg-dark'}>
        <Content
          documentInfo={{
            onFileChange,
            setContainerRef,
            file,
            onDocumentLoadSuccess,
            options,
            numPages,
            containerWidth,
            maxWidth,
          }}
        />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    orderId,
    orderItem,
    userType
  } = context.query;

  return {
    props: {
      orderId: Number(orderId),
      orderItem: Number(orderItem),
      userType,
    }
  }
}

export default OrdersItemPDF;
