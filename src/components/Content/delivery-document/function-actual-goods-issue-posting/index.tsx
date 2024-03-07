import { clsx } from 'clsx';
import {
  ProductDetailSection,
} from '@/components/Content/Detail/Detail.style';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/router';
import { updates } from '@/api/deliveryDocument/function-actual-goods-issue-posting';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { Loading } from '@/components/Loading';
import { BlueButton } from '@/components/Button';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { useDispatch } from 'react-redux';

export const DeliveryDocumentFunctionActualGoodsIssuePosting = ({
                                                                  className,
                                                                  deliveryDocument,
                                                                  deliveryDocumentItem,
                                                                  userType,
                                                                  isCreating,
                                                                  setIsCreating,
                                                                }: {
  className?: string;
  deliveryDocument: number;
  deliveryDocumentItem: number;
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
          <div className={'text-center mb-3'}>入出荷更新(実際出荷日付時刻更新)</div>
          <div className={'mb-1'}>
            <div>入出荷の更新を行います。</div>
            <div>入出荷伝票: {deliveryDocument}</div>
            <div>明細: {deliveryDocumentItem}</div>
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
                        '入出荷の更新を行います',
                        async () => {
                          setIsCreating(true);

                          try {
                            const response = await updates({
                              DeliveryDocument: {
                                DeliveryDocument: deliveryDocument,
                                Item: [
                                  {
                                    DeliveryDocument: deliveryDocument,
                                    DeliveryDocumentItem: deliveryDocumentItem,
                                  }
                                ],
                              },
                              accepter: [],
                              api_type: 'updates',
                            }, 'function-actual-goods-issue-posting');

                            if (response) {
                              router.push(`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                                `item/` +
                                `${deliveryDocument}/` +
                                `${deliveryDocumentItem}/` +
                                `${userType}`
                              );
                            }

                            appDispatch(setGlobalSnackbar({
                              message: `更新が完了しました`,
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
            >更新する</BlueButton>
          </div>
        </div>
        <div className={`${isCreating ? '' : 'hidden'}`}>
          <div>入出荷更新中</div>
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
