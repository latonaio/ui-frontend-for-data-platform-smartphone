import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContent,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  ProductDetailSectionContentQRCodeBox,
  ProductDetailSectionContentQRCodeBoxWrapper,
  ProductDetailSectionContentProductMenuListWrapper,
} from '@/components/Content/Detail/Detail.style';
import {
  OrdersTablesEnum,
  OrdersSingleUnitProps,
  ProductSingleUnitProps,
  ProductStockTablesEnum,
  ProductTablesEnum,
  ProductionOrderTablesEnum, AuthedUser,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl, generateQRCodeImageUrl, getLocalStorage } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';
import imageSample01 from '@public/demo/image-sample01.png';
import imageSample01Material01 from '@public/demo/image-sample01-material01.png';
import estimate from '@public/global-menu/estimate.png';
import clock from '@public/clock.png';
import { Select } from '@/components/Form';
import { creates } from '@/api/orders/function-refer-from-quotations';
import { setLoading } from '@/store/slices/loadging';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { ordersCache } from '@/services/cacheDatabase/orders';
import { initializeUpdate } from '@/store/slices/orders/single-unit';
import { Loading } from '@/components/Loading';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { reads as detailListForAnOrderDocument } from '@/api/orders/detail-list-for-an-order-document';
import { useDispatch } from 'react-redux';

export const OrdersFunctionReferFromQuotations = ({
                                                    className,
                                                    referenceDocument,
                                                    userType,
                                                    isCreating,
                                                    setIsCreating,
                                                  }: {
  className?: string;
  referenceDocument: number;
  userType: string;
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <div className={`${isCreating ? 'hidden' : ''}`}>
          <div className={'text-center mb-3'}>オーダー登録</div>
          <div className={'mb-1'}>
            <div>見積から参照しオーダー登録を行います。</div>
            <div>ReferenceDocumentID: {referenceDocument}</div>
          </div>
          <div className={'text-center'}>
            <BlueButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                dispatch(setDialog({
                  type: 'consent',
                  consent: {
                    isOpen: true,
                    children: (
                      cancelDialogTemplate(
                        dispatch,
                        'オーダー登録を行います',
                        async () => {
                          setIsCreating(true);

                          try {
                            const response = await creates({
                              InputParameters: {
                                ReferenceDocument: referenceDocument,
                              },
                              Orders: {
                                OrderID: null,
                                OrderItem: null,
                                Item: [],
                              },
                              accepter: [],
                              api_type: 'creates',
                            }, 'function-refer-from-quotations');

                            if (response) {
                              router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                                `item/` +
                                `${response.Header.OrderID}/` +
                                `1/` + // default Page transition order item number 1
                                `${userType}`
                              );
                            }

                            appDispatch(setGlobalSnackbar({
                              message: `登録が完了しました`,
                              variant: 'success',
                            }));
                          } catch (e) {
                            appDispatch(setGlobalSnackbar({
                              message: `エラーです`,
                              variant: 'error',
                            }));
                          }

                          setIsCreating(false);
                        },
                      )
                    ),
                  }
                }))
              }}
            >登録する</BlueButton>
          </div>
        </div>
        <div className={`${isCreating ? '' : 'hidden'}`}>
          <div>オーダー登録中</div>
          <div>
            <Loading
              isOpen={true}
            />
          </div>
        </div>
      </ProductDetailSection>
    </Detail>
  );
};
