import styled from 'styled-components';
import { rem } from 'polished';

export const Button = styled.button`
  padding: ${rem(5)} ${rem(8)};
  background-color: #253962;
  border-radius: ${rem(4)};
  font-size: ${rem(10)};

  &.whiteInfo {
    border: 1px solid #000;
    background-color: #fff;
    font-weight: normal !important;
    color: #000 !important;
  }
`;

export const GreenButton = styled.button`
  display: inline-block;
  min-width: ${rem(90)};
  margin-top: ${rem(3)};
  border-radius: ${rem(6)};
  padding: ${rem(4)} ${rem(6)};
  background-color: #A7D08C;
  color: #fff;
  font-size: ${rem(13)};

  &.deep {
    background-color: #538135;
  }

  &.size-relative {
    min-width: ${rem(32)};
  }
`;

export const BlueButton = styled(GreenButton)`
  background-color: #8ca7d0;

  &.deep {
    background-color: #526c94;
  }
`;

export const WhiteButton = styled.button`
  background-color: #fff;
  border: 2px solid #000;
  padding: ${rem(0)} ${rem(16)};
  border-radius: ${rem(6)};
`;

export const OtherButton = styled.button`
  border: 1px solid #000;
  background-color: #fff;
  font-weight: normal !important;
  color: #000 !important;
  padding: 0.625rem 1rem;
  border-radius: 0.25rem;
`;

export const QuantityPostCancelButton = styled.button`
  width: ${rem(100)};
  text-align: center;
  border: 1px solid #000;
  background-color: #F8CBAD;
  font-weight: normal !important;
  color: #FF7C80 !important;
  padding: ${rem(3)} 0;
  border-radius: 0.25rem;
  text-shadow: ${rem(1)} ${rem(1)} ${rem(2)} #a6a6a6;

  &.cancel {
    background-color: #D9D9D9;
    color: #ececec !important;
  }
`;
