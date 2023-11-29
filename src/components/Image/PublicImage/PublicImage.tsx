import Image, { StaticImageData } from 'next/image';
import { clsx } from 'clsx';
import imgBox from '@public/image-box.png';
import imgLeaf from '@public/image-leaf.png';
import aionLogo from '@public/aion-logo.png';
import headerGirl from '@public/header-girl.png';
import headerGirlSteering from '@public/header-girl-steering.png';
import iconPresent from '@public/icon-present.png';
import iconWing from '@public/icon-wing.png';
import iconInvoice from '@public/icon-invoice.png';
import iconEdit from '@public/icon-edit.png';
import iconDelivery from '@public/icon-delivery.png';
import yieldQuantity from '@public/yield-quantity.png';
import defectiveQuantity from '@public/defective-quantity.png';
import factory from '@public/factory.png';
import iconWing2 from '@public/icon-wing-2.png';
import clock from '@public/clock.png';
import ordersItemImage001 from '@public/orders-item-image-001.png';

import globalMenuQrcode from '@public/global-menu-qrcode.png';
import globalMenuCallFunction from '@public/global-menu-call-function.png';
import globalMenuDataAnalyze from '@public/global-menu-data-analyze.png';
import globalMenuUserInfo from '@public/global-menu-user-info.png';

// info
import infoFactory from '@public/info/factory.png';
import infoPlant from '@public/info/plant.png';
import infoProductStock from '@public/info/product-stocks.png';
import infoProductStockDisable from '@public/info/product-stocks-disable.png';
import infoDeliveryTodo from '@public/info/delivery-todo.png';

import billOfMaterialList from '@public/global-menu/bill-of-material-list.png';
import operationsList from '@public/global-menu/operations-list.png';
import productionVersionList from '@public/global-menu/production-version-list.png';
import deliveryDocumentList from '@public/global-menu/delivery-document-list.png';
import actualStock from '@public/global-menu/actual-stock.png';
import atp from '@public/global-menu/atp.png';
import facility from '@public/global-menu/facility.png';
import feePaymentMaterial from '@public/global-menu/fee-payment-material.png';
import operator from '@public/global-menu/operator.png';
import parentProduct from '@public/global-menu/parent-product.png';
import scheduler from '@public/global-menu/scheduler.png';
import scrList from '@public/global-menu/scr-list.png';
import orderList from '@public/global-menu/order-list.png';
import underConstruction from '@public/global-menu/under-construction.png';
import estimate from '@public/global-menu/estimate.png';
import lot from '@public/global-menu/lot.png';
import price from '@public/global-menu/price.png';

// demo
import imageSample01 from '@public/demo/image-sample01.png';
import imageSample01Material01 from '@public/demo/image-sample01-material01.png';
import imageQrcode01 from '@public/demo/image-qrcode-01.png';

import { useRouter } from 'next/router';
import { CSSProperties } from 'react';

interface PublicImageProps {
  imageName: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  href?: string;
  stopPropagation?: boolean;
  style?: CSSProperties,
}

interface PublicImageMap {
  [key: string]: StaticImageData;
}

const publicImageMap = {
  imageSample01,
  imageSample01Material01,
  imageQrcode01,

  imgBox,
  imgLeaf,
  aionLogo,
  headerGirl,
  iconPresent,
  iconWing,
  iconInvoice,
  iconEdit,
  iconDelivery,
  yieldQuantity,
  defectiveQuantity,
  factory,
  iconWing2,
  clock,
  ordersItemImage001,

  globalMenuQrcode,
  globalMenuCallFunction,
  globalMenuDataAnalyze,
  globalMenuUserInfo,

  infoFactory,
  infoPlant,
  infoProductStock,
  infoProductStockDisable,
  infoDeliveryTodo,

  billOfMaterialList,
  operationsList,
  productionVersionList,
  deliveryDocumentList,
  actualStock,
  atp,
  facility,
  feePaymentMaterial,
  operator,
  parentProduct,
  scheduler,
  scrList,
  orderList,
  underConstruction,
  headerGirlSteering,
  estimate,
  lot,
  price,

} as PublicImageMap;

const handleImageName = (imageName: string) => {
  const key: keyof PublicImageMap = imageName;
  return publicImageMap[key];
};

export const PublicImage = ({
                              imageName,
                              width,
                              height,
                              alt = '',
                              className,
                              href,
                              stopPropagation = false,
                              style = {},
                            }: PublicImageProps) => {
  const router = useRouter();

  const generateImage = () => {
    return (
      <Image
        className={clsx(
          '',
          className,
        )}
        style={style}
        src={handleImageName(imageName)}
        alt={alt}
        onClick={(e) => {
          e.preventDefault();

          if (stopPropagation) {
            e.stopPropagation();
          }

          if (href) {
            router.push(href);
          }
        }}
      />
    );
  };

  const image = generateImage();
  image.props.src.width = width ? width : image.props.src.width;
  image.props.src.height = height ? height : image.props.src.height;

  return image;
};
