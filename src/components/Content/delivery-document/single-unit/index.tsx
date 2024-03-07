import { clsx } from 'clsx';
import {
  ProductDetailSection,
  ProductDetailSectionContentTwoColumn,
  ProductDetailSectionContentThreeColumn,
  ProductDetailSectionContent,
  ProductDetailSectionHeader,
  ProductDetailSectionInfo,
  ProductDetailSectionContentQRCodeBox,
  ProductDetailSectionContentQRCodeBoxWrapper, ProductDetailSectionContentProductMenuListWrapper,
} from '@/components/Content/Detail/Detail.style';
import {
  ProductSingleUnitProps,
  DeliveryDocumentSingleUnitProps,
  ProductStockTablesEnum,
  DeliveryDocumentTablesEnum,
  ProductTablesEnum, OrdersTablesEnum,
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

export const DeliveryDocumentSingleUnit = ({
                                       className,
                                     }: {
  className?: string;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.deliveryDocumentSingleUnit) as {
    [DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit]: DeliveryDocumentSingleUnitProps,
  };

  if (!detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit]) { return <div></div> }

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
              detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Pagination?.prevPage &&
              <div
                className={'text-left'}
                onClick={async () => {
                  await router.push(`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocument}/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Pagination.prevPage.DeliveryDocumentItem}/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType}/`
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
            <span
              style={{
                fontSize: rem(12),
              }}
            >User={detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType.charAt(0).toUpperCase() + detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType.slice(1)}を選択しています</span>
          </div>

          <div
            style={{
              width: rem(40),
            }}
          >
            {
              detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Pagination?.nextPage &&
              <div
                className={'text-right'}
                onClick={async () => {
                  await router.push(`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocument}/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Pagination.nextPage.DeliveryDocumentItem}/` +
                    `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType}/`
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
                detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.Product?.BusinessPartnerID.toString(),
                  detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.Product,
                ) || ''}
              alt={``}
            />
            {/*<PublicImage*/}
            {/*  className={`imageSlide m-auto`}*/}
            {/*  imageName={'imageSample01Material01'}*/}
            {/*  style={{*/}
            {/*    width: `60%`,*/}
            {/*  }}*/}
            {/*/>*/}
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
            <div>
              入出荷情報
            </div>
          </ProductDetailSectionHeader>

          <ProductDetailSectionContent
            style={{
              fontSize: rem(14),
            }}
          >
            <div className={'flex justify-start items-center'}>
              {
                detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType === 'deliverFromParty' &&
                  <div>
                    <div
                      className={'flex justify-start items-center'}
                    >
                      <span>計画出荷: </span>
                      <span style={{
                        fontSize: rem(18),
                        marginLeft: rem(10),
                      }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsIssueDate} {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsIssueTime}</span>
                    </div>
                    <div
                      className={'flex justify-start items-center'}
                    >
                      <span>計画入荷: </span>
                      <span style={{
                        fontSize: rem(18),
                        marginLeft: rem(10),
                      }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsReceiptDate} {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsReceiptTime}</span>
                    </div>
                  </div>
              }

              {
                detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType === 'deliverToParty' &&
                <div>
                  <div
                    className={'flex justify-start items-center'}
                  >
                    <span>計画入荷: </span>
                    <span style={{
                      fontSize: rem(18),
                      marginLeft: rem(10),
                    }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsReceiptDate} {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsReceiptTime}</span>
                  </div>
                  <div
                    className={'flex justify-start items-center'}
                  >
                    <span>計画出荷: </span>
                    <span style={{
                      fontSize: rem(18),
                      marginLeft: rem(10),
                    }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsIssueDate} {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].PlannedGoodsIssueTime}</span>
                  </div>
                </div>
              }
              <div style={{
                marginLeft: rem(10),
              }}>
                <PublicImage
                  className={'m-auto'}
                  imageName={'clock'}
                  width={50}
                />
              </div>
            </div>

            {
              detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType === 'deliverFromParty' &&
              <div>
                <div
                  className={'flex justify-start items-center'}
                >
                  <div>
                    <span>出荷先: </span>
                    <span style={{
                      marginLeft: rem(10),
                    }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliverToPartyName}</span>
                  </div>
                  <div>
                    <span style={{
                      marginLeft: rem(20),
                    }}
                          onClick={async () => {
                            await router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                              `singleUnit/` +
                              `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderID}/` +
                              `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderItem}/` +
                              `seller`,
                            );
                          }}
                    >オーダー/明細: </span>
                    <span>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderID}/{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderItem}</span>
                  </div>
                </div>
                <div
                  className={'flex justify-start items-center'}
                >
                  <span>出荷先プラント: </span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliverToPlantName}</span>
                </div>
              </div>
            }

            {
              detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType === 'deliverToParty' &&
              <div>
                <div
                  className={'flex justify-start items-center'}
                >
                  <div>
                    <span>出荷元: </span>
                    <span style={{
                      marginLeft: rem(10),
                    }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliverFromPartyName}</span>
                  </div>
                  <div>
                    <span style={{
                      marginLeft: rem(20),
                    }}
                          onClick={async () => {
                            await router.push(`/DPFM_API_ORDERS_SRV/reads/` +
                              `singleUnit/` +
                              `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderID}/` +
                              `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderItem}/` +
                              `buyer`,
                            );
                          }}
                    >オーダー/明細: </span>
                    <span>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderID}/{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].OrderItem}</span>
                  </div>
                </div>
                <div
                  className={'flex justify-start items-center'}
                >
                  <span>出荷元プラント: </span>
                  <span style={{
                    marginLeft: rem(10),
                  }}>{detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliverFromPlantName}</span>
                </div>
              </div>
            }

          </ProductDetailSectionContent>

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
                        detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.QRCode?.DocID &&
                        generateQRCodeImageUrl(
                          detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.QRCode,
                          { suffix: `-${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType}` }
                        ) || ''}
                      alt={``}
                      width={132}
                    />
                    <div
                      style={{
                        padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                      }}
                    >入出荷伝票: {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit] && detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocument}</div>
                    <div
                      style={{
                        padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                      }}
                    >明細: {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit] && detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocumentItem}</div>
                  </div>
                  <div className={'column column-right'}>
                    <div
                      className={'productMenu'}
                      onClick={async () => {
                        await router.push(`/DPFM_API_DELIVERY_DOCUMENT_SRV/reads/` +
                          `item/` +
                          `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocument}/` +
                          `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocumentItem}/` +
                          `${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType}/`
                        );
                      }}
                    >
                      <div>
                        <PublicImage
                          className={'m-auto'}
                          imageName={'underConstruction'}
                          width={70}
                        />
                      </div>
                      <div className={'productMenuTitle'}>明細一覧</div>
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

              {/* scroll 2 */}
              <ProductDetailSectionContentQRCodeBoxWrapper>
                <ProductDetailSectionContentQRCodeBox>
                  <div className={'column column-left'}>
                    <div className={'productMenu'}>
                    <div>
                        <PublicImage
                          className={'m-auto'}
                          imageName={'picking'}
                          width={70}
                        />
                      </div>
                      <div className={'productMenuTitle'}>ピッキング</div>
                    </div>
                    <div className={'productMenu'}>
                      <div>
                        <PublicImage
                          className={'m-auto'}
                          imageName={'order'}
                          width={70}
                        />
                      </div>
                      <div className={'productMenuTitle'}>オーダー</div>
                    </div>
                  </div>
                  <div className={'column column-center'}>
                    <img
                      src={
                        detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.QRCode?.DocID &&
                        generateQRCodeImageUrl(
                          detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].Images?.QRCode,
                          { suffix: `-${detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].UserType}` }
                        ) || ''}
                      alt={``}
                      width={132}
                    />
                    <div
                      style={{
                        padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                      }}
                    >入出荷伝票: {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit] && detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocument}</div>
                    <div
                      style={{
                        padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                      }}
                    >明細: {detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit] && detail[DeliveryDocumentTablesEnum.deliveryDocumentSingleUnit].DeliveryDocumentItem}</div>
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

            </Carousel>
          </ProductDetailSection>

        </ProductDetailSectionInfo>
      </ProductDetailSection>

    </Detail>
  );
};
