import Image, { StaticImageData } from 'next/image';
import { clsx } from 'clsx';
import imgBox from '@public/image-box.png';
import imgLeaf from '@public/image-leaf.png';
import aionLogo from '@public/aion-logo.png';
import headerGirl from '@public/header-girl.png';
import iconPresent from '@public/icon-present.png';
import iconWing from '@public/icon-wing.png';
import iconInvoice from '@public/icon-invoice.png';
import iconEdit from '@public/icon-edit.png';
import iconDelivery from '@public/icon-delivery.png';
import globalMenuQrcode from '@public/global-menu-qrcode.png';
import globalMenuCallFunction from '@public/global-menu-call-function.png';
import globalMenuDataAnalyze from '@public/global-menu-data-analyze.png';
import globalMenuUserInfo from '@public/global-menu-user-info.png';

// demo
import imageSample01 from '@public/demo/image-sample01.png';
import imageSample01Material01 from '@public/demo/image-sample01-material01.png';

import { useRouter } from 'next/router';

interface PublicImageProps {
  imageName: string;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
  href?: string;
  stopPropagation?: boolean;
}

interface PublicImageMap {
  [key: string]: StaticImageData;
}

const publicImageMap = {
  imageSample01,
  imageSample01Material01,
  imgBox,
  imgLeaf,
  aionLogo,
  headerGirl,
  iconPresent,
  iconWing,
  iconInvoice,
  iconEdit,
  iconDelivery,
  globalMenuQrcode,
  globalMenuCallFunction,
  globalMenuDataAnalyze,
  globalMenuUserInfo,
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
                            }: PublicImageProps) => {
  const router = useRouter();

  const generateImage = () => {
    return (
      <Image
        className={clsx(
          '',
          className
        )}
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
