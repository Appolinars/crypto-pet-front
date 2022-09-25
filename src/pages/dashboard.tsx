import { NextPageAuth } from 'src/shared/types/authTypes';

import Dashboard from '@/components/screens/dashboard/Dashboard';

import { Meta } from '@/providers/meta/Meta';

const DashboardPage: NextPageAuth = () => {
  return (
    <Meta title="Dashboard" description="Your Dashboard">
      <Dashboard />
    </Meta>
  );
};

DashboardPage.isOnlyUser = true;

export default DashboardPage;
