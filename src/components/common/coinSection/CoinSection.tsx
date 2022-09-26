import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';

import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { useGetCoinQuery } from '@/services/crypto/cryptoService';

import { useOnScreen } from '@/hooks/useOnScreen';

import CoinSectionInfo from './CoinSectionInfo';

const DynamicCoinChart = dynamic(() => import('../coinChart/CoinChart'));

const CoinSection: FC<{ coinSymbol: string; coinTitle: string }> = ({ coinSymbol, coinTitle }) => {
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading, error } = useGetCoinQuery(coinSymbol, { skip });
  const coinRef = useRef(null);

  const isVisible = useOnScreen(coinRef);

  useEffect(() => {
    if (isVisible) setSkip(false);
  }, [isVisible]);

  return (
    <section className="card-block p-3 md:p-7" ref={coinRef}>
      <article className="flex flex-col md:flex-row">
        <div className="text-center mb-3 md:mb-0 md:mr-14">
          {isLoading ? (
            <>
              <SkeletonLoader width={120} height={120} circle />
              <SkeletonLoader height={40} />
            </>
          ) : !isLoading && data ? (
            <>
              <Image
                width={120}
                height={120}
                objectFit="cover"
                src={data.logoUrl}
                alt={data.symbol}
              />
              <h2 className="text-2xl md:text-4xl font-bold">{coinTitle}</h2>
            </>
          ) : null}
        </div>
        <div className="w-full">
          {isLoading || (!data && !error) ? (
            <>
              <SkeletonLoader width={70} height={25} />
              <SkeletonLoader width={240} height={50} />
              <SkeletonLoader width={270} height={28} />
              <SkeletonLoader height={80} />
            </>
          ) : !isLoading && data ? (
            <CoinSectionInfo data={data} />
          ) : null}
        </div>
        {error && (
          <div className="text-2xl text-red-500">Something went wrong. Please try again later.</div>
        )}
      </article>
      {isVisible && <DynamicCoinChart coinSymbol={coinSymbol} />}
    </section>
  );
};

export default CoinSection;
