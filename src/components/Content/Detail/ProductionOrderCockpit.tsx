import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContent,
  ProductDetailSectionContentQRCodeBox,
  ProductDetailSectionContentQRCodeBoxWrapper,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  ProductDetailSlider,
} from './Detail.style';
import {
  generateImageProductUrl,
  generateQRCodeImageUrl,
} from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import React from 'react';
import { Detail } from '@/components/Content/Detail/Detail';
import { ProductionOrderCockpitProps, ProductionOrderTablesEnum } from '@/constants';
import { rem } from 'polished';
import { Carousel } from '@/components/Carousel';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';

export const ProductionOrderCockpit = ({
                                        className,
                                      }: {
  className?: string;
}) => {
  const detail  = useAppSelector(state => state.productionOrderCockpit) as {
    [ProductionOrderTablesEnum.productionOrderCockpit]: ProductionOrderCockpitProps,
  };

  if (!detail[ProductionOrderTablesEnum.productionOrderCockpit]) { return <div></div> }

  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <ProductDetailSlider>
          <Carousel>
            <img
              src={
                detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.Product?.BusinessPartnerID.toString(),
                  detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.Product,
                ) || ''}
              alt={``}
            />
            <PublicImage
              className={`imageSlide m-auto`}
              imageName={'imageSample01Material01'}
            />
          </Carousel>
        </ProductDetailSlider>
      </ProductDetailSection>

      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo>
          <ProductDetailSectionHeader>
            <div>
              品目製造関連情報
            </div>
          </ProductDetailSectionHeader>

          <ProductDetailSectionContent>
            <div>サイズ/寸法: {detail[ProductionOrderTablesEnum.productionOrderCockpit].SizeOrDimensionText}</div>
            <div>ロットサイズ: {detail[ProductionOrderTablesEnum.productionOrderCockpit].StandardProductionLotSizeQuantityInBaseUnit}</div>
            <div>内容量: {detail[ProductionOrderTablesEnum.productionOrderCockpit].InternalCapacityQuantity}
              <span style={{ marginLeft: rem(10) }}></span>安全在庫/発注点: {detail[ProductionOrderTablesEnum.productionOrderCockpit].SafetyStockQuantityInBaseUnit} / {detail[ProductionOrderTablesEnum.productionOrderCockpit].ReorderThresholdQuantityInBaseUnit}</div>
          </ProductDetailSectionContent>
        </ProductDetailSectionInfo>
      </ProductDetailSection>

      <ProductDetailSection className={'m-0'}>
        <Carousel>
          {/* scroll 1 */}
          <ProductDetailSectionContentQRCodeBoxWrapper>
            <ProductDetailSectionContentQRCodeBox>
              <div className={'column column-left'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'billOfMaterialList'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>部品表</div>
                </div>
                <div className={'productMenu'}
                     onClick={async () => {
                       await router.push(`/DPFM_API_PRODUCTION_ORDER_SRV/reads/` +
                         `itemOperation/list/` +
                         `${detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrder}/` +
                         `${detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrderItem}/`
                       );
                     }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'operationsList'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>作業手順</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode
                    ) || ''}
                  alt={``}
                  width={96}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >製造指図: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrder}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'productionVersionList'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>バージョン</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'deliveryDocumentList'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>入出荷</div>
                </div>
              </div>
            </ProductDetailSectionContentQRCodeBox>
          </ProductDetailSectionContentQRCodeBoxWrapper>

          {/* scroll 2 */}
          <ProductDetailSectionContentQRCodeBoxWrapper>
            <ProductDetailSectionContentQRCodeBox>
              <div className={'column column-left'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'scheduler'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>スケジューラ</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'parentProduct'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>親品目</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode
                    ) || ''}
                  alt={``}
                  width={96}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >製造指図: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrder}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'orderList'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>オーダー</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'scrList'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>SCR</div>
                </div>
              </div>
            </ProductDetailSectionContentQRCodeBox>
          </ProductDetailSectionContentQRCodeBoxWrapper>

          {/* scroll 3 */}
          <ProductDetailSectionContentQRCodeBoxWrapper>
            <ProductDetailSectionContentQRCodeBox>
              <div className={'column column-left'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'facility'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>設備</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'operator'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>WC/作業員</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode
                    ) || ''}
                  alt={``}
                  width={96}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >製造指図: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrder}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'feePaymentMaterial'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>有償支給</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'actualStock'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>実在庫</div>
                </div>
              </div>
            </ProductDetailSectionContentQRCodeBox>
          </ProductDetailSectionContentQRCodeBoxWrapper>

          {/* scroll 4 */}
          <ProductDetailSectionContentQRCodeBoxWrapper>
            <ProductDetailSectionContentQRCodeBox>
              <div className={'column column-left'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'atp'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>ATP</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'underConstruction'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>Under<br />Construction…</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[ProductionOrderTablesEnum.productionOrderCockpit].Images?.QRCode
                    ) || ''}
                  alt={``}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >製造指図: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrder}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[ProductionOrderTablesEnum.productionOrderCockpit] && detail[ProductionOrderTablesEnum.productionOrderCockpit].ProductionOrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'underConstruction'}
                      width={50}
                    />
                  </div>
                  <div className={'productMenuTitle'}>Under<br />Construction…</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'underConstruction'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>Under<br />Construction…</div>
                </div>
              </div>
            </ProductDetailSectionContentQRCodeBox>
          </ProductDetailSectionContentQRCodeBoxWrapper>
        </Carousel>
      </ProductDetailSection>
    </Detail>
  );
};
