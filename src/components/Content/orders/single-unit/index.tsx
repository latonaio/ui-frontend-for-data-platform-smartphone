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
  ProductionOrderTablesEnum,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl, generateQRCodeImageUrl } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';
import imageSample01 from '@public/demo/image-sample01.png';
import imageSample01Material01 from '@public/demo/image-sample01-material01.png';
import estimate from '@public/global-menu/estimate.png';
import clock from '@public/clock.png';

export const OrdersSingleUnit = ({
                                    className,
                                  }: {
  className?: string;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.ordersSingleUnit) as {
    [OrdersTablesEnum.ordersSingleUnit]: OrdersSingleUnitProps,
  };

  if (!detail[OrdersTablesEnum.ordersSingleUnit]) { return <div></div> }

  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <div
          className={'flex justify-between items-center'}
          style={{
            width: `100%`,
            fontSize: rem(14),
            marginBottom: rem(20),
          }}
        >
          <div
            style={{
              width: rem(40),
            }}
          >
            {
              detail[OrdersTablesEnum.ordersSingleUnit].Pagination?.prevPage &&
              <div
                className={'text-left'}
                onClick={async () => {
                  await router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].OrderID}/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].Pagination.prevPage.OrderItem}/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].UserType}/`
                  );
                }}
              >
                <i className="icon-arrow-back" />
              </div>
            }
          </div>

          <div className={'flex justify-start items-center'}>
            <span
              style={{
                marginRight: rem(5),
              }}
            >
              <PublicImage
                className={'m-auto'}
                imageName={'iconWing2'}
                width={24}
              />
            </span>
            <span>User={detail[OrdersTablesEnum.ordersSingleUnit].UserType.charAt(0).toUpperCase() + detail[OrdersTablesEnum.ordersSingleUnit].UserType.slice(1)}を選択しています</span>
          </div>

          <div
            style={{
              width: rem(40),
            }}
          >
            {
              detail[OrdersTablesEnum.ordersSingleUnit].Pagination?.nextPage &&
              <div
                className={'text-right'}
                onClick={async () => {
                  await router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].OrderID}/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].Pagination.nextPage.OrderItem}/` +
                    `${detail[OrdersTablesEnum.ordersSingleUnit].UserType}/`
                  );
                }}
              >
                <i className="icon-arrow-forward" />
              </div>
            }
          </div>

        </div>
        <div
          className={'relative'}
        >
          <Carousel>
            <img
              className={`imageSlide m-auto`}
              style={{
                width: `60%`,
              }}
              src={
                detail[OrdersTablesEnum.ordersSingleUnit].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[OrdersTablesEnum.ordersSingleUnit].Images?.Product?.BusinessPartnerID.toString(),
                  detail[OrdersTablesEnum.ordersSingleUnit].Images?.Product,
                ) || ''}
              alt={``}
            />
            <PublicImage
              className={`imageSlide m-auto`}
              imageName={'imageSample01Material01'}
              style={{
                width: `60%`,
              }}
            />
          </Carousel>
        </div>
      </ProductDetailSection>

      <ProductDetailSection
        style={{
          marginBottom: rem(20),
        }}
      >
        <ProductDetailSectionInfo>
          <ProductDetailSectionHeader>
            <div
              onClick={async () => {
                await router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                  `item/` +
                  `${detail[OrdersTablesEnum.ordersSingleUnit].OrderID}/` +
                  `${detail[OrdersTablesEnum.ordersSingleUnit].OrderItem}/` +
                  `${detail[OrdersTablesEnum.ordersSingleUnit].UserType}/`
                );
              }}
            >
              オーダー情報
            </div>
          </ProductDetailSectionHeader>

          <ProductDetailSectionContent
            style={{
              fontSize: rem(14),
            }}
          >
            <div>{detail[OrdersTablesEnum.ordersSingleUnit].UserType === 'buyer' ? '売り手' : '買い手'}:
              {detail[OrdersTablesEnum.ordersSingleUnit].UserType === 'buyer'
                ? detail[OrdersTablesEnum.ordersSingleUnit].SellerName : detail[OrdersTablesEnum.ordersSingleUnit].BuyerName}
              <span style={{ marginLeft: rem(20) }}></span>
              オーダー金額: <span
                style={{
                  fontSize: rem(23),
                }}
              >{detail[OrdersTablesEnum.ordersSingleUnit].GrossAmount.toLocaleString()}</span>
            </div>
            <div>
              オーダータイプ: {detail[OrdersTablesEnum.ordersSingleUnit].OrderType}<span style={{ marginLeft: rem(20) }}></span>
              通貨: {detail[OrdersTablesEnum.ordersSingleUnit].ConditionCurrency}
            </div>
            <div
              className={'flex justify-start items-baseline'}
            >
              <span>納入日付/時刻: </span>
              <span style={{
                fontSize: rem(18),
                marginLeft: rem(10),
              }}>{detail[OrdersTablesEnum.ordersSingleUnit].RequestedDeliveryDate} {detail[OrdersTablesEnum.ordersSingleUnit].RequestedDeliveryTime}</span>
              <span style={{
                marginLeft: rem(10),
              }}
              >
                <PublicImage
                  className={'m-auto'}
                  imageName={'clock'}
                  width={50}
                />
              </span>
            </div>
            <div>
              Status: {detail[OrdersTablesEnum.ordersSingleUnit].OrderStatus}
            </div>
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
                      imageName={'estimate'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>見積</div>
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
              <div className={'column column-center'}>
                <img
                  src={
                    detail[OrdersTablesEnum.ordersSingleUnit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[OrdersTablesEnum.ordersSingleUnit].Images?.QRCode,
                      { suffix: `-${detail[OrdersTablesEnum.ordersSingleUnit].UserType}` }
                    ) || ''}
                  alt={``}
                  width={132}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >オーダーID: {detail[OrdersTablesEnum.ordersSingleUnit] && detail[OrdersTablesEnum.ordersSingleUnit].OrderID}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[OrdersTablesEnum.ordersSingleUnit] && detail[OrdersTablesEnum.ordersSingleUnit].OrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'atp'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>ATP</div>
                </div>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'lot'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>ロット</div>
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
                      imageName={'scrList'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>SCR</div>
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
              <div className={'column column-center'}>
                <img
                  src={
                    detail[OrdersTablesEnum.ordersSingleUnit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[OrdersTablesEnum.ordersSingleUnit].Images?.QRCode,
                      { suffix: `-${detail[OrdersTablesEnum.ordersSingleUnit].UserType}` }
                    ) || ''}
                  alt={``}
                  width={132}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >オーダーID: {detail[OrdersTablesEnum.ordersSingleUnit] && detail[OrdersTablesEnum.ordersSingleUnit].OrderID}</div>
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >明細: {detail[OrdersTablesEnum.ordersSingleUnit] && detail[OrdersTablesEnum.ordersSingleUnit].OrderItem}</div>
              </div>
              <div className={'column column-right'}>
                <div className={'productMenu'}>
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'price'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>価格</div>
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
