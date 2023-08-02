import { clsx } from 'clsx';
import {
  ItemStructureTable,
  OrderInfo,
  ProductCode,
  ProductDetailBottom,
  ProductDetailSection,
  ProductDetailSectionContent,
  ProductDetailSectionContentQRCodeBox,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  ProductDetailSlider,
  ProductDetailTop,
  QuantityInfo,
  ProductDetailSectionContentQRCodeBoxWrapper,
} from './Detail.style';
import { generateImageProductUrl } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import React, { useState } from 'react';
import { Detail } from '@/components/Content/Detail/Detail';
import {
  AuthedUser,
  ComponentItem,
  OperationItem,
  ProductImage,
  ProductionOrderDetailProps,
  ProductionOrderTablesEnum,
} from '@/constants';
import { rem } from 'polished';
import { Carousel } from '@/components/Carousel';
import { useAppSelector } from '@/store/hooks';

export const ProductionOrderDetail = ({
                                        className,
                                      }: {
  className?: string;
  // data: Partial<ProductionOrderDetailProps>;
}) => {
  const [closedPopup, setClosedPopup] = useState(true);

  // const nextPagePath = () => {
  //   if (paginationData.nextPage) {
  //     return `/production-order/detail/${paginationData.nextPage.ProductionOrder}/${paginationData.nextPage.ProductionOrderItem}/${paginationData.userType}/${paginationData.nextPage.Product}`;
  //   }
  //
  //   return null;
  // }
  //
  // const prevPagePath = () => {
  //   if (paginationData.prevPage) {
  //     return `/production-order/detail/${paginationData.prevPage.ProductionOrder}/${paginationData.prevPage.ProductionOrderItem}/${paginationData.userType}/${paginationData.prevPage.Product}`;
  //   }
  //
  //   return null;
  // }

  const detail  = useAppSelector(state => state.productionOrderDetail) as {
    [ProductionOrderTablesEnum.productionOrderDetail]: ProductionOrderDetailProps,
  };

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <ProductDetailSlider>
          <Carousel>
            <img
              src={detail[ProductionOrderTablesEnum.productionOrderDetail] &&
                generateImageProductUrl(
                  detail[ProductionOrderTablesEnum.productionOrderDetail].Images.Product.BusinessPartnerID.toString(),
                  detail[ProductionOrderTablesEnum.productionOrderDetail].Images.Product,
                )}
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
            <div>サイズ/寸法: 10cm × 10cm × 10cm</div>
            <div>ロットサイズ: 30 / 1000 / 30</div>
            <div>内容量: 2  安全在庫/発注点: 30,000</div>
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
                <div className={'productMenu'}>
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
                <PublicImage
                  imageName={'imageQrcode01'}
                  style={{
                    border: `${rem(1)} solid #C9C9C9FF`,
                  }}
                />
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
                <PublicImage
                  imageName={'imageQrcode01'}
                  style={{
                    border: `${rem(1)} solid #C9C9C9FF`,
                  }}
                />
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
                <PublicImage
                  imageName={'imageQrcode01'}
                  style={{
                    border: `${rem(1)} solid #C9C9C9FF`,
                  }}
                />
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
                <PublicImage
                  imageName={'imageQrcode01'}
                  style={{
                    border: `${rem(1)} solid #C9C9C9FF`,
                  }}
                />
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
