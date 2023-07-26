import { ReactNode } from 'react';
import { clsx } from 'clsx';
import {
  Content as ContentStyle,
} from './Detail.style';
import { Arrow } from '@/components/Arrow';
import { useRouter } from 'next/router';

interface DetailProps {
  children?: ReactNode,
  className?: string;
  prevPage?: string | null;
  nextPage?: string | null;
}

export const Detail = ({
                         children,
                         className,
                         nextPage,
                         prevPage,
                       }: DetailProps) => {

  return (
    <ContentStyle className={clsx(
      '',
      className
    )}>
      {children}
    </ContentStyle>
  );
};
