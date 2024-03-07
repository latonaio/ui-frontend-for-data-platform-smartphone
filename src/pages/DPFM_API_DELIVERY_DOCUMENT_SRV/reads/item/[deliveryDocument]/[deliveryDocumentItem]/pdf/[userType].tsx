import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PdfReader as Content } from '@/components/Pdf';
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
import { PdfReader } from '@/components/Pdf';

if (process.browser) {
  // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  //   'pdfjs-dist/build/pdf.worker.min.js',
  //   import.meta.url,
  // ).toString();

  // TODO 後でS3から取得するように変更する
  pdfjs.GlobalWorkerOptions.workerSrc = `${env.nest.host}:${env.nest.port}/mill-sheet-pdf/scripts/pdf.worker.min.js`;
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

type PDFFile = string | File | null;

interface PageProps {
  deliveryDocument: number;
  deliveryDocumentItem: number;
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

const DeliveryDocumentInstructionPDF: React.FC<PageProps> = (data) => {
  const initLoadTabData = async (
    inspectionLot: number,
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
        category={`${data.userType === 'deliverFromParty' ? '出荷' : '入荷'}`}
        pageName={'Cockpit'}
        className={'text-2xl'}
        color={`${data.userType === 'deliverFromParty' ? 'deliveryFromParty' : 'deliveryToParty'}`}
        headerContentNext={`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
          `singleUnit/` +
          `${data.deliveryDocument}/` +
          `${data.deliveryDocumentItem}/` +
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
    deliveryDocument,
    deliveryDocumentItem,
    userType,
  } = context.query;

  return {
    props: {
      deliveryDocument: Number(deliveryDocument),
      deliveryDocumentItem: Number(deliveryDocumentItem),
      userType,
    }
  }
}

export default DeliveryDocumentInstructionPDF;
