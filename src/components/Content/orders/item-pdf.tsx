import { clsx } from 'clsx';
import {
  OrdersTablesEnum,
  OrdersSingleUnitProps,
} from '@/constants';
import { Detail,  } from '@/components/Content/Detail/Detail';
import { ProductDetailSection } from '@/components/Content/Detail/Detail.style';
import React, { useRef, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { Document, Page } from 'react-pdf';
import { generateDocumentImageUrl, generateDocumentPdfUrl } from '@/helpers/common';

export const OrdersItemPdf = ({
                                className,
                                documentInfo,
                              }: {
  className?: string;
  documentInfo: {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setContainerRef: (ref: HTMLElement | null) => void;
    file: string | File | null;
    onDocumentLoadSuccess: (pdf: any) => void;
    options: any;
    numPages: number | undefined;
    containerWidth: number | undefined;
    maxWidth: number;
  }
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.ordersSingleUnit) as {
    [OrdersTablesEnum.ordersSingleUnit]: OrdersSingleUnitProps,
  };

  if (!detail[OrdersTablesEnum.ordersSingleUnit]) { return <div></div> }

  const router = useRouter();

  const fileName = generateDocumentPdfUrl(
    detail[OrdersTablesEnum.ordersSingleUnit].Images?.DocumentImageOrders
  ) || ''

  return (
    <Detail className={clsx(
      `ContainerWrapper mt-0`,
      className
    )}>
      <ProductDetailSection>
        <div className="Example__container">
          <div className="Example__container__document" ref={documentInfo.setContainerRef}>
            <Document
              file={
                fileName
              // documentInfo.file
            }
              onLoadSuccess={documentInfo.onDocumentLoadSuccess}
              options={documentInfo.options}
            >
              {Array.from(new Array(documentInfo.numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={documentInfo.containerWidth ?
                    Math.min(
                      documentInfo.containerWidth,
                      documentInfo.maxWidth) : documentInfo.maxWidth}
                />
              ))}
            </Document>
          </div>
        </div>
      </ProductDetailSection>
    </Detail>
  );
};
