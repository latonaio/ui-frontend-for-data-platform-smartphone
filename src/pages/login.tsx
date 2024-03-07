import React from "react";
import {
  Main,
  Wrapper,
} from '@/styles/global/globals.style'
import { LoginForm } from '@/components/LoginForm';
import styles from '@/styles/pages/Login.module.scss'
import { Header } from '@/components/Header';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface PageProps {
}

const Login: React.FC<PageProps> = (data) => {
  const router = useRouter();

  const { query } = router;
  const emailAddress = query.emailAddress ? query.emailAddress : '';
  const password = query.password ? query.password : '';
  const destination = query.destination ? query.destination : '';

  return (
    <Wrapper className={`Wrapper`}>
      <Header title={'トップ'} className={'text-2xl'} />
      <Main className={'Main h-screen dis-flex items-center'}>
        <LoginForm
          emailAddress={emailAddress}
          password={password}
          destination={destination}
        ></LoginForm>
      </Main>
    </Wrapper>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
  } = context.query;

  return {
    props: {}
  }
}

export default Login;
