import { clsx } from 'clsx';
import { Arrow as ArrowStyle } from './Arrow.style';
import { useRouter } from 'next/router';

interface ArrowProps {
  className?: string;
  href?: string;
  isSlideButton?: false,
}

export const Arrow = ({
                        className,
                        href,
                        isSlideButton,
                      }: ArrowProps) => {
  const router = useRouter();

  return (
    <ArrowStyle
      className={clsx(
        `${isSlideButton ? 'slideButton': ''}`,
      className
    )}
      onClick={() => {
        if (href) {
          router.push(href);
        }
      }}
    ></ArrowStyle>
  )
};
