import { NextPage } from 'next';

import Error from '@/components/screens/error/Error';

import { Meta } from '@/providers/meta/Meta';

const ErrorPage: NextPage = () => {
  return (
    <Meta title="Page not found">
      <Error />
    </Meta>
  );
};
export default ErrorPage;
