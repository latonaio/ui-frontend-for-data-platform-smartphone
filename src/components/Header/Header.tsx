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
  title: string;
  className?: string;
}

export const Header = ({ title, className }: HeaderProps) => {
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
          >{title}</Link>
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
              <div>製造指図</div>
              <div>
                <i className="icon-keyboard_arrow_right"
                   style={{
                     fontSize: rem(24),
                   }}
                />
              </div>
            </div>
            <div>Cockpit</div>
          </Link>
        </HeaderContentNext>
      </HeaderContent>
    </HeaderWrapper>
  )
};
