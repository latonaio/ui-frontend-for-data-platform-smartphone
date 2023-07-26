import { clsx } from 'clsx';
import { CarouselStyle } from './Carousel.style';
import React, { ReactNode } from 'react';
import MaterialUiCarousel from 'react-material-ui-carousel';
import { Arrow } from '@/components/Arrow';

interface CarouselProps {
  className?: string;
  children?: ReactNode,
}

export const Carousel = ({
                           className,
                           children,
                         }: CarouselProps) => {
  return (
    <CarouselStyle
      className={clsx(
        '',
        className,
      )}
    >
      <MaterialUiCarousel
        NextIcon={<Arrow className={'right carouselArrow'} />}
        PrevIcon={<Arrow className={'left carouselArrow'} />}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        animation={'slide'}
        navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: 'transparent',
            borderRadius: 0,
          }
        }}
      >
        {children}
      </MaterialUiCarousel>
    </CarouselStyle>
  );
};
