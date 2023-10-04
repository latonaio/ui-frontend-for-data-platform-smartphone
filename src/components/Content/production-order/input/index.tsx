import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
} from '../../Detail/Detail.style';
import { ProductionOrderTablesEnum } from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import { QuantityPostCancelButton } from '@/components/Button';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { PublicImage } from '@/components/Image';
import { ProductionOrderItemOperationInputProps } from '@/store/slices/production-order/item-operation/input';
import { TextField } from '@/components/Form';
import { checkInvalid, editItemAsync } from '@/store/slices/production-order/item-operation/input';
import { generateImageProductUrl, generateQRCodeImageUrl } from '@/helpers/common';

export const ProductionOrderInput = ({
                                       className,
                                     }: {
  className?: string;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.productionOrderItemOperationInput) as {
    [ProductionOrderTablesEnum.productionOrderItemOperationInput]: ProductionOrderItemOperationInputProps,
  };

  if (!detail[ProductionOrderTablesEnum.productionOrderItemOperationInput]) { return <div></div> }

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <ProductDetailSectionContentTwoColumn
          style={{
            marginBottom: rem(10)
          }}
        >
          <div
            className={'column-left'}
            style={{
              width: `30%`
            }}
          >
            <img
              src={
                detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].Images?.Product?.BusinessPartnerID.toString(),
                  detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].Images?.Product,
                ) || ''}
              alt={``}
              style={{
                maxWidth: `120%`,
                marginLeft: `-12px`,
              }}
            />
            <div className={'infoLabel'}>在庫をみる</div>
          </div>
          <div
            className={'column-right lightBlueInfo'}
            style={{
              paddingLeft: rem(10),
              width: `70%`
            }}
          >
            <div>
              <span className={'itemName'}>品目: </span>
              <span className={'itemText'}>
                {detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].Product}
              </span>
            </div>
            <div>
              <span className={'itemName'}>製造指図: </span>
              <span className={'itemText'}>
                {detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrder}
              </span>
              <span
                className={'itemName'}
                style={{
                  marginLeft: rem(10)
                }}
              >明細: </span>
              <span className={'itemText'}>
                {detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderItem}
              </span>
            </div>
            <div>
              <span className={'itemName'}>計画開始日付/時刻: </span>
              <span
                className={'itemText'}
              >{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderPlannedStartDate} / {detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderPlannedStartTime}</span>
            </div>
            <div>
              <span className={'itemName'}>計画終了日付/時刻: </span>
              <span
                className={'itemText'}
              >{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderPlannedEndDate} / {detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderPlannedEndTime}</span>
            </div>
            <div>
              <span className={'itemName'}>オーナーBP: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].OwnerProductionPlantBusinessPartnerName}</span>
            </div>
            <div>
              <span className={'itemName'}>オーナープラント: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].OwnerProductionPlantName}</span>
            </div>
            <div>
              <span className={'itemName'}>計画製造数量(基): </span>
              <span
                className={'itemText'}
                style={{
                  fontSize: rem(18)
                }}
              >{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderQuantityInBaseUnit.toLocaleString()}</span>
            </div>
            <div>
              <span className={'itemName'}>計画製造数量(製): </span>
              <span
                className={'itemText'}
                style={{
                  fontSize: rem(18)
                }}
              >{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderQuantityInDestinationProductionUnit.toLocaleString()}</span>
            </div>
          </div>
        </ProductDetailSectionContentTwoColumn>
        <ProductDetailSectionContentTwoColumn
          style={{
            marginBottom: rem(10)
          }}
        >
          <div
            className={'column-left lightBrownInfo'}
            style={{
              width: `70%`
            }}
          >
            <div>
              <span className={'itemName'}>作業ID: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].ProductionOrderItem}</span>
            </div>
            <div>
              <span className={'itemName'}>作業テキスト: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].OperationText}</span>
            </div>
            <div>
              <span className={'itemName'}>外注業者: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].SellerName}</span>
            </div>
            <div>
              <span className={'itemName'}>作業区: </span>
              <span className={'itemText'}>{detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].WorkCenter}</span>
            </div>
          </div>
          <div
            className={'column-right'}
            style={{
              width: `30%`
            }}
          >
            <PublicImage imageName={'factory'} />
          </div>
        </ProductDetailSectionContentTwoColumn>
        <ProductDetailSectionInfo>
          <ProductDetailSectionHeader>
            <div>作業手順情報</div>
          </ProductDetailSectionHeader>
          <ProductDetailSectionContentThreeColumn
            style={{
              marginBottom: rem(5)
            }}
          >
            <div
              style={{
                width: `20%`
              }}
            >
              <PublicImage
                imageName={'imageQrcode01'}
                style={{
                  border: `${rem(1)} solid #C9C9C9FF`,
                }}
              />
            </div>
            <div
              style={{
                width: `25%`
              }}
            >
              <PublicImage imageName={'headerGirl'} />
            </div>
            <div
              className={'underline ml-auto'}
              style={{
                fontSize: rem(16)
              }}
            >製造指図 作業の実績情報を入力してください</div>
          </ProductDetailSectionContentThreeColumn>
          <div
            style={{
              padding: rem(14),
              backgroundColor: '#FBE5D6',
              borderRadius: rem(4)
            }}
          >
            <ProductDetailSectionContentThreeColumn>
              <div
                style={{
                  width: `20%`,
                  fontSize: rem(18)
                }}
              >
                <div>歩留</div>
                <div>数量</div>
              </div>
              <div
                style={{
                  width: `20%`
                }}
              >
                <PublicImage imageName={'yieldQuantity'} />
              </div>
              <div
                className={'flex'}
                style={{
                  width: `60%`,
                  fontSize: rem(44),
                }}
              >
                <div
                  style={{
                    width: `20%`,
                    paddingLeft: rem(5),
                  }}
                >:</div>
                <div
                  className={'ml-auto text-right'}
                  style={{
                    width: `80%`,
                  }}
                >
                  <span
                    className={'block'}
                    style={{
                      borderBottom: `${rem(2)} solid #000`
                    }}
                  >
                    <TextField
                      // isEditing={
                      //   detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].isEditing &&
                      //   detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].isEditing['ProductionOrderConfirmation']
                      // }
                      inputProps={{
                        disableUnderline: true,
                      }}
                      className={'productionOrderInput'}
                      isEditing={true}
                      currentValue={
                        detail[ProductionOrderTablesEnum.productionOrderItemOperationInput].OperationText
                      }
                      type={'number'}
                      checkInvalid={(value) => {
                        checkInvalid({
                          index: 0,
                          item: detail[ProductionOrderTablesEnum.productionOrderItemOperationInput],
                          key: 'ProductionOrderConfirmation',
                          checkValue: value,
                        }, appDispatch);
                      }}
                      onChange={async (value: string) => {
                        await editItemAsync({
                            params: {
                              ProductionOrderConfirmation: {
                                ...detail[ProductionOrderTablesEnum.productionOrderItemOperationInput],
                                ProductBaseUnit: 'PC',
                                ProductProductionUnit: 'PC',
                                ProductOperationUnit: 'PC',
                                WorkCenter: 1,
                                ConfirmedYieldQuantity: value,
                                CreationDate: '2023-08-20',
                                CreationTime: '00:00:00',
                                LastChangeDate: '2023-08-21',
                                LastChangeTime: '00:00:00',
                              },
                              api_type: 'creates',
                              accepter: ['Header'],
                            },
                            index: 0,
                            key: 'ConfirmedYieldQuantity',
                          },
                          appDispatch, detail[ProductionOrderTablesEnum.productionOrderItemOperationInput]);
                      }}
                      onClose={() => {

                      }}
                    />
                  </span>
                </div>
              </div>
            </ProductDetailSectionContentThreeColumn>
            <ProductDetailSectionContentThreeColumn
              style={{
                marginBottom: rem(10),
              }}
            >
              <div
                style={{
                  width: `20%`,
                  fontSize: rem(18),
                }}
              >
                <div>不良</div>
                <div>数量</div>
              </div>
              <div
                style={{
                  width: `20%`
                }}
              >
                <PublicImage imageName={'defectiveQuantity'} />
              </div>
              <div
                className={'flex'}
                style={{
                  width: `60%`,
                  fontSize: rem(44)
                }}
              >
                <div
                  style={{
                    width: `20%`,
                    paddingLeft: rem(5),
                  }}
                >:</div>
                <div
                  className={'ml-auto text-right'}
                  style={{
                    width: `80%`,
                  }}>
                  <span
                    className={'block'}
                    style={{
                      borderBottom: `${rem(2)} solid #000`
                    }}
                  >0</span>
                </div>
              </div>
            </ProductDetailSectionContentThreeColumn>
            <ProductDetailSectionContentTwoColumn>
              <div
                className={'text-center'}
                style={{
                  width: `50%`
                }}
              >
                <QuantityPostCancelButton
                  onClick={() => {
                  }}
                >Post</QuantityPostCancelButton>
              </div>
              <div
                className={'text-center'}
                style={{
                  width: `50%`
                }}
              >
                <QuantityPostCancelButton className={'cancel'}>Cancel</QuantityPostCancelButton>
              </div>
            </ProductDetailSectionContentTwoColumn>
          </div>
        </ProductDetailSectionInfo>
      </ProductDetailSection>
    </Detail>
  );
};
