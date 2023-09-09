import { clsx } from 'clsx';
import {
  HeaderWrapper,
  HeaderContent,
  HeaderIcon,
  HeaderContentBack,
  HeaderContentNext,
  HeaderContentCenter,
} from "@/components/Header/Header.style";
import Link from 'next/link';
import { PublicImage } from '@/components/Image';
import React from "react";
import { rem } from "polished";

interface HeaderProps {
  backName?: string;
  category?: string;
  pageName?: string;
  className?: string;
  title?: string;
}

export const Header = ({
                         backName,
                         category,
                         pageName,
                         className,
                       }: HeaderProps) => {
  return (
    <HeaderWrapper className={clsx(
      `HeaderWrapper`,
      className
    )}>
      <HeaderContent>
        <HeaderContentBack>
          <i className="icon-keyboard_arrow_left"
             style={{
               fontSize: rem(30),
             }}
          />
          <Link
              href="/"
              className={'backButton'}
          >{backName}</Link>
        </HeaderContentBack>
        <HeaderContentCenter>
          <div>
            <PublicImage
                imageName={'aionLogo'}
                width={120}
            />
          </div>
          <HeaderIcon>
            <PublicImage imageName={'headerGirl'} />
          </HeaderIcon>
        </HeaderContentCenter>
        <HeaderContentNext>
          <Link
            href="/"
          >
            <div className={'flex justify-start items-center'}>
              <div>{category}</div>
              <div>
                <i className="icon-keyboard_arrow_right"
                   style={{
                     fontSize: rem(24),
                   }}
                />
              </div>
            </div>
            <div>{pageName}</div>
          </Link>
        </HeaderContentNext>
      </HeaderContent>
    </HeaderWrapper>
  )
};
