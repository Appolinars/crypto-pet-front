import { FC } from 'react';

import CoinSection from '@/components/common/coinSection/CoinSection';

import TopList from './TopList';

const Home: FC = () => {
  return (
    <div className="container flex flex-col gap-14">
      <TopList />
      <CoinSection coinSymbol="BTC" coinTitle="Bitcoin" />
      <CoinSection coinSymbol="ETH" coinTitle="Ethereum" />
    </div>
  );
};

export default Home;
