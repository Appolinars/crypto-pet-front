import { NextPage } from 'next';

import { Meta } from '@/providers/meta/Meta';
import Registration from '@/components/screens/registration/Registration';

const RegistrationPage: NextPage = () => {
  return (
    <Meta title="Registration" description="Registration page">
      <Registration />
    </Meta>
  );
};
export default RegistrationPage;
