import { NextPageAuth } from 'src/shared/types/authTypes';

import Statistic from '@/components/screens/statistic/Statistic';

import { Meta } from '@/providers/meta/Meta';

const StatisticPage: NextPageAuth = () => {
  return (
    <Meta title="Statistic" description="Statistic page">
      <Statistic />
    </Meta>
  );
};

StatisticPage.isOnlyUser = true;

export default StatisticPage;
