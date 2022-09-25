import type { NextPage } from 'next';

import { Meta } from '@/providers/meta/Meta';
import Home from '@/components/screens/home/Home';

const HomePage: NextPage = () => {
  return (
    <Meta title="Home" description="Cryptocurrencies notebook">
      <Home />
    </Meta>
  );
};

export default HomePage;
