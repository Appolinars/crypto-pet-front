import { NextPage } from 'next';

import Login from '@/components/screens/login/Login';

import { Meta } from '@/providers/meta/Meta';

const LoginPage: NextPage = () => {
  return (
    <Meta title="Login" description="Login to your account">
      <Login />
    </Meta>
  );
};
export default LoginPage;
