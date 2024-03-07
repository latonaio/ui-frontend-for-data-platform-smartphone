import { clsx } from 'clsx';
import {
  ProductDetailSection,
} from '@/components/Content/Detail/Detail.style';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { creates } from '@/api/deliveryDocument/function-refer-from-orders';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { Loading } from '@/components/Loading';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { useDispatch } from 'react-redux';

export const DeliveryDocumentFunctionReferFromOrders = ({
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
          <div className={'text-center mb-3'}>入出荷登録</div>
          <div className={'mb-1'}>
            <div>オーダーから参照し入出荷登録を行います。</div>
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
                        '入出荷登録を行います',
                        async () => {
                          setIsCreating(true);

                          try {
                            const response = await creates({
                              InputParameters: {
                                ReferenceDocument: referenceDocument,
                              },
                              DeliveryDocument: {
                                DeliveryDocument: null,
                                DeliveryDocumentItem: null,
                                Item: [],
                              },
                              accepter: [],
                              api_type: 'creates',
                            }, 'function-refer-from-orders');

                            if (response) {
                              router.push(`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                                `item/` +
                                `${response.Header.DeliveryDocument}/` +
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
          <div>入出荷登録中</div>
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
