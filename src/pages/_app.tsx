import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypeComponentAuthFields } from 'src/shared/types/authTypes';

import MainProvider from '@/providers/MainProvider';

import { colorAccent } from '@/configs/constants';

import '@/styles/app.scss';

const DynamicToastContainer = dynamic<ToastContainerProps>(() =>
  import('react-toastify').then((mod) => mod.ToastContainer)
);

type TypeAppProps = AppProps & TypeComponentAuthFields;

function MyApp({ Component, pageProps }: TypeAppProps) {
  return (
    <>
      <MainProvider Component={Component}>
        <Component {...pageProps} />
      </MainProvider>
      <DynamicToastContainer theme="dark" />
      <NextNProgress color={colorAccent} options={{ showSpinner: false }} />
    </>
  );
}

export default MyApp;
