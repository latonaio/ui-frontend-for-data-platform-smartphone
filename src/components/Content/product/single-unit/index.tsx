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
  ProductSingleUnitProps, ProductStockTablesEnum,
  ProductTablesEnum,
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

export const ProductSingleUnit = ({
                                    className,
                                  }: {
  className?: string;
}) => {
  const appDispatch = useAppDispatch();
  const detail  = useAppSelector(state => state.productSingleUnit) as {
    [ProductTablesEnum.productSingleUnit]: ProductSingleUnitProps,
  };

  if (!detail[ProductTablesEnum.productSingleUnit]) { return <div></div> }

  const router = useRouter();

  return (
    <Detail className={clsx(
      `ContainerWrapper`,
      className
    )}>
      <ProductDetailSection>
        <div
          style={{
            marginBottom: rem(20),
          }}
        >
          <span style={{ color: '#ff1616', }}>品目:</span> {detail[ProductTablesEnum.productSingleUnit].Product} {detail[ProductTablesEnum.productSingleUnit].ProductName}
        </div>
        <div
          className={'relative'}
        >
          <div>
            <img
              style={{
                top: `0`,
                right: `0`,
              }}
              className={'inline-block absolute'}
              src={
                detail[ProductTablesEnum.productSingleUnit].Images?.QRCode?.DocID &&
                generateQRCodeImageUrl(
                  detail[ProductTablesEnum.productSingleUnit].Images?.QRCode
                ) || ''}
              alt={``}
              width={70}
            />
          </div>
          <Carousel>
            <img
              className={`imageSlide m-auto`}
              style={{
                width: `60%`,
              }}
              src={
                detail[ProductTablesEnum.productSingleUnit].Images?.Product?.BusinessPartnerID &&
                generateImageProductUrl(
                  detail[ProductTablesEnum.productSingleUnit].Images?.Product?.BusinessPartnerID.toString(),
                  detail[ProductTablesEnum.productSingleUnit].Images?.Product,
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

      <ProductDetailSection>
        <ProductDetailSectionInfo
          style={{
            marginBottom: rem(20),
          }}
        >
          <ProductDetailSectionHeader
            style={{
              marginBottom: rem(10)
            }}
          >
            <div>
              Maintaining A Product
            </div>
          </ProductDetailSectionHeader>
          <ProductDetailSectionContent>
            <ProductDetailSectionContentProductMenuListWrapper>
              <ProductDetailSectionContentThreeColumn
                style={{
                  marginBottom: rem(5)
                }}
              >
                <div className={'menuButton general'}>General</div>
                <div className={'menuButton bp'}>BP</div>
                <div className={'menuButton bpPlant'}>BP Plant</div>
              </ProductDetailSectionContentThreeColumn>
              <ProductDetailSectionContentThreeColumn
                style={{
                  marginBottom: rem(10)
                }}
              >
                <div className={'menuButton production'}>Production</div>
                <div className={'menuButton mrp'}>MRP</div>
                <div className={'menuButton quality'}>Quality</div>
              </ProductDetailSectionContentThreeColumn>
            </ProductDetailSectionContentProductMenuListWrapper>
          </ProductDetailSectionContent>
        </ProductDetailSectionInfo>
      </ProductDetailSection>

      <Carousel>
        <ProductDetailSectionContentTwoColumn
          className={'items-baseline'}
          style={{
            marginBottom: rem(10),
            padding: `0 ${rem(40)}`,
            fontSize: rem(12),
          }}
        >
          <div
            style={{
              width: '50%'
            }}
          >
            <div><span style={{ color: '#ff1616', }}>品目タイプ:</span> {detail[ProductTablesEnum.productSingleUnit].ProductType}</div>
            <div><span style={{ color: '#ff1616', }}>総重量:</span> {detail[ProductTablesEnum.productSingleUnit].GrossWeight}</div>
            <div><span style={{ color: '#ff1616', }}>正味重量:</span> {detail[ProductTablesEnum.productSingleUnit].NetWeight}</div>
            <div><span style={{ color: '#ff1616', }}>重量単位:</span> {detail[ProductTablesEnum.productSingleUnit].WeightUnit}</div>
            <div><span style={{ color: '#ff1616', }}>内容量:</span> {detail[ProductTablesEnum.productSingleUnit].InternalCapacityQuantity}</div>
            <div><span style={{ color: '#ff1616', }}>内容量単位:</span> {detail[ProductTablesEnum.productSingleUnit].InternalCapacityQuantityUnit}</div>
            <div><span style={{ color: '#ff1616', }}>サイズ/寸法:</span> {detail[ProductTablesEnum.productSingleUnit].SizeOrDimensionText}</div>
            <div><span style={{ color: '#ff1616', }}>国際商品コード:</span> {detail[ProductTablesEnum.productSingleUnit].ProductStandardID}</div>
            <div><span style={{ color: '#ff1616', }}>国際商品名称:</span> {detail[ProductTablesEnum.productSingleUnit].IndustryStandardName}</div>
            <div><span style={{ color: '#ff1616', }}>材質:</span> {detail[ProductTablesEnum.productSingleUnit].MarkingOfMaterial}</div>
            <div><span style={{ color: '#ff1616', }}>明細カテゴリ:</span> {detail[ProductTablesEnum.productSingleUnit].ItemCategory}</div>
          </div>

          <div
            style={{
              width: '50%'
            }}
          >
            <div><span style={{ color: '#ff1616', }}>原産国:</span> {detail[ProductTablesEnum.productSingleUnit].CountryOfOrigin}</div>
            <div><span style={{ color: '#ff1616', }}>原産国言語:</span> {detail[ProductTablesEnum.productSingleUnit].CountryOfOriginLanguage}</div>
            <div><span style={{ color: '#ff1616', }}>原産ローカル地域:</span> {detail[ProductTablesEnum.productSingleUnit].LocalRegionOfOrigin}</div>
            <div><span style={{ color: '#ff1616', }}>原産サブローカル地域:</span> {detail[ProductTablesEnum.productSingleUnit].LocalSubRegionOfOrigin}</div>
            <div><span style={{ color: '#ff1616', }}>バーコードタイプ:</span> {detail[ProductTablesEnum.productSingleUnit].BarcodeType}</div>
            <div><span style={{ color: '#ff1616', }}>品目勘定設定グループ:</span> {detail[ProductTablesEnum.productSingleUnit].ProductAccountAssignmentGroup}</div>
            <div><span style={{ color: '#ff1616', }}>有効終了日付:</span> {detail[ProductTablesEnum.productSingleUnit].ValidityEndDate}</div>
            <div><span style={{ color: '#ff1616', }}>登録日付:</span> {detail[ProductTablesEnum.productSingleUnit].CreationDate}</div>
            <div><span style={{ color: '#ff1616', }}>最終更新日付:</span> {detail[ProductTablesEnum.productSingleUnit].LastChangeDate}</div>
            <div><span style={{ color: '#ff1616', }}>削除フラグ:</span> {detail[ProductTablesEnum.productSingleUnit].IsMarkedForDeletion.toString()}</div>
          </div>
        </ProductDetailSectionContentTwoColumn>
      </Carousel>

      <ProductDetailSection>
        <ProductDetailSectionContentTwoColumn
          className={'justify-end'}
        >
          <ProductDetailSectionContentProductMenuListWrapper>
            <div
              className={'menuButton general'}
              style={{
                width: rem(150),
                margin: `${rem(30)} ${rem(10)} 0 0`,
              }}
            >General</div>
          </ProductDetailSectionContentProductMenuListWrapper>
          <div>
            <img
              className={'inline-block'}
              src={
                detail[ProductTablesEnum.productSingleUnit].Images?.QRCode?.DocID &&
                generateQRCodeImageUrl(
                  detail[ProductTablesEnum.productSingleUnit].Images?.QRCode
                ) || ''}
              alt={``}
              width={70}
            />
            {/*<PublicImage*/}
            {/*  imageName={'imageQrcode01'}*/}
            {/*  width={70}*/}
            {/*/>*/}
          </div>
        </ProductDetailSectionContentTwoColumn>

      </ProductDetailSection>
    </Detail>
  );
};
