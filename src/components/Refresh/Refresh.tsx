import { clsx } from 'clsx';
import { Refresh as RefreshStyle } from './Refresh.style';
import { useRouter } from 'next/router';
import { rem } from 'polished';

interface RefreshProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Refresh = ({
                          className,
                          style,
                          onClick,
                        }: RefreshProps) => {

  return (
    <RefreshStyle
      className={clsx(
        ``,
        className
      )}
      style={style}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className={'flex justify-start items-center'}>
        <i
          className="icon-refresh"
          style={{
            fontSize: rem(24),
          }}></i>
      </div>
    </RefreshStyle>
  )
};
