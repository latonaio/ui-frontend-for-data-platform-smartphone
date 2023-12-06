import styled from 'styled-components';
import { rem } from 'polished';
import { style } from "@/constants";

export const HeaderWrapper = styled.header`
`;

export const HeaderContentDefault = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: ${rem(20)};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  //justify-content: flex-end;
  align-items: center;
  padding: ${rem(4)};
  background-color: ${style.theme.lightBlue400};

  &.gray {
    background-color: ${style.header.gray};
  }

  &.purple {
    background-color: ${style.header.purple};
  }

  &.pink {
    background-color: ${style.header.pink};
  }

  &.deliveryFromParty {
    background-color: ${style.header.deliveryFromParty};
  }

  &.deliveryToParty {
    background-color: ${style.header.deliveryToParty};
  }
`;

export const HeaderContentCenter = styled(HeaderContentDefault)`
`;

export const HeaderContentBack = styled(HeaderContentDefault)`
  a {
    line-height: ${rem(30)};
  }
`;

export const HeaderContentNext = styled(HeaderContentDefault)`
  font-size: ${rem(16)};

  .icon-keyboard_arrow_right {
    height: ${rem(32)};
  }
`;

export const HeaderIcon = styled.div`
  img {
    width: ${rem(60)};
    height: ${rem(60)};
  }
`;
