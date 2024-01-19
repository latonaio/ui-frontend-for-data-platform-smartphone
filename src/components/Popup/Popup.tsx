import { clsx } from 'clsx';
import {
  Popup as Root,
  PopupTranslucentStyle,
  PopupTranslucentStyleTitle,
  PopupTranslucentStyleCloseButton,
} from './Popup.style';
import { ReactNode, useState } from 'react';

interface PopupTranslucentProps {
  className?: string;
  children: ReactNode;
  title?: string;
  closedPopup: boolean;
  setClosedPopup: (closedPopup: boolean) => void;
  isHeightFull?: boolean;
}

export const PopupTranslucent = ({
                                   className,
                                   children,
                                   title,
                                   closedPopup,
                                   setClosedPopup,
                                   isHeightFull,
                                 }: PopupTranslucentProps) => {

  return (
    <PopupTranslucentStyle
      className={clsx(
        `${closedPopup ? 'hidden' : ''} ${isHeightFull ? 'heightFull' : ''}`,
        className='z-10'
      )}>
      <div>
        <PopupTranslucentStyleTitle
          className={`${title ? '' : 'hidden'}`}
        >{title}</PopupTranslucentStyleTitle>
        <PopupTranslucentStyleCloseButton
          className={'closeButton'}
          onClick={() => {
            setClosedPopup(!closedPopup);
          }}
        >
          <i className="icon-cancel-circle" />
        </PopupTranslucentStyleCloseButton>
        <div>
          {children}
        </div>
      </div>
    </PopupTranslucentStyle>
  );
};
