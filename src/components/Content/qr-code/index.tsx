import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
} from '../Detail/Detail.style';
import { ProductionOrderTablesEnum } from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import { QuantityPostCancelButton } from '@/components/Button';
import React, { useEffect, useState } from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { ProductionOrderItemOperationInputProps } from '@/store/slices/production-order/item-operation/input';
import { TextField } from '@/components/Form';
import { checkInvalid, editItemAsync } from '@/store/slices/production-order/item-operation/input';
import { generateImageProductUrl, generateQRCodeImageUrl } from '@/helpers/common';

import QrScanner from '@public/scripts/qr-scanner.min.js';

import { QrReader } from 'react-qr-reader';
import { Dialog, DialogDefaultLayout } from '@/components/Dialog';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const QRCodeWrapper = styled.div`
  #video {
    left: 50% !important;
    transform: translate(-50%, 0);
  }
`;

export const QRCode = ({
                         className,
                       }: {
  className?: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState({
    isOpen: false,
    title: '',
    message: '',
    linkText: '',
  });

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className,
    )}>
      <div
        className={'text-center'}
        style={{
          marginTop: rem(40),
        }}
      >QRコード読み取り中...</div>
      <QRCodeWrapper>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              if (!dialogOpen.isOpen) {
                setDialogOpen({
                  ...dialogOpen,
                  isOpen: true,
                  title: 'QRコードURL',
                  message: result?.getText(),
                  linkText: result?.getText(),
                });
              }
            }

            if (!!error) {
              console.info(error);
            }
          }}
          constraints={{ facingMode: 'environment' }}
          videoStyle={{
            width: '100%',
            height: '100%'
          }}
        />
      </QRCodeWrapper>
      <Dialog
        isOpen={dialogOpen.isOpen}
      >
        <DialogDefaultLayout
          title={dialogOpen.title}
          message={dialogOpen.message}
          onClose={() => {
            window.location.href = dialogOpen.linkText;

            setDialogOpen({
              ...dialogOpen,
              isOpen: false,
            })
          }}
        ></DialogDefaultLayout>
      </Dialog>
    </Detail>
  );
};
