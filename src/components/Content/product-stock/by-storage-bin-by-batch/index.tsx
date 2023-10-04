import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContent,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  BluePanel,
} from '@/components/Content/Detail/Detail.style';
import {
  OrdersTablesEnum,
  ProductionOrderTablesEnum,
  ProductStockByStorageBinByBatchProps,
  ProductStockSingleUnitProps,
  ProductStockTablesEnum,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React, { useState } from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';

export const ProductStockByStorageBinByBatch = ({
                                                  className,
                                                  display,
                                                  setDisplay,
                                                }: {
  className?: string;
  display: string;
  setDisplay: any;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.productStockByStorageBinByBatch) as {
    [ProductStockTablesEnum.productStockByStorageBinByBatch]: ProductStockByStorageBinByBatchProps,
  };

  if (!detail[ProductStockTablesEnum.productStockByStorageBinByBatch]) { return <div></div> }

  const router = useRouter();

  const sortedProductStockByStorageBinByBatchHeader = [...detail[ProductStockTablesEnum.productStockByStorageBinByBatch]
    .ProductStockByStorageBinByBatchHeader
  ]

  sortedProductStockByStorageBinByBatchHeader.sort((a, b) => {
    if (a.StorageBin < b.StorageBin) {
      return -1;
    }
    if (a.StorageBin > b.StorageBin) {
      return 1;
    }
    return 0;
  })

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <Carousel>
          <img
            src={
              detail[ProductStockTablesEnum.productStockByStorageBinByBatch].Images?.Product?.BusinessPartnerID &&
              generateImageProductUrl(
                detail[ProductStockTablesEnum.productStockByStorageBinByBatch].Images?.Product?.BusinessPartnerID.toString(),
                detail[ProductStockTablesEnum.productStockByStorageBinByBatch].Images?.Product,
              ) || ''}
            alt={``}
          />
          <PublicImage
            className={`imageSlide m-auto`}
            imageName={'imageSample01Material01'}
          />
        </Carousel>
      </ProductDetailSection>

      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo>
          <ProductDetailSectionContentTwoColumn
            className={''}
            style={{
              marginBottom: rem(10),
            }}
          >
            <div
              className={'column-left'}
              style={{}}
            >
              <div>在庫情報</div>
              <div
                style={{
                  fontSize: rem(50),
                  lineHeight: rem(50),
                  fontFamily: 'AgencyB',
                }}
              >{detail[ProductStockTablesEnum.productStockByStorageBinByBatch].ProductStock?.toLocaleString()}</div>
            </div>
            <div
              className={'column-right'}
              style={{
                fontSize: rem(18),
                marginLeft: rem(10),
              }}
            >
              <div>
                <ProductDetailSectionContentThreeColumn
                  className={'items-end'}
                  style={{
                    borderBottom: `${rem(1)} solid #000 `,
                  }}
                >
                  <div
                    className={'text-center'}
                    style={{ width: '30%' }}
                  >
                    <BluePanel
                      className={`${display === 'FIFO' ? 'active' : ''}`}
                      style={{ margin: `${rem(0)} ${rem(2)} ${rem(2)}` }}
                      onClick={() => setDisplay('FIFO')}
                    >FIFO</BluePanel>
                  </div>
                  <div
                    className={'text-center'}
                    style={{ width: '30%' }}
                  >
                    <BluePanel
                      className={`${display === 'LIFO' ? 'active' : ''}`}
                      style={{ margin: `${rem(0)} ${rem(2)} ${rem(2)}` }}
                      onClick={() => setDisplay('LIFO')}
                    >LIFO</BluePanel>
                  </div>
                  <div
                    className={'text-center'}
                    style={{ width: '30%' }}
                  >
                    <PublicImage
                      className={'inline-block'}
                      imageName={'headerGirlSteering'}
                      width={60}
                    />
                  </div>
                </ProductDetailSectionContentThreeColumn>
              </div>
              <div
                className={'font-bold'}
                style={{
                  fontSize: rem(12),
                  color: '#3a3a3a',
                }}
              >{display}(ロット期限)により在庫情報を表示しています</div>
              <div>{detail[ProductStockTablesEnum.productStockByStorageBinByBatch].PlantName}</div>
            </div>
          </ProductDetailSectionContentTwoColumn>

        </ProductDetailSectionInfo>
      </ProductDetailSection>

      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo>
          <ProductDetailSectionContentThreeColumn
            className={'items-center justify-end'}
          >
            <div>
              <PublicImage
                imageName={'infoPlant'}
                width={60}
              />
            </div>
            <div
              style={{
                fontSize: rem(32),
                fontFamily: 'AgencyB',
                marginLeft: rem(14),
              }}
            >
              { sortedProductStockByStorageBinByBatchHeader[0].StorageBin }
            </div>
          </ProductDetailSectionContentThreeColumn>
        </ProductDetailSectionInfo>
      </ProductDetailSection>

      {/* FIFO */}
      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo
          className={`${display === 'FIFO' ? '' : 'hidden'}`}
        >
          {
            sortedProductStockByStorageBinByBatchHeader.map((item, index) => {
              return (
                <ProductDetailSectionContentThreeColumn
                  className={'items-center justify-start'}
                  style={{
                    marginBottom: rem(10),
                    color: '#595959',
                  }}
                >
                  <div
                    style={{
                      boxSizing: 'border-box',
                      padding: `${rem(0)} ${rem(20)} ${rem(0)} ${rem(0)}`,
                      fontSize: rem(26),
                      width: `30%`,
                    }}
                  >
                    {item.Batch}
                  </div>
                  <div
                    className={'text-right'}
                    style={{
                      boxSizing: 'border-box',
                      padding: `${rem(0)} ${rem(20)} ${rem(0)} ${rem(0)}`,
                      fontSize: rem(45),
                      fontFamily: 'AgencyB',
                      width: `55%`,
                    }}
                  >
                    {item.ProductStock?.toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontSize: rem(14),
                    }}
                  >
                    { item.ValidityStartDate } / { item.ValidityStartTime }
                  </div>
                  <div>
                    <PublicImage
                      imageName={'infoProductStock'}
                      width={70}
                    />
                  </div>
                </ProductDetailSectionContentThreeColumn>
              );
            })
          }
        </ProductDetailSectionInfo>

        {/* LIFO */}
        <ProductDetailSectionInfo
          className={`${display === 'LIFO' ? '' : 'hidden'}`}
        >
          {
            sortedProductStockByStorageBinByBatchHeader.map((item, index) => {
                return (
                  <ProductDetailSectionContentThreeColumn
                    className={'items-center justify-start'}
                    style={{
                      marginBottom: rem(10),
                      color: '#595959',
                    }}
                  >
                    <div
                      style={{
                        fontSize: rem(26),
                        width: `60%`,
                      }}
                    >
                      {item.Batch}
                    </div>
                    <div>
                      2023-07-26 / 21:00:00
                    </div>
                    <div>
                      <PublicImage
                        imageName={'infoProductStock'}
                        width={70}
                      />
                    </div>
                  </ProductDetailSectionContentThreeColumn>
                );
              },
            )
          }
        </ProductDetailSectionInfo>
      </ProductDetailSection>
    </Detail>
  );
};
