import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContent,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo, ProductDetailSectionContentQRCodeBox, ProductDetailSectionContentQRCodeBoxWrapper,
} from '@/components/Content/Detail/Detail.style';
import {
  ProductionOrderTablesEnum,
  ProductStockSingleUnitProps,
  ProductStockTablesEnum,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl, generateQRCodeImageUrl } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';

export const ProductStockSingleUnit = ({
                                       className,
                                     }: {
  className?: string;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.productStockSingleUnit) as {
    [ProductStockTablesEnum.productStockSingleUnit]: ProductStockSingleUnitProps,
  };

  if (!detail[ProductStockTablesEnum.productStockSingleUnit]) { return <div></div> }

  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <Carousel>
          <img
            src={
              detail[ProductStockTablesEnum.productStockSingleUnit].Images?.Product?.BusinessPartnerID &&
              generateImageProductUrl(
                detail[ProductStockTablesEnum.productStockSingleUnit].Images?.Product?.BusinessPartnerID.toString(),
                detail[ProductStockTablesEnum.productStockSingleUnit].Images?.Product,
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
          <ProductDetailSectionHeader>
            <div>在庫情報</div>
          </ProductDetailSectionHeader>

          <ProductDetailSectionContent>
            <ProductDetailSectionContentTwoColumn
              style={{
                marginBottom: rem(10)
              }}
            >
              <div
                className={'column-left'}
                style={{
                  width: `80%`,
                  fontSize: rem(18)
                }}
              >{detail[ProductStockTablesEnum.productStockSingleUnit].PlantName}</div>
              <div
                className={'column-right lightBrownInfo'}
                style={{
                  width: `20%`
                }}
              >
                <PublicImage imageName={'infoFactory'} />
              </div>
            </ProductDetailSectionContentTwoColumn>

            <ProductDetailSectionContentThreeColumn
              style={{
                marginBottom: rem(10)
              }}
            >
              <div
                className={'text-center'}
                style={{
                  width: `30%`,
                }}
              >
                <div>
                  <PublicImage imageName={'infoProductStock'} />
                </div>
                <div
                  style={{
                    fontSize: rem(50),
                    fontFamily: 'AgencyB',
                  }}
                  onClick={async () => {
                    await router.push(`/DPFM_API_PRODUCT_STOCK_SRV/reads/` +
                      `byStorageBinByBatch/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].Product}/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].BusinessPartner}/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].Plant}/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].UserType}`
                    );
                  }}
                >
                  {detail[ProductStockTablesEnum.productStockSingleUnit].ProductStock?.toLocaleString()}
                </div>
              </div>
              <div
                style={{
                  width: `40%`,
                }}
              >
                <div
                  className={'text-center'}
                >
                  <img
                    className={'inline-block'}
                    src={
                      detail[ProductStockTablesEnum.productStockSingleUnit].Images?.QRCode?.DocID &&
                      generateQRCodeImageUrl(
                        detail[ProductStockTablesEnum.productStockSingleUnit].Images?.QRCode
                      ) || ''}
                    alt={``}
                    width={132}
                  />
                </div>
                <div
                  style={{
                    padding: `${rem(0)} ${rem(0)} ${rem(0)} ${rem(10)}`,
                  }}
                >
                  <div
                    style={{
                      padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                    }}
                  >品目: {detail[ProductStockTablesEnum.productStockSingleUnit] && detail[ProductStockTablesEnum.productStockSingleUnit].Product}</div>
                  <div
                    style={{
                      padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                    }}
                  >BP: {detail[ProductStockTablesEnum.productStockSingleUnit] && detail[ProductStockTablesEnum.productStockSingleUnit].BusinessPartner}</div>
                  <div
                    style={{
                      padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                    }}
                  >プラント: {detail[ProductStockTablesEnum.productStockSingleUnit] && detail[ProductStockTablesEnum.productStockSingleUnit].Plant}</div>
                </div>
              </div>
              <div
                className={'text-center'}
                style={{
                  width: `30%`,
                }}
              >
                <div>
                  <PublicImage imageName={'infoDeliveryTodo'} />
                </div>
                <div
                  style={{
                    // width: `80%`,
                    fontSize: rem(50),
                    fontFamily: 'AgencyB',
                  }}
                  onClick={async () => {
                    await router.push(`/DPFM_API_PRODUCT_STOCK_SRV/reads/` +
                      `byStorageBinByBatch/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].Product}/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].BusinessPartner}/` +
                      `${detail[ProductStockTablesEnum.productStockSingleUnit].Plant}/` +
                      'userType'
                    );
                  }}
                >
                  {`3,000`}
                </div>
              </div>
            </ProductDetailSectionContentThreeColumn>
          </ProductDetailSectionContent>
        </ProductDetailSectionInfo>
      </ProductDetailSection>
    </Detail>
  );
};
