import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren } from 'react';

import { onlyText } from '@/utils/index';

import ogLogo from '/public/static/images/og-logo.jpg';

interface IMeta extends PropsWithChildren {
  title: string;
  description?: string;
  image?: any;
}

export const Meta: FC<IMeta> = ({ title, description, image = null, children }) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.NEXT_PUBLIC_APP_URL}${asPath}`;

  const siteName = 'Crypto notebook';

  return (
    <>
      {description ? (
        <Head>
          <title itemProp="headline">{`${title} | ${siteName}`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta itemProp="description" name="description" content={onlyText(description, 152)} />
          <link rel="canonical" href={currentUrl} />
          <meta property="og:locale" content="en" />
          <meta property="og:title" content={`${title} | ${siteName}`} />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:image" content={image || ogLogo} />
          <meta property="og:site_name" content={siteName} />
          <meta property="og:description" content={onlyText(description, 197)} />
        </Head>
      ) : (
        <Head>
          <title>{`${title} | ${siteName}`}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      )}
      {children}
    </>
  );
};
