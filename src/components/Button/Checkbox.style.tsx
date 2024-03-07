import styled from 'styled-components';
import { rem } from 'polished';

export const Checkbox = styled.div`
  box-sizing: border-box;
  width: ${rem(30)};
  height: ${rem(30)};
  margin: auto;
  border: ${rem(2)} solid #989898;
  border-radius: ${rem(4)};

  i {
    font-size: ${rem(26)};
    margin-top: -${rem(13)};
    margin-left: -${rem(13)};
    position: absolute;
    top: 50%;
    left: 50%;
  }

  &.usageControl {
    width: ${rem(13)};
    height: ${rem(13)};
    background-color: #66bf3c;
    border: none;
    border-radius: ${rem(2)};
    box-shadow: ${rem(1)} ${rem(1)} ${rem(1)} ${rem(1)} rgb(0 0 0 / 0.3);

    i {
      font-size: ${rem(10)};
      margin-top: -${rem(5)};
      margin-left: -${rem(5)};
      top: 50%;
      left: 50%;
    }
  }
`;
