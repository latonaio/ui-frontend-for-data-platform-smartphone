import { clsx } from 'clsx';
import {
  FooterWrapper,
  FooterUl,
  FooterLi, FooterText,
} from './Footer.style';
import { BackButton } from '@/components/Button';
import { PublicImage } from '@/components/Image';

interface FooterProps {
  className?: string;
  hrefPath?: string;
  isHidden?: boolean;
}

export const Footer = ({ className, hrefPath, isHidden }: FooterProps) => {
  return (
    <FooterWrapper className={clsx(
      className
    )}>
      <FooterUl className={`flex justify-start items-center`}>
        <FooterLi>
          <div className={'footerImage'}>
            <PublicImage
              imageName={'globalMenuQrcode'}
              href={``}
            />
          </div>
          <FooterText>QR読み込み</FooterText>
        </FooterLi>
        <FooterLi>
          <div className={'footerImage'}>
            <PublicImage
              imageName={'globalMenuCallFunction'}
              href={``}
            />
          </div>
          <FooterText>機能呼び出し</FooterText>
        </FooterLi>
        <FooterLi>
          <div className={'footerImage'}>
            <PublicImage
              imageName={'globalMenuDataAnalyze'}
              href={``}
            />
          </div>
          <FooterText>データ分析</FooterText>
        </FooterLi>
        <FooterLi>
          <div className={'footerImage'}>
            <PublicImage
              imageName={'globalMenuUserInfo'}
              href={``}
            />
          </div>
          <FooterText>ユーザ情報</FooterText>
        </FooterLi>
      </FooterUl>
    </FooterWrapper>
  )
};
