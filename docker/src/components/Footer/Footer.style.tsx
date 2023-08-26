import styled from 'styled-components';
import { rem } from 'polished';

export const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${rem(20)};
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border-top: ${rem(1)} solid #c0c0c0;
`;

export const FooterUl = styled.ul`
`;

export const FooterLi = styled.li`
  width: calc(100% / 4);
  
  .footerImage {
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${rem(75)};
  }
  
  img {
    width: ${rem(65)};
    margin: auto;
  }
`;

export const FooterText = styled.div`
  font-size: ${rem(10)};
  text-align: center;
`;
