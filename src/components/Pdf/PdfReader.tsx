import { clsx } from 'clsx';
import { Detail,  } from '@/components/Content/Detail/Detail';
import { ProductDetailSection } from '@/components/Content/Detail/Detail.style';
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Document, Page } from 'react-pdf';
import { generateDocumentImageUrl, generateDocumentPdfUrl } from '@/helpers/common';

export const PdfReader = ({
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
  const router = useRouter();

  const { query } = router;

  const fileName = generateDocumentPdfUrl(
    query.pdfUrl ? query.pdfUrl.toString() : '',
    query.type ? query.type.toString() : '',
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
