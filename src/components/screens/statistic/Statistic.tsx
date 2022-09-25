import { FC } from 'react';

import UserStatistic from '@/components/common/userStatistic/UserStatistic';
import PageTitle from '@/components/ui/pageTitle/PageTitle';

const Statistic: FC = () => {
  return (
    <section className="container">
      <PageTitle className="text-center">Your statistic</PageTitle>
      <UserStatistic />
    </section>
  );
};

export default Statistic;
