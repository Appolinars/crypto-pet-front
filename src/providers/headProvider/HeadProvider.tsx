import Head from 'next/head';
import { FC, PropsWithChildren } from 'react';
import { colorDarkPrimary } from 'src/configs/constants';

import Favicons from './Favicons';

const HeadProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
        <Favicons />
        <meta name="theme-color" content={colorDarkPrimary} />
        <meta name="msapplication-navbutton-color" content={colorDarkPrimary} />
        <meta name="apple-mobile-web-app-status-bar-style" content={colorDarkPrimary} />
      </Head>
      {children}
    </>
  );
};

export default HeadProvider;
