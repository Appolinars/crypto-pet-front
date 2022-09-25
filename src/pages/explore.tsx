import Explore from '@/components/screens/explore/Explore';

import { NextPageAuth } from 'src/shared/types/authTypes';

import { Meta } from '@/providers/meta/Meta';

const ExplorePage: NextPageAuth = () => {
  return (
    <Meta title="Explore" description="Explore crypto-news">
      <Explore />
    </Meta>
  );
};

export default ExplorePage;
