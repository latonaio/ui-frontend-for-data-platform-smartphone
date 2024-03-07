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
  InspectionLotTablesEnum,
  InspectionLotSingleUnitProps,
  ProductSingleUnitProps,
  ProductStockTablesEnum,
  ProductTablesEnum,
  ProductionOrderTablesEnum,
  AuthedUser, OrdersTablesEnum,
} from '@/constants';
import { Detail } from '@/components/Content/Detail/Detail';
import React from 'react';
import { rem } from 'polished';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { generateImageProductUrl, generateQRCodeImageUrl, getLocalStorage } from '@/helpers/common';
import { PublicImage } from '@/components/Image';
import { Carousel } from '@/components/Carousel';
import { useRouter } from 'next/router';
import productionOrder from '@public/global-menu/production-order.png';
import specDetail from '@public/global-menu/spec-detail.png';
import deliveryDocumentList from '@public/global-menu/delivery-document-list.png';
import dataCertificate from '@public/global-menu/data-certificate.png';
import { setDialog } from '@/store/slices/dialog';
import { Template as cancelDialogTemplate } from '@/components/Dialog';
import { setLoading } from '@/store/slices/loadging';
import { reads as headerSingleUnitMillSheet } from '@/api/inspectionLot/header-single-unit-mill-sheet';
import { setGlobalSnackbar } from '@/store/slices/snackbar';
import { BlueButton } from '@/components/Button';
import { useDispatch } from 'react-redux';

export const InspectionLotSingleUnit = ({
                                          className,
                                        }: {
  className?: string;
}) => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.inspectionLotSingleUnit) as {
    [InspectionLotTablesEnum.inspectionLotSingleUnit]: InspectionLotSingleUnitProps,
  };

  if (!detail[InspectionLotTablesEnum.inspectionLotSingleUnit]) { return <div></div> }

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
              detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Pagination?.prevPage &&
              <div
                className={'text-left'}
                onClick={async () => {
                  await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
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
            <span>User=InspectionPlantBPを選択しています</span>
          </div>

          <div
            style={{
              width: rem(40),
            }}
          >
            {
              detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Pagination?.nextPage &&
              <div
                className={'text-right'}
                onClick={async () => {
                  await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                    `singleUnit/` +
                    `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
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
                detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.Product?.BusinessPartnerID.toString(),
                  detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.Product,
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
              品質検査ロット情報
            </div>
          </ProductDetailSectionHeader>

          <ProductDetailSectionContent
            style={{
              fontSize: rem(14),
            }}
          >
            <div>
              BP: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionPlantBusinessPartnerName}<span
              style={{ marginLeft: rem(20) }}></span>
              ロット日付: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLotDate}
            </div>
            <div>
              プラント: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionPlantName}<span
              style={{ marginLeft: rem(20) }}></span>
              品目: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Product}
            </div>
            <div>
              品目規格: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].ProductSpecification}<span
              style={{ marginLeft: rem(20) }}></span>
              製造指図/明細: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].ProductionOrder} / {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].ProductionOrderItem}
            </div>
            <div className={'flex justify-start items-center'}>
              {/*<div>データ証明書: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit].UsageControlChain}</div>*/}
              <div>データ証明書: </div>
              <div>
                <i
                  className='icon-input-checked'
                  style={{
                    fontSize: rem(20),
                  }}
                ></i>
              </div>
              <div style={{ marginLeft: rem(20) }}>
                <BlueButton
                  className={'mr-2'}
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
                            '検査証明書を生成します',
                            async () => {
                              dispatch(setLoading({ isOpen: true }));

                              try {
                                const response = await headerSingleUnitMillSheet({
                                  inspectionLot: detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot,
                                  language: '',
                                  businessPartner: 0,
                                  userId: '',
                                });

                                if (response) {
                                  router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                                    `singleUnit/` +
                                    `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/` +
                                    `pdf` +
                                    `?pdfUrl=${response.InspectionLotPdfMountPath}&type=inspection-lot-mill-sheet-pdf`
                                  );
                                }
                              } catch (e) {
                                appDispatch(setGlobalSnackbar({
                                  message: `エラーです`,
                                  variant: 'error',
                                }));
                              }

                              dispatch(setLoading({ isOpen: false }));
                            },
                          )
                        ),
                      }
                    }))
                  }}
                >検査証明書を生成</BlueButton>
              </div>
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
                <div
                  className={'productMenu'}
                  onClick={async () => {
                    await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `specDetail/` +
                      `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}`
                    );
                  }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'specDetail'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>仕様詳細</div>
                </div>
                <div
                  className={'productMenu'}
                  onClick={async () => {
                    await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `inspection/` +
                      `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
                    );
                  }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'deliveryDocumentList'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>品質検査</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.QRCode,
                      {},
                    ) || ''}
                  alt={``}
                  width={132}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >品質検査ﾛｯﾄ: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit] && detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}</div>
              </div>
              <div className={'column column-right'}>
                <div
                  className={'productMenu'}
                  onClick={async () => {
                    await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `componentComposition/` +
                      `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
                    );
                  }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'componentComposition'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>構成物質</div>
                </div>
                <div
                  className={'productMenu'}
                  onClick={async () => {
                    await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `list/` +
                      `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
                    );
                  }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'productionOrder'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>品質検査<br />ロット一覧</div>
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
                      imageName={'document'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>文書</div>
                </div>
                <div
                  className={'productMenu'}
                  onClick={async () => {
                    await router.push(`/DPFM_API_INSPECTION_LOT_SRV/reads/` +
                      `usageControlChain/` +
                      `${detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}/`
                    );
                  }}
                >
                  <div>
                    <PublicImage
                      className={'m-auto'}
                      imageName={'dataCertificate'}
                      width={70}
                    />
                  </div>
                  <div className={'productMenuTitle'}>データ証明</div>
                </div>
              </div>
              <div className={'column column-center'}>
                <img
                  src={
                    detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.QRCode?.DocID &&
                    generateQRCodeImageUrl(
                      detail[InspectionLotTablesEnum.inspectionLotSingleUnit].Images?.QRCode,
                      {},
                    ) || ''}
                  alt={``}
                  width={132}
                />
                <div
                  style={{
                    padding: `${rem(4)} ${rem(4)} ${rem(1)}`,
                  }}
                >品質検査ﾛｯﾄ: {detail[InspectionLotTablesEnum.inspectionLotSingleUnit] && detail[InspectionLotTablesEnum.inspectionLotSingleUnit].InspectionLot}</div>
              </div>
              <div className={'column column-right'}>
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
