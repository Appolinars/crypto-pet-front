import { FC, useEffect, useRef, useState } from 'react';
import { useOnScreen } from 'src/hooks/useOnScreen';

import TopListTable from '@/components/common/topListTable/TopListTable';
import SkeletonLoader from '@/components/ui/skeletonLoader/SkeletonLoader';

import { useGetToplistQuery } from '@/services/crypto/cryptoService';
import PageTitle from '@/components/ui/pageTitle/PageTitle';

const TopList: FC = () => {
  const { data, isLoading, error } = useGetToplistQuery('');
  
  return (
    <section className="card-block p-3 md:p-7">
      <PageTitle>Top List Cryptocurrencies</PageTitle>
      {isLoading && <SkeletonLoader count={10} height={53} />}
      {data && !error && data.length > 0 && <TopListTable coinsData={data} />}
      {error && (
        <div className="text-2xl text-red-500">Something went wrong. Please try again later.</div>
      )}
    </section>
  );
};

export default TopList;
