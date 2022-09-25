import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MainProvider from '@/providers/MainProvider';

import { colorAccent } from '@/configs/constants';

import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

import '@/styles/app.scss';

type TypeAppProps = AppProps & TypeComponentAuthFields;

function MyApp({ Component, pageProps }: TypeAppProps) {
  return (
    <>
      <MainProvider Component={Component}>
        <Component {...pageProps} />
      </MainProvider>
      <ToastContainer theme="dark" />
      <NextNProgress color={colorAccent} options={{ showSpinner: false }} />
    </>
  );
}

export default MyApp;
