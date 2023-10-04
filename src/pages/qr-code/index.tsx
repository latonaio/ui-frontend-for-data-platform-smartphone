import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Main, Wrapper } from '@/styles/global/globals.style';
import { Header } from '@/components/Header';
import { QRCode as Content } from '@/components/Content';
import { Footer } from '@/components/Footer';

interface PageProps {
}

const QRCode: React.FC<PageProps> = (data) => {
  const initLoadTabData = async () => {

  }

  useEffect(() => {
    initLoadTabData();
  }, [data]);

  return (
    <Wrapper className={'Wrapper'}>
      <Header
        backName={'トップ'}
        category={'QR読み込み'}
        pageName={''}
        className={'text-2xl'}
        color={'gray'}
      />
      <Main className={'Main'}>
        <Content />
      </Main>
      <Footer></Footer>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    }
  }
}

export default QRCode;

